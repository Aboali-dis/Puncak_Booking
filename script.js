/* ==========================
   متغيرات عامة
========================== */
let isAdmin = false; // للتحكم بعرض لوحة الادمن

/* ==========================
   التنقل بين الأقسام
========================== */
function nav(secId) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active-sec'));
  document.getElementById(secId).classList.add('active-sec');
}

/* ==========================
   صندوق العملة
========================== */
function toggleCurr() {
  const box = document.getElementById('curr-box');
  box.style.display = box.style.display === 'block' ? 'none' : 'block';
}

function calcCurr() {
  const val = Number(document.getElementById('sar-val').value) || 0;
  const rate = 3900; // مثال تحويل ريال الى IDR
  document.getElementById('idr-res').innerText = `${(val * rate).toLocaleString()} IDR`;
}

/* ==========================
   تغيير اللغة
========================== */
function toggleLang() {
  const btn = document.getElementById('btn-lang');
  if(btn.innerText === 'English') {
    btn.innerText = 'عربي';
    // إضافة ترجمة نصوص حسب الحاجة
  } else {
    btn.innerText = 'English';
  }
}

/* ==========================
   تسجيل الدخول للادمن
========================== */
function adminLogin() {
  const pw = prompt("ادخل كلمة السر للادمن:");
  if(pw === "1234") { // كلمة سر مثال
    isAdmin = true;
    alert("تم الدخول كأدمن");
  } else {
    alert("كلمة سر خاطئة!");
  }
}

/* ==========================
   الخلفية المتحركة
========================== */
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

setInterval(nextSlide, 5000); // تغيير كل 5 ثواني

/* ==========================
   إعداد خريطة الفلل والدبابيس
========================== */
const mapV = document.getElementById('map-v');

for(let i=1; i<=15; i++) {
  let p = document.createElement('div');
  p.className = 'pin';
  p.style.pointerEvents = "auto";
  p.style.top = (10 + (i*4)%70) + "%";
  p.style.left = (10 + (i*6)%80) + "%";
  p.innerHTML = `<span>${i}</span>`;

  p.onclick = (e)=>{
    e.stopPropagation();
    document.getElementById('v-panel').style.display='block';
    document.getElementById('v-name').innerText = "فلة رقم " + i;
    if(isAdmin) document.getElementById('v-admin').style.display='block';
  };
  mapV.appendChild(p);
}

/* ==========================
   توليد حقول الصور
========================== */
function genSlots(id, n) {
  const g = document.getElementById(id);
  for(let i=0; i<n; i++)
    g.innerHTML += `<div class="img-slot"><span>+</span><input type="file" onchange="preview(this)"></div>`;
}

function preview(input) {
  if(input.files[0]) {
    let r = new FileReader();
    r.onload = (e)=> input.parentElement.innerHTML = `<img src="${e.target.result}">`;
    r.readAsDataURL(input.files[0]);
  }
}

genSlots('v-slots', 7); // توليد 7 حقول صور للفلة
genSlots('c-slots', 7); // توليد 7 حقول صور للسيارة

/* ==========================
   حساب السعر
========================== */
function calcPrice(type) {
  let from = document.getElementById(`${type}-from`).value;
  let to = document.getElementById(`${type}-to`).value;
  let guests = Number(document.getElementById(`${type}-guests`).value) || 1;
  let price = Number(document.getElementById(`${type}-edit-price`)?.value) || 0;

  if(from && to) {
    const diff = (new Date(to) - new Date(from)) / (1000*60*60*24) + 1;
    document.getElementById(`${type}-price-val`).innerText = diff * guests * price;
  }
}

/* ==========================
   إرسال الطلب عبر واتساب
========================== */
function sendWA(type) {
  let name = document.getElementById(`${type[0].toLowerCase()}-cust-name`).value;
  let phone = document.getElementById(`${type[0].toLowerCase()}-cust-phone`).value;
  let note = document.getElementById(`${type[0].toLowerCase()}-cust-note`).value;
  let price = document.getElementById(`${type[0].toLowerCase()}-price-val`).innerText;

  const msg = `مرحبا، أود حجز ${type}.\nالاسم: ${name}\nالجوال: ${phone}\nملاحظات: ${note}\nالسعر: ${price}`;
  const waUrl = `https://wa.me/966${phone.replace(/^0/,'')}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
}

/* ==========================
   برامج جاهزة
========================== */
function sendProgram(name) {
  const msg = `مرحبا، أود طلب برنامج: ${name}`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, "_blank");
}

/* ==========================
   إغلاق لوحة الفلة
========================== */
function closeVillaPanel() {
  document.getElementById('v-panel').style.display = 'none';
  if(isAdmin) document.getElementById('v-admin').style.display='none';
    }
