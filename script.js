// Query voor alle formulier (als iedere form de class heeft)
const formulieren = document.querySelectorAll('.formulier');

  ///////////////////////////////////////////
  // Alle formulieren verbergen //
  ///////////////////////////////////////////

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
        formulier.addEventListener('change', () => {
            const isValid = validateForm(formulier);
            if (isValid === null) return;

            if (isValid) {
                // hij is valid, klopt
                // moet er nog meer weergegeven worden?
                // zo nee, dan ga naar het volgende formulier als de form valid is
                nextForm(formulier);
            }
        });
    });

    ///////////////////////////////////////////
    // alle optionele vragen verborgen maken //
    ///////////////////////////////////////////

    const optioneleVragen = document.querySelectorAll('.optioneel');
    // for loop om alle optionele vragen te verbergen
    optioneleVragen.forEach(vraag => {
        vraag.classList.add('verborgen');
    });
});


///////////////////////////////////////////////////
// Functie om de waarde van een veld te resetten //
///////////////////////////////////////////////////

function resetvalue(e) {
    const type = e.getAttribute('type');
    if (type === 'radio') {
        e.checked = e.id.includes('nee');
    } else {
        e.value = '';
    }
}

//////////////////////////////////////////////////////////////////////////
// functie om de volgende vraag te laten zien                           //
// Resetten van de optionele vragen als de gebruiker nee heeft ingevuld //
//////////////////////////////////////////////////////////////////////////

const showNext = (e) => {
    // console.log({ e });
    // console.log(e.target.defaultValue);

    // huidige sectie
    const huidigeSectie = e.target.closest('.vraagContainer');
    // console.log({ huidigeSectie });

    // nested bevat meer optionele vragen (niet verplichte vragen)
    const isNested = huidigeSectie.getAttribute('data-id');

    //Checken de vraag in de form nested is
    console.log(isNested);

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
                // Reset alle waarden van de velden die in nested zitten
                const input = volgendeSectie.querySelector('input, select, textarea');
                resetvalue(input);
            }

        }
        // Stop de loop zodra je een niet-optionele sectie hebt verwerkt
        else break;

        // Ga naar de volgende sectie als de huidige sectie niet voldoet
        volgendeSectie = volgendeSectie.nextElementSibling;
    }

}

// Deze functie controleert of alle vereiste velden van het formulier zijn ingevuld
function veldIsVolledigIngevuld(veld) {
    console.log({ veld });
    if (veld.value.trim()) return true; // Verifieert of het veld ingevuld is
    else return false;
};



// Functie om te controleren of het formulier geldig is
// Als het formulier geldig is, ga dan naar het volgende formulier (wordt ingeladen)
const validateForm = (form) => {
    const huidigForm = form;
    const alleVelden = huidigForm.querySelectorAll('input[required], input[pattern]');
    console.log({ alleVelden });
    console.log({ huidigForm });
    let formIsValid = true;

    // Loop door alle velden van het formulier
    for (let i = 0; i < alleVelden.length; i++) {
        const veld = alleVelden[i];
        if (!veldIsVolledigIngevuld(veld)) {

            formIsValid = null;
        }
    }

    if (formIsValid === null) return formIsValid;

    // Deze loop controleert of alle velden correct zijn ingevuld
    for (let i = 0; i < alleVelden.length; i++) {
        const veld = alleVelden[i];
        console.log('isIngevuld ' + veldIsVolledigIngevuld(veld));

        if (!veld.checkValidity()) {
            // border wordt rood
            veld.classList.add('invalid'); // Voeg de 'invalid' klasse toe
            // border was groen maar wordt nu rood
            veld.classList.remove('valid'); // Verwijder 'valid' als het veld ongeldig is
            formIsValid = false;
        } else {
            // border was rood maar dat wordt nu weggehaald
            veld.classList.remove('invalid'); // Verwijder de 'invalid' klasse
            // border wordt groen
            veld.classList.add('valid'); // Voeg de 'valid' klasse toe als het veld geldig is
        }

    };
    return formIsValid;

    // Als het formulier helemaal is ingevuld
    // Dan gaat javascript checken of alles correct is ingevuld
    // Is alles correct ingevuld, dan gaat het naar het volgende formulier

    // Als het formulier geldig is, ga dan naar het volgende formulier (wordt ingeladen)

}

const nextForm = (huidigeForm) => {
    const volgendeForm = huidigeForm.nextElementSibling;
    volgendeForm.classList.remove('verborgen');
}


/////////////////////////////////////////
//form1 laten zien en form2 nog niet
// volgende form button
// werkt alleen bij de eerste form
/////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    // Alle buttons heten volgendeBtn (class)
    document.querySelectorAll('.volgendeBtn').forEach(btn => {
        // Event listener voor elke button
        const huidigForm = btn.closest('.formulier');

        btn.addEventListener('click', () => {
            const isValid = validateForm(huidigForm, btn);
            if (isValid === null) return;

            if (isValid) {
                nextForm(huidigForm);
            }


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
// document.querySelectorAll('input[type="radio"][value="ja"]').forEach(option => {
//     option.addEventListener('change', function () {
//         const huidigForm = option.closest('.formulier');
//         const optioneleVragen = huidigForm.querySelectorAll('.optioneel');
//         const volgendeBtn = huidigForm.querySelector('.volgendeBtn');

//         if (option.checked) {
//             // Show the optional questions
//             optioneleVragen.forEach(vraag => {
//                 vraag.classList.remove('verborgen');
//             });

//             // Disable the next button until all optional questions are filled
//             volgendeBtn.disabled = true;

//             // Event listener for optional question inputs
//             optioneleVragen.forEach(vraag => {
//                 const input = vraag.querySelector('input, select, textarea');
//                 input.addEventListener('change', function () {
//                     // Check if all optional questions are filled
//                     const allFilled = Array.from(optioneleVragen).every(vraag => {
//                         const input = vraag.querySelector('input, select, textarea');
//                         return input.value.trim() !== '';
//                     });

//                     // Enable the next button if all optional questions are filled
//                     volgendeBtn.disabled = !allFilled;
//                 });
//             });
//         } else {
//             // Hide the optional questions
//             optioneleVragen.forEach(vraag => {
//                 vraag.classList.add('verborgen');
//             });

//             // Enable the next button
//             volgendeBtn.disabled = false;
//         }
//     });
// });

