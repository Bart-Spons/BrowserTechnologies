function capitalizeFirstLetter(inputElementId) {
    const inputElement = document.getElementById(inputElementId);

    if (!inputElement) {
        console.warn('Input element not found:', inputElementId);
        return;
    }

    inputElement.addEventListener('input', function () {
        if (this.value.length === 0) return; // Niets te doen als het veld leeg is
        this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
    });
}

// Vervang 'inputFieldId' met het ID van jouw inputveld.
capitalizeFirstLetter('1aAchternaam');
capitalizeFirstLetter('1dAchternaam');
capitalizeFirstLetter('1dVestigingsplaatsNotaris');
