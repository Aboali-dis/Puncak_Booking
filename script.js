// ==========================================
// 1. قاعدة البيانات الشاملة
// ==========================================
const villas = [
    { id: 1, type: "VIP", name: { ar: "فيلا الرويال الملكية", en: "Royal VIP Villa", id: "Villa Royal VIP" }, price: 550, img: "img/v1.jpg", features: { ar: ["📍 إطلالة جبلية", "🏊 مسبح دافئ"], en: ["📍 Mountain View", "🏊 Heated Pool"] }, desc: { ar: "إطلالة جبلية خيالية وخصوصية تامة.", en: "Amazing mountain view." } },
    { id: 2, type: "Normal", name: { ar: "فيلا الطبيعة الهادئة", en: "Quiet Nature Villa", id: "Villa Alam Tenang" }, price: 220, img: "img/v3.jpg", features: { ar: ["🌳 وسط الأشجار", "🍳 مطبخ"], en: ["🌳 Among Trees", "🍳 Kitchen"] }, desc: { ar: "فيلا اقتصادية مريحة جداً.", en: "Economy villa, very comfortable." } }
];

const cars = [
    { id: 101, name: { ar: "تويوتا ألفارد (VIP)", en: "Toyota Alphard (VIP)", id: "Toyota Alphard (VIP)" }, price: 130, img: "img/c1.jpg", features: { ar: ["💺 6 مقاعد VIP", "👨‍✈️ سائق عربي"], en: ["💺 6 VIP Seats", "👨‍✈️ Arabic Driver"] }, desc: { ar: "فخامة مطلقة للعائلات.", en: "Ultimate luxury for families." } }
];

const toursData = [
    { id: 201, name: { ar: "حديقة سفاري إندونيسيا", en: "Taman Safari Indonesia", id: "Taman Safari Indonesia" }, price: 45, img: "img/t1.jpg", desc: { ar: "رؤية الحيوانات طليقة.", en: "See wild animals free." } }
];

const otherServices = [
    { id: 301, name: { ar: "توصيل من/إلى المطار", en: "Airport Transfer" }, price: 50, img: "img/airport.jpg", desc: { ar: "استقبال خاص بسيارة حديثة", en: "Private airport pickup" } },
    { id: 302, name: { ar: "توفير ذبائح", en: "Lamb/Sheep Provision" }, price: 200, img: "img/meat.jpg", desc: { ar: "ذبح وطبخ حسب الطلب", en: "Fresh lamb catering" } }
];

// ==========================================
// 2. كائن الترجمة لجميع عناصر الموقع
// ==========================================
const translations = {
    ar: {
        villaText: "فلل بونشاك",
        carText: "تأجير سيارات",
        tourText: "جولات سياحية",
        otherText: "خدمات أخرى",
        navHome: "الرئيسية",
        navTrip: "رحلتي",
        navProfile: "بروفايل",
        villasTitle: "قائمة الفلل",
        carTitle: "السيارات",
        tourTitle: "الجولات السياحية",
        tripTitle: "حجوزاتي",
        bookNow: "حجز الآن",
        total: "الإجمالي",
        payLabel: "طريقة الدفع:",
        days: "أيام",
        dir: "rtl",
        nameLabel: "الاسم الكامل:",
        fromLabel: "من تاريخ:",
        toLabel: "إلى تاريخ:",
        daysLabel: "عدد الأيام:",
        guestsLabel: "الأشخاص:",
        notesLabel: "ملاحظات خاصة:",
        confirmBtn: "إرسال للواتساب 🟢"
    },
    en: {
        villaText: "Puncak Villas",
        carText: "Car Rental",
        tourText: "Tours",
        otherText: "Others",
        navHome: "Home",
        navTrip: "My Trip",
        navProfile: "Profile",
        villasTitle: "Villa List",
        carTitle: "Cars",
        tourTitle: "Tour Packages",
        tripTitle: "My Bookings",
        bookNow: "Book Now",
        total: "Total",
        payLabel: "Payment:",
        days: "Days",
        dir: "ltr",
        nameLabel: "Full Name:",
        fromLabel: "From Date:",
        toLabel: "To Date:",
        daysLabel: "Days:",
        guestsLabel: "Guests:",
        notesLabel: "Special Notes:",
        confirmBtn: "Send to WhatsApp 🟢"
    }
};

let currentLang = "ar";
let currentSelectedItem = ""; 
let pricePerNight = 0;

// ==========================================
// 3. محرك تغيير اللغة
// ==========================================
function changeLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    // تحديث اتجاه الموقع
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;

    // تحديث نصوص القوائم والأزرار الرئيسية عبر الـ IDs
    const idsToUpdate = [
        "villaText", "carText", "tourText", "otherText", 
        "navHome", "navTrip", "navProfile", 
        "villasTitle", "carTitle", "tourTitle", "tripTitle"
    ];

    idsToUpdate.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = t[id];
    });

    // تحديث نصوص مودال الحجز
    const modalLabels = {
        "modalTitle": t.confirmBtn,
        "label-name": t.nameLabel,
        "label-from": t.fromLabel,
        "label-to": t.toLabel,
        "label-days": t.daysLabel,
        "label-guests": t.guestsLabel,
        "label-notes": t.notesLabel
    };

    for (let id in modalLabels) {
        const el = document.getElementById(id);
        if (el) el.innerText = modalLabels[id];
    }

    // تحديث البيانات المعروضة حالياً لتغيير لغتها فوراً
    updateCurrentView();
}

