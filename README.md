# 📚 Library Catalog System

> *Because sometimes the best way to organize books is to pretend it's 1985*

## What's This All About?

Remember those chunky library terminals from the 80s and 90s? The ones with the glowing amber screens and that satisfying *click-clack* of mechanical keyboards? This project is my love letter to those beautifully utilitarian systems.

I built this library catalog interface with a retro terminal aesthetic because honestly, modern UIs can be a bit... much sometimes. There's something peaceful about that amber-on-black color scheme, the monospace font, and the straightforward functionality. No flashy animations, no loading spinners that take 5 seconds to tell you nothing happened—just you and your books.

### What You Get

🖥️ **That Sweet Retro Look**
Amber text on black background with IBM Plex Mono. It's like stepping into a time machine, except you can actually use it on your phone.

🔍 **Search That Actually Works**
Type in any part of a title, author name, call number, or genre. Hit enter. Get results. Revolutionary, I know.

📱 **Works on Your Phone**
Because let's be real, you're probably browsing this on your phone right now. The layout adapts nicely to mobile devices.

📊 **Real Library Organization**
Complete with Dewey Decimal call numbers and status indicators (Available, Checked Out, On Hold). I'm a nerd for proper cataloging systems.

✨ **Little Details That Matter**
Hover effects, smooth transitions, and rounded corners that appear when you interact with books. It's the small things.

## Try It Out

Just open `index.html` in your browser. No npm install, no build process, no webpack configuration rabbit hole. This is as plug-and-play as it gets.

## The Tech Stack (AKA The Boring Part)

This is built with the holy trinity of web development:
- **HTML5** - For structure
- **CSS3** - Grid, Flexbox, and media queries for that responsive goodness
- **Vanilla JavaScript** - No frameworks, no libraries, just pure JS
- **IBM Plex Mono** - The font that makes everything look cooler

Zero dependencies. Zero build tools. Zero nonsense.

## How It's Organized

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

## Getting Started

Seriously, it's three steps:

1. **Grab the code**
   ```bash
   git clone https://github.com/caseycavanagh/library-catalog-system.git
   cd library-catalog-system
   ```

2. **Open it**
   ```bash
   open index.html
   ```
   Or just double-click `index.html`. We're not fancy here.

3. **That's it**
   No, really. That's it. There's no step 3.

## Using the Catalog

**Search:** Type anything into the search bar—title, author, genre, call number. Hit Enter or click that satisfying SEARCH button.

**Reset:** Want to see everything again? Click RESET. Mind-blowing, I know.

**Browse:** Scroll through the catalog. Hover over books to see the subtle animations (desktop only—we disabled hover effects on mobile because nobody likes accidental touches).

## Make It Your Own

Want to catalog your own books? Pop open `js/script.js` and add them to the `books` array:

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
    // Add your favorites here!
];
```

### Change the Colors

Not feeling the amber vibe? Fair enough. Edit the CSS variables in `css/styles.css`:
- `#0a0a0a` - That deep black background
- `#ffb000` - The signature amber text
- `#00ff00` - Green accents for status indicators

Go wild. Make it pink and purple. I won't judge (much).

## Browser Support

Works on anything modern:
- Chrome ✓
- Firefox ✓
- Safari ✓
- Edge ✓

If you're still using Internet Explorer... I admire your dedication to vintage computing, but maybe it's time to upgrade?

## Want to Contribute?

Found a bug? Got a cool idea? Want to add features I haven't thought of?

Feel free to:
- Open an issue
- Submit a pull request
- Fork it and make it your own

I'm pretty chill about contributions. Just keep the code clean and the vibe retro.

## License

MIT License - do whatever you want with this. Build something cool, learn something new, or just use it to catalog your cyberpunk novel collection. It's all good.

## The Story Behind This

I've always been fascinated by those old library terminals. There was something about their single-purpose design, the physicality of typing on those keyboards, and the way information was presented in such a straightforward manner. No popup ads, no newsletter signups, no "We value your privacy" cookie banners—just pure, functional design.

This project started as a weekend experiment and turned into a meditation on simplicity in web design. Sometimes less really is more.

**Shoutouts:**
- Classic library terminal systems for the inspiration
- IBM for the gorgeous Plex Mono font
- The cyberpunk aesthetic that never gets old
- Coffee, for obvious reasons

## What's Next?

Some things I'm thinking about adding (or you could add them yourself!):
- Proper pagination instead of just displaying everything
- Sorting options (by title, author, year, etc.)
- LocalStorage to save your catalog between sessions
- Export to CSV/JSON
- More advanced filtering
- Maybe a theme toggle? (But honestly, amber-on-black is perfect)

---

*Built with nostalgia and caffeine. Maintained with love for good design.*
