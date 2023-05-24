const ticketContainer = document.getElementById('ticket-container');
const refreshButton = document.getElementById('refresh-button');
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const API_KEY = '7899dbaaae4b4bbf975130243231805'; 

async function getWeatherData(city) {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&days=1&aqi=no&alerts=no&q=${city}`);
  const data = await response.json();
  return data;
}


function randomDateTime() {
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

function createTicketElement(ticket) {
  const ticketElement = document.createElement('div');
  ticketElement.classList.add('ticket');
  ticketElement.style.backgroundImage = `url(${ticket.backgroundImage})`; 

  const titleElement = document.createElement('h2');
  titleElement.textContent = ticket.title;

  const cityElement = document.createElement('p');
  cityElement.textContent = `City: ${ticket.city}`;

  const dateTimeElement = document.createElement('p');
  dateTimeElement.textContent = `Date & Time: ${ticket.dateTime}`;

  const weatherElement = document.createElement('p');
  weatherElement.textContent = `Weather: ${ticket.weather}`;

  ticketElement.appendChild(titleElement);
  ticketElement.appendChild(cityElement);
  ticketElement.appendChild(dateTimeElement);
  ticketElement.appendChild(weatherElement);

  return ticketElement;
}


async function refreshTickets() {
  try {

      
    const tickets = [
      { title: 'Ticket', city: 'New York', backgroundImage: 'https://i2.wp.com/littlebooksandthings.com/wp-content/uploads/2019/09/kosta-bratsos-eD2_iDnO0f4-unsplash-2.jpg?w=2400&ssl=1'},
      { title: 'Ticket', city: 'London', backgroundImage: 'https://cosmofunnel.com/sites/default/files/styles/full/public/2020-06/185288165207.jpg?itok=LdSBcNzK' },
      { title: 'Ticket', city: 'Tokyo', backgroundImage: 'https://wallpaperaccess.com/full/1643371.jpg'}
    ];
     
    ticketContainer.innerHTML = '';
    ticketContainer.classList.remove('ticket-animation');

    for (const ticket of tickets) {
      const weatherData = await getWeatherData(ticket.city);
      const weather = weatherData.current.temp_c;

      ticket.weather = `${weather}°C`;
      ticket.dateTime = randomDateTime();

      const ticketElement = createTicketElement(ticket);
      ticketElement.style.backgroundImage = ticket.backgroundImage;
    
    
      ticketContainer.appendChild(ticketElement);
    }
    
  } catch (error) {
    console.error('Error fetching tickets:', error);
    ticketContainer.innerHTML = 'No available tickets for specified location.';
  }
}

async function handleSearch() {
  const city = cityInput.value.trim();
  if (city !== '') {
    try {
      const weatherData = await getWeatherData(city);
      const weather = weatherData.current.temp_c;
    
      ticketContainer.classList.add('ticket-animation');
      
      
      const ticket = {
        title: 'Ticket',
        city: city,
        weather: `${weather}°C`,
        dateTime: randomDateTime(),
      };

      ticketContainer.innerHTML = '';

      const ticketElement = createTicketElement(ticket);
      ticketContainer.appendChild(ticketElement);


      cityInput.value = '';
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('please enter a valid city name.');
    }
  }
}



refreshButton.addEventListener('click', refreshTickets);
searchButton.addEventListener('click', handleSearch);




refreshTickets();

