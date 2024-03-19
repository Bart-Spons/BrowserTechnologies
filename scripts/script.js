// Wacht tot de DOM volledig geladen is
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM is geladen');

    initFormulieren();
    initOptioneleVragen();
    initForm5Inputs();
    // initLocalStorage();
});

// alle vragen verbergen behalve de eerste per pagina
function initFormulieren() {
    const formulieren = document.querySelectorAll('.formulier');

    formulieren.forEach((formulier, index) => {
        // Alleen specifieke formulieren tonen
        if (![0, 1, 4, 6].includes(index)) {
            formulier.classList.add('verborgen');
        }
        formulier.addEventListener('change', (event) => handleFormChange(event, formulier));
    });
}

// standaard de optionele vragen verbergen
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
function showNext(e) {
    const huidigeSectie = e.target.closest('.vraagContainer');
    const isNested = huidigeSectie.getAttribute('data-id');
    if (!isNested) return false;

    let volgendeSectie = huidigeSectie.nextElementSibling;
    let showedSomething = false;

    while (volgendeSectie && volgendeSectie.classList.contains('optioneel')) {
        if (e.target.defaultValue === 'ja') {
            volgendeSectie.classList.remove('verborgen');
            volgendeSectie.querySelectorAll('input[type="radio"]').forEach(input => input.required = true);
            showedSomething = true;
        } else if (e.target.defaultValue === 'nee') {
            volgendeSectie.classList.add('verborgen');
            volgendeSectie.querySelectorAll('input, select, textarea').forEach(resetValue);
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
// vraag 3
function veldIsVolledigIngevuld(veld) {
    if (veld.offsetParent === null) return true;
    if (veld.type === 'radio') {
        return document.querySelector(`input[type="radio"][name="${veld.name}"]:checked`) !== null;
    }
    return veld.value.trim() !== '';
}

// Als de executeur is gekozen, dan moet de file input verplicht worden
// vraag 3
function makeRequired(formulier) {
    const executeur = formulier.querySelector('input[name="executeur"]:checked');
    // Verwijder eerst de required status van alle velden.
    const inputs = formulier.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => {
        input.required = false;
    });

    if (executeur) {
        // Stel alleen het relevante file input veld in als verplicht, zonder andere velden te resetten.
        const fileName = `${executeur.id}File`;
        const fileInput = formulier.querySelector(`input[name="${fileName}"]`);
        if (fileInput) fileInput.required = true;
    }
}


