# Library Catalog System v3.2

A retro-styled library catalog interface with a terminal/cyberpunk aesthetic. Features a clean, functional design inspired by classic library databases and terminal interfaces.

## Features

- **Retro Terminal Aesthetic**: Amber/orange text on black background with monospace font
- **Real-time Search**: Filter books by title, author, call number, or genre
- **Responsive Design**: Mobile-friendly layout that adapts to different screen sizes
- **Book Status Tracking**: Visual indicators for Available, Checked Out, and On Hold status
- **Dewey Decimal Classification**: Books organized using traditional library call numbers
- **Interactive UI**: Hover effects and smooth transitions

## Demo

Open `index.html` in your browser to see the catalog in action.

## Technologies Used

- HTML5
- CSS3 (Grid Layout, Flexbox, Media Queries)
- Vanilla JavaScript
- Google Fonts (IBM Plex Mono)

## Project Structure

```
library-catalog-system/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   └── script.js       # Catalog functionality
├── README.md           # Project documentation
├── LICENSE             # MIT License
└── .gitignore          # Git ignore rules
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/library-catalog-system.git
   ```

2. Navigate to the project directory:
   ```bash
   cd library-catalog-system
   ```

3. Open `index.html` in your web browser:
   ```bash
   open index.html
   # or
   firefox index.html
   # or simply double-click the file
   ```

No build process or dependencies required!

## Usage

### Search Functionality
- Use the search bar to filter books by title, author, call number, or genre
- Press Enter or click the SEARCH button to filter results
- Click RESET to show all books

### Customization

To add your own books, edit the `books` array in `js/script.js`:

```javascript
const books = [
    {
        callNumber: "813.6 GIB",
        title: "Neuromancer",
        author: "William Gibson",
        year: 1984,
        status: "Available",
        genre: "Cyberpunk",
        notes: "First ed. hardcover"
    },
    // Add more books here...
];
```

### Styling

Customize the color scheme by editing CSS variables in `css/styles.css`:
- Background: `#0a0a0a` (black)
- Primary text: `#ffb000` (amber)
- Accent color: `#00ff00` (green)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by classic library terminal systems
- Font: IBM Plex Mono by IBM
- Design aesthetic influenced by cyberpunk and retro computing

## Future Enhancements

- Working pagination
- Sorting functionality (by title, author, year)
- Local storage for book data persistence
- Export catalog to CSV/JSON
- Advanced filtering options
- Dark/light theme toggle
