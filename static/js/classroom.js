// ========== INITIALIZATION ==========

// Notes passed from Django template
let filteredNotes = [...notesData];

// Badge color mapping
const badgeColors = {
    "ECS": "badge-green",
    "COMPS": "badge-blue",
    "AIDS": "badge-purple",
    "IT": "badge-teal",
    "EXTC": "badge-orange",
    "MECH": "badge-red",
    "CIVIL": "badge-yellow",
    "DEFAULT": "badge-indigo"
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    renderNotes(filteredNotes);
    updateCounter();

    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(filterNotes, 300));
    }
});

// ========== RENDER NOTES ==========

function renderNotes(notes) {
    const notesGrid = document.getElementById('notesGrid');
    notesGrid.innerHTML = '';

    if (notes.length === 0) {
        notesGrid.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:#6b7280; padding:40px;">No notes found matching your criteria.</p>';
        return;
    }

    notes.forEach(note => {
        const card = document.createElement('div');
        card.className = 'note-card';
        card.setAttribute('data-branch', note.branch);
        card.setAttribute('data-subject', note.subject);
        card.setAttribute('data-semester', note.semester);
        card.setAttribute('data-author', note.name);

        const badgeClass = badgeColors[note.branch] || badgeColors.DEFAULT;

        card.innerHTML = `
            <div class="note-header">
                <span class="note-category-icon">📄</span>
                <span>${note.subject || "General"}</span>
            </div>
            <div class="note-title">${note.title}</div>
            <div class="note-subtitle">${note.description || ""}</div>
            <div class="note-meta">
                <span class="badge ${badgeClass}">${note.branch}</span>
                <span>📅 ${note.semester}</span>
                <span>👁️ ${note.views || 0} views</span>
            </div>
            <div class="note-footer">
                <div class="note-author">By: ${note.name}</div>
                ${note.driveLink ? `
                <div class="note-actions">
                    <a href="${note.driveLink}" target="_blank" class="view-btn">View</a>
                    <a href="${note.driveLink}" target="_blank" download class="download-btn">Download</a>
                </div>` : ''}
            </div>
        `;
        notesGrid.appendChild(card);
    });
}

// ========== FILTERING ==========

function filterNotes() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const branch = document.getElementById('branchFilter').value;
    const subject = document.getElementById('subjectFilter').value;
    const semester = document.getElementById('semesterFilter').value;
    const professor = document.getElementById('professorFilter').value;

    filteredNotes = notesData.filter(note => {
        const matchesSearch = searchTerm === '' ||
            (note.title && note.title.toLowerCase().includes(searchTerm)) ||
            (note.description && note.description.toLowerCase().includes(searchTerm)) ||
            (note.subject && note.subject.toLowerCase().includes(searchTerm)) ||
            (note.name && note.name.toLowerCase().includes(searchTerm));

        const matchesBranch = branch === '' || note.branch === branch;
        const matchesSubject = subject === '' || note.subject === subject;
        const matchesSemester = semester === '' || note.semester === semester;
        const matchesProfessor = professor === '' || note.name === professor;

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
    renderNotes(filteredNotes);
    updateCounter();
}

// Update counter
function updateCounter() {
    const counter = document.getElementById('noteCounter');
    counter.textContent = `Showing ${filteredNotes.length} of ${notesData.length} notes`;
}

// Debounce for search
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ========== DYNAMIC NOTE ADDITION (after upload) ==========

function addNote(note) {
    notesData.unshift(note);  // add new note at start
    filteredNotes = [...notesData];
    renderNotes(filteredNotes);
    updateCounter();
}

// Optional: handle click on View/Download buttons
function viewNote(link) {
    window.open(link, '_blank');
}

function downloadNote(link) {
    const a = document.createElement('a');
    a.href = link;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
