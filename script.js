const apiUrl = "https://restcountries.com/v3.1/all";

    fetch(apiUrl)
      .then(response => response.json())
      .then(countriesData => {
        // a. Get all the countries from Asia continent / region using Filter function
        const asiaCountriesTableBody = document.getElementById("asiaCountriesTableBody");
        displayCountries(asiaCountriesTableBody, countriesData.filter(country => country.region === "Asia"));

        // b. Get all the countries with a population of less than 2 lakhs using Filter function
        const populationLessThan2LakhsTableBody = document.getElementById("populationLessThan2LakhsTableBody");
        displayCountries(populationLessThan2LakhsTableBody, countriesData.filter(country => country.population < 200000));

        // c. Print the following details name, capital, flag, using forEach function
        const allCountriesTableBody = document.getElementById("allCountriesTableBody");
        displayCountries(allCountriesTableBody, countriesData);

        // d. Print the total population of all countries using reduce function
        const totalPopulationElement = document.getElementById("totalPopulation");
        const totalPopulation = calculateTotalPopulation(countriesData);
        totalPopulationElement.textContent = `Total Population of All Countries: ${totalPopulation.toLocaleString()}`;

        // e. Print the country that uses US dollars as currency
        const usDollarCountriesTableBody = document.getElementById("usDollarCountriesTableBody");
        displayCountries(usDollarCountriesTableBody, countriesData.filter(country => country.currencies?.USD?.name === "United States dollar"));
      })
      .catch(error => console.error("Error fetching data:", error));

    function displayCountries(tableBody, countries) {
      tableBody.innerHTML = "";
      countries.forEach(country => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = country.name.common;
        row.insertCell(1).textContent = country.capital || "N/A";
        if (country.population) {
          row.insertCell(2).textContent = country.population.toLocaleString();
        } else {
          row.insertCell(2).textContent = "N/A";
        }
        row.insertCell(3).innerHTML = `<img src="${country.flags.png}" alt="${country.name.common}" style="max-width: 50px; max-height: 30px;">`;
      });
    }

    function calculateTotalPopulation(countries) {
      return countries.reduce((acc, country) => {
        const population = country.population;
        if (typeof population === 'number') {
          return acc + population;
        }
        return acc;
      }, 0);
    }
