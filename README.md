# Notion Bookshelf

JavaScript application to search Google Books API by book title and save the rest of the book information to a Notion database.

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Google Books API](https://developers.google.com/books/docs/v1/using) key
- [Notion API](https://developers.notion.com/) key
- Notion [account](https://www.notion.so/) and [database](https://www.notion.so/help/guides/creating-a-database)

## Downloading the Project

Either clone this repository by running the below command in your machine's terminal or download the source code as a ZIP.

```bash
$ git clone https://github.com/cadedupont/notion-bookshelf.git
```

Navigate to the root directory of the project:

```bash
$ cd /path/to/notion-bookshelf
```

## Setting Up API Keys

Once you have the source code, you will need to create a `.env` file in the root directory of the project. A `.env.example` file has been provided as a template with the following contents:

```bash
NOTION_TOKEN='your_key_here'
NOTION_DATABASE_ID='your_key_here'
GOOGLE_BOOKS_API_KEY='your_key_here'
```

Replace every instance of `your_key_here` with the appropriate value in your `.env` file.

### Notion API Key

To get your Notion API key, go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations) and click the `New integration` button. Give your integration a name and click `Submit`. You will then be provided with a `Internal Integration Token` that you can use as your `NOTION_TOKEN` value.

### Notion Database ID

To get your Notion database ID, go to the Notion page containing the database you want to use. Click the `...` button in the top right corner of the database, click `Copy link to view` near the bottom of the dropdown menu, and paste the link into your browser's address bar. The link will look something like this:

```bash
https://www.notion.so/1234567890abcdef1234567890abcdef?v=9876543210fedcba9876543210fedcba
```

The value before the `?v=` is your database ID. You can use this value as your `NOTION_DATABASE_ID` value. In this example, the database ID is `1234567890abcdef1234567890abcdef`.

You will also need to add your Notion integration to the database. To do this, click the `...` button in the top right corner of the page, click `Add connections` near the bottom of the dropdown menu, navigate to the name of your integration you chose earlier, and click it. You will be prompted for confirmation that this integration can access your page and its child pages. Click `Confirm`.

### Google Books API Key

To get your Google Books API key, go [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials) and click the `Create Credentials` button. Select `API Key` from the dropdown menu. You will then be provided with a string of characters that you can use as your `GOOGLE_BOOKS_API_KEY` value.

## Installing Dependencies

Once you have your API keys set up, you can install the project's dependencies by running the following command in your terminal:

```bash
$ npm install
```

## Running the Application

Once you install the requried dependencies, you are set to run the application. Run the following command in your terminal:

```bash
$ node notion-bookshelf.js '<book_title>'
```

Replace `<book_title>` with the title of the book you want to search for. The application will then search the Google Books API for the book title and save the book information to your Notion database.

## License

This project is licensed under the [MIT License](LICENSE).