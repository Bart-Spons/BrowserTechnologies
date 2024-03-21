document.addEventListener('DOMContentLoaded', function () {
    var countrySearch = document.getElementById('countrySearch');
    var countryList = document.getElementById('countryList');
    var countries = [
        "Afghanistan", "Albanië", "Algerije", "Andorra", "Angola", "Antigua en Barbuda", "Argentinië", "Armenië", "Australië", "Oostenrijk",
        "Azerbeidzjan", "Bahama's", "Bahrein", "Bangladesh", "Barbados", "Wit-Rusland", "België", "Belize", "Benin", "Bhutan",
        "Bolivia", "Bosnië en Herzegovina", "Botswana", "Brazilië", "Brunei", "Bulgarije", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodja",
        "Kameroen", "Canada", "Centraal-Afrikaanse Republiek", "Tsjaad", "Chili", "China", "Colombia", "Comoren", "Congo (Congo-Brazzaville)", "Costa Rica",
        "Kroatië", "Cuba", "Cyprus", "Tsjechië", "Democratische Republiek Congo", "Denemarken", "Djibouti", "Dominica", "Dominicaanse Republiek", "Ecuador",
        "Egypte", "El Salvador", "Equatoriaal-Guinea", "Eritrea", "Estland", "Eswatini", "Ethiopië", "Fiji", "Finland", "Frankrijk",
        "Gabon", "Gambia", "Georgië", "Duitsland", "Ghana", "Griekenland", "Grenada", "Guatemala", "Guinea", "Guinee-Bissau",
        "Guyana", "Haïti", "Honduras", "Hongarije", "IJsland", "India", "Indonesië", "Iran", "Irak", "Ierland",
        "Israël", "Italië", "Jamaica", "Japan", "Jordanië", "Kazachstan", "Kenia", "Kiribati", "Koeweit", "Kirgizië",
        "Laos", "Letland", "Libanon", "Lesotho", "Liberia", "Libië", "Liechtenstein", "Litouwen", "Luxemburg", "Madagascar",
        "Malawi", "Maleisië", "Malediven", "Mali", "Malta", "Marshalleilanden", "Mauritanië", "Mauritius", "Mexico", "Micronesia",
        "Moldavië", "Monaco", "Mongolië", "Montenegro", "Marokko", "Mozambique", "Myanmar (voorheen Birma)", "Namibië", "Nauru", "Nepal",
        "Nederland", "Nieuw-Zeeland", "Nicaragua", "Niger", "Nigeria", "Noord-Korea", "Noord-Macedonië", "Noorwegen", "Oman", "Pakistan",
        "Palau", "Palestina", "Panama", "Papoea-Nieuw-Guinea", "Paraguay", "Peru", "Filipijnen", "Polen", "Portugal", "Qatar",
        "Roemenië", "Rusland", "Rwanda", "Saint Kitts en Nevis", "Saint Lucia", "Saint Vincent en de Grenadines", "Samoa", "San Marino", "Sao Tomé en Principe", "Saoedi-Arabië",
        "Senegal", "Servië", "Seychellen", "Sierra Leone", "Singapore", "Slovakije", "Slovenië", "Salomonseilanden", "Somalië", "Zuid-Afrika",
        "Zuid-Korea", "Zuid-Soedan", "Spanje", "Sri Lanka", "Soedan", "Suriname", "Zweden", "Zwitserland", "Syrië", "Tadzjikistan",
        "Tanzania", "Thailand", "Oost-Timor", "Togo", "Tonga", "Trinidad en Tobago", "Tunesië", "Turkije", "Turkmenistan", "Tuvalu",
        "Oeganda", "Oekraïne", "Verenigde Arabische Emiraten", "Verenigd Koninkrijk", "Verenigde Staten", "Uruguay", "Oezbekistan", "Vanuatu", "Vaticaanstad", "Venezuela",
        "Vietnam", "Jemen", "Zambia", "Zimbabwe"
    ];


    function filterCountries() {
        var search = countrySearch.value.toLowerCase();
        countryList.innerHTML = ''; // Maak de bestaande lijst leeg
        if (!search) {
            countryList.style.display = 'none';
            return;
        }

        var filteredCountries = countries.filter(function (country) {
            return country.toLowerCase().includes(search);
        });

        if (filteredCountries.length) {
            countryList.style.display = 'block';
            filteredCountries.forEach(function (filteredCountry) {
                var div = document.createElement('div');
                div.textContent = filteredCountry;
                div.onclick = function () {
                    countrySearch.value = filteredCountry;
                    countryList.style.display = 'none';
                };
                countryList.appendChild(div);
            });
        } else {
            countryList.style.display = 'none';
        }
    }

    countrySearch.addEventListener('input', filterCountries);
    document.addEventListener('click', function (e) {
        if (e.target !== countrySearch) {
            countryList.style.display = 'none';
        }
    });
});
