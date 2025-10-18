
// Campus Connect - Login JavaScript

// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.querySelector('.login-btn');
const googleBtn = document.getElementById('googleSignIn');

// Form validation patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordMinLength = 6;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Add real-time validation
  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input', validatePassword);
  
  // Handle form submission
  loginForm.addEventListener('submit', handleFormSubmit);
  
  // Handle Google sign-in
  googleBtn.addEventListener('click', handleGoogleSignIn);
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
  
  // Check if user is already logged in (from localStorage)
  checkExistingLogin();
});

// Email validation
function validateEmail() {
  const email = emailInput.value.trim();
  const isValid = emailPattern.test(email);
  
  toggleInputError(emailInput, !isValid && email.length > 0, 'Please enter a valid email address');
  
  return isValid;
}

// Password validation
function validatePassword() {
  const password = passwordInput.value;
  const isValid = password.length >= passwordMinLength;
  
  toggleInputError(passwordInput, !isValid && password.length > 0, 
    `Password must be at least ${passwordMinLength} characters long`);
  
  return isValid;
}

// Toggle input error state
function toggleInputError(input, hasError, message) {
  const errorElement = input.parentNode.querySelector('.error-message');
  
  if (hasError) {
    input.classList.add('error');
    if (!errorElement) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message show';
      errorDiv.textContent = message;
      input.parentNode.appendChild(errorDiv);
    } else {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  } else {
    input.classList.remove('error');
    if (errorElement) {
      errorElement.classList.remove('show');
    }
  }
}

// Handle form submission
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  // Validate all fields
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  
  if (!isEmailValid || !isPasswordValid) {
    showMessage('Please fix the errors above', 'error');
    return;
  }
  
  // Show loading state
  setLoadingState(true);
  
  try {
    // Simulate API call (replace with actual authentication)
    const success = await authenticateUser(email, password);
    
    if (success) {
      // Store login info (in a real app, use secure tokens)
      localStorage.setItem('campus_connect_user', JSON.stringify({
        email: email,
        loginTime: new Date().toISOString()
      }));
      
      showMessage('Login successful! Redirecting...', 'success');
      
      // Redirect after a short delay
      setTimeout(() => {
        window.location.href = 'dashboard/';
      }, 1500);
      
    } else {
      showMessage('Invalid email or password. Please try again.', 'error');
    }
    
  } catch (error) {
    console.error('Login error:', error);
    showMessage('An error occurred. Please try again later.', 'error');
  } finally {
    setLoadingState(false);
  }
}

// Simulate authentication (replace with real API call)
async function authenticateUser(email, password) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Demo credentials (remove in production)
  const validCredentials = [
    { email: 'student@college.edu', password: 'student123' },
    { email: 'professor@college.edu', password: 'prof123' },
    { email: 'admin@college.edu', password: 'admin123' }
  ];
  
  // Check if credentials match (in production, this would be server-side)
  return validCredentials.some(cred => 
    cred.email === email && cred.password === password
  );
}

