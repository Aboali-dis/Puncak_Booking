const translations = {
    ar: {
        welcome: "مرحباً بك في كوتا بونجا",
        promo: "✨ اطلب من بونشاك قو واحصل على خصم 10% من فاتورتك ✨",
        villas: "إيجار فلل",
        cars: "تأجير سيارات",
        tours: "خدمات سياحية",
        others: "➕ خدمات أخرى (مطاعم، بقالات...)",
        about_t: "عن Puncak Go",
        about_d: "نحن رفاقكم في رحلتكم إلى بونشاك، نوفر لكم أفضل الخدمات السياحية.",
        home: "الهوم",
        terms: "الشروط والاحكام",
        history: "الهيستوري"
    },
    en: {
        welcome: "Welcome to Kota Bunga",
        promo: "✨ Get 10% discount on your bill with Puncak Go ✨",
        villas: "Rent Villas",
        cars: "Car Rental",
        tours: "Tours",
        others: "➕ Other Services (Food, Shops...)",
        about_t: "About Puncak Go",
        about_d: "Your partner in Puncak, providing the best villas and travel services.",
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

// Slider logic
let cur = 0;
const slides = document.querySelectorAll('.slide');
setInterval(() => {
    slides[cur].classList.remove('active');
    cur = (cur + 1) % slides.length;
    slides[cur].classList.add('active');
}, 7000);

function toggleOthers() {
    const m = document.getElementById('others-modal');
    m.style.display = (m.style.display === 'block') ? 'none' : 'block';
}
