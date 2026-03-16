// ===== CURRENCY WINDOW =====

const currencyBtn = document.getElementById("currencyBtn");
const currencyBox = document.getElementById("currencyBox");
const amount = document.getElementById("amount");
const result = document.getElementById("result");

currencyBtn.onclick = function(){

currencyBox.style.display = "block";

}

function closeCurrency(){

currencyBox.style.display = "none";
amount.value = "";
result.innerText = "";

}


// ===== LIVE CONVERT =====

amount.oninput = function(){

let rate = 15500;

let total = amount.value * rate;

result.innerText = "IDR " + Math.round(total).toLocaleString();

}



// ===== LANGUAGE SYSTEM =====

const translations = {

en:{
villa:"🏡 Rent Villa",
car:"🚗 Rent Car",
tour:"🗺 Tours",
extra:"✨ Other Services"
},

ar:{
villa:"🏡 حجز فيلا",
car:"🚗 حجز سيارة",
tour:"🗺 رحلات سياحية",
extra:"✨ خدمات أخرى"
},

id:{
villa:"🏡 Sewa Villa",
car:"🚗 Sewa Mobil",
tour:"🗺 Tur Wisata",
extra:"✨ Layanan Lain"
}

};

document.getElementById("language").onchange=function(){

let lang=this.value;

document.getElementById("villaBtn").innerText=translations[lang].villa;
document.getElementById("carBtn").innerText=translations[lang].car;
document.getElementById("tourBtn").innerText=translations[lang].tour;
document.getElementById("extraBtn").innerText=translations[lang].extra;

}
