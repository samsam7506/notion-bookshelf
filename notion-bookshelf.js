// Author: Cade DuPont
// Date: 29 January 2024
// Description: This script is used to add books to a Notion database. It takes a book title as an argument, and then uses the Google Books API to find the book and add the rest of its information to the virtual bookshelf.

require("dotenv").config();
const { Client } = require("@notionhq/client");

// Load environment variables
const { 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, NOTION_DATABASE_ID, GOOGLE_BOOKS_API_KEY } = process.env;

// If no query is provided, exit with error
const query = process.argv[2];
if (!query) {
    throw new Error("No query provided");
}

// Form Google Books API URL
const google_books_url = `https://www.googleapis.com/books/v1/volumes?q=${query.split("+")}&key=${GOOGLE_BOOKS_API_KEY}`

// Create Notion API instance
const notion = new Client({
    auth: NOTION_TOKEN,
});

// Function for gathering each page in the database
const getPages = async () => {
    // Create an array to store pages, and a cursor to paginate through results
    const pages = [];
    let cursor = undefined;

    // While there are more pages to get, get pages from database
    while (true) {
        // Get pages from Notion API
        const { results, next_cursor } = await notion.databases.query({
            database_id: NOTION_DATABASE_ID,
            start_cursor: cursor,
        });

        // Add pages to array and update cursor
        pages.push(...results);
        if (!next_cursor)
            break;
        cursor = next_cursor;
    }

    // Return array of pages
    return pages;
};

// Fetch data from Google Books API
fetch(google_books_url)
    .then(response => response.json())
    .then(data => {
        // Declare book variable, set to first book in data
        let num = 0;
        let book = data.items[num].volumeInfo;

        // If any properties are undefined, set book to next book in data until all properties are defined
        let properties = [undefined];
        while (properties.includes(undefined)) {
            book = data.items[num++].volumeInfo;
            properties = [
                book.title,
                book.authors[0],
                book.publisher,
                book.pageCount,
                book.industryIdentifiers[0].identifier,
                book.description,
                book.imageLinks.thumbnail
            ];
        }

        // If book is not found, exit with error
        if (!book || book.title.toLowerCase() !== query.toLowerCase()) {
            throw new Error("Book not found");
        }

        // Get pages from database
        getPages().then(pages => {
            // Find page with matching title
            const page = pages.find(page => page.properties.Title.title[0].plain_text.toLowerCase() === book.title.toLowerCase());

            // If page exists, exit with error; otherwise, create page
            if (page !== undefined) {
                throw new Error("Book already exists in database");
            } else {
                // Create book page in database; add title, author, ISBN, cover image, and description
                notion.pages.create({
                    cover: {
                        type: "external",
                        external: {
                            url: book.imageLinks.thumbnail
                        }
                    },
                    parent: {
                        database_id: NOTION_DATABASE_ID
                    },
                    properties: {
                        Title: {
                            title: [{
                                text: {
                                    content: book.title
                                }
                            }]
                        },
                        Author: {
                            rich_text: [{
                                text: {
                                    content: book.authors[0]
                                }
                            }]
                        },
                        Publisher: {
                            rich_text: [{
                                text: {
                                    content: book.publisher
                                }
                            }]
                        },
                        "Page Count": {
                            number: book.pageCount
                        },
                        ISBN: {
                            rich_text: [{
                                text: {
                                    content: book.industryIdentifiers[0].identifier
                                }
                            }]
                        },
                    },
                    children: [
                        {
                            object: "block",
                            heading_3: {
                                rich_text: [{
                                    text: {
                                        content: "Description"
                                    }
                                }]
                            }
                        },
                        {
                            object: "block",
                            paragraph: {
                                rich_text: [{
                                    text: {
                                        content: book.description,
                                    }
                                }],
                            }
                        }
                    ]
                });
            }
        });
    });
