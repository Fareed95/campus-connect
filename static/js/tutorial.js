
// Function to toggle menu visibility
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    const icon = document.getElementById(menuId + 'Icon');
    
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        menu.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

// Function to show content and hide others
function showContent(contentId) {
    // Hide all content divs
    const allContent = document.querySelectorAll('main > div > div');
    allContent.forEach(content => {
        content.classList.add('hidden');
    });
    
    // Show the selected content
    const selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
    }
}

// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobileMenuButton');
const closeMobileMenuButton = document.getElementById('closeMobileMenu');
const mobileSidebar = document.getElementById('mobileSidebar');
const backdrop = document.getElementById('backdrop');

function openMobileMenu() {
    mobileSidebar.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileSidebar.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = 'auto';
}

mobileMenuButton.addEventListener('click', openMobileMenu);
closeMobileMenuButton.addEventListener('click', closeMobileMenu);
backdrop.addEventListener('click', closeMobileMenu);

// Close mobile menu when a link is clicked (handled in the onclick of each link)