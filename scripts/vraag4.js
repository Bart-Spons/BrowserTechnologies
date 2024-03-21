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
                      <fieldset class="subFieldset2">
                        <legend class="subLegend2">Omschrijving van het gelaat</legend>
                      <label for="omschrijvingLegaat1"
                        >
                        <input
                          type="text"
                          id="omschrijvingLegaat1"
                          name="omschrijvingLegaat1"
                      /></label></fieldset>

                      <fieldset class="subFieldset2">
                        <legend class="subLegend2">
                          Wat is de waarde van dit legaat?
                        </legend>
                      
                      <label for="waardeLegaat1"
                        >
                        <input
                          type="number"
                          id="waardeLegaat1"
                          name="waardeLegaat1"
                      /></label>
                    </fieldset>

                      <fieldset class="subFieldset2">
                        <legend class="subLegend2">
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

                      <fieldset class="subFieldset2">
                        <legend class="subLegend2">
                          Burgerservicenummer andere verkrijger
                          </legend>
                      <label for="bsnAndereVerkrijger1"
                        >
                        <input
                          type="text"
                          id="bsnAndereVerkrijger1"
                          name="bsnAndereVerkrijger1"
                      /></label>
                    </fieldset>

                      <fieldset class="subFieldset2">
                        <legend class="subLegend2">
                          Is dit legaat vrij van recht?
                        </legend>
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

                      <fieldset class="subFieldset2">
                        <legend class="subLegend2">
                          Is dit legaat aanvaard?
                        </legend>
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