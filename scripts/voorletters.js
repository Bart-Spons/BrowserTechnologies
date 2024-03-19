////////////////////////////////
// Script voor de voorletters //
////////////////////////////////

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
