// 1. قاموس اللغات - هنا نضع كل نصوص الموقع
const translations = {
    ar: {
        welcome: "مرحباً بك في كوتا بونجا",
        promo: "✨ اطلب من بونشاك قو واحصل على خصم 10% من فاتورتك ✨",
        villas: "إيجار فلل",
        cars: "تأجير سيارات",
        tours: "خدمات سياحية",
        others: "➕ خدمات أخرى (مطاعم، بقالات، طباخ...)",
        curr: "صرف",
        premium: "بريميوم",
        home: "الهوم",
        history: "الهيستوري",
        footer: "Puncak Go - جميع الحقوق محفوظة 2026",
        terms: "الشروط والأحكام"
    },
    en: {
        welcome: "Welcome to Kota Bunga",
        promo: "✨ Order from Puncak Go and get 10% discount on your bill ✨",
        villas: "Rent Villas",
        cars: "Car Rental",
        tours: "Tour Services",
        others: "➕ Other Services (Restaurants, Groceries...)",
        curr: "Currency",
        premium: "Premium",
        home: "Home",
        history: "History",
        footer: "Puncak Go - All Rights Reserved 2026",
        terms: "Terms & Conditions"
    },
    id: {
        welcome: "Selamat Datang di Kota Bunga",
        promo: "✨ Pesan dari Puncak Go dan dapatkan diskon 10% ✨",
        villas: "Sewa Villa",
        cars: "Sewa Mobil",
        tours: "Layanan Wisata",
        others: "➕ Layanan Lain (Restoran, Toko...)",
        curr: "Kurs",
        premium: "Premium",
        home: "Beranda",
        history: "Riwayat",
        footer: "Puncak Go - Hak Cipta Dilindungi 2026",
        terms: "Syarat & Ketentuan"
    }
};

// 2. وظيفة تغيير اللغة
function changeLanguage() {
    const lang = document.getElementById('lang-select').value;
    const t = translations[lang];

    // تغيير النصوص بناءً على الـ ID
    document.getElementById('welcome-title').innerText = t.welcome;
    document.getElementById('promo-text').innerText = t.promo;
    document.getElementById('srv-villas').innerText = t.villas;
    document.getElementById('srv-cars').innerText = t.cars;
    document.getElementById('srv-tours').innerText = t.tours;
    document.getElementById('btn-others').innerText = t.others;
    document.getElementById('txt-curr').innerText = t.curr;
    document.getElementById('txt-premium').innerText = t.premium;
    document.getElementById('nav-home').innerText = t.home;
    document.getElementById('nav-history').innerText = t.history;
    document.getElementById('txt-footer').innerText = t.footer;
    document.getElementById('txt-terms').innerText = t.terms;

    // تغيير اتجاه الصفحة (RTL للعربي)
    document.getElementById('main-html').dir = (lang === 'ar') ? 'rtl' : 'ltr';
}

// 3. نظام السلايدر (تغيير الصور كل 7 ثوانٍ)
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(nextSlide, 7000); // 7000 مللي ثانية = 7 ثواني

// 4. وظائف التنقل (فتح الأقسام)
function openSection(section) {
    console.log("Opening section: " + section);
    // هنا سنبرمج لاحقاً ظهور قوائم الفلل والسيارات VIP والعادي
    if(section === 'villas') {
        alert("سيتم فتح قسم الفلل (VIP والعادي) الآن...");
    }
}

function goHome() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
