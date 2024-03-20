document.addEventListener('DOMContentLoaded', function () {
    let klikTeller = 0;
    const maxKliks = 3;
    const voegVerkrijgerToeKnop = document.getElementById('voegVerkrijgerToe');

    voegVerkrijgerToeKnop.addEventListener('click', function () {
        const verborgenSecties = document.querySelectorAll('.hidden');
        if (verborgenSecties.length > 0) {
            verborgenSecties[0].classList.remove('hidden');
            klikTeller++;
            if (klikTeller >= maxKliks) {
                voegVerkrijgerToeKnop.style.display = 'none'; // Verberg de knop
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Selecteer de radio buttons
    var jaKnop = document.getElementById('ja3d');
    var neeKnop = document.getElementById('nee3d');

    // Selecteer form11
    var form11 = document.getElementById('form11'); // Zorg ervoor dat dit het juiste ID is van form11

    // Voeg een event listener toe aan de 'Ja' knop
    jaKnop.addEventListener('change', function () {
        if (this.checked) {
            // Toon form11 als 'Ja' is geselecteerd
            form11.style.display = 'block';
        }
    });

    // Voeg een event listener toe aan de 'Nee' knop
    neeKnop.addEventListener('change', function () {
        if (this.checked) {
            // Verberg form11 als 'Nee' is geselecteerd
            form11.style.display = 'none';
        }
    });
});


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