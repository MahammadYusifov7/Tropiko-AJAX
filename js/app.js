function menucontrol() {
    let menubar = document.getElementById('menubar')
    menubar.classList.toggle('max-h-0')
    menubar.classList.toggle('max-h-[300px]')
}

let fixmenu = document.getElementById('fixmenu')
window.addEventListener("scroll", function () {
    if (window.scrollY > window.innerHeight * 0.1) {
        fixmenu.classList.add('menubarfix')
    } else {
        fixmenu.classList.remove('menubarfix')
    }
})

const content = document.getElementById('content')
const ajax = new XMLHttpRequest()
loadPage(window.location.hash.slice(1) || 'home')

function loadPage(page) {
    let file = `pages/${page}.htm`
    ajax.open('GET', file)
    ajax.send()

    ajax.onload = function () {
        content.innerHTML = this.response

        // 🔥 BURA ƏLAVƏ ET
        const lang = localStorage.getItem('lang') || 'en'
        changeLang(lang)
    }
}

let translations = {}

async function loadTranslations() {
    try {
        const response = await fetch('lang.json')
        translations = await response.json();

        const movcuddil = localStorage.getItem('lang') || 'az';
        changeLang(movcuddil)
    } catch (err) {
        console.error('Translation yüklənmədi:', err)
    }
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

// səhifə tam yüklənəndən sonra çağır
document.addEventListener('DOMContentLoaded', loadTranslations)