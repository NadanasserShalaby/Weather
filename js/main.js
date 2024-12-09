// ----------------------------------------------

var Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


document.getElementById("search").addEventListener("keyup", function(a) {
    search(a.target.value)
})
async function search(a) {
    var dataApi = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7060c33e4f6943a4a8271514240912&q=${a}&days=3`);
    if (dataApi.ok && 400 != dataApi.status) {  // bad request
    var jsonApi = await dataApi.json();
    display_current(jsonApi.location, jsonApi.current);
    displayNext(jsonApi.forecast.forecastday);
}
}

search('alex');

function display_current(a, t) {
    var winDir ;
    if(t.wind_dir == "S") winDir="South";
    else if (t.wind_dir == "N") winDir = "North";
    else if (t.wind_dir == "E") winDir = "East";
    else if (t.wind_dir == "W") winDir = "West";
    else winDir = t.wind_dir;

    var e = new Date(t.last_updated.replace(" ", "T"));

    var cartona = `
            <div class="card  ">
              <div class="card-header bg-main d-flex  justify-content-between text-center align-items-center">
                <p>${Days[e.getDay()]}</p>
                <p>${e.getDate() + Months[e.getMonth()]}</p>
              </div>
              <div class="card-body p-5">
                <h2 class="text-white " style="font-size: 30px;">${a.name}</h2>
                  <h1 class="card-title fw-bolder text-info " style="font-size: 75px;">${t.temp_c} °C</h1>
                  <img src="${t.condition.icon}" class="ms-auto " width="80px" height="80px" alt="">
                <p class="card-text text-info py-3">${t.condition.text}</p>
                <div class="">
                  <i class="text-white"><img src="./image/icon-umberella@2x.png" width="30px" alt=""><span class="p-1">${t.humidity} </span>% </i>
                  <i class="ms-3 text-white"><img src="./image/icon-wind@2x.png" width="30px" alt=""><span class="p-1">${t.wind_kph}</span>km/h
                  </i>
                  <i class="ms-3 text-white"><img src="./image/icon-compass@2x.png" width="30px" alt=""><span class="p-1">${winDir}</span>
                  </i>
                </div>
              </div>
            </div>
    `;


    document.getElementById('row-1').innerHTML = cartona;

}

function displayNext (a){
    var cartona = `
            <div class="card  text-center">
              <div class="card-header bg-main text-white text-center">
                <p>${Days[new Date(a[1].date.replace(" ", "T")).getDay()]}</p>
              </div>
              <div class="card-body p-5">
                <img src="${a[1].day.condition.icon}" class="py-3" alt="">
                <h1 class="card-title fw-bolder text-info py-5">${a[1].day.maxtemp_c} °C</h1>
                <p class="py-2">${a[1].day.mintemp_c}°C</p>
                <p class="card-text text-info">${a[1].day.condition.text}</p>
              </div>
            </div>`;

        var cartona_ = `
            <div class="card  text-center" width=>
              <div class="card-header bg-main text-white text-center ">
                <p>${Days[new Date(a[2].date.replace(" ", "T")).getDay()]}</p>
              </div>
              <div class="card-body p-5">
                <img src="${a[2].day.condition.icon}" class="py-3" alt="">
                <h1 class="card-title fw-bolder text-info py-5">${a[2].day.maxtemp_c} °C</h1>
                <p class="py-2">${a[2].day.mintemp_c}°C</p>
                <p class="card-text text-info">${a[2].day.condition.text}</p>
              </div>
            </div>
          </div>
    `;
    document.getElementById('row-2').innerHTML = cartona;
    document.getElementById('row-3').innerHTML = cartona_;
}