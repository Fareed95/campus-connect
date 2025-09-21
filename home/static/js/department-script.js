
// Campus Connect - JavaScript

// Enhanced sample data with uploader information
const notes = [
  { 
    id: 1,
    title: "Machine Learning Fundamentals", 
    branch: "ECS", 
    subject: "Machine Learning", 
    semester: "6th", 
    professor: "Dr. Sharma",
    uploaderName: "Dr. Sharma",
    uploaderType: "professor",
    email: true, 
    preview: "https://via.placeholder.com/300x200/2d6cdf/ffffff?text=ML+Notes",
    uploadDate: "2024-01-15",
    views: 245
  },
  { 
    id: 2,
    title: "Engineering Mathematics - Calculus", 
    branch: "COMPS", 
    subject: "Mathematics", 
    semester: "1st", 
    professor: "Prof. Singh",
    uploaderName: "Rahul Kumar",
    uploaderType: "student",
    email: false, 
    preview: "https://via.placeholder.com/300x200/22c55e/ffffff?text=Math+Notes",
    uploadDate: "2024-01-20",
    views: 189
  },
  { 
    id: 3,
    title: "Artificial Intelligence Concepts", 
    branch: "AIDS", 
    subject: "Artificial Intelligence", 
    semester: "5th", 
    professor: "Dr. Mehta",
    uploaderName: "Dr. Mehta",
    uploaderType: "professor",
    email: true, 
    preview: "https://via.placeholder.com/300x200/8b5cf6/ffffff?text=AI+Notes",
    uploadDate: "2024-02-01",
    views: 321
  },
  { 
    id: 4,
    title: "Data Structures and Algorithms", 
    branch: "COMPS", 
    subject: "Data Structures", 
    semester: "3rd", 
    professor: "Prof. Kumar",
    uploaderName: "Priya Sharma",
    uploaderType: "student",
    email: true, 
    preview: "https://via.placeholder.com/300x200/f59e0b/ffffff?text=DSA+Notes",
    uploadDate: "2024-02-05",
    views: 412
  },
  { 
    id: 5,
    title: "Database Management Systems", 
    branch: "ECS", 
    subject: "DBMS", 
    semester: "4th", 
    professor: "Dr. Patel",
    uploaderName: "Dr. Patel",
    uploaderType: "professor",
    email: true, 
    preview: "https://via.placeholder.com/300x200/ef4444/ffffff?text=DBMS+Notes",
    uploadDate: "2024-02-10",
    views: 298
  },
  { 
    id: 6,
    title: "Computer Networks Basics", 
    branch: "AIDS", 
    subject: "Computer Networks", 
    semester: "5th", 
    professor: "Prof. Singh",
    uploaderName: "Arjun Patel",
    uploaderType: "student",
    email: false, 
    preview: "https://via.placeholder.com/300x200/06b6d4/ffffff?text=Networks",
    uploadDate: "2024-02-15",
    views: 167
  },
  { 
    id: 7,
    title: "Operating Systems Concepts", 
    branch: "COMPS", 
    subject: "Operating Systems", 
    semester: "4th", 
    professor: "Dr. Sharma",
    uploaderName: "Dr. Sharma",
    uploaderType: "professor",
    email: true, 
    preview: "https://via.placeholder.com/300x200/84cc16/ffffff?text=OS+Notes",
    uploadDate: "2024-02-18",
    views: 234
  },
  { 
    id: 8,
    title: "Web Development Complete Guide", 
    branch: "ECS", 
    subject: "Web Development", 
    semester: "6th", 
    professor: "Prof. Kumar",
    uploaderName: "Sneha Singh",
    uploaderType: "student",
    email: true, 
    preview: "https://via.placeholder.com/300x200/ec4899/ffffff?text=Web+Dev",
    uploadDate: "2024-02-22",
    views: 356
  }
];

// DOM Elements
const grid = document.getElementById('notesGrid');
const countSpan = document.getElementById('count');
const totalSpan = document.getElementById('total');
const searchInput = document.getElementById('search');
const branchSelect = document.getElementById('branch');
const subjectSelect = document.getElementById('subject');
const semesterSelect = document.getElementById('semester');
const professorSelect = document.getElementById('professor');
const resetBtn = document.getElementById('reset');

