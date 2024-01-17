# Notion Bookshelf

JavaScript application for querying Google Books for a given book title and adding all of the book's information as a page to a Notion database.

## Setting up API keys
Before attempting to run the program, ensure that you have a Notion database present in your workspace.

You will need to install Node.js on your machine and create a `.env` file in the root directory of the project containing the following:

```
NOTION_TOKEN=your_key_here
NOTION_DATABASE_ID=your_key_here
GOOGLE_BOOKS_API_KEY=your_key_here
```

Replace every instance of `your_key_here` with the corresponding [Notion](https://developers.notion.com/) and [Google Books](https://developers.google.com/books/docs/overview) API keys. The `NOTION_DATABASE_ID` is a string of letters and numbers identifying the database in the URL. A short guide to finding this string can be found [here](https://stackoverflow.com/a/69860478).

## To Run
The program is currently configured to run using Node.js. Run the following command at the project's root directory to install dependencies from the `package.json` file:<br>

`npm install`

Then, to run the JavaScript file using the Node.js interpreter, run the following command:<br>

`node main.js '<book-title>'`<br>

Replace `'<book-title>'` with the title of the book you are looking to search for. Make sure to wrap the title in either single quotes or double quotes so the program can parse the command line arguments as intended.

## Screenshots
<p align="center">
    <img width=959px src="https://github.com/cadedupont/notion-bookshelf/assets/98860495/cbbcba3d-5b10-47dd-96d4-1789f7a8d1e5">
    <img src="https://github.com/cadedupont/notion-bookshelf/assets/98860495/71e62ec7-5fe6-41ee-bca6-b71310b0966c">
</p>
