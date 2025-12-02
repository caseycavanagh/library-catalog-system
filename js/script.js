let allBooks = [];

// Update header with current date/time
function updateDateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).toUpperCase();
    const timeStr = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    document.getElementById('dateTime').textContent = `${dateStr} ${timeStr}`;
}

// Update time immediately and then every minute
updateDateTime();
setInterval(updateDateTime, 60000);

async function fetchGoodreadsBooks() {
    const content = document.getElementById('catalogContent');
    content.innerHTML = '<div class="loading-container"><div class="spinner"></div><div class="loading-text">loading library...</div></div>';

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
        const shelf = item.querySelector('user_shelves')?.textContent || null;
        const bookId = item.querySelector('book_id')?.textContent || '';
        const readAt = item.querySelector('user_read_at')?.textContent || null;
        const coverImage = item.querySelector('book_large_image_url')?.textContent ||
                          item.querySelector('book_image_url')?.textContent ||
                          item.querySelector('book_medium_image_url')?.textContent || '';
        const reviewLink = item.querySelector('link')?.textContent ||
                          item.querySelector('guid')?.textContent || '';

        books.push({
            title: title,
            author: author,
            year: year,
            shelf: shelf,
            bookId: bookId,
            readAt: readAt,
            coverImage: coverImage,
            url: reviewLink || (bookId ? `https://www.goodreads.com/book/show/${bookId}` : '')
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

    // Currently Reading section - show only the most recent
    if (currentlyReading.length > 0) {
        html += '<div class="section-header">CURRENTLY READING</div>';
        html += '<div class="section-content">';
        html += renderBook(currentlyReading[0]);
        html += '</div>';
    }

    // Read section
    if (otherBooks.length > 0) {
        html += '<div class="section-header">RECENTLY READ</div>';
        html += '<div class="section-content">';
        html += otherBooks.map(book => renderBook(book)).join('');
        html += '</div>';
    }

    content.innerHTML = html;
}

function renderBook(book) {
    const url = book.url || '#';
    const coverImageHtml = book.coverImage
        ? `<img src="${book.coverImage}" alt="${book.title}" class="BookCover__image" />`
        : '';

    // Generate random positioning and rotation for each book cover
    const randomX = (Math.random() - 0.5) * 60; // -30% to +30%
    const randomY = (Math.random() - 0.5) * 40; // -20% to +20%
    const randomRotate = (Math.random() - 0.5) * 16; // -8deg to +8deg

    return `
        <a href="${url}"
           target="_blank"
           rel="noopener noreferrer"
           class="catalog-row"
           style="--random-x: ${randomX}%; --random-y: ${randomY}%; --random-rotate: ${randomRotate}deg;">
            <div class="book-title">${book.title}</div>
            <div class="book-meta">${book.author}</div>
            ${coverImageHtml}
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