// Uploader type elements
const studentTypeRadio = document.getElementById('studentType');
const professorTypeRadio = document.getElementById('professorType');
const studentFields = document.getElementById('studentFields');
const professorFields = document.getElementById('professorFields');

// Current filtered data
let currentNotes = [...notes];
let currentFilters = {
  search: '',
  branch: '',
  subject: '',
  semester: '',
  professor: ''
};

// Render Notes with animation and enhanced badges
function renderNotes(list) {
  if (list.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <h3>No notes found</h3>
        <p>Try adjusting your filters or search terms</p>
      </div>
    `;
    countSpan.textContent = '0';
    return;
  }

  grid.innerHTML = "";
  list.forEach((note, index) => {
    const noteCard = document.createElement('div');
    noteCard.className = 'note-card';
    noteCard.style.animationDelay = `${index * 0.1}s`;
    
    // Create uploader info with appropriate badges
    let uploaderInfo = '';
    if (note.uploaderType === 'professor') {
      uploaderInfo = `By: ${note.uploaderName} <span class="badge professor">👨‍🏫 Professor</span>`;
    } else {
      uploaderInfo = `By: ${note.uploaderName} <span class="badge student">🎓 Student</span>`;
      if (note.email) {
        uploaderInfo += ` <span class="badge">✓ Verified</span>`;
      }
    }
    
    noteCard.innerHTML = `
      <div class="note-preview">
        <img src="${note.preview}" alt="${note.title}" onerror="this.style.display='none'; this.parentNode.innerHTML='<div>📄 ${note.subject}</div>';">
      </div>
      <div class="note-content">
        <div class="note-title">${note.title}</div>
        <div class="note-meta">
          <span class="meta-item">📚 ${note.branch}</span>
          <span class="meta-item">📖 Sem ${note.semester}</span>
          <span class="meta-item">👁️ ${note.views} views</span>
        </div>
        <div class="note-prof">
          ${uploaderInfo}
        </div>
        <div class="note-actions">
          <button class="view-btn" onclick="viewNote(${note.id})">View Note</button>
          <button class="download-btn" onclick="downloadNote(${note.id})">Download</button>
        </div>
      </div>
    `;
    
    grid.appendChild(noteCard);
  });
  
  countSpan.textContent = list.length;
}

// Get filtered options based on current selections
function getFilteredOptions(filterType) {
  let filteredNotes = [...notes];
  
  // Apply all filters except the current one
  Object.keys(currentFilters).forEach(key => {
    if (key !== filterType && currentFilters[key]) {
      if (key === 'search') {
        filteredNotes = filteredNotes.filter(note => 
          note.title.toLowerCase().includes(currentFilters[key].toLowerCase()) ||
          note.subject.toLowerCase().includes(currentFilters[key].toLowerCase()) ||
          note.professor.toLowerCase().includes(currentFilters[key].toLowerCase()) ||
          note.uploaderName.toLowerCase().includes(currentFilters[key].toLowerCase())
        );
      } else {
        filteredNotes = filteredNotes.filter(note => note[key] === currentFilters[key]);
      }
    }
  });
  
  return [...new Set(filteredNotes.map(note => note[filterType]))].sort();
}

// Update dropdown options dynamically
function updateDropdown(selectElement, options, currentValue) {
  const currentSelection = currentValue || selectElement.value;
  selectElement.innerHTML = `<option value="">All ${selectElement.id.charAt(0).toUpperCase() + selectElement.id.slice(1)}s</option>`;
  
  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    if (option === currentSelection) {
      opt.selected = true;
    }
    selectElement.appendChild(opt);
  });
  
  // Add visual feedback for active filters
  if (currentSelection) {
    selectElement.classList.add('filter-active');
  } else {
    selectElement.classList.remove('filter-active');
  }
}

// Update all dropdowns based on current filters
function updateAllDropdowns() {
  const branches = getFilteredOptions('branch');
  const subjects = getFilteredOptions('subject');
  const semesters = getFilteredOptions('semester');
  const professors = getFilteredOptions('professor');

  updateDropdown(branchSelect, branches, currentFilters.branch);
  updateDropdown(subjectSelect, subjects, currentFilters.subject);
  updateDropdown(semesterSelect, semesters, currentFilters.semester);
  updateDropdown(professorSelect, professors, currentFilters.professor);
}

// Apply all filters
function applyFilters() {
  currentNotes = notes.filter(note => {
    const matchesSearch = !currentFilters.search || 
      note.title.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
      note.subject.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
      note.professor.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
      note.uploaderName.toLowerCase().includes(currentFilters.search.toLowerCase());
    
    const matchesBranch = !currentFilters.branch || note.branch === currentFilters.branch;
    const matchesSubject = !currentFilters.subject || note.subject === currentFilters.subject;
    const matchesSemester = !currentFilters.semester || note.semester === currentFilters.semester;
    const matchesProfessor = !currentFilters.professor || note.professor === currentFilters.professor;
    
    return matchesSearch && matchesBranch && matchesSubject && matchesSemester && matchesProfessor;
  });
  
  renderNotes(currentNotes);
  updateAllDropdowns();
}

// Uploader type toggle functionality
function toggleUploaderFields() {
  const isStudent = studentTypeRadio.checked;
  const isProfessor = professorTypeRadio.checked;
  
  if (isStudent) {
    studentFields.classList.add('active');
    professorFields.classList.remove('active');
    document.getElementById('studentName').required = true;
    document.getElementById('professorName').required = false;
  } else if (isProfessor) {
    professorFields.classList.add('active');
    studentFields.classList.remove('active');
    document.getElementById('professorName').required = true;
    document.getElementById('studentName').required = false;
  }
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
  currentFilters.search = e.target.value.trim();
  if (currentFilters.search) {
    searchInput.classList.add('filter-active');
  } else {
    searchInput.classList.remove('filter-active');
  }
  applyFilters();
});

branchSelect.addEventListener('change', (e) => {
  currentFilters.branch = e.target.value;
  applyFilters();
});

subjectSelect.addEventListener('change', (e) => {
  currentFilters.subject = e.target.value;
  applyFilters();
});

semesterSelect.addEventListener('change', (e) => {
  currentFilters.semester = e.target.value;
  applyFilters();
});

professorSelect.addEventListener('change', (e) => {
  currentFilters.professor = e.target.value;
  applyFilters();
});

// Uploader type event listeners
studentTypeRadio.addEventListener('change', toggleUploaderFields);
professorTypeRadio.addEventListener('change', toggleUploaderFields);

// Reset all filters
resetBtn.addEventListener('click', () => {
  currentFilters = {
    search: '',
    branch: '',
    subject: '',
    semester: '',
    professor: ''
  };
  
  searchInput.value = '';
  searchInput.classList.remove('filter-active');
  
  currentNotes = [...notes];
  renderNotes(currentNotes);
  updateAllDropdowns();
});

// Note actions
function viewNote(id) {
  const note = notes.find(n => n.id === id);
  
  if (note.driveLink) {
    // Open Google Drive link in new tab
    const viewUrl = note.driveLink.includes('/edit') 
      ? note.driveLink.replace('/edit', '/preview')
      : note.driveLink + '/preview';
    window.open(viewUrl, '_blank');
    
    // Show info message
    setTimeout(() => {
      alert(`📖 Opening: ${note.title}\n\n🔗 This file is hosted on Google Drive.\nIf you can't view it, the owner may need to check sharing permissions.`);
    }, 500);
  } else {
    alert(`📖 Opening: ${note.title}\n\nThis would normally open the uploaded file or start download.`);
  }
  
  // Simulate view count increment
  note.views += 1;
  renderNotes(currentNotes);
}

