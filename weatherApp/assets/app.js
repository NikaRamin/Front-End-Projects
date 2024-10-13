const btn = document.getElementById("btn");
const title = document.getElementById("title"); 

//Getting city from the user
const getCity = function(event) {
    event.preventDefault();
    const city = document.getElementById("location").value;
    sendRequest(city);
}

//Sending request using axios
const sendRequest = function(city) {
    const apiKey = "90f8397c351b4957b0a163137240710";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`; 
    axios.get(url)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                addToDom(response.data, city);
            }
            console.log(response.data);
        })
        .catch(error => {
            alert('Error in fetching the data. Please try again.');
        });
}

// adding results to DOM
const addToDom = function(data, city) {
    const resultBox = document.getElementById("weatherResult");
    resultBox.innerHTML = ''; 

    const result = document.createElement('div');
    result.classList.add('weather-box');

    result.innerHTML = `
        <h4>Weather in ${data.location.name},${data.location.country}:</h4>
        <p>${data.current.condition.text}<br>
        Temperature: ${data.current.temp_c}°C<br>
        Feels like: ${data.current.feelslike_c}°C<br>
        Wind: ${data.current.wind_kph} Kph<br>
        Local time: ${data.location.localtime.slice(11)}
        </p>
    `;
    document.body.classList.remove('day-body', 'night-body');
    result.classList.remove('day', 'night');
    title.classList.remove('day-title','night-title');

    // Applying the appropriate class based on the day or night condition of the city
    if (data.current.is_day) {
        result.classList.add('day');
        document.body.classList.add('day-body');
        title.innerHTML = `<h1>Have a Good day!</h1>`
        title.classList.add('day-title');
    } else {
        result.classList.add('night');
        document.body.classList.add('night-body');
        title.innerHTML = `<h1>Have a Good evening!</h1>`
        title.classList.add('night-title');

    }
    resultBox.appendChild(result);
}

btn.addEventListener("click", getCity);
