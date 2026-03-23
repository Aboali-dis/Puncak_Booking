// ==================== 1️⃣ قاعدة بيانات الفلل ====================
const allVillas = [];
const villaPrices = [500, 1000, 1500, 2000];

for (let i = 1; i <= 20; i++) {
    let price = villaPrices[Math.floor(Math.random() * villaPrices.length)];
    allVillas.push({
        id: i,
        name_ar: `فيلا بونشاك الملكية ${i}`,
        name_en: `Puncak Royal Villa ${i}`,
        price: price,
        x: Math.floor(Math.random() * 600) + 100,
        y: Math.floor(Math.random() * 500) + 100,
        imgs: ["webbackground.jpg"], 
        specs_ar: ["مسبح خاص فخم", "إطلالة مباشرة على الجبل", "خدمة تنظيف يومية"],
        specs_en: ["Luxury Private Pool", "Direct Mountain View", "Daily Cleaning Service"]
    });
}

// ==================== 2️⃣ إعداد الخريطة ====================
var map = L.map('image-map', { crs: L.CRS.Simple, minZoom: -1 });
var bounds = [[0, 0], [800, 750]]; 
L.imageOverlay('villasbackground.png', bounds).addTo(map);
map.fitBounds(bounds);

let villaMarkers = [];
let activeVilla = null;

// ==================== 3️⃣ الترجمة ====================
const translations = {
    ar: { 
        villas: "فلل بونشاك", cars: "تأجير سيارات", tours: "جولات سياحية", others: "خدمات أخرى", 
        home: "الرئيسية", choose: "اختر الفيلا", back: "⬅ عودة", details: "التفاصيل والحجز", 
        all: "الكل", ticker: "⚡ عروض Puncak Go: خصم 10% على الحجوزات الطويلة! استمتع بالطبيعة ⚡", dir: "rtl" 
    },
    en: { 
        villas: "Puncak Villas", cars: "Car Rental", tours: "Tours", others: "Others", 
        home: "Home", choose: "Choose Villa", back: "⬅ Back", details: "View Details", 
        all: "All", ticker: "⚡ Puncak Go Offers: 10% Off on long stays! Enjoy the nature ⚡", dir: "ltr" 
    }
};

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    const t = translations[lang];
    document.body.style.direction = t.dir;

    const elements = ['txt-ticker', 'txt-villas', 'txt-cars', 'txt-tours', 'txt-others', 'btn-back', 'txt-choose-villa', 'filter-all', 'nav-home'];
    elements.forEach(id => {
        let el = document.getElementById(id);
        if(el) el.innerText = t[id.replace('txt-', '').replace('btn-', '').replace('nav-', '')] || el.innerText;
    });

    const villasPage = document.getElementById('villas-page');
    if (villasPage && villasPage.classList.contains('active')) {
        renderVillas();
    }
}

// ==================== 4️⃣ التنقل بين الصفحات ====================
function showVillas() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('villas-page').classList.add('active');
    setTimeout(() => { map.invalidateSize(); map.fitBounds(bounds); }, 300);
    renderVillas('all');
}

function showHome() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('home-page').classList.add('active');
    const container = document.getElementById('villas-list-container');
    if(container) container.innerHTML = '';
}

function showCars() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('cars-page').classList.add('active');
    renderCars();
}

// ==================== 5️⃣ قاعدة بيانات السيارات ====================
const allCars = [];
for (let i = 1; i <= 15; i++) {
    allCars.push({
        id: i,
        name: `سيارة ${i}`,
        imgs: ["car1.jpg","car2.jpg","car3.jpg"],
        specs: ["موديل: 2023","لون: أسود","عدد الركاب: 5","نوع الوقود: بنزين"],
        basePrice: 300
    });
}
let driverOption = 'no'; // القيمة الافتراضية: بدون سائق
// عند تغيير الاختيار
document.getElementById('driver-no').addEventListener('click', function(){
    driverOption = 'no';
    filterCarsByDriver();
});
document.getElementById('driver-yes').addEventListener('click', function(){
    driverOption = 'yes';
    filterCarsByDriver();
});

document.getElementById('driver-yes').addEventListener('change', function() {
    if(this.checked){
        driverOption = 'yes';
        filterCarsByDriver();
    }
});
let selectedCar = null;
const carIndexes = {};

