document.addEventListener('DOMContentLoaded', function () {
    const formulier = document.getElementById('form2');

    // Dynamische logica voor het tonen van vervolgsecties
    formulier.addEventListener('change', function (e) {
        const huidigeSectie = e.target.closest('.vraagContainer');
        const volgendeId = e.target.getAttribute('data-next');
        const volgendeSectie = document.getElementById(volgendeId);

        let volgende = huidigeSectie.nextElementSibling;
        while (volgende) {
            if (volgende.classList.contains('vraagContainer')) {
                volgende.classList.add('verborgen');
            }
            volgende = volgende.nextElementSibling;
        }

        if (volgendeSectie) {
            volgendeSectie.classList.remove('verborgen');
        }
    });

    // Validatie en feedback
    formulier.addEventListener('input', function (e) {
        const target = e.target;
        const feedbackElement = document.querySelector(`.feedback[data-for="${target.id}"]`);

        if (target.validity.valid) {
            feedbackElement.classList.add('verborgen');
        } else {
            feedbackElement.classList.remove('verborgen');
        }
    });

    // Specifieke logica voor het tonen/verbergen van de huwelijk sectie
    var verrekenbedingJaRadio = document.querySelector('#verrekenbedingJa');
    var huwelijkContainer = document.querySelector('.huwelijk');

    function checkVerrekenbedingRadio() {
        if (verrekenbedingJaRadio.checked) {
            huwelijkContainer.style.display = 'block';
        } else {
            huwelijkContainer.style.display = 'none';
        }
    }

    document.querySelectorAll('input[name="verrekenbeding"]').forEach(radio => {
        radio.addEventListener('change', checkVerrekenbedingRadio);
    });

    // Initieel de check uitvoeren
    checkVerrekenbedingRadio();
});


//trouwdatum niet laten zien, dit moet nog
document.addEventListener('DOMContentLoaded', function () {
    var verrekenbedingJaRadio = document.querySelector('#verrekenbedingJa');
    var huwelijkContainer = document.querySelector('.huwelijk');

    function checkVerrekenbedingRadio() {
        if (verrekenbedingJaRadio.checked) {
            huwelijkContainer.style.display = 'block';
        } else {
            huwelijkContainer.style.display = 'none';
        }
    }

    verrekenbedingJaRadio.addEventListener('change', checkVerrekenbedingRadio);
    document.querySelector('#verrekenbedingNee').addEventListener('change', checkVerrekenbedingRadio);

    // Call checkVerrekenbedingRadio to set the initial state
    checkVerrekenbedingRadio();
});

//form1 laten zien en form2 nog niet
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

    function formIsVolledigIngevuld(form) {
        // Deze functie controleert of alle vereiste velden van het formulier zijn ingevuld
        let isValid = true;
        form.querySelectorAll('input[required], select[required], textarea[required]').forEach(input => {
            if (!input.value.trim()) isValid = false; // Verifieert of het veld ingevuld is
        });
        return isValid;
    }
});

