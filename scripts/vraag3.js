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
