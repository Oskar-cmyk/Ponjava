function setLanguage(lang) {
    const elementsToTranslate = document.querySelectorAll(`[data-lang-${lang}]`);
    elementsToTranslate.forEach(element => {
        element.textContent = element.getAttribute(`data-lang-${lang}`);
    });

    // Save the language preference
    localStorage.setItem('language', lang);
}

window.onload = function() {
    const slButton = document.getElementById('slButton');
    const enButton = document.getElementById('enButton');

    slButton.addEventListener('click', () => setLanguage('sl'));
    enButton.addEventListener('click', () => setLanguage('en'));

    // Apply the saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        setLanguage(savedLanguage);
    }
}