// Wacht tot de DOM volledig geladen is
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM is geladen');

    initFormulieren();
    initOptioneleVragen();
    initForm5Inputs();
    initLocalStorage();
    //inputName();
    //  initForm5Inputs();
    // applyDotAfterLetters('voorletters');
});

// alle vragen verbergen behalve de eerste per pagina
// call in de DOM
function initFormulieren() {
    const formulieren = document.querySelectorAll('.formulier');

    formulieren.forEach((formulier, index) => {
        // Alleen specifieke formulieren tonen
        if (![0, 4, 6, 11, 12, 13, 14].includes(index)) {
            formulier.classList.add('verborgen');
        }
        formulier.addEventListener('change', (event) => handleFormChange(event, formulier));
    });
}

// standaard de optionele vragen verbergen
// call in de DOM
function initOptioneleVragen() {
    document.querySelectorAll('.optioneel').forEach(vraag => {
        vraag.classList.add('verborgen');
    });
}

// Fomulieren verplicht maken
function handleFormChange(event, formulier) {
    makeRequired(formulier);

    const showedSomething = showNext(event);
    const isValid = validateForm(formulier);

    if (isValid) {
        if (!showedSomething) {
            nextForm(formulier);
        }
    }
}

// Als de radiobutton eerst 'ja' is en daarna 'nee' moeten de optionele radiobuttons gereset worden
function resetValue(element) {
    if (element.type === 'radio') {
        element.checked = element.id.includes('nee');
    } else {
        element.value = '';
    }
}

// Optionele vragen tonen, als de radiobutton 'ja' is
// en verbergen als de radiobutton 'nee' is
// als ja, dan input verplicht maken
function showNext(e) {
    const huidigeSectie = e.target.closest('.vraagContainer');
    const isNested = huidigeSectie.getAttribute('data-id');
    if (!isNested) return false;

    let volgendeSectie = huidigeSectie.nextElementSibling;
    let showedSomething = false;

    while (volgendeSectie && volgendeSectie.classList.contains('optioneel')) {
        if (e.target.defaultValue === 'ja') {
            volgendeSectie.classList.remove('verborgen');
            volgendeSectie.querySelectorAll('input').forEach(input => input.required = true);
            showedSomething = true;
        } else if (e.target.defaultValue === 'nee') {
            volgendeSectie.classList.add('verborgen');
            volgendeSectie.querySelectorAll('input, select, textarea').forEach(resetValue);
            volgendeSectie.querySelectorAll('input').forEach(input => input.required = false);

        }
        volgendeSectie = volgendeSectie.nextElementSibling;
    }
    return showedSomething;
}



// Checken of alle velden ingevuld zijn
function validateForm(formulier) {
    const alleVelden = formulier.querySelectorAll('input[required], input[pattern]');
    for (let veld of alleVelden) {
        if (!veldIsVolledigIngevuld(veld)) {
            return false;
        }
    }
    return true;
}

// Als je naar de volgende form gaat dan moet deze niet meer verboren zijn
function nextForm(huidigeForm) {
    const volgendeForm = huidigeForm.nextElementSibling;
    if (volgendeForm) volgendeForm.classList.remove('verborgen');
}

// Checken het veld is ingevuld (voor de submit)







// sectie 4
// als ik op radiobutton ja klik, dan moet de optionele vraag getoond worden
// als ik op een andere radiobutton klik moet de optionele vraag verborgen worden
// van form 14
// sectie 4
// als ik op radiobutton ja klik, dan moet de optionele vraag getoond worden
// als ik op een andere radiobutton klik moet de optionele vraag verborgen worden, dit geld voor beide radiobuttons
// van form 14<div id="form14" class="formulier">
const form14 = document.getElementById('form14');
const radiobuttons = form14.querySelectorAll('input[type="radio"]');
radiobuttons.forEach(radiobutton => {
    radiobutton.addEventListener('change', () => {
        const optioneleVraag = form14.querySelector('.optioneel');
        if (radiobutton.value === 'ja') {
            optioneleVraag.classList.remove('verborgen');
        } else {
            optioneleVraag.classList.add('verborgen');
        }
    });
});



// const inputFields = document.querySelectorAll('.formulier input');
// inputFields.forEach(function (inputField) {
//     inputField.addEventListener("change", function () {
//         const value = inputField.value;
//         const key = 'dataSaved' + inputField.id;

//         localStorage.setItem(key, value);

//         // alert("Data opgeslagen");
//     })
// })

// window.addEventListener("load", function () {
//     inputFields.forEach(function (inputField) {
//         const key = 'dataSaved' + inputField.id;
//         const dataSaved = localStorage.getItem(key);
//         if (dataSaved !== null) {
//             inputField.value = dataSaved;
//             if (inputField.value === dataSaved) {
//                 inputField.checked = true;
//             }
//         }
//     });
// })
