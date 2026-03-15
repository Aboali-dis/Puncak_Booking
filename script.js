const translations = {
    ar: {
        welcome: "مرحباً بك في كوتا بونجا",
        promo: "✨ احصل على خصم 10% على جميع الخدمات ✨",
        villas: "إيجار فلل",
        cars: "تأجير سيارات",
        tours: "خدمات سياحية",
        others: "➕ خدمات أخرى (مطاعم، بقالات...)",
        premium: "بريميوم",
        curr: "صرف",
        home: "الهوم",
        history: "الهيستوري",
        modal: "خدمات إضافية"
    },
    en: {
        welcome: "Welcome to Kota Bunga",
        promo: "✨ Get 10% Off on All Services ✨",
        villas: "Rent Villas",
        cars: "Car Rental",
        tours: "Tour Services",
        others: "➕ Other Services (Food, Shops...)",
        premium: "Premium",
        curr: "Currency",
        home: "Home",
        history: "History",
        modal: "Extra Services"
    }
};

// تبديل اللغة
function changeLanguage() {
    const lang = document.getElementById('lang-select').value;
    const t = translations[lang];
    document.getElementById('welcome-title').innerText = t.welcome;
    document.getElementById('promo-text').innerText = t.promo;
    document.getElementById('srv-villas').innerText = t.villas;
    document.getElementById('srv-cars').innerText = t.cars;
    document.getElementById('srv-tours').innerText = t.tours;
    document.getElementById('btn-others').innerText = t.others;
    document.getElementById('txt-premium').innerText = t.premium;
    document.getElementById('txt-curr').innerText = t.curr;
    document.getElementById('nav-home').innerText = t.home;
    document.getElementById('nav-history').innerText = t.history;
    document.getElementById('modal-title').innerText = t.modal;
    document.getElementById('main-html').dir = (lang === 'ar') ? 'rtl' : 'ltr';
}

// السلايدر
let current = 0;
const slides = document.querySelectorAll('.slide');
function nextSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
}
setInterval(nextSlide, 7000);

// النافذة المنبثقة
function toggleOthers() {
    const m = document.getElementById('others-modal');
    m.style.display = (m.style.display === 'block') ? 'none' : 'block';
}
