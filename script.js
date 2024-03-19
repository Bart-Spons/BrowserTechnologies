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
        if (index !== 0 && index !== 4 && index !== 6) {
            formulier.classList.add('verborgen');
        }
        // Dynamische logica voor het tonen van vervolgsecties
        formulier.addEventListener('change', (event) => {
            makeRequired(formulier);

            const showedSomething = showNext(event);

            const isValid = validateForm(formulier);

            if (isValid === null) return;

            if (isValid) {
                // hij is valid, klopt
                // moet er nog meer weergegeven worden?
                // zo nee, dan ga naar het volgende formulier als de form valid is
                if (!showedSomething) nextForm(formulier);
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
    if (!isNested) return false;

    let volgendeSectie = huidigeSectie.nextElementSibling;

    let showedSomething = false;

    // Blijf de volgende sectie zoeken tot je een sectie vindt die niet optioneel is
    // of tot je geen volgende sectie meer hebt
    while (volgendeSectie) {
        // Controleer of de volgende sectie de gewenste eigenschap heeft
        if (volgendeSectie.classList.contains('optioneel')) {
            // Doe de actie afhankelijk van de gebruikerskeuze
            if (e.target.defaultValue === 'ja') {
                volgendeSectie.classList.remove('verborgen');
                volgendeSectie.querySelectorAll('input').forEach(input => {
                    if (input.type === "radio") input.required = true;
                });
                showedSomething = true;
            } else if (e.target.defaultValue === 'nee') {
                volgendeSectie.classList.add('verborgen');
                // Reset alle waarden van de velden die in nested zitten
                // reset alle waarden in de form
                const inputFields = volgendeSectie.querySelectorAll('input, select, textarea');
                inputFields.forEach(field => {
                    resetvalue(field);
                });
            }

        }
        // Stop de loop zodra je een niet-optionele sectie hebt verwerkt
        else break;

        // Ga naar de volgende sectie als de huidige sectie niet voldoet
        volgendeSectie = volgendeSectie.nextElementSibling;
    }

    return showedSomething;
}

// Deze functie controleert of alle vereiste velden van het formulier zijn ingevuld
function veldIsVolledigIngevuld(veld) {
    // Hiermee word gecontroleerd of de gebruiker het veld kan zien zo niet markeren we het als ingevuld
    if (veld.offsetParent === null) return true;

    // Als de input een radio button is checken we of er een radio button is geselecteerd
    if (veld.type === 'radio') {
        const name = veld.name;
        const buttons = document.querySelectorAll(`input[type="radio"][name="${name}"]`);
        return Array.from(buttons).some(radio => radio.checked);
    }

    // Als het veld geen radio button is 
    return veld.value.trim() !== '';
};



// Functie om te controleren of het formulier geldig is
// Als het formulier geldig is, ga dan naar het volgende formulier (wordt ingeladen)
const validateForm = (div) => {
    const huidigForm = div;
    const alleVelden = huidigForm.querySelectorAll('input[required], input[pattern]');
    console.log({ alleVelden });
    console.log({ huidigForm });
    let divIsValid = true;

    // Loop door alle velden van het formulier
    for (let i = 0; i < alleVelden.length; i++) {
        const veld = alleVelden[i];
        if (!veldIsVolledigIngevuld(veld)) {

            divIsValid = null;
        }
    }

    if (divIsValid === null) return divIsValid;

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
    return divIsValid;

    // Als het formulier helemaal is ingevuld
    // Dan gaat javascript checken of alles correct is ingevuld
    // Is alles correct ingevuld, dan gaat het naar het volgende formulier

    // Als het formulier geldig is, ga dan naar het volgende formulier (wordt ingeladen)

}

const nextForm = (huidigeForm) => {
    const volgendeForm = huidigeForm.nextElementSibling;
    volgendeForm.classList.remove('verborgen');
}

const inputName = document.getElementById('voorletters');

inputName.addEventListener('input', function (e) {
    // Voorkom het toevoegen van een punt na backspace of als er al een punt is
    if (e.inputType === 'deleteContentBackward' || this.value.slice(-1) === '.') {
        return;
    }
    let cleanValue = this.value.replace(/\./g, '').toUpperCase(); // Verwijder bestaande punten en converteer naar uppercase
    let newValue = cleanValue.split('').join('.') + '.'; // Voeg een punt toe na elke letter
    this.value = newValue;
});




// als de radiobutton ja in de eerste form is ingevuld, dan moeten de optionele vragen getoond worden
// als deze zijn ingevuld dan pas de volgende form laten zien
//maar als de radiobutton nee is ingevuld, dan moeten de optionele vragen niet getoond worden en kan de gebruiker door naar de volgende form




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
                const volgendeSectie = huidigForm.closest('.vraagContainer').nextElementSibling;
                if (volgendeSectie) {
                    volgendeSectie.scrollIntoView({ behavior: 'smooth' });
                }
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

    // Als de hele sectie is ingevuld moet de li groenkleuren die erbij hoort
    // Als de hele sectie is ingevuld moet de li groenkleuren die erbij hoort
    const sectie = document.querySelector('.eersteSectie');
    const inputFields = sectie.querySelectorAll('input, select, textarea');
    let isSectieIngevuld = true;

    inputFields.forEach(field => {
        if (!veldIsVolledigIngevuld(field)) {
            isSectieIngevuld = false;
            return;
        }
    });

    if (isSectieIngevuld) {
        const liElement = sectie.closest('li');
        liElement.classList.add('groenkleuren');
    } else {
        const liElement = sectie.closest('li');
        liElement.classList.remove('groenkleuren');
    }

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

// De eerste form altijd weergeven

function checkInputsAndDisableOthers() {
    // Selecteer alleen de inputs binnen de div met ID 'form5'
    const inputs = document.querySelectorAll('#form5 fieldset input[type="text"]');
    const anyInputFilled = Array.from(inputs).some(input => input.value.trim() !== '');

    inputs.forEach(input => {
        if (anyInputFilled) {
            if (input.value.trim() === '') {
                input.disabled = true; // Disable empty inputs if any input is filled
            }
        } else {
            input.disabled = false; // Enable all inputs if none are filled
        }
    });
}

function makeRequired(formulier) {
    // Zoek de geselecteerde executeur
    const executeur = formulier.querySelector('input[name="executeur"]:checked');

    if (executeur) {
        // Reset de oude inputs naar niet-verplicht en leeg
        const inputs = formulier.querySelectorAll('input[type="text"], input[type="number"]');

        inputs.forEach(input => {
            input.required = false;
            input.value = '';
        });

        // Maak de nieuwe input verplicht
        const fileName = `${executeur.id}File`;
        const fileInput = formulier.querySelector(`input[name="${fileName}"]`);
        console.log(fileName);
        console.log(fileInput);
        fileInput.required = true;
    }
}

// Voeg de event listener toe aan elke input binnen de specifieke div 'form5'
document.querySelectorAll('#form5 fieldset input[type="text"]').forEach(input => {
    input.addEventListener('input', checkInputsAndDisableOthers);
});