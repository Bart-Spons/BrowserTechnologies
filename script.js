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

// te lange bsn nummer
// error message laten zien
// var bsnInput = document.getElementById('burgerservicenummer');
// var errorMessageSpan = document.getElementById('bsn-error-message');

// bsnInput.addEventListener('input', function () {
//     var inputValue = bsnInput.value;
//     if (inputValue.length > 9) {
//         // Toon de foutmelding
//         errorMessageSpan.style.display = 'block';
//     } else {
//         // Verberg de foutmelding als het aantal tekens correct is
//         errorMessageSpan.style.display = 'none';
//     }
// });

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

});

// Als ja is ingevuld, dan moet de optionele vragen getoond worden
// De volgende button mag pas werken als alle optionele vragen zijn ingevuld
// Bij nee kan de gebruiker door naar de volgende vraag, dit werkt al goed. De Optionele vragen worden dan ook niet getoond
// Als alle optionele vragen zijn ingevuld, dan kan de gebruiker door naar de volgende vraag. Anders niet.

// Event listener for the "ja" option
document.querySelectorAll('input[type="radio"][value="ja"]').forEach(option => {
    option.addEventListener('change', function () {
        const huidigForm = option.closest('.formulier');
        const optioneleVragen = huidigForm.querySelectorAll('.optioneel');
        const volgendeBtn = huidigForm.querySelector('.volgendeBtn');

        if (option.checked) {
            // Show the optional questions
            optioneleVragen.forEach(vraag => {
                vraag.classList.remove('verborgen');
            });

            // Disable the next button until all optional questions are filled
            volgendeBtn.disabled = true;

            // Event listener for optional question inputs
            optioneleVragen.forEach(vraag => {
                const input = vraag.querySelector('input, select, textarea');
                input.addEventListener('change', function () {
                    // Check if all optional questions are filled
                    const allFilled = Array.from(optioneleVragen).every(vraag => {
                        const input = vraag.querySelector('input, select, textarea');
                        return input.value.trim() !== '';
                    });

                    // Enable the next button if all optional questions are filled
                    volgendeBtn.disabled = !allFilled;
                });
            });
        } else {
            // Hide the optional questions
            optioneleVragen.forEach(vraag => {
                vraag.classList.add('verborgen');
            });

            // Enable the next button
            volgendeBtn.disabled = false;
        }
    });
});