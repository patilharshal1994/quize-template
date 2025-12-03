// FAQ Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    setupFAQSearch();
    setupCategoryFilter();
});

// Setup FAQ Search
function setupFAQSearch() {
    const searchInput = document.getElementById('faqSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        accordionItems.forEach(item => {
            const question = item.querySelector('.accordion-button').textContent.toLowerCase();
            const answer = item.querySelector('.accordion-body').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        // If search is cleared, show all items
        if (searchTerm === '') {
            accordionItems.forEach(item => {
                item.style.display = 'block';
            });
        }
    });
}

// Setup Category Filter
function setupCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter accordion items
            accordionItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Clear search when filtering
            const searchInput = document.getElementById('faqSearch');
            if (searchInput) {
                searchInput.value = '';
            }
        });
    });
}

