const translations = {

en: {
tagline: "Your gateway to villas, cars & tours in Puncak",
welcome: "Welcome to Puncak",
subtitle: "Book your villa, car, and enjoy your trip",
rentVilla: "🏡 Rent Villa",
rentCar: "🚗 Rent Car",
tours: "🗺 Tours",
offer: "✨ Book Villa + Car and get 10% Discount",
moreServices: "More Services",
home: "🏠 Home",
terms: "📜 Terms",
history: "📊 History"
},

ar: {
tagline: "بوابتك إلى الفلل والسيارات والجولات في بونشاك",
welcome: "مرحباً بك في بونشاك",
subtitle: "احجز الفيلا والسيارة واستمتع برحلتك",
rentVilla: "🏡 استئجار فيلا",
rentCar: "🚗 استئجار سيارة",
tours: "🗺 الجولات السياحية",
offer: "✨ احجز فيلا + سيارة واحصل على خصم 10٪",
moreServices: "خدمات إضافية",
home: "🏠 الرئيسية",
terms: "📜 الشروط",
history: "📊 السجل"
},

id: {
tagline: "Gerbang Anda untuk villa, mobil dan tur di Puncak",
welcome: "Selamat datang di Puncak",
subtitle: "Pesan villa, mobil dan nikmati perjalanan Anda",
rentVilla: "🏡 Sewa Villa",
rentCar: "🚗 Sewa Mobil",
tours: "🗺 Tur Wisata",
offer: "✨ Pesan Villa + Mobil dapat diskon 10%",
moreServices: "Layanan Lainnya",
home: "🏠 Beranda",
terms: "📜 Syarat",
history: "📊 Riwayat"
}

};

const languageSelector = document.getElementById("language");

languageSelector.addEventListener("change", function(){
setLanguage(this.value);
});

function setLanguage(lang){

document.querySelectorAll("[data-key]").forEach(element=>{
const key = element.getAttribute("data-key");
element.textContent = translations[lang][key];
});

}