// Handle Google Sign-in
async function handleGoogleSignIn() {
  setLoadingState(true, 'google');
  
  try {
    // In a real app, this would integrate with Google OAuth
    // For demo purposes, we'll simulate the process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate successful Google authentication
    const googleUser = {
      email: 'user@gmail.com',
      name: 'Demo User',
      picture: 'https://via.placeholder.com/150',
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('campus_connect_user', JSON.stringify(googleUser));
    
    showMessage('Google sign-in successful! Redirecting...', 'success');
    
    setTimeout(() => {
      window.location.href = 'dashboard/';
    }, 1500);
    
  } catch (error) {
    console.error('Google sign-in error:', error);
    showMessage('Google sign-in failed. Please try again.', 'error');
  } finally {
    setLoadingState(false, 'google');
  }
}

// Set loading state
function setLoadingState(isLoading, type = 'regular') {
  if (type === 'google') {
    googleBtn.disabled = isLoading;
    googleBtn.style.opacity = isLoading ? '0.6' : '1';
    googleBtn.innerHTML = isLoading ? 
      '<div style="width: 20px; height: 20px; border: 2px solid #ccc; border-top: 2px solid #666; border-radius: 50%; animation: spin 1s linear infinite;"></div> Signing in...' :
      '<img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="google-icon" /><span>Sign in with Google</span>';
  } else {
    loginBtn.disabled = isLoading;
    loginBtn.textContent = isLoading ? 'Signing in...' : 'Login';
    loginForm.classList.toggle('loading', isLoading);
  }
}

// Show success/error messages
function showMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector('.success-message, .error-message-global');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  const messageDiv = document.createElement('div');
  messageDiv.className = type === 'success' ? 'success-message show' : 'error-message-global show';
  messageDiv.textContent = message;
  
  if (type === 'error') {
    messageDiv.style.cssText = `
      background-color: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: 0.875rem;
    `;
  }
  
  // Insert message at the top of the form
  loginForm.insertBefore(messageDiv, loginForm.firstChild);
  
  // Auto-remove error messages after 5 seconds
  if (type === 'error') {
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }
}

// Check if user is already logged in
function checkExistingLogin() {
  const savedUser = localStorage.getItem('campus_connect_user');
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      const loginTime = new Date(user.loginTime);
      const now = new Date();
      const daysSinceLogin = (now - loginTime) / (1000 * 60 * 60 * 24);
      
      // Auto-login if logged in within the last 7 days
      if (daysSinceLogin < 7) {
        showMessage('Welcome back! Redirecting to dashboard...', 'success');
        setTimeout(() => {
          window.location.href = 'dashboard/';
        }, 1500);
      }
    } catch (error) {
      // Clear invalid stored data
      localStorage.removeItem('campus_connect_user');
    }
  }
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
  // Enter key to submit form when inputs are focused
  if (e.key === 'Enter' && (document.activeElement === emailInput || document.activeElement === passwordInput)) {
    e.preventDefault();
    loginForm.dispatchEvent(new Event('submit'));
  }
  
  // Escape key to clear form
  if (e.key === 'Escape') {
    clearForm();
  }
}

// Clear form data
function clearForm() {
  emailInput.value = '';
  passwordInput.value = '';
  
  // Clear any error states
  document.querySelectorAll('.form-input').forEach(input => {
    input.classList.remove('error');
  });
  
  document.querySelectorAll('.error-message').forEach(error => {
    error.classList.remove('show');
  });
  
  // Remove any global messages
  const messages = document.querySelectorAll('.success-message, .error-message-global');
  messages.forEach(msg => msg.remove());
}

// Demo data display (for development)
function showDemoCredentials() {
  const demoInfo = `
    Demo Credentials:
    • student@college.edu / student123
    • professor@college.edu / prof123
    • admin@college.edu / admin123
  `;
  
  console.log(demoInfo);
  
  // Optional: Show demo credentials on page (remove for production)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const demoDiv = document.createElement('div');
    demoDiv.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: #1f2937;
      color: white;
      padding: 10px;
      border-radius: 8px;
      font-size: 0.75rem;
      white-space: pre-line;
      z-index: 1000;
      max-width: 200px;
    `;
    demoDiv.textContent = 'Demo Credentials:\n• student@college.edu\n  student123\n• professor@college.edu\n  prof123';
    document.body.appendChild(demoDiv);
    
    // Hide after 10 seconds
    setTimeout(() => {
      if (demoDiv.parentNode) {
        demoDiv.remove();
      }
    }, 10000);
  }
}

// Initialize demo credentials display
showDemoCredentials();

// Utility functions
function isValidEmail(email) {
  return emailPattern.test(email);
}

function sanitizeInput(input) {
  return input.trim().replace(/[<>]/g, '');
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateEmail,
    validatePassword,
    isValidEmail,
    sanitizeInput
  };
}