// ==================== 6️⃣ عرض السيارات ====================
function renderCars() {
    const container = document.getElementById('cars-list-container');
    container.innerHTML = '';
    allCars.forEach(car => {
        const card = document.createElement('div');
        card.style.border = '1px solid #ddd';
        card.style.borderRadius = '12px';
        card.style.background = '#fff';
        card.style.overflow = 'hidden';

        const slider = `
        <div style="position:relative;">
            <img id="car-img-${car.id}" src="${car.imgs[0]}" style="width:100%; height:180px; object-fit:cover;">
            <button onclick="nextCarImg(${car.id})" style="position:absolute; right:10px; top:50%;">›</button>
            <button onclick="prevCarImg(${car.id})" style="position:absolute; left:10px; top:50%;">‹</button>
        </div>`;

        const specs = `<ul style="padding:10px; font-size:14px;">${car.specs.map(s=>`<li>${s}</li>`).join('')}</ul>`;

        card.innerHTML = `
            ${slider}
            <div style="padding:10px;">
                <h3>${car.name}</h3>
                ${specs}
                <button onclick="openCarOrder(${car.id})" style="width:100%; padding:10px; background:#27ae60; color:#fff; border:none; border-radius:8px;">احجز الآن</button>
            </div>
        `;
        container.appendChild(card);
    });
}
function filterCarsByDriver() {
    const container = document.getElementById('cars-list-container');
    container.innerHTML = '';

    // كل السيارات حسب اختيار السائق
    const carsToShow = driverOption === 'yes' ? allCars.slice(0, 8) : allCars.slice(0, 7);

    carsToShow.forEach(car => {
        const card = document.createElement('div');
        card.style.border = '1px solid #ddd';
        card.style.borderRadius = '12px';
        card.style.background = '#fff';
        card.style.overflow = 'hidden';

        const slider = `
        <div style="position:relative;">
            <img id="car-img-${car.id}" src="${car.imgs[0]}" style="width:100%; height:180px; object-fit:cover;">
            <button onclick="nextCarImg(${car.id})" style="position:absolute; right:10px; top:50%;">›</button>
            <button onclick="prevCarImg(${car.id})" style="position:absolute; left:10px; top:50%;">‹</button>
        </div>`;

        const specs = `<ul style="padding:10px; font-size:14px;">${car.specs.map(s=>`<li>${s}</li>`).join('')}</ul>`;

        card.innerHTML = `
            ${slider}
            <div style="padding:10px;">
                <h3>${car.name}</h3>
                ${specs}
                <button onclick="openCarOrder(${car.id})" style="width:100%; padding:10px; background:#27ae60; color:#fff; border:none; border-radius:8px;">احجز الآن</button>
            </div>
        `;
        container.appendChild(card);
    });
}
function nextCarImg(id){
    const car = allCars.find(c=>c.id===id);
    carIndexes[id] = (carIndexes[id]||0)+1;
    if(carIndexes[id]>=car.imgs.length) carIndexes[id]=0;
    document.getElementById(`car-img-${id}`).src = car.imgs[carIndexes[id]];
}

function prevCarImg(id){
    const car = allCars.find(c=>c.id===id);
    carIndexes[id] = (carIndexes[id]||0)-1;
    if(carIndexes[id]<0) carIndexes[id]=car.imgs.length-1;
    document.getElementById(`car-img-${id}`).src = car.imgs[carIndexes[id]];
}

// ==================== 7️⃣ حجز السيارات ====================
function openCarOrder(id) {
    // اختر السيارة المحددة
    selectedCar = allCars.find(c => c.id === id);
    if (!selectedCar) return;

    // عرض اسم السيارة في الفورم
    document.getElementById('order-car-name').innerText = selectedCar.name;

    // إعادة ضبط الفورم وإظهاره
    const form = document.getElementById('order-form-container-cars');
    form.style.display = 'block';

    // التواريخ الافتراضية: اليوم
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('order-car-from').value = today;
    document.getElementById('order-car-to').value = today;

    // إعادة حساب السعر الإجمالي
    updateCarTotal();

    // تمرير الصفحة تلقائياً لأسفل حتى يظهر الفورم
    form.scrollIntoView({ behavior: 'smooth' });
}

function renderCarSlider(){
    const slider = document.getElementById('car-slider');
    slider.innerHTML = '';
    selectedCar.imgs.forEach(img=>{
        const imgEl = document.createElement('img');
        imgEl.src=img;
        imgEl.style.width='100%';
        imgEl.style.height='150px';
        imgEl.style.objectFit='cover';
        imgEl.style.marginRight='5px';
        slider.appendChild(imgEl);
    });
}

