// ===== LANGUAGE SYSTEM =====

const translations = {

en:{
tagline:"Your gateway to villas, cars & tours in Puncak",
welcome:"Welcome to Puncak",
desc:"Book your villa, car, and enjoy your trip",
villa:"🏡 Rent Villa",
car:"🚗 Rent Car",
tour:"🗺 Tours",
offer:"✨ Book Villa + Car and get 10% Discount"
},

ar:{
tagline:"بوابتك لحجز الفلل والسيارات في بونشاك",
welcome:"مرحبا بكم في بونشاك",
desc:"احجز الفيلا أو السيارة واستمتع برحلتك",
villa:"🏡 حجز فيلا",
car:"🚗 حجز سيارة",
tour:"🗺 رحلات",
offer:"✨ احجز فيلا + سيارة واحصل على خصم 10٪"
},

id:{
tagline:"Gerbang Anda ke villa dan mobil di Puncak",
welcome:"Selamat datang di Puncak",
desc:"Pesan villa atau mobil dan nikmati perjalanan Anda",
villa:"🏡 Sewa Villa",
car:"🚗 Sewa Mobil",
tour:"🗺 Tur",
offer:"✨ Pesan Villa + Mobil dapat Diskon 10%"
}

};

document.getElementById("language").onchange=function(){

let lang=this.value;

document.getElementById("tagline").innerText=translations[lang].tagline;
document.getElementById("welcome").innerText=translations[lang].welcome;
document.getElementById("desc").innerText=translations[lang].desc;

document.getElementById("villaBtn").innerText=translations[lang].villa;
document.getElementById("carBtn").innerText=translations[lang].car;
document.getElementById("tourBtn").innerText=translations[lang].tour;

document.getElementById("offer").innerText=translations[lang].offer;

}


// ===== CURRENCY CONVERTER =====

const currency=document.getElementById("currency");
const converter=document.getElementById("converter");
const amount=document.getElementById("amount");
const result=document.getElementById("result");

currency.onclick=function(){

converter.style.display="block";

}

amount.oninput=function(){

let rate=1;

if(currency.value==="usd") rate=15500;
if(currency.value==="sar") rate=4100;
if(currency.value==="eur") rate=16800;

let total=amount.value*rate;

result.innerText="IDR "+total.toLocaleString();

}
