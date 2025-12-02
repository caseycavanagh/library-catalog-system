const books = [
    { callNumber: "813.6 GIB", title: "Neuromancer", author: "William Gibson", year: 1984, status: "Available", genre: "Cyberpunk", notes: "First ed. hardcover" },
    { callNumber: "302.2307 NOR", title: "The Design of Everyday Things", author: "Don Norman", year: 1988, status: "Checked Out", genre: "Design", notes: "Revised edition 2013" },
    { callNumber: "813.6 MOR", title: "Beloved", author: "Toni Morrison", year: 1987, status: "Available", genre: "Literary Fiction", notes: "Pulitzer Prize 1988" },
    { callNumber: "005.13 KNU", title: "The Art of Computer Programming Vol.1", author: "Donald Knuth", year: 1968, status: "On Hold", genre: "Computer Science", notes: "3rd edition" },
    { callNumber: "620.0042 LIU", title: "The Pragmatic Programmer", author: "David Thomas, Andrew Hunt", year: 1999, status: "Available", genre: "Technology", notes: "20th Anniversary Ed." },
    { callNumber: "814 DFW", title: "A Supposedly Fun Thing I'll Never Do Again", author: "David Foster Wallace", year: 1997, status: "Available", genre: "Essays", notes: "First printing" },
    { callNumber: "823.914 SMI", title: "Cryptonomicon", author: "Neal Stephenson", year: 1999, status: "Checked Out", genre: "Science Fiction", notes: "Historical fiction" },
    { callNumber: "530.11 HAW", title: "A Brief History of Time", author: "Stephen Hawking", year: 1988, status: "Available", genre: "Physics", notes: "Illustrated ed." },
    { callNumber: "796.334 PEL", title: "Pelé: My Life and the Beautiful Game", author: "Pelé", year: 1977, status: "Available", genre: "Biography", notes: "Autobiography" },
    { callNumber: "741.5973 COB", title: "Understanding Comics", author: "Scott McCloud", year: 1993, status: "On Hold", genre: "Art/Media", notes: "Graphic novel" },
    { callNumber: "006.3 HOP", title: "Gödel, Escher, Bach", author: "Douglas Hofstadter", year: 1979, status: "Checked Out", genre: "Philosophy", notes: "Pulitzer Prize 1980" },
    { callNumber: "070.92 ECO", title: "Foucault's Pendulum", author: "Umberto Eco", year: 1988, status: "Available", genre: "Literary Mystery", notes: "Italian original 1988" },
    { callNumber: "911 DIC", title: "Perdido Street Station", author: "China Miéville", year: 2000, status: "Available", genre: "Weird Fiction", notes: "Hugo Award nominee" },
    { callNumber: "813.54 POW", title: "Neuromancer: Pattern Recognition", author: "William Gibson", year: 2003, status: "Checked Out", genre: "Cyberpunk", notes: "UK first ed." },
    { callNumber: "005.133 STR", title: "Effective C++", author: "Scott Meyers", year: 1992, status: "Available", genre: "Programming", notes: "50 ways to improve" }
];

let allBooks = [...books];

function renderCatalog(booksToRender) {
    const content = document.getElementById('catalogContent');
    content.innerHTML = booksToRender.map((book, index) => `
        <div class="catalog-row" data-index="${index}"
             data-label-callnumber="CALL #: "
             data-label-title="TITLE: "
             data-label-author="AUTHOR: "
             data-label-year="YEAR: "
             data-label-status="STATUS: "
             data-label-genre="GENRE: "
             data-label-notes="NOTES: ">
            <div class="call-number">${book.callNumber}</div>
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="year">${book.year}</div>
            <div class="status ${book.status.toLowerCase().replace(' ', '-')}">${book.status}</div>
            <div class="genre">${book.genre}</div>
            <div class="genre">${book.notes}</div>
        </div>
    `).join('');
    document.getElementById('recordCount').textContent = booksToRender.length;
}

function filterCatalog() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (!searchTerm) {
        renderCatalog(allBooks);
        return;
    }

    const filtered = allBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.callNumber.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm)
    );
    renderCatalog(filtered);
}

function resetSearch() {
    document.getElementById('searchInput').value = '';
    renderCatalog(allBooks);
}

document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        filterCatalog();
    }
});

renderCatalog(allBooks);
