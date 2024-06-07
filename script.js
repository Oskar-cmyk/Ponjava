function setLanguage(lang) {
    // Update elements with specific translations
    const elementsToTranslate = document.querySelectorAll(`[data-lang-${lang}]`);
    elementsToTranslate.forEach(element => {
        // If it's a support element, handle it separately
        if (element.classList.contains('support')) {
            const text = element.getAttribute(`data-lang-${lang}`);
            const name = element.textContent.split(': ').slice(1).join(': ') || element.textContent;
            element.textContent = text + name;
        } else {
            element.textContent = element.getAttribute(`data-lang-${lang}`);
        }
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
