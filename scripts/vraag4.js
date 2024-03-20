document.addEventListener('DOMContentLoaded', function () {
    let legaatCounter = 1; // Start met 1 omdat er al een legaat in de HTML staat.

    document.getElementById('addLegaatBtn').addEventListener('click', function () {
        legaatCounter++; // Verhoog de teller voor elke nieuwe sectie.
        const legatenContainer = document.getElementById('legatenContainer');

        // Maak een nieuwe sectie voor het legaat.
        const section = document.createElement('section');
        section.id = `legaat${legaatCounter}`;
        section.innerHTML = `
            <h3>Specificatie legaat ${legaatCounter}</h3>
            <fieldset>
                <label for="omschrijvingLegaat${legaatCounter}">Omschrijving van het legaat:</label>
                <input type="text" id="omschrijvingLegaat${legaatCounter}" name="omschrijvingLegaat${legaatCounter}" />
                
                <label for="waardeLegaat1"
                      >Waarde van het legaat?
                      <input
                        type="number"
                        id="waardeLegaat1"
                        name="waardeLegaat1"
                    /></label>

                    <fieldset>
                      <legend>
                        Komt dit legaat ten laste van een andere verkrijger?
                      </legend>

                      <label for="jaTenLasteVanAndereVerkrijger1"
                        ><input
                          type="radio"
                          id="jaTenLasteVanAndereVerkrijger1"
                          name="tenLasteVanAndereVerkrijger1"
                          value="ja"
                        />
                        Ja</label
                      >

                      <label for="neeTenLasteVanAndereVerkrijger1"
                        ><input
                          type="radio"
                          id="neeTenLasteVanAndereVerkrijger1"
                          name="tenLasteVanAndereVerkrijger1"
                          value="nee"
                        />
                        Nee</label
                      >
                    </fieldset>

                    <label for="bsnAndereVerkrijger1"
                      >Burgerservicenummer andere verkrijger
                      <input
                        type="text"
                        id="bsnAndereVerkrijger1"
                        name="bsnAndereVerkrijger1"
                    /></label>

                    <fieldset>
                      <legend>Is dit legaat vrij van recht?</legend>
                      <label for="jaLegaatVrijVanRecht1"
                        ><input
                          type="radio"
                          id="jaLegaatVrijVanRecht1"
                          name="legaatVrijVanRecht1"
                          value="ja"
                        />
                        Ja</label
                      >
                      <label for="neeLegaatVrijVanRecht1"
                        ><input
                          type="radio"
                          id="neeLegaatVrijVanRecht1"
                          name="legaatVrijVanRecht1"
                          value="nee"
                        />
                        Nee</label
                      >
                    </fieldset>

                    <fieldset>
                      <legend>Is dit legaat aanvaard?</legend>
                      <label for="jaLegaatAanvaard1"
                        ><input
                          type="radio"
                          id="jaLegaatAanvaard1"
                          name="legaatAanvaard1"
                          value="ja"
                        />
                        Ja</label
                      >
                      <label for="neeLegaatAanvaard1"
                        ><input
                          type="radio"
                          id="neeLegaatAanvaard1"
                          name="legaatAanvaard1"
                          value="nee"
                        />
                        Nee</label
                      >
                    </fieldset>
                    
            </fieldset>
        `;

        // Voeg de nieuwe sectie toe aan de container.
        legatenContainer.appendChild(section);
    });
});