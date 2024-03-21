function setUpInputListener(inputElement) {
    if (!inputElement) {
        console.warn('Input element not found');
        return;
    }

    inputElement.addEventListener('input', function (e) {
        // Voorkom het toevoegen van een punt na backspace of als er al een punt is
        if (e.inputType === 'deleteContentBackward' || this.value.slice(-1) === '.') {
            return;
        }
        let cleanValue = this.value.replace(/\./g, '').toUpperCase(); // Verwijder bestaande punten en converteer naar uppercase
        let newValue = cleanValue.split('').join('.') + '.'; // Voeg een punt toe na elke letter
        this.value = newValue;
    });
}

const inputName = document.getElementById('1aVoorletters');
const inputName2 = document.getElementById('1dVoorletters');
const inputName3 = document.getElementById('2bVoorletters');

setUpInputListener(inputName);
setUpInputListener(inputName2);
setUpInputListener(inputName3);
