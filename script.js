// Query voor alle formulier (als iedere form de class heeft)
const formulieren = document.querySelectorAll('.formulier');


// DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function () {
    // moet een keer te zien zijn in de dom
    console.log('DOM is geladen');

    // alle formulieren verbergen
    formulieren.forEach((formulier, index) => {
        // Het eerste formulier laten zien
        if (index !== 0) {
            formulier.classList.add('verborgen');
        }
        // Dynamische logica voor het tonen van vervolgsecties
        formulier.addEventListener('change', showNext);
    });

    // alle optionele verborgen maken
    const optioneleVragen = document.querySelectorAll('.optioneel');
    // for loop om alle optionele vragen te verbergen
    optioneleVragen.forEach(vraag => {
        vraag.classList.add('verborgen');
    });
});

// e = event
// functie om de volgende vraag te laten zien

const showNext = (e) => {
    // console.log({ e });
    // console.log(e.target.defaultValue);

    // huidige sectie
    const huidigeSectie = e.target.closest('.vraagContainer');
    // console.log({ huidigeSectie });

    // nested bevat meer optionele vragen (niet verplichte vragen)
    const isNested = huidigeSectie.getAttribute('data-id');

    // console.log(isNested);

    // als er geen nested is, geen optionele vragen
    if (!isNested) return;


    let volgendeSectie = huidigeSectie.nextElementSibling;

    // Blijf de volgende sectie zoeken tot je een sectie vindt die niet optioneel is
    // of tot je geen volgende sectie meer hebt
    while (volgendeSectie) {
        // Controleer of de volgende sectie de gewenste eigenschap heeft
        if (volgendeSectie.classList.contains('optioneel')) {
            // Doe de actie afhankelijk van de gebruikerskeuze
            if (e.target.defaultValue === 'ja') {
                volgendeSectie.classList.remove('verborgen');
            } else if (e.target.defaultValue === 'nee') {
                volgendeSectie.classList.add('verborgen');
            }

        }
        // Stop de loop zodra je een niet-optionele sectie hebt verwerkt
        else break;

        // Ga naar de volgende sectie als de huidige sectie niet voldoet
        volgendeSectie = volgendeSectie.nextElementSibling;
    }

}



// const volgendeSectie = document.getElementById(volgendeId);
// // als er geen volgende is
// if (volgendeId === null) return;


// let volgende = huidigeSectie.nextElementSibling;
// while (volgende) {
//     if (volgende.classList.contains('vraagContainer')) {
//         volgende.classList.add('verborgen');
//     }
//     volgende = volgende.nextElementSibling;
// }

// if (volgendeSectie) {
//     volgendeSectie.classList.remove('verborgen');
// }





//form1 laten zien en form2 nog niet
// volgende form button
// werkt alleen bij de eerste form
document.addEventListener('DOMContentLoaded', function () {
    // Alle buttons heten volgendeBtn (class)
    document.querySelectorAll('.volgendeBtn').forEach(btn => {
        // Event listener voor elke button
        btn.addEventListener('click', function () {
            const huidigForm = btn.closest('.formulier');
            const alleVelden = huidigForm.querySelectorAll('input[required], input[pattern]');

            let formIsValid = true;
            alleVelden.forEach(veld => {
                if (!veld.checkValidity()) {
                    // border wordt rood
                    veld.classList.add('invalid'); // Voeg de 'invalid' klasse toe
                    veld.classList.remove('valid'); // Verwijder 'valid' als het veld ongeldig is
                    formIsValid = false;
                } else {
                    // border was rood maar dat wordt nu weggehaald
                    veld.classList.remove('invalid'); // Verwijder de 'invalid' klasse
                    // border wordt groen
                    veld.classList.add('valid'); // Voeg de 'valid' klasse toe als het veld geldig is
                }
            });

            // Als het formulier geldig is, ga dan naar het volgende formulier (wordt ingeladen)
            if (formIsValid) {
                const volgendeFormId = btn.getAttribute('data-next');
                const volgendeForm = document.getElementById(volgendeFormId);
                volgendeForm.classList.remove('verborgen');
            }
            //else {
            // Als het formulier ongeldig is, toon dan een bericht
            //    alert('Vul alstublieft alle vereiste velden in.');
            // moet nog optimaler
            // dit is nog niet de juiste oplossing, ook heel vervelend voor de gebruiker
            //  }
        });
    });

    // overlijdensdatum mag niet in de toekomst zijn
    // bron: https://www.w3schools.com/js/js_date_methods.asp

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("overlijdensdatum").setAttribute("max", today);
    document.getElementById("huwelijksdatum").setAttribute("max", today);

    // dit werkt ongeveer
    // nog even uitwerken

    // function formIsVolledigIngevuld(form) {
    //     // Deze functie controleert of alle vereiste velden van het formulier zijn ingevuld

    //     const inputs = form.querySelectorAll('input[required], select[required], textarea[required]')
    //     const radioGroupsChecked = new Set();


    //     for (const input of inputs) {
    //         const vraagContainer = input.closest('.vraagContainer');

    //         if (vraagContainer.classList.contains('verborgen')) continue;
    //         console.log(input);
    //         //trim = verwijderd spaties
    //         if (!input.value.trim()) return false; // Verifieert of het veld ingevuld is


    //         // dit werkt niet maar in theorie moet dit een radiobutton worden
    //         if (input.type === 'radio') {
    //             const name = input.name;

    //             // Sla deze stap over als deze groep radiobuttons al is gecontroleerd
    //             if (radioGroupsChecked.has(name)) continue;

    //             // Controleer of ten minste één knop in de groep is geselecteerd
    //             const isSelected = form.querySelector(`input[type="radio"][name="${name}"]:checked`) !== null;

    //             if (!isSelected) {
    //                 // Geen radioknop geselecteerd in deze groep
    //                 return false;
    //             }

    //             // Markeer deze groep als gecontroleerd
    //             radioGroupsChecked.add(name);
    //         }

    //     }
    //     return true;
    // }


    // Zorg ervoor dat je deze functie ergens aanroept, bijvoorbeeld als onderdeel van een formulier submit handler
    // Bijvoorbeeld:
    // document.querySelector('form').onsubmit = function() {
    //     return formIsVolledigIngevuld(this);
    // };



});

