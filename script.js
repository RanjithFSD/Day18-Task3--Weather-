document.addEventListener("DOMContentLoaded", () => {
    const fetchWeatherButton = document.getElementById("fetch-weather");
    const cityInput = document.getElementById("city-input");
    const weatherResult = document.getElementById("weather-result");

    // Function to fetch weather data for a given city
    function fetchWeatherData(city) {
        const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Display weather information
                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description;
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;

                weatherResult.innerHTML = `
                    <h3>${data.name}</h3>
                    <p>Temperature: ${temperature} °C</p>
                    <p>Weather: ${weatherDescription}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                `;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherResult.innerHTML = '<p>Failed to fetch weather data. Please try again.</p>';
            });
    }

    // Event listener for the button to fetch weather data
    fetchWeatherButton.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        } else {
            weatherResult.innerHTML = '<p>Please enter a city name.</p>';
        }
    });
});
