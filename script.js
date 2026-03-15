// ===== Language System =====

const translations = {

en:{

title:"Your gateway to villas, cars & tours in Puncak",

welcome:"Welcome to Puncak",

desc:"Book your villa, car, and enjoy your trip",

villa:"🏡 Rent Villa",

car:"🚗 Rent Car",

tour:"🗺 Tours",

offer:"✨ Book Villa + Car and get 10% Discount",

more:"More Services",

home:"🏠 Home",

terms:"📜 Terms",

history:"📊 History"

},

ar:{

title:"بوابتك لحجز الفلل والسيارات والرحلات في بونشاك",

welcome:"مرحبا بكم في بونشاك",

desc:"احجز الفيلا أو السيارة واستمتع برحلتك",

villa:"🏡 حجز فيلا",

car:"🚗 حجز سيارة",

tour:"🗺 رحلات",

offer:"✨ احجز فيلا + سيارة واحصل على خصم 10٪",

more:"خدمات إضافية",

home:"🏠 الرئيسية",

terms:"📜 الشروط",

history:"📊 السجل"

},

id:{

title:"Gerbang Anda ke villa, mobil & tur di Puncak",

welcome:"Selamat datang di Puncak",

desc:"Pesan villa atau mobil dan nikmati perjalanan Anda",

villa:"🏡 Sewa Villa",

car:"🚗 Sewa Mobil",

tour:"🗺 Tur",

offer:"✨ Pesan Villa + Mobil dapat Diskon 10%",

more:"Layanan Lain",

home:"🏠 Beranda",

terms:"📜 Syarat",

history:"📊 Riwayat"

}

};

// ===== Change Language =====

const langSelect=document.getElementById("language");

langSelect.addEventListener("change",function(){

const lang=this.value;

document.querySelector(".logo-section p").innerText=translations[lang].title;

document.querySelector(".main-glass h2").innerText=translations[lang].welcome;

document.querySelector(".main-glass p").innerText=translations[lang].desc;

document.querySelectorAll(".service-btn")[0].innerText=translations[lang].villa;

document.querySelectorAll(".service-btn")[1].innerText=translations[lang].car;

document.querySelectorAll(".service-btn")[2].innerText=translations[lang].tour;

document.querySelector(".offer-box").innerText=translations[lang].offer;

document.querySelector(".extra-btn").innerText=translations[lang].more;

document.querySelectorAll(".bottom-nav button")[0].innerText=translations[lang].home;

document.querySelectorAll(".bottom-nav button")[1].innerText=translations[lang].terms;

document.querySelectorAll(".bottom-nav button")[2].innerText=translations[lang].history;

});
