// Query voor alle formulier (als iedere form de class heeft)
const formulieren = document.querySelectorAll('.formulier');


document.addEventListener('DOMContentLoaded', function () {
    // moet een keer te zien zijn in de dom
    console.log('DOM is geladen');

    // alle formulieren verbergen
    formulieren.forEach((formulier, index) => {
        if (index !== 0) {
            formulier.classList.add('verborgen');
        }
        // Dynamische logica voor het tonen van vervolgsecties
        formulier.addEventListener('change', showNext);
    });

    // alle optionele verborgen maken
    const optioneleVragen = document.querySelectorAll('.optioneel');
    // for loop om alles te verbergen
    optioneleVragen.forEach(vraag => {
        vraag.classList.add('verborgen');
    });
});

// e = event
const showNext = (e) => {
    // console.log({ e });
    // console.log(e.target.defaultValue);

    const huidigeSectie = e.target.closest('.vraagContainer');
    // console.log({ huidigeSectie });
    const isNested = huidigeSectie.getAttribute('data-id');

    // console.log(isNested);

    if (!isNested) return;

    let volgendeSectie = huidigeSectie.nextElementSibling;

    // Blijf de volgende sectie zoeken tot je een sectie vindt die niet optioneel is
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
        else break; // Stop de loop zodra je een niet-optionele sectie hebt verwerkt

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
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.volgendeBtn').forEach(btn => {
        btn.addEventListener('click', function () {
            const huidigForm = btn.closest('.formulier');
            if (formIsVolledigIngevuld(huidigForm)) {

                const volgendeFormId = btn.getAttribute('data-next');
                const volgendeForm = document.getElementById(volgendeFormId);
                // Verwijder de 'verborgen' klasse om het volgende formulier te tonen
                volgendeForm.classList.remove('verborgen');
            } else {
                alert('Vul alstublieft alle vereiste velden in.');
            }
        });
    });



    // dit werkt ongeveer
    // nog even uitwerken

    function formIsVolledigIngevuld(form) {
        // Deze functie controleert of alle vereiste velden van het formulier zijn ingevuld

        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]')
        const radioGroupsChecked = new Set();


        for (const input of inputs) {
            const vraagContainer = input.closest('.vraagContainer');

            if (vraagContainer.classList.contains('verborgen')) continue;
            console.log(input);
            //trim = verwijderd spaties
            if (!input.value.trim()) return false; // Verifieert of het veld ingevuld is


            // dit werkt niet maar in theorie moet dit een radiobutton worden
            if (input.type === 'radio') {
                const name = input.name;

                // Sla deze stap over als deze groep radiobuttons al is gecontroleerd
                if (radioGroupsChecked.has(name)) continue;

                // Controleer of ten minste één knop in de groep is geselecteerd
                const isSelected = form.querySelector(`input[type="radio"][name="${name}"]:checked`) !== null;

                if (!isSelected) {
                    // Geen radioknop geselecteerd in deze groep
                    return false;
                }

                // Markeer deze groep als gecontroleerd
                radioGroupsChecked.add(name);
            }

        }
        return true;
    }
});

// Validatie en feedback
// Is alles ingevuld?
// formulier.addEventListener('input', function (e) {
//     const target = e.target;
//     const feedbackElement = document.querySelector(`.feedback[data-for="${target.id}"]`);

//     if (target.validity.valid) {
//         feedbackElement.classList.add('verborgen');
//     } else {
//         feedbackElement.classList.remove('verborgen');
//     }
// });