const root = document.documentElement;
const toggleSwitch = document.getElementById('toggleSwitch');

// Function to apply light mode
function applyLightMode() {
    root.style.setProperty('--background', '#ffffff');
    root.style.setProperty('--background-secondary', '#ECECEC');
    root.style.setProperty('--black', '#000000');
    root.style.setProperty('--text', '#000000');
    root.style.setProperty('--text2', '#717171');
    root.style.setProperty('--primary', '#FFBC40');
    root.style.setProperty('--secondary', '#F2A310');
    root.style.setProperty('--tertiary', '#3457CA');
    root.style.setProperty('--primary-gradient', 'linear-gradient(120deg, #FFBC40, #F2A310)');
    root.style.setProperty('--announcement-banner-gradient', 'linear-gradient(90deg, #C12345, #C73C29)');
    root.style.setProperty('--accent-header', 'linear-gradient(120deg, #CA3470, #F2A310)');
    root.style.setProperty('--background-dark', '0');
    root.style.setProperty('--background-light', '1');
    root.style.setProperty('--nav-text', '#F2A310');
}

// Function to apply dark mode
function applyDarkMode() {
    root.style.setProperty('--background', '#0f0f0f');
    root.style.setProperty('--background-secondary', '#1E1E1E');
    root.style.setProperty('--black', '#000000');
    root.style.setProperty('--text', '#ffffff');
    root.style.setProperty('--text2', '#ffffff');
    root.style.setProperty('--primary', '#FFBC40');
    root.style.setProperty('--secondary', '#F2A310');
    root.style.setProperty('--tertiary', '#3457CA');
    root.style.setProperty('--primary-gradient', 'linear-gradient(120deg, #FFBC40, #F2A310)');
    root.style.setProperty('--announcement-banner-gradient', 'linear-gradient(90deg, #C12345, #C73C29)');
    root.style.setProperty('--accent-header', 'linear-gradient(120deg, #CA3470, #F2A310)');
    root.style.setProperty('--background-dark', '1');
    root.style.setProperty('--background-light', '0');
    root.style.setProperty('--nav-text', '#ffffff');
}

// Load saved switch state from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    toggleSwitch.checked = true;
    applyLightMode();
} else {
    toggleSwitch.checked = false;
    applyDarkMode();
}

// Toggle switch event listener
toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        applyLightMode();
        localStorage.setItem('theme', 'light');
    } else {
        applyDarkMode();
        localStorage.setItem('theme', 'dark');
    }
});