function shareNote(id) {
  const note = notes.find(n => n.id === id);
  const shareUrl = `https://campusconnect.edu/note/${id}`;
  
  if (navigator.share) {
    navigator.share({
      title: note.title,
      text: `Check out these ${note.subject} notes by ${note.uploaderName}`,
      url: shareUrl
    });
  } else {
    // Fallback to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Share link copied to clipboard!');
    }).catch(() => {
      alert(`Share this note: ${shareUrl}`);
    });
  }
}

function downloadNote(id) {
  const note = notes.find(n => n.id === id);
  
  if (note.driveLink) {
    // Convert Google Drive link to direct download URL
    let downloadUrl = note.driveLink;
    
    // Handle different Google Drive URL formats for download
    if (downloadUrl.includes('/file/d/')) {
      // Extract file ID and create download link
      const fileId = note.driveId;
      downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    } else if (downloadUrl.includes('docs.google.com')) {
      // For Google Docs/Sheets/Slides, use export URL
      if (downloadUrl.includes('/document/')) {
        downloadUrl = downloadUrl.replace('/edit', '/export?format=pdf');
      } else if (downloadUrl.includes('/spreadsheets/')) {
        downloadUrl = downloadUrl.replace('/edit', '/export?format=xlsx');
      } else if (downloadUrl.includes('/presentation/')) {
        downloadUrl = downloadUrl.replace('/edit', '/export?format=pptx');
      }
    }
    
    // Open download URL in new tab
    const downloadWindow = window.open(downloadUrl, '_blank');
    
    // Show download info
    setTimeout(() => {
      alert(`📥 Downloading: ${note.title}\n\n💡 If download doesn't start automatically:\n• Check if popup blocker is enabled\n• The file owner may need to adjust sharing permissions\n• Try the "View Note" button to access the file directly`);
    }, 500);
    
    // Increment download count (you could track this separately from views)
    note.views += 1;
    renderNotes(currentNotes);
    
  } else {
    // For regular uploaded files (though we removed this option)
    alert(`📥 Downloading: ${note.title}\n\nStarting download...`);
  }
}

