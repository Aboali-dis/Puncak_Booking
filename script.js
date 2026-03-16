// ===== نظام اللغات المتكامل =====
const translations = {
    en: {
        tagline: "Your gateway to villas, cars & tours in Puncak",
        welcome: "Welcome to Puncak",
        desc: "Book your villa, car, and enjoy your trip",
        villa: "Rent Villa",
        car: "Rent Car",
        tour: "Tours",
        others: "+ Other Services (Food, Shops...)",
        offer: "✨ Book Villa + Car and get 10% Discount",
        aboutTitle: "About Puncak Go",
        aboutText: "We are your partners in Puncak, providing the best tourism services with high quality.",
        home: "Home",
        terms: "Terms",
        history: "History",
        premium: "💎 Premium",
        currencyBtn: "💰 Currency"
    },
    ar: {
        tagline: "بوابتك للفلل، السيارات، والجولات في بونشاك",
        welcome: "مرحباً بك في بونشاك",
        desc: "احجز فيلتك، سيارتك، واستمتع برحلتك معنا",
        villa: "إيجار فلل",
        car: "تأجير سيارات",
        tour: "جولات سياحية",
        others: "+ خدمات أخرى (مطاعم، بقالات...)",
        offer: "✨ احجز فيلا + سيارة واحصل على خصم 10% ✨",
        aboutTitle: "عن Puncak Go",
        aboutText: "نحن رفاقكم في رحلتكم إلى بونشاك، نوفر لكم أفضل الخدمات السياحية لضمان راحة عائلاتكم.",
        home: "الرئيسية",
        terms: "الشروط",
        history: "السجل",
        premium: "💎 بريميوم",
        currencyBtn: "💰 صرف"
    },
    id: {
        tagline: "Gerbang Anda ke villa dan mobil di Puncak",
        welcome: "Selamat datang di Puncak",
        desc: "Pesan villa atau mobil dan nikmati perjalanan Anda",
        villa: "Sewa Villa",
        car: "Sewa Mobil",
        tour: "Tur Wisata",
        others: "+ Layanan Lain (Restoran, Toko...)",
        offer: "✨ Pesan Villa + Mobil dapat Diskon 10%",
        aboutTitle: "Tentang Puncak Go",
        aboutText: "Kami adalah mitra perjalanan Anda في Puncak, menyediakan layanan terbaik untuk Anda.",
        home: "Beranda",
        terms: "Syarat",
        history: "Riwayat",
        premium: "💎 Premium",
        currencyBtn: "💰 Mata Uang"
    }
};

function changeLanguage() {
    const lang = document.getElementById("language").value;
    const t = translations[lang];

    // تحديث النصوص في كل أنحاء الموقع
    document.getElementById("tagline").innerText = t.tagline;
    document.getElementById("welcome").innerText = t.welcome;
    document.getElementById("desc").innerText = t.desc;
    document.getElementById("txt-villa").innerText = t.villa;
    document.getElementById("txt-car").innerText = t.car;
    document.getElementById("txt-tour").innerText = t.tour;
    document.getElementById("txt-others").innerText = t.others;
    document.getElementById("offer").innerText = t.offer;
    document.getElementById("about-title").innerText = t.aboutTitle;
    document.getElementById("about-text").innerText = t.aboutText;
    
    // أزرار الهيدر
    document.querySelector(".premium-btn").innerText = t.premium;
    document.querySelector(".currency-btn").innerText = t.currencyBtn;

    // أزرار الشريط السفلي
    const navBtns = document.querySelectorAll(".bottom-nav p");
    navBtns[0].innerText = t.home;
    navBtns[1].innerText = t.terms;
    navBtns[2].innerText = t.history;

    // تغيير اتجاه الصفحة
    document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
}

// ===== نظام محول العملات ذكي =====
function toggleConverter() {
    const converter = document.getElementById("converter");
    converter.style.display = (converter.style.display === "block") ? "none" : "block";
}

document.getElementById("amount").oninput = function() {
    const amount = this.value;
    const result = document.getElementById("result");
    
    // أسعار صرف تقريبية مقابل الروبية الإندونيسية
    const rateSAR = 4100; // ريال سعودي
    const rateUSD = 15600; // دولار
    
    if (amount > 0) {
        let totalIDR = amount * rateSAR; 
        result.innerHTML = `SAR ${amount} ≈ <b>${totalIDR.toLocaleString()} IDR</b>`;
    } else {
        result.innerText = "النتيجة ستظهر هنا...";
    }
};

// إغلاق النافذة عند الضغط خارجها
window.onclick = function(event) {
    const modal = document.getElementById("converter");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
  
