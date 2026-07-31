const searchInput = document.getElementById('searchInput');
const bookCards = document.querySelectorAll('.book-card');

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    
    bookCards.forEach(card => {
        const title = card.querySelector('.book-title').textContent.toLowerCase();
        const author = card.querySelector('.book-author').textContent.toLowerCase();
        
        if (title.includes(term) || author.includes(term)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const genre = e.target.getAttribute('data-genre');
        
        bookCards.forEach(card => {
            const cardGenre = card.getAttribute('data-genre');
            if (genre === 'all' || cardGenre === genre) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

const modal = document.getElementById('bookModal');
const detailsButtons = document.querySelectorAll('.details-btn');
const closeBtn = document.querySelector('.close-btn');
const modalTitle = document.getElementById('modalTitle');
const orderActionBtn = document.getElementById('orderActionBtn');

detailsButtons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.book-card');
        const title = card.querySelector('.book-title').textContent;
        
        modalTitle.textContent = title;
        modal.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

orderActionBtn.addEventListener('click', () => {
    alert('Книгу успішно заброньовано! Очікуйте повідомлення.');
    modal.style.display = 'none';
});