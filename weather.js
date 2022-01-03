const API = "bfeca889866dbc449a2907b9cb916f07"


const getData = async (city='',zip='') => {
    if (zip!==''){const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API}`);
    const weather = await data.json(); return weather}
    else {const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`);
    const weather = await data.json(); return weather};
};

const search = document.getElementById('search')

const searchData = search.addEventListener('submit', (event)=>{
    event.preventDefault();
    console.log(event);

    const zip = document.getElementById('zipcode').value;
    const city = document.getElementById('city').value;
    console.log(city,zip);
    loadData(city,zip);
});

const loadData = async (city,zip) => {
    const weatherData = await getData(city,zip);
    console.log(weatherData);

    if (document.getElementById('forecast').innerHTML !== ''){clearData()}
    createForecastElement(weatherData['name'],weatherData['weather'][0]['description'],weatherData['weather'][0]['icon'],
    k2fConvert(weatherData['main']['temp']),k2fConvert(weatherData['main']['temp_max']),k2fConvert(weatherData['main']['temp_min']),weatherData['main']['humidity'])

};

const k2fConvert = (temp) => {
    let ans = (temp-273.15)*9/5+32;
    return Math.ceil(ans)
};

const createForecastElement = (city,weather,icon,current,tempHi,tempLow,humidity) => {
    const forecast = document.createElement('div');
    const title = document.createElement('h1');
    const img = document.createElement('img');
    const weath = document.createElement('h4');
    const info = document.createElement('ul');
    const curr = document.createElement('li');
    const hi = document.createElement('li');
    const low = document.createElement('li');
    const humid = document.createElement('li');

    title.innerHTML = city;
    img.setAttribute('src','http://openweathermap.org/img/w/'+icon+'.png');
    weath.innerHTML = weather;
    curr.innerHTML = "Current Temp: "+current;
    hi.innerHTML = "Max Temp: "+tempHi;
    low.innerHTML = "Min Temp: "+tempLow;
    humid.innerHTML = "Humidity: "+humidity+"%";
    
    forecast.insertAdjacentElement('beforeend',title);
    forecast.insertAdjacentElement('beforeend',img);
    forecast.insertAdjacentElement('beforeend',weath);
    info.insertAdjacentElement('beforeend',curr)
    info.insertAdjacentElement('beforeend',hi);
    info.insertAdjacentElement('beforeend',low);
    info.insertAdjacentElement('beforeend',humid);
    forecast.insertAdjacentElement('beforeend',info);

    forecast.className = 'd-flex flex-column justify-content-center align-items-center col-12 mt-2'
    title.className = 'text-decoration-underline'
    weath.className = 'text-decoration-underline text-capitalize'
    img.className = 'w-25'
    info.className = 'info d-flex flex-column justify-content-center'

    document.getElementById('forecast').insertAdjacentElement('beforeend', forecast)
};

const clearData = () => {document.getElementById('forecast').innerHTML = ''};