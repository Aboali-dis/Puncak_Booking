const translations = {
    ar: {
        welcome: "مرحباً بك في كوتا بونجا",
        promo: "✨ اطلب من بونشاك قو واحصل على خصم 10% من فاتورتك ✨",
        villas: "إيجار فلل",
        cars: "تأجير سيارات",
        tours: "خدمات سياحية",
        others: "➕ خدمات أخرى (مطاعم، بقالات، طباخ...)",
        about_t: "عن Puncak Go",
        about_d: "نحن رفاقكم في رحلتكم إلى بونشاك، نوفر لكم أفضل الفلل والسيارات والخدمات السياحية بأعلى معايير الجودة والاحترافية لضمان راحة عائلاتكم.",
        home: "الهوم",
        terms: "الشروط والاحكام",
        history: "الهيستوري"
    },
    en: {
        welcome: "Welcome to Kota Bunga",
        promo: "✨ Order from Puncak Go and get 10% discount ✨",
        villas: "Rent Villas",
        cars: "Car Rental",
        tours: "Tour Services",
        others: "➕ Other Services (Restaurants, Shops...)",
        about_t: "About Puncak Go",
        about_d: "Your partner in Puncak, providing luxury villas and professional travel services for your family comfort.",
        home: "Home",
        terms: "Terms",
        history: "History"
    }
};

function changeLanguage() {
    const lang = document.getElementById('lang-select').value;
    const t = translations[lang];
    document.getElementById('welcome-title').innerText = t.welcome;
    document.getElementById('promo-text').innerText = t.promo;
    document.getElementById('srv-villas').innerText = t.villas;
    document.getElementById('srv-cars').innerText = t.cars;
    document.getElementById('srv-tours').innerText = t.tours;
    document.getElementById('btn-others').innerText = t.others;
    document.getElementById('about-title').innerText = t.about_t;
    document.getElementById('about-desc').innerText = t.about_d;
    document.getElementById('nav-home').innerText = t.home;
    document.getElementById('nav-terms').innerText = t.terms;
    document.getElementById('nav-history').innerText = t.history;
    document.getElementById('main-html').dir = (lang === 'ar') ? 'rtl' : 'ltr';
}

// Slider
let current = 0;
const slides = document.querySelectorAll('.slide');
setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
}, 7000);

function toggleOthers() {
    const m = document.getElementById('modal-others');
    m.style.display = (m.style.display === 'block') ? 'none' : 'block';
}
