// Load notes from localStorage only (no sample data)
function loadAllNotes() {
    const uploadedNotes = JSON.parse(localStorage.getItem('campusNotes')) || [];
    
    // Return only uploaded notes (no sample data)
    return uploadedNotes;
}

let notesData = loadAllNotes();

// Store filtered results
let filteredNotes = [...notesData];

// Badge color mapping
const badgeColors = {
    "ECS": "badge-green",
    "COMPS": "badge-blue",
    "AIDS": "badge-purple",
    "MECH": "badge-red",
    "CIVIL": "badge-yellow",
    "DEFAULT": "badge-indigo"
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Reload notes from localStorage
    notesData = loadAllNotes();
    filteredNotes = [...notesData];
    
    // Check if just uploaded
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('uploaded') === 'success') {
        // Show success notification
        showUploadSuccess();
        // Clean URL
        window.history.replaceState({}, '', 'index.html');
    }
    
    renderNotes(notesData);
    updateCounter();
    
    // Add search functionality
    document.getElementById('searchInput').addEventListener('input', debounce(filterNotes, 300));
});

// Show upload success notification
function showUploadSuccess() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = '✓ Note uploaded successfully!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Render notes cards
function renderNotes(notes) {
    const notesGrid = document.getElementById('notesGrid');
    notesGrid.innerHTML = '';
    
    if (notes.length === 0) {
        notesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #6b7280; padding: 40px;">No notes found matching your criteria.</p>';
        return;
    }
    
    notes.forEach(note => {
        const card = createNoteCard(note);
        notesGrid.appendChild(card);
    });
}

// Create individual note card
function createNoteCard(note) {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.setAttribute('data-id', note.id);
    
    const badgeClass = badgeColors[note.branch] || 'badge-blue';
    
    card.innerHTML = `
        <div class="note-header">
            <span class="note-category-icon">📄</span>
            <span>${note.category}</span>
        </div>
        <div class="note-title">${note.title}</div>
        <div class="note-subtitle">${note.subtitle}</div>
        <div class="note-meta">
            <span class="badge ${badgeClass}">${note.branch}</span>
            <span>📅 ${note.semester}</span>
            <span>👁️ ${note.views} views</span>
        </div>
        <div class="note-footer">
            <div class="note-author">
                By: ${note.author} ${note.verified ? '🎓' : ''}
            </div>
            <div class="note-actions">
                <button class="view-btn" onclick="viewNote(${note.id})">View Note</button>
                <button class="download-btn" onclick="downloadNote(${note.id})">Download</button>
            </div>
        </div>
    `;
    
    return card;
}

// Filter notes based on all criteria
function filterNotes() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const branch = document.getElementById('branchFilter').value;
    const subject = document.getElementById('subjectFilter').value;
    const semester = document.getElementById('semesterFilter').value;
    const professor = document.getElementById('professorFilter').value;
    
    filteredNotes = notesData.filter(note => {
        const matchesSearch = searchTerm === '' || 
            note.title.toLowerCase().includes(searchTerm) ||
            note.subtitle.toLowerCase().includes(searchTerm) ||
            note.category.toLowerCase().includes(searchTerm) ||
            note.author.toLowerCase().includes(searchTerm);
            
        const matchesBranch = branch === '' || note.branch === branch;
        const matchesSubject = subject === '' || note.category === subject;
        const matchesSemester = semester === '' || note.semester === semester;
        const matchesProfessor = professor === '' || note.author === professor;
        
        return matchesSearch && matchesBranch && matchesSubject && matchesSemester && matchesProfessor;
    });
    
    renderNotes(filteredNotes);
    updateCounter();
}

// Reset all filters
function resetFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('branchFilter').value = '';
    document.getElementById('subjectFilter').value = '';
    document.getElementById('semesterFilter').value = '';
    document.getElementById('professorFilter').value = '';
    
    filteredNotes = [...notesData];
    renderNotes(notesData);
    updateCounter();
}

// Update note counter
function updateCounter() {
    const counter = document.getElementById('noteCounter');
    counter.textContent = `Showing ${filteredNotes.length} of ${notesData.length} notes`;
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// View note function
function viewNote(noteId) {
    const note = notesData.find(n => n.id === noteId);
    if (note) {
        alert(`Opening note: ${note.title}\n\nThis will open the note viewer page.`);
        // In production: window.location.href = `view-note.html?id=${noteId}`;
    }
}

// Download note function
function downloadNote(noteId) {
    const note = notesData.find(n => n.id === noteId);
    if (note) {
        if (note.driveLink) {
            // Open Google Drive link
            window.open(note.driveLink, '_blank');
        } else {
            alert(`Downloading: ${note.title}\n\nThis will trigger the download.`);
            // In production: Implement actual download logic
        }
    }
}

// Redirect to upload page
function redirectToUpload() {
    window.location.href = 'upload.html';
}

// ========== BACKEND INTEGRATION FUNCTIONS ==========

// Function to add new note (called when someone uploads)
function addNote(newNote) {
    // Generate new ID
    const newId = notesData.length > 0 ? Math.max(...notesData.map(n => n.id)) + 1 : 1;
    
    const note = {
        id: newId,
        category: newNote.category || "General",
        title: newNote.title,
        subtitle: newNote.subtitle || "",
        branch: newNote.branch,
        semester: newNote.semester,
        views: 0,
        author: newNote.author,
        verified: newNote.verified || false
    };
    
    // Add to beginning of array (newest first)
    notesData.unshift(note);
    filteredNotes = [...notesData];
    
    // Re-render and update counter
    renderNotes(filteredNotes);
    updateCounter();
    
    return note;
}

// Function to load notes from backend
async function loadNotesFromBackend() {
    try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/notes');
        const data = await response.json();
        
        notesData = data;
        filteredNotes = [...notesData];
        renderNotes(notesData);
        updateCounter();
    } catch (error) {
        console.error('Error loading notes:', error);
    }
}

// Function to handle Google Drive upload
async function uploadFromGoogleDrive(fileData) {
    try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/upload/google-drive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fileData)
        });
        
        const newNote = await response.json();
        addNote(newNote);
        
        return newNote;
    } catch (error) {
        console.error('Error uploading from Google Drive:', error);
        throw error;
    }
}