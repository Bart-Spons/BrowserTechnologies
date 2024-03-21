document.addEventListener('DOMContentLoaded', function () {
  let formCounter = 0; // Teller voor het uniek identificeren van formuliersecties

  function addFormSection() {
    formCounter++;
    const formSection = document.createElement('div');
    formSection.className = 'formulier';
    formSection.id = `form${formCounter}`;
    formSection.innerHTML = `
        <div id="form12" class="formulier">
        <fieldset class="vraag">
          <legend>4a</legend>
          <h3>Verkrijger ${formCounter + 1}</h3>
          <fieldset class="subFieldset">
            <legend class="subLegend">
              Vul de gegevens in van de persoon of instelling.
            </legend>
            <p>Gegevens persoon</p>
            <label for="4aBsn"
              >Burgerservicenummer persoon
              <input
                type="text"
                id="4aBsn"
                name="bsn"
                pattern="[0-9]{8,9}"
                placeholder=""
              /><span data-error
                >Voer een geldig BSN nummer in van 8 of 9 nummers</span
              ></label
            >

            <label for="4aVoorletters"
              >Voorletter(s):
              <input
                type="text"
                id="4aVoorletters"
                name="voorletters"
                pattern="[A-Za-z\.]*"
                placeholder=""
              /><span data-error>Voer uw voorletter(s) in </span></label
            >

            <label for="4aTussenvoegsel"
              >Tussenvoegsel:
              <input
                type="text"
                id="4aTussenvoegsel"
                name="tussenvoegsel"
                pattern="[A-Za-z\.]*"
                placeholder=""
            /></label>

            <label for="4aAchternaam"
              >Achternaam:
              <input
                type="text"
                id="4aAchternaam"
                name="achternaam"
                pattern="[A-Za-z\.]*"
                placeholder=""
              /><span data-error>Voer uw achternaam in </span></label
            >

            <label for="4aGeboortedatum"
              >Geboortedatum:
              <input type="date" id="4aGeboortedatum" name="geboortedatum"
            /></label>

            <p>Gegevens instelling</p>
            <label for="4RSINinstelling">
              RSIN instelling
              <input
                type="text"
                id="4RSINinstelling"
                name="RSINinstelling"
                pattern="[0-9]{8,9}"
                placeholder=""
              /><span data-error
                >Voer een geldig RSIN nummer in van 8 of 9 nummers</span
              ></label
            >

            <label for="4aNaamInstelling">
              Naam instelling
              <input
                type="text"
                id="4aNaamInstelling"
                name="naamInstelling"
                pattern="[A-Za-z\.]*"
                placeholder=""
              /><span data-error>Voer de naam van de instelling in </span>
            </label>
          </fieldset>
        </fieldset>
      </div>

      <div id="form13" class="formulier">
        <fieldset class="vraag">
          <legend>4b</legend>
          <fieldset>
            <legend>Adresgegevens</legend>
            <label for="4bStraat"
              >Straat:
              <input
                type="text"
                id="4bStraat"
                name="straat"
                pattern="[A-Za-z\.]*"
                placeholder=""
              /><span data-error>Voer de straatnaam in </span></label
            >

            <label for="4bHuisnummer">
              Huisnummer:
              <input
                type="text"
                id="4bHuisnummer"
                name="huisnummer"
                pattern="[0-9]*"
                placeholder=""
              /><span data-error>Voer het huisnummer in </span>
            </label>

            <label for="4bToevoeging"
              >Toevoeging:
              <input
                type="text"
                id="4bToevoeging"
                name="toevoeging"
                pattern="[A-Za-z]*"
                placeholder=""
            /></label>

            <label for="4bPostcode"
              >Postcode:
              <input
                type="text"
                id="4bPostcode"
                name="postcode"
                pattern="[0-9]{4}[A-Za-z]{2}"
                placeholder=""
              /><span data-error
                >Voer een geldige postcode in (1234AB)</span
              ></label
            >

            <label for="4bWoonplaats"
              >Woonplaats:
              <input
                type="text"
                id="4bWoonplaats"
                name="woonplaats"
                pattern="[A-Za-z\.]*"
                placeholder=""
              /><span data-error>Voer de woonplaats in </span></label
            >

            <label for="4bLand"
              >Land:
              <input
                type="text"
                id="4bLand"
                name="landcode"
                placeholder="Nederland"
              />
            </label>
          </fieldset>
        </fieldset>
      </div>

      <div id="form14" class="formulier">
        <fieldset class="vraag">
          <legend>4c</legend>
          <fieldset>
            <legend>
              Wat is de relatie van deze verkrijger met de overledene?
            </legend>
            <label for="echtgenoot"
              ><input
                type="radio"
                id="echtgenoot"
                name="relatie"
                value="echtgenoot"
              />
              Echtgenoot</label
            >

            <label for="zonderNotarieleAkte"
              ><input
                type="radio"
                id="zonderNotarieleAkte"
                name="relatie"
                value="ja"
              />
              Samenwoner zonder notariële akte</label
            >

            <!-- subvraag -->

            <fieldset id="zonderNotarieleAkteExtra">
              <legend>
                Stonden de verkrijger en de overledene tot de overlijdens
                datum minstens 5 jaar op hetzelfde adres ingeschreven in de
                Basisregistratie Personen (BRP) of een vergelijkbare
                administratie buiten Nederland?
              </legend>
              <label for="ja5Jaar"
                ><input
                  type="radio"
                  id="ja5Jaar"
                  name="relatieSamenwonerMetAkte"
                />
                Ja
              </label>
              <label for="nee5Jaar"
                ><input
                  type="radio"
                  id="nee5Jaar"
                  name="relatieSamenwonerMetAkte"
                />
                Nee
              </label>
            </fieldset>

            <label for="metNotarieleAkte"
              ><input
                type="radio"
                id="metNotarieleAkte"
                name="relatie"
                value="ja"
              />
              metNotarieleAkte</label
            >

            <!-- subvraag -->
            <!-- datum subvraag -->

            <fieldset id="metNotarieleAkteExtra">
              <legend>
                Is het samenlevingscontract minstens 6 maanden voor het
                overlijden opgesteld?
              </legend>
              <label for="ja6Maanden"
                ><input
                  type="radio"
                  id="ja6Maanden"
                  name="relatieSamenwonerMetAkte"
                />
                Ja
              </label>
              <label for="nee6Maanden"
                ><input
                  type="radio"
                  id="nee6Maanden"
                  name="relatieSamenwonerMetAkte"
                />
                Nee
              </label>
              <fieldset>
                <legend>Datum notariële samen levings overeenkomst</legend>
                <label for="datumNotarieleAkte"
                  >Datum notariële akte
                  <input
                    type="date"
                    id="datumNotarieleAkte"
                    name="datumNotarieleAkte"
                  />
                </label>
              </fieldset>
            </fieldset>

            <label for="ouder"
              ><input
                type="radio"
                id="ouder"
                name="relatie"
                value="ouder"
              />
              Ouder</label
            >

            <label for="exPartner">
              <input
                type="radio"
                id="exPartner"
                name="relatie"
                value="exPartner"
              />
              Ex-partner
            </label>

            <label for="kind">
              <input type="radio" id="kind" name="relatie" value="kind" />
              Kind
            </label>

            <label for="kindMetBeperking">
              <input
                type="radio"
                id="kindMetBeperking"
                name="relatie"
                value="kindMetBeperking"
              />
              Kind met beperking
            </label>

            <label for="pleegkind">
              <input
                type="radio"
                id="pleegkind"
                name="relatie"
                value="pleegkind"
              />
              Pleegkind
            </label>

            <label for="kleinkind">
              <input
                type="radio"
                id="kleinkind"
                name="relatie"
                value="kleinkind"
              />
              Kleinkind
            </label>

            <label for="achterKleinKind">
              <input
                type="radio"
                id="achterKleinKind"
                name="relatie"
                value="achterKleinKind"
              />
              Achterkleinkind
            </label>

            <label for="algemeenNutBeogendeInstelling">
              <input
                type="radio"
                id="algemeenNutBeogendeInstelling"
                name="relatie"
                value="algemeenNutBeogendeInstelling"
              />
              Algemeen nut beogende instelling
            </label>

            <label for="sociaalBelangBehartigendeInstelling">
              <input
                type="radio"
                id="sociaalBelangBehartigendeInstelling"
                name="relatie"
                value="sociaalBelangBehartigendeInstelling"
              />
              Sociaal belang behartigende instelling
            </label>

            <label for="anders">
              <input
                type="radio"
                id="anders"
                name="relatie"
                value="ander"
              />
              Overige
            </label>
          </fieldset>
        </fieldset>
      </div>

      <div id="form15" class="formulier">
        <fieldset class="vraag">
          <legend>4d</legend>
          <fieldset id="fieldsetBreuk">
            <legend>
              Wat is het erfdeel van deze verkrijger? Geef het erfdeel op
              als breuk, bijvoorbeeld 1/4, of als percentage. Krijgt deze
              verkrijger alleen een legaat of doet deze verkrijger een
              beroep op zijn legitieme portie? Vul dan 0/1 in.
            </legend>
            <div>
              <label for="breuk"
                >Breuk <input type="number" id="breuk" name="breuk" /> /
              </label>
              <label for="breuk2">
                <input type="number" id="breuk2" name="breuk2" />
              </label>
            </div>
            <label for="percentage"
              >Percentage
              <input type="number" id="percentage" name="percentage" />
            </label>
            <label for="percentage2"
              >% <input type="number" id="percentage2" name="percentage2"
            /></label>
          </fieldset>
          <fieldset>
            <legend>
              Doet deze verkrijger een beroep op diens legitieme portie?
            </legend>
            <label for="jaLegitiemePortie">
              <input
                type="radio"
                id="jaLegitiemePortie"
                name="legitiemePort"
              />
              Ja
            </label>
            <label for="neeLegitiemePortie">
              <input
                type="radio"
                id="neeLegitiemePortie"
                name="legitiemePort"
              />
              Nee
            </label>
          </fieldset>
          <fieldset>
            <legend>Is er sprake van vrucht-gebruik?</legend>
            <label for="jaVruchtGebruik">
              <input
                type="radio"
                id="jaVruchtGebruik"
                name="vruchtGebruik"
              />
              Ja
            </label>
            <label for="neeVruchtGebruik">
              <input
                type="radio"
                id="neeVruchtGebruik"
                name="vruchtGebruik"
              />
              Nee
            </label>
            <fieldset id="vruchtGebruikExtra">
              <legend>
                Vraagt de partner van de overledene of iemand anders die het
                vruchtgebruik van de woning krijgt om uitstel van betaling?
              </legend>
              <label for="jaUitstelBetaling">
                <input
                  type="radio"
                  id="jaUitstelBetaling"
                  name="uitstelBetaling"
                />
                Ja
              </label>

              <label for="neeUitstelBetaling">
                <input
                  type="radio"
                  id="neeUitstelBetaling"
                  name="uitstelBetaling"
                />
                Nee
              </label>
              <label for="waardeVruchtGebruik">
                Waarde vruchtgebruik
                <input
                  type="number"
                  id="waardeVruchtGebruik"
                  name="waardeVruchtGebruik"
                />
              </label>
            </fieldset>
          </fieldset>

          <fieldset>
            <legend>
              Heeft deze verkrijger een partner die ook een erfdeel of een
              legaat van de overledene krijgt?
            </legend>
            <label for="jaPartnerErfdeel">
              <input
                type="radio"
                id="jaPartnerErfdeel"
                name="partnerErfdeel"
              />
              Ja
            </label>
            <label for="neePartnerErfdeel">
              <input
                type="radio"
                id="neePartnerErfdeel"
                name="partnerErfdeel"
              />
              Nee
            </label>

            <fieldset id="naamPartnerErfdeelFieldset">
              <legend>Naam van partner</legend>
              <label for="naamPartnerErfdeel"
                >Naam partner
                <input
                  type="text"
                  id="naamPartnerErfdeel"
                  name="naamPartnerErfdeel"
                />
              </label>
              <label for="bsnPartnerErfdeel"
                >Burgerservicenummer/RSIN
                <input
                  type="text"
                  id="bsnPartnerErfdeel"
                  name="bsnPartnerErfdeel"
                  pattern="[0-9]{8,9}"
                />
              </label>
            </fieldset>
          </fieldset>
          <fieldset>
            <legend>
              Krijgt deze verkrijger 1 of meer legaten van de overledene? Er
              bestaan ‘legaten vrij van recht’ en ‘legaten niet vrij van
              recht’. Een verkrijger kan beide krijgen. Lees de toelichting
              bij vraag 4e.
            </legend>
            <label for="jaLegaat">
              <input type="radio" id="jaLegaat" name="legaat" />
              Ja
            </label>
            <label for="neeLegaat">
              <input type="radio" id="neeLegaat" name="legaat" />
              Nee
            </label>
          </fieldset>

          <div id="legatenContainer">
            <section id="legaat1">
              <h3>Specificatie legaat 1</h3>
              <fieldset>
                <label for="omschrijvingLegaat1"
                  >Omschrijving van het legaat
                  <input
                    type="text"
                    id="omschrijvingLegaat1"
                    name="omschrijvingLegaat1"
                /></label>

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
            </section>
          </div>
          <button id="addLegaatBtn">Voeg een legaat toe</button>

          <fieldset>
            <legend>4f</legend>
            <p>Inbreng van een schenking in de nalatenschap</p>
            <label for="OmschrijvingVanDeInbreng">
              Omschrijving van de inbreng <input type="text" id="OmschrijvingVanDeInbreng">
            </label>
            <label for="WaardeVanDeInbreng">
              Waarde van de inbreng <input type="number" id="WaardeVanDeInbreng">
            </label>
          </fieldset>
        

        <fieldset>
          <legend>4g</legend>
          <label for="4gDatum">
            Datum <input type="date" id="4gDatum" name="datum" />
          </label>
          <label for="4gHandtekening"
            >Handtekening
            <input
              type="file"
              id="4gHandtekening"
              name="handtekening"
              accept="image/png, image/jpeg">
          </label>
        </fieldset>
      </fieldset>

    
      </div>
        `;
    document.getElementById('formsContainer').appendChild(formSection);
  }


  document.getElementById('addFormBtn').addEventListener('click', addFormSection);
});