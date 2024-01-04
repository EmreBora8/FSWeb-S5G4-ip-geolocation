//axios import buraya gelecek
import axios from "axios";
var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
	await axios({
		method: "get",
		url: "https://apis.ergineer.com/ipadresim",
	})
		.then(function (response) {
			return response.data;
		})
		.then(function (a) {
			benimIP = a;
		});
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/78.190.177.28
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	NOT: API'den gelen bayrak url'i çalışmazsa alternatif olarak: https://flagsapi.com/
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek

const data = {
	sorgu: "78.190.177.28",
	durum: "OK",
	kıta: "Asia",
	ülke: "Türkiye",
	ülkeKodu: "TR",
	ülkebayrağı: "https://apis.ergineer.com/ulkebayraklari/TR",
	bölge: "20",
	bölgeAdı: "Denizli",
	şehir: "Denizli",
	zip: "20010",
	enlem: 37.80030000000000001136868377216160297393798828125,
	boylam: 29.284800000000000608224581810645759105682373046875,
	saatdilimi: "Europe/Istanbul",
	parabirimi: "TRY",
	isp: "TTNet A.S.",
	organizasyon: "Turk Telekomunikasyon A.S",
	as: "AS47331 TTNet A.S.",
};
/*  <div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

const geoInfo = (data) => {
	const card = document.createElement("div");
	card.setAttribute("class", "card");

	const img = document.createElement("img");
	img.setAttribute("src", `https://flagsapi.com/${data.ülkeKodu}/flat/64.png`);
	card.append(img);

	const div2 = document.createElement("div");
	div2.className = "card-info";
	card.append(div2);

	const ip = document.createElement("h3");
	ip.classList.add("ip");
	ip.textContent = data.ipAdresimiAl;
	div2.append(ip);

	const p1 = document.createElement("p");
	p1.setAttribute("class", "ulke");
	p1.textContent = `${data.ülke} (${data.ülkeKodu})`;

	const p2 = document.createElement("p");
	p2.textContent = `Enlem: ${data.enlem} Boylam: ${data.boylam}`;

	const p3 = document.createElement("p");
	p3.textContent = `Sehir: ${data.şehir}`;

	const p4 = document.createElement("p");
	p4.textContent = `Saat Dilimi: ${data.saatdilimi}`;

	const p5 = document.createElement("p");
	p5.textContent = `Para Birimi: ${data.parabirimi}`;

	const p6 = document.createElement("p");
	p5.textContent = `ISP: ${data.isp}`;

	div2.append(p1, p2, p3, p4, p5, p6);
	return card;
};
const getData = async () => {
	await ipAdresimiAl();
	axios.get(`https://apis.ergineer.com/ipgeoapi/${benimIP}`).then((res) => {
		const card = geoInfo(res.data);
		document.querySelector(".cards").append(card);
	});
};
getData();