function updateCarTotal(){
    if(!selectedCar) return;

    let total = selectedCar.basePrice;

    const from = new Date(document.getElementById('order-car-from').value);
    const to = new Date(document.getElementById('order-car-to').value);
    let days = Math.ceil((to-from)/(1000*60*60*24));
    if(days<1) days = 1;

    // تكلفة السائق
    const driver = driverOption === 'yes';
    if(driver) total += 100;

    // السعر النهائي حسب الأيام
    total *= days;

    document.getElementById('total-car-price').innerText = total + ' IDR';
}

function sendCarToWhatsApp(){
    if(!selectedCar) return;

    const name = document.getElementById('order-car-name-input').value;
    const phone = document.getElementById('order-car-phone').value;
    const from = document.getElementById('order-car-from').value;
    const to = document.getElementById('order-car-to').value;
    const driver = driverOption === 'yes' ? 'نعم' : 'لا';
    const total = document.getElementById('total-car-price').innerText;

    const location = document.getElementById('order-car-location').value;
    const payment = document.getElementById('order-car-payment').value;
    const notes = document.getElementById('order-car-notes').value;

    if(!name || !phone){ alert("يرجى ملء الاسم والجوال"); return; }

    const message = `*حجز سيارة من Puncak Go*%0A🚗 السيارة: ${selectedCar.name}%0A👤 الاسم: ${name}%0A📞 الجوال: ${phone}%0A📍 الموقع: ${location}%0A📅 من: ${from}%0A📅 إلى: ${to}%0A🧑‍✈️ سائق: ${driver}%0A💳 الدفع: ${payment}%0A📝 ملاحظات: ${notes}%0A💰 الإجمالي: ${total}`;

    window.open(`https://wa.me/628123456789?text=${message}`, '_blank');
}

// ==================== 8️⃣ رندر الفلل ====================
function renderVillas(filterPrice = 'all'){
    villaMarkers.forEach(m => map.removeLayer(m));
    villaMarkers = [];
    const container = document.getElementById('villas-list-container');
    if(!container) return;
    container.innerHTML = '';
    const lang = localStorage.getItem('lang') || 'ar';
    const filtered = filterPrice==='all' ? allVillas : allVillas.filter(v=>v.price==filterPrice);

    filtered.forEach(v=>{
        const icon = L.divIcon({ 
            className:'custom-pin',
            html:`<div style="position:relative; width:40px; height:50px; text-align:center;">
                    <img src="logo1.png" style="width:18px; height:18px; border-radius:50%; border:1px solid white; position:absolute; top:-5px; left:11px; z-index:5;">
                    <div style="font-size:30px; color:#d4af37;">📍</div>
                    <div style="background:#2ecc71; color:white; border-radius:5px; padding:1px 3px; font-size:8px; position:absolute; bottom:0; left:50%; transform:translateX(-50%); white-space:nowrap;">${v.price}</div>
                   </div>`
        });
        const marker = L.marker([v.x,v.y],{icon:icon}).addTo(map).on('click',()=>openVilla(v));
        villaMarkers.push(marker);

        const vName = lang==='ar'?v.name_ar:v.name_en;
        container.innerHTML += `
            <div class="villa-card" onclick='openVilla(${JSON.stringify(v)})'>
                <img src="${v.imgs[0]}">
                <div style="padding:15px; text-align:right;">
                    <h3 style="margin:0; font-size:16px;">${vName}</h3>
                    <p style="color:#2ecc71; font-weight:bold; margin:5px 0;">${v.price} IDR / Night</p>
                    <button style="width:100%; background:#3498db; color:white; border:none; padding:8px; border-radius:8px; margin-top:5px;">${translations[lang].details}</button>
                </div>
            </div>`;
    });
}
// ==================== فلترة الفلل حسب السعر ====================
function filterVillas(price) {
    // إزالة حالة التفعيل من كل الأزرار
    document.querySelectorAll('.f-btn').forEach(btn => btn.classList.remove('active'));

    // تفعيل الزر المختار
    if(price === 'all') {
        document.getElementById('filter-all').classList.add('active');
    } else {
        const btn = Array.from(document.querySelectorAll('.f-btn'))
            .find(b => b.getAttribute('onclick') === `filterVillas(${price})`);
        if(btn) btn.classList.add('active');
    }

    // عرض الفلل حسب السعر المحدد
    renderVillas(price);
                        }