function uploadNotes() {
  document.getElementById('uploadModal').classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  // Initialize uploader fields
  toggleUploaderFields();
}

// Google Drive link validation and preview
const driveLink = document.getElementById('driveLink');
driveLink.addEventListener('input', function() {
  const link = this.value.trim();
  const drivePreview = document.getElementById('drivePreview');
  
  // Remove existing preview
  if (drivePreview) {
    drivePreview.remove();
  }

  if (link && isValidGoogleDriveLink(link)) {
    const preview = document.createElement('div');
    preview.id = 'drivePreview';
    preview.className = 'drive-preview';
    preview.innerHTML = `
      <div class="drive-preview-title">✅ Valid Google Drive Link Detected</div>
      <div class="drive-preview-url">${link}</div>
    `;
    this.parentNode.appendChild(preview);
    this.style.borderColor = '#22c55e';
  } else if (link) {
    this.style.borderColor = '#ef4444';
  } else {
    this.style.borderColor = '#ccc';
  }
});

function isValidGoogleDriveLink(url) {
  const drivePatterns = [
    /^https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
    /^https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/,
    /^https:\/\/docs\.google\.com\/presentation\/d\/([a-zA-Z0-9_-]+)/,
    /^https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/
  ];
  
  return drivePatterns.some(pattern => pattern.test(url));
}

