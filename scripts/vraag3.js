// document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById('voegVerkrijgerToe').addEventListener('click', function () {
//         const verborgenSecties = document.querySelectorAll('.hidden');
//         if (verborgenSecties.length > 0) {
//             verborgenSecties[0].classList.remove('hidden');
//         }
//     });
// });

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