// ==================== 9️⃣ فتح الفيلا والحجز ====================
function openVilla(v) {
    activeVilla = v;
    const lang = localStorage.getItem('lang') || 'ar';
    
    document.getElementById('villa-modal').style.display = 'block';
    document.getElementById('order-form-container').style.display = 'none';
    document.getElementById('show-booking-btn').style.display = 'block';

    // اسم الفيلا والسعر
    document.getElementById('modal-villa-name').innerText = (lang === 'en' ? v.name_en : v.name_ar);
    document.getElementById('modal-villa-price').innerText = v.price + " IDR / Night";
    
    // صورة أولى
    document.getElementById('slider-wrapper').innerHTML = `<img src="${v.imgs[0]}" style="width:100%; height:200px; object-fit:cover;">`;

    // المواصفات مع أيقونات
    const specsList = document.getElementById('modal-specs-list');
    specsList.innerHTML = ''; // مسح السابق
    const specs = (lang === 'en' ? v.specs_en : v.specs_ar);

    const icons = ["🏊","⛰️","🧹","🚗","🔥"]; // أيقونات تجريبية لكل خاصية
    specs.forEach((s,i) => {
        const li = document.createElement('li');
        li.style.marginBottom = "5px";
        li.innerText = (icons[i] ? icons[i]+" " : "• ") + s;
        specsList.appendChild(li);
    });

    // إجمالي الليالي والسعر
    document.getElementById('total-price').innerText = v.price + " IDR";
    document.getElementById('stay-days').value = 1;
}
function openBookingForm(){
    document.getElementById('order-form-container').style.display = 'block';
    document.getElementById('show-booking-btn').style.display = 'none';

    // تهيئة القيم الافتراضية
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('order-from').value = today;
    document.getElementById('order-to').value = today;
    document.getElementById('stay-days').value = 1;
    if(activeVilla){
        document.getElementById('total-price').innerText = activeVilla.price + " IDR";
    }
}

function sendVillaToWhatsApp(){
    const name = document.getElementById('villa-name-input').value;
    const phone = document.getElementById('villa-phone').value;
    const days = parseInt(document.getElementById('stay-days').value) || 1;

    if(!name || !phone){ alert("يرجى ملء الاسم والجوال"); return; }

    const message = `*طلب حجز من Puncak Go*%0A🏡 الفيلا: ${activeVilla.name_ar}%0A👤 الاسم: ${name}%0A📞 الجوال: ${phone}%0A📅 الليالي: ${days}%0A💰 الإجمالي: ${days*activeVilla.price} IDR`;
    window.open(`https://wa.me/628123456789?text=${message}`, '_blank');
}

function closeVilla(){ document.getElementById('villa-modal').style.display='none'; }

// ====================  🔟 تشغيل عند التحميل ====================
document.addEventListener('DOMContentLoaded',()=>setLanguage(localStorage.getItem('lang')||'ar'));


// ================== إدارة الصفحات ==================
function showHome() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('home-page').classList.add('active');
}

function showHistory() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // إذا لم يكن لديك صفحة history، يمكنك إضافتها لاحقًا
    let historyPage = document.getElementById('history-page');
    if(!historyPage){
        historyPage = document.createElement('div');
        historyPage.id = 'history-page';
        historyPage.classList.add('page', 'active');
        historyPage.innerHTML = `<h2 style="text-align:center; margin-top:50px;">📋 رحلتي</h2><p style="text-align:center;">هنا ستعرض رحلاتك السابقة.</p>`;
        document.body.appendChild(historyPage);
    } else {
        historyPage.classList.add('active');
    }
}

function showProfile() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // إذا لم يكن لديك صفحة profile، يمكنك إضافتها لاحقًا
    let profilePage = document.getElementById('profile-page');
    if(!profilePage){
        profilePage = document.createElement('div');
        profilePage.id = 'profile-page';
        profilePage.classList.add('page', 'active');
        profilePage.innerHTML = `<h2 style="text-align:center; margin-top:50px;">👤 البروفايل</h2><p style="text-align:center;">هنا ستعرض معلومات حسابك.</p>`;
        document.body.appendChild(profilePage);
    } else {
        profilePage.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showHome(); // الصفحة الرئيسية

    // تحديث السعر عند تغيير التاريخ
    document.getElementById('order-car-from').addEventListener('change', updateCarTotal);
    document.getElementById('order-car-to').addEventListener('change', updateCarTotal);
});
