const WA_NUM = "6285715513240";
let isAr = true, isAdmin = false;
let vBasePrice = 500, cBasePrice = 200;

function nav(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active-sec'));
    document.getElementById(id).classList.add('active-sec');
    window.scrollTo(0,0);
}

// مزامنة البيانات بين الحقول
function syncInputs(el, className) {
    document.querySelectorAll('.' + className).forEach(input => { input.value = el.value; });
}

function toggleLang() {
    isAr = !isAr;
    document.getElementById('html-tag').dir = isAr ? 'rtl' : 'ltr';
    document.getElementById('btn-lang').innerText = isAr ? 'English' : 'العربية';
    document.querySelectorAll('[data-ar]').forEach(el => {
        el.innerText = isAr ? el.dataset.ar : el.dataset.en;
    });
}

function toggleCurr() {
    const box = document.getElementById('curr-box');
    box.style.display = (box.style.display === 'block') ? 'none' : 'block';
}

function calcCurr() {
    let v = document.getElementById('sar-val').value;
    document.getElementById('idr-res').innerText = (v * 4200).toLocaleString() + " IDR";
}

function adminLogin() {
    if(prompt("Pass:") === "1234") {
        isAdmin = true;
        document.querySelectorAll('.admin-edit-box').forEach(b => b.style.display = 'block');
        alert("وضع التعديل مفعل ✅");
    }
}

// بناء 15 فلة
const mapV = document.getElementById('map-v');
for(let i=1; i<=15; i++) {
    let p = document.createElement('div');
    p.className = 'pin';
    p.style.top = (10 + (i*4)%70) + "%"; p.style.left = (10 + (i*6)%80) + "%";
    p.innerHTML = `<span>${i}</span>`;
    p.onclick = () => {
        document.getElementById('v-panel').style.display = 'block';
        document.getElementById('v-name').innerText = (isAr ? "فلة رقم " : "Villa ") + i;
    };
    mapV.appendChild(p);
}

// بناء 15 سيارة
const gridC = document.getElementById('cars-grid');
for(let i=1; i<=15; i++) {
    let c = document.createElement('div');
    c.className = 'card'; c.style.background = 'white'; c.style.color = '#333';
    c.innerHTML = `<h3>${isAr ? 'سيارة ' : 'Car '}${i}</h3>`;
    c.onclick = () => {
        document.getElementById('c-panel').style.display = 'block';
        document.getElementById('c-name').innerText = (isAr ? "سيارة رقم " : "Car ") + i;
    };
    gridC.appendChild(c);
}

function calcPrice(t) {
    let f = document.getElementById(t+'-from').value;
    let o = document.getElementById(t+'-to').value;
    if(f && o) {
        let d = Math.ceil((new Date(o) - new Date(f)) / (1000*60*60*24));
        if(d > 0) document.getElementById(t+'-price-val').innerText = d * (t==='v' ? vBasePrice : cBasePrice);
    }
}

function sendWA(serviceType) {
    let t = (serviceType === 'Villa') ? 'v' : (serviceType === 'Car' ? 'c' : 'v');
    
    // سحب البيانات
    let name = document.querySelector('.u-name').value || "ابو عمر";
    let phone = document.querySelector('.u-phone').value || "81118895901";
    let adults = document.querySelector('.u-adults').value || 1;
    let kids = document.querySelector('.u-kids').value || 0;
    
    let from = document.getElementById(t+'-from')?.value || "2026-02-26";
    let to = document.getElementById(t+'-to')?.value || "2026-02-26";
    let total = document.getElementById(t+'-price-val')?.innerText || "0";
    let note = document.getElementById(t+'-note')?.value || "لا يوجد";
    let service = (serviceType === 'Villa' || serviceType === 'Car') ? document.getElementById(t+'-name').innerText : serviceType;

    // الصيغة المطلوبة
    let message = `السلام عليكم 🌿%0A%0A` +
                  `تم إرسال طلب حجز عبر موقع PuncakGo:%0A%0A` +
                  `━━━━━━━━━━━━━━%0A` +
                  `🏠 الخدمة: ${service}%0A` +
                  `👤 العميل: ${name}%0A` +
                  `📞 الهاتف: ${phone}%0A` +
                  `📅 الوصول: ${from}%0A` +
                  `📅 المغادرة: ${to}%0A` +
                  `👥 عدد الضيوف: ${adults} بالغين | ${kids} أطفال%0A` +
                  `📝 ملاحظات: ${note}%0A` +
                  `💰 المبلغ الإجمالي: ${total} ريال%0A` +
                  `━━━━━━━━━━━━━━%0A%0A` +
                  `يرجى تأكيد التوفر في أقرب وقت ممكن.%0A` +
                  `شكراً 🤍`;

    window.open(`https://wa.me/${WA_NUM}?text=${message}`, '_blank');
}

// السلايدر
setInterval(() => {
    const slides = document.querySelectorAll('.slide');
    let active = document.querySelector('.slide.active');
    active.classList.remove('active');
    let next = active.nextElementSibling || slides[0];
    next.classList.add('active');
}, 5000);
