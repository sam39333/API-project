const ticketContainer = document.getElementById('ticket-container');
const refreshButton = document.getElementById('refresh-button');
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const API_KEY = 'https://api.weatherapi.com/v1/forecast.json?key=7899dbaaae4b4bbf975130243231805&q=city name&days=1&aqi=no&alerts=no'; // Replace with your actual weather API key


// Function to fetch weather data from the API
async function getWeatherData(city) {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7899dbaaae4b4bbf975130243231805&q=city name&days=1&aqi=no&alerts=no`);
  const data = await response.json();
  return data;
}

// Function to generate a random time and date
function generateRandomDateTime() {
  const currentDate = new Date();
  const randomDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + Math.floor(Math.random() * 7),
    Math.floor(Math.random() * 24),
    Math.floor(Math.random() * 60)
  );
  return randomDate.toLocaleString();
}

// Function to create a ticket element
function createTicketElement(ticket) {
  const ticketElement = document.createElement('div');
  ticketElement.classList.add('ticket');

  const titleElement = document.createElement('h2');
  titleElement.textContent = ticket.title;

  const ticketIcon = document.createElement('img');
ticketIcon.classList.add('ticket-icon');
ticketIcon.src = 'https://static.thenounproject.com/png/134330-200.png';
ticketIcon.alt = 'Ticket Icon';

  const cityElement = document.createElement('p');
  cityElement.textContent = `City: ${ticket.city}`;

  const dateTimeElement = document.createElement('p');
  dateTimeElement.textContent = `Date & Time: ${ticket.dateTime}`;

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = ticket.description;

  const weatherElement = document.createElement('p');
  weatherElement.textContent = `Weather: ${ticket.weather}`;

  ticketElement.appendChild(titleElement);
  ticketElement.appendChild(ticketIcon);
  ticketElement.appendChild(cityElement);
  ticketElement.appendChild(dateTimeElement);
  ticketElement.appendChild(descriptionElement);
  ticketElement.appendChild(weatherElement);

  return ticketElement;
}

// Function to refresh tickets
async function refreshTickets() {
  try {

      

    // Simulating fetching tickets from API
    const tickets = [
      { title: 'Ticket 1', description: 'Description 1', city: 'New York' },
      { title: 'Ticket 2', description: 'Description 2', city: 'London' },
      { title: 'Ticket 3', description: 'Description 3', city: 'Tokyo' },
    ];
     
    ticketContainer.innerHTML = '';

    for (const ticket of tickets) {
      const weatherData = await getWeatherData(ticket.city);
      const weather = weatherData.current.temp_c;

      ticket.weather = `${weather}°C`;
      ticket.dateTime = generateRandomDateTime();

      const ticketElement = createTicketElement(ticket);
      ticketContainer.appendChild(ticketElement);
    }
    
  } catch (error) {
    console.error('Error fetching tickets:', error);
    ticketContainer.innerHTML = 'An error occurred while fetching tickets.';
  }
}

// Function to handle search button click
async function handleSearch() {
  const city = cityInput.value.trim();
  if (city !== '') {
    try {
      const weatherData = await getWeatherData(city);
      const weather = weatherData.current.temp_c;
      
      const ticket = {
        title: `Ticket for ${city}`,
        description: 'Ticket description',
        city: city,
        weather: `${weather}°C`,
        dateTime: generateRandomDateTime()
      };

      ticketContainer.innerHTML = '';

      const ticketElement = createTicketElement(ticket);
      ticketContainer.appendChild(ticketElement);

      // Clear the search input
      cityInput.value = '';
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('An error occurred while fetching weather data.');
    }
  }
}

// Event listeners
refreshButton.addEventListener('click', refreshTickets);
searchButton.addEventListener('click', handleSearch);




// Initial load
refreshTickets();

