function menucontrol() {
    let menubar = document.getElementById('menubar')
    menubar.classList.toggle('max-h-0')
    menubar.classList.toggle('max-h-[300px]')
}

let fixmenu = document.getElementById('fixmenu')
window.addEventListener("scroll",function() {
    if (window.scrollY >  window.innerHeight * 0.1) {
        fixmenu.classList.add('menubarfix')
    } else {
        fixmenu.classList.remove('menubarfix')
    }
})

let translations = {}

async function loadTranslations() {
    const response = await fetch('lang.json')
    translations = await response.json();
    const movcuddil = localStorage.getItem(('lang') || 'az');
    changeLang(movcuddil)
}

function changeLang(lang) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(item => {
        const key = item.getAttribute('data-key')

        if (translations[lang] && translations[lang][key]) {
            item.textContent = translations[lang][key]
        }
    })

    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang
}
loadTranslations()