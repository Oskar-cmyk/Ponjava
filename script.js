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

document.addEventListener('DOMContentLoaded', function () {
    // Get the modal
    var modal = document.getElementById("imageModal");

    // Get the Ponjava text element
    var ponjavaText = document.getElementById("text");

    // Show the modal on page load
    modal.style.display = "flex";

    // When the user clicks anywhere on the modal, close it
    modal.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks on the Ponjava text, show the modal
    ponjavaText.onclick = function() {
        modal.style.display = "flex";
    }
});