function updateCurrentView() {
    if (document.getElementById("villa-page").style.display === "block") filterVillas('VIP');
    if (document.getElementById("car-page").style.display === "block") displayItems(cars, 'car-container');
    if (document.getElementById("tour-page").style.display === "block") displayItems(toursData, 'tour-container');
    if (document.getElementById("other-page").style.display === "block") displayItems(otherServices, 'other-container');
}

// ==========================================
// 4. عرض العناصر
// ==========================================
function displayItems(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = data.map(item => `
        <div class="item-card">
            <img src="${item.img}" class="item-img" onerror="this.src='https://via.placeholder.com/400x200'">
            <div style="padding:15px;">
                <h3 style="color:var(--accent-gold);">${item.name[currentLang]}</h3>
                <p style="font-size:12px; color:#666;">${item.desc[currentLang]}</p>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                    <span class="price-tag">$${item.price}</span>
                    <button class="book-btn" onclick="booking('${item.name[currentLang]}', ${item.price})">${translations[currentLang].bookNow}</button>
                </div>
            </div>
        </div>
    `).join('');
}

function openPage(pageId) {
    document.querySelectorAll('#home-page, .full-page').forEach(p => p.style.display = 'none');
    const target = document.getElementById(pageId);
    if(target) target.style.display = 'block';
    updateCurrentView();
}

// ==========================================
// 5. نظام الحجز المطور
// ==========================================
function booking(name, price) {
    currentSelectedItem = name;
    pricePerNight = price;
    document.getElementById("selected-item-name").innerText = name;
    document.getElementById("booking-modal").style.display = "flex";
}

function calculateDays() {
    const from = new Date(document.getElementById('date-from').value);
    const to = new Date(document.getElementById('date-to').value);
    
    if (from && to && to > from) {
        const diffTime = Math.abs(to - from);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        document.getElementById('cust-days').value = diffDays;
        
        let total = diffDays * pricePerNight;
        if (diffDays >= 5) total *= 0.90;

        document.getElementById("selected-item-name").innerHTML = `
            ${currentSelectedItem} <br>
            <span style="color:#27ae60;">${translations[currentLang].total}: $${total.toFixed(0)}</span>
        `;
    }
}

function confirmBooking() {
    const name = document.getElementById("cust-name").value;
    const from = document.getElementById("date-from").value;
    const to = document.getElementById("date-to").value;
    const days = document.getElementById("cust-days").value;
    const pay = document.getElementById("pay-method").value;
    const notes = document.getElementById("cust-notes").value;

    if(!name || !from || !to || days <= 0) {
        alert(currentLang === 'ar' ? "يرجى إكمال البيانات" : "Please complete details");
        return;
    }

    const msg = `*طلب حجز جديد من بونشاك جو*%0A` +
                `📍 الخدمة: ${currentSelectedItem}%0A` +
                `👤 الاسم: ${name}%0A` +
                `📅 من: ${from} إلى: ${to}%0A` +
                `⏱️ المدة: ${days} ${translations[currentLang].days}%0A` +
                `💳 الدفع: ${pay}%0A` +
                `📝 ملاحظات: ${notes || '-'}`;

    window.open(`https://wa.me/628123456789?text=${msg}`, '_blank');
    closeBooking();
}

function closeBooking() { document.getElementById("booking-modal").style.display = "none"; }
function goHome() { 
    document.querySelectorAll('.full-page').forEach(p => p.style.display = 'none');
    document.getElementById("home-page").style.display = "block";
}

function filterVillas(type) {
    const btnVip = document.getElementById('btn-vip');
    const btnNormal = document.getElementById('btn-normal');
    if(btnVip) btnVip.classList.toggle('active', type === 'VIP');
    if(btnNormal) btnNormal.classList.toggle('active', type === 'Normal');
    displayItems(villas.filter(v => v.type === type), 'villa-container');
}

// ربط قائمة اختيار اللغة عند التشغيل
window.onload = () => {
    const langSelect = document.getElementById("language");
    if(langSelect) {
        langSelect.addEventListener("change", (e) => changeLanguage(e.target.value));
    }
    goHome();
};
     function saveItem(){

const name = document.getElementById("item-name").value;
const price = document.getElementById("item-price").value;
const type = document.getElementById("item-type").value;
const desc = document.getElementById("item-desc").value;

const files = document.getElementById("item-image").files;

let images = [];

for(let i = 0; i < files.length; i++){
    images.push(URL.createObjectURL(files[i]));
}

const newItem = {
    name: { ar: name, en: name },
    price: price,
    img: images[0],
    desc: { ar: desc, en: desc }
};

if(type === "villa"){
    villas.push(newItem);
    displayItems(villas, 'villa-container');
    openPage('villa-page');
}

if(type === "car"){
    cars.push(newItem);
    displayItems(cars, 'car-container');
    openPage('car-page');
}

if(type === "tour"){
    toursData.push(newItem);
    displayItems(toursData, 'tour-container');
    openPage('tour-page');
}

     }   