function extractGoogleDriveId(url) {
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /\/document\/d\/([a-zA-Z0-9_-]+)/,
    /\/presentation\/d\/([a-zA-Z0-9_-]+)/,
    /\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function closeUploadModal() {
  document.getElementById('uploadModal').classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
  document.getElementById('uploadForm').reset();
  
  // Remove drive preview
  const drivePreview = document.getElementById('drivePreview');
  if (drivePreview) drivePreview.remove();
  
  // Reset link styling
  driveLink.style.borderColor = '#ccc';
  
  // Reset uploader fields
  studentTypeRadio.checked = true;
  toggleUploaderFields();
}

// Form submission
function submitUpload(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  const originalText = submitBtn.textContent;
  
  // Get uploader type and name
  const uploaderType = document.querySelector('input[name="uploaderType"]:checked').value;
  const uploaderName = uploaderType === 'student' 
    ? document.getElementById('studentName').value.trim()
    : document.getElementById('professorName').value.trim();
  
  if (!uploaderName) {
    alert('Please enter your name');
    return;
  }
  
  // Get form data
  const formData = {
    title: document.getElementById('noteTitle').value,
    branch: document.getElementById('noteBranch').value,
    semester: document.getElementById('noteSemester').value,
    subject: document.getElementById('noteSubject').value,
    description: document.getElementById('noteDescription').value,
    uploaderType: uploaderType,
    uploaderName: uploaderName,
    uploadMethod: 'drive'
  };

  // Validate Google Drive link
  const driveUrl = document.getElementById('driveLink').value.trim();
  if (!driveUrl) {
    alert('Please provide a Google Drive link');
    return;
  }
  if (!isValidGoogleDriveLink(driveUrl)) {
    alert('❌ Please provide a valid Google Drive link.\n\nMake sure it follows one of these formats:\n• https://drive.google.com/file/d/...\n• https://docs.google.com/document/d/...\n• https://docs.google.com/presentation/d/...');
    return;
  }
  
  formData.driveLink = driveUrl;
  formData.driveId = extractGoogleDriveId(driveUrl);

  // Show loading state
  submitBtn.textContent = 'Processing Link...';
  submitBtn.disabled = true;

  // Simulate processing (replace with actual API call to save metadata)
  setTimeout(() => {
    // Create new note object
    const newNote = {
      id: notes.length + 1,
      title: formData.title,
      branch: formData.branch,
      subject: formData.subject,
      semester: formData.semester,
      professor: formData.uploaderType === 'professor' ? formData.uploaderName : 'Course Material',
      uploaderName: formData.uploaderName,
      uploaderType: formData.uploaderType,
      email: formData.uploaderType === 'professor' || Math.random() > 0.7, // Professors always verified, students 30% chance
      preview: `https://via.placeholder.com/300x200/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=${encodeURIComponent(formData.subject.slice(0, 8))}`,
      uploadDate: new Date().toISOString().split('T')[0],
      views: 0,
      uploadMethod: 'drive',
      driveLink: formData.driveLink,
      driveId: formData.driveId
    };

    // Add to notes array
    notes.push(newNote);
    
    // Update display
    if (!currentFilters.search && !currentFilters.branch && !currentFilters.subject && 
        !currentFilters.semester && !currentFilters.professor) {
      currentNotes = [...notes];
      renderNotes(currentNotes);
    }
    updateAllDropdowns();
    totalSpan.textContent = notes.length;

    // Reset form and close modal
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    closeUploadModal();
    
    // Show success message with appropriate message based on uploader type
    let successMessage;
    if (formData.uploaderType === 'professor') {
      successMessage = `🎉 Official notes "${formData.title}" uploaded successfully!\n\n✅ Your upload has been verified as professor material.\n👨‍🏫 Special professor badge applied.\n📚 Students can now access your official course material.\n\n💡 Your uploads get priority display and special verification.`;
    } else {
      successMessage = `🎉 Notes "${formData.title}" shared successfully!\n\n✅ Your Google Drive link has been verified and saved.\n🎓 Student badge applied to your upload.\n📚 Other students can now access your notes.\n\n💡 Tip: Make sure your Drive file permissions allow "Anyone with the link can view"`;
    }
    
    alert(successMessage);
    
  }, 1200); // Fast processing for Drive links
}

// Close modal when clicking outside
document.getElementById('uploadModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeUploadModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && document.getElementById('uploadModal').classList.contains('active')) {
    closeUploadModal();
  }
});

// Initialize the application
function init() {
  totalSpan.textContent = notes.length;
  updateAllDropdowns();
  renderNotes(notes);
}

// Start the app
init();

// Add some real-time features
setInterval(() => {
  // Simulate new notes being added (in a real app, this would be WebSocket updates)
  const randomNote = notes[Math.floor(Math.random() * notes.length)];
  if (Math.random() > 0.95) { // 5% chance every interval
    randomNote.views += Math.floor(Math.random() * 3) + 1;
    if (currentNotes.includes(randomNote)) {
      renderNotes(currentNotes);
    }
  }
}, 10000); // Check every 10 seconds