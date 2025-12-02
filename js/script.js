let allBooks = [];

async function fetchGoodreadsBooks() {
    const content = document.getElementById('catalogContent');
    content.innerHTML = '<div class="book-title">loading library...</div>';

    const goodreadsUserId = '36960444-casey-cavanagh';
    const rssUrl = `https://www.goodreads.com/review/list_rss/${goodreadsUserId}?shelf=%23ALL%23`;

    // Try multiple CORS proxies
    const proxies = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
        `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`,
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`
    ];

    for (let proxyUrl of proxies) {
        try {
            console.log(`Trying proxy: ${proxyUrl}`);
            const response = await fetch(proxyUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/xml, text/xml, */*'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const xmlText = await response.text();
            allBooks = parseGoodreadsRSS(xmlText);
            console.log(`Loaded ${allBooks.length} books from Goodreads`);

            renderCatalog(allBooks);
            return; // Success, exit the function
        } catch (error) {
            console.error(`Proxy failed:`, error);
            // Continue to next proxy
        }
    }

    // If all proxies fail, show error
    content.innerHTML = `<div class="book-title">Error: Could not fetch from Goodreads. Check console for details.</div>`;
}

function parseGoodreadsRSS(xmlText) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const items = xmlDoc.querySelectorAll('item');

    const books = [];
    items.forEach(item => {
        const title = item.querySelector('title')?.textContent || '';
        const author = item.querySelector('author_name')?.textContent || '';
        const year = item.querySelector('book_published')?.textContent || null;
        const rating = item.querySelector('user_rating')?.textContent || '0';
        const shelf = item.querySelector('user_shelves')?.textContent || null;
        const bookId = item.querySelector('book_id')?.textContent || '';

        books.push({
            title: title,
            author: author,
            year: year,
            rating: rating,
            shelf: shelf,
            bookId: bookId,
            url: bookId ? `https://www.goodreads.com/book/show/${bookId}` : ''
        });
    });

    return books;
}

function renderCatalog(booksToRender) {
    const content = document.getElementById('catalogContent');

    if (booksToRender.length === 0) {
        content.innerHTML = '<div class="book-title">No books found</div>';
        return;
    }

    // Separate books by shelf
    const currentlyReading = booksToRender.filter(book =>
        book.shelf && book.shelf.includes('currently-reading')
    );
    const otherBooks = booksToRender.filter(book =>
        (!book.shelf || !book.shelf.includes('currently-reading')) &&
        (!book.shelf || !book.shelf.includes('to-read'))
    );

    let html = '';

    // Currently Reading section
    if (currentlyReading.length > 0) {
        html += '<div class="section-header">CURRENTLY READING</div>';
        html += '<div class="section-content">';
        html += currentlyReading.map(book => renderBook(book)).join('');
        html += '</div>';
    }

    // Read section
    if (otherBooks.length > 0) {
        html += '<div class="section-header">READ</div>';
        html += '<div class="section-content">';
        html += otherBooks.map(book => renderBook(book)).join('');
        html += '</div>';
    }

    content.innerHTML = html;
}

function renderBook(book) {
    let meta = book.author;
    if (book.year) meta += ` · ${book.year}`;
    if (book.rating && book.rating !== '0') meta += ` · *${book.rating}`;

    const url = book.url || '#';

    return `
        <a href="${url}" target="_blank" rel="noopener noreferrer" class="catalog-row">
            <div class="book-title">${book.title}</div>
            <div class="book-meta">${meta}</div>
        </a>
    `;
}

function filterCatalog() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // First filter out "to-read" books
    let booksToShow = allBooks.filter(book =>
        !book.shelf || !book.shelf.includes('to-read')
    );

    // Then apply search filter if there's a search term
    if (searchTerm) {
        booksToShow = booksToShow.filter(book =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            (book.shelf && book.shelf.toLowerCase().includes(searchTerm))
        );
    }

    renderCatalog(booksToShow);
}

document.getElementById('searchInput').addEventListener('input', filterCatalog);

// Fetch books on load
fetchGoodreadsBooks();
