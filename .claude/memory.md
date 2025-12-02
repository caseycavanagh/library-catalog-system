# Casey's Catalog - Project Memory

## Project Overview
This is Casey Cavanagh's personal library catalog system that displays books from their Goodreads account in a clean, terminal-style interface.

## User Information
- **Name**: Casey Cavanagh
- **Goodreads User ID**: 36960444-casey-cavanagh
- **Project Title**: Casey's Catalog

## Technical Details

### Architecture
- Static HTML/CSS/JavaScript application
- Fetches data dynamically from Goodreads RSS feed
- Uses CORS proxy (api.allorigins.win) to bypass browser restrictions
- Must be served via local web server (not file://)

### Key Files
- `index.html` - Main page with "Casey's Catalog" branding
- `js/script.js` - Fetches and parses Goodreads RSS feed
- `js/books.json` - Backup/fallback data (not currently used)
- `css/styles.css` - Terminal-style monospace design

### Data Source
- **Live Feed**: `https://www.goodreads.com/review/list_rss/36960444-casey-cavanagh?shelf=%23ALL%23`
- **Shelves**: All books (currently-reading, to-read, read, etc.)
- **Data Fields**: title, author, year, rating (1-5), shelf

### Running the Server
```bash
python3 -m http.server 8000
```
Then visit: http://localhost:8000

### Features
- Real-time sync with Goodreads account
- Search functionality (by title, author, or shelf)
- Clean terminal aesthetic with IBM Plex Mono font
- Displays: book title, author, year, rating (stars), shelf classification

## Design Philosophy
- Minimalist, terminal-inspired interface
- Monospace typography
- Dynamic data (no manual updates needed)
- Fast, simple, functional
