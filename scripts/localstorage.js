// chat gpt

function initLocalStorage() {
    const formulieren = document.querySelectorAll('.formulier');
    formulieren.forEach(function (formulier) {
        const inputFields = formulier.querySelectorAll('input');
        inputFields.forEach(function (inputField) {
            inputField.addEventListener("change", function () {
                if (inputField.type === 'radio' && inputField.checked) {
                    // For radio buttons, use the 'name' as key to store the value for the group
                    const key = 'dataSaved' + inputField.name;
                    localStorage.setItem(key, inputField.value);
                } else if (inputField.type !== 'radio') {
                    // For other input types, save as before
                    const key = 'dataSaved' + inputField.id;
                    localStorage.setItem(key, inputField.value);
                }
            });
        });

        window.addEventListener("load", function () {
            inputFields.forEach(function (inputField) {
                let key = inputField.type === 'radio' ? 'dataSaved' + inputField.name : 'dataSaved' + inputField.id;
                const dataSaved = localStorage.getItem(key);
                if (dataSaved !== null) {
                    if (inputField.type === 'radio') {
                        inputField.checked = inputField.value === dataSaved;
                        // Adjust visibility on load
                        if (inputField.checked) {
                            showNext({ target: inputField });
                        }
                    } else {
                        inputField.value = dataSaved;
                    }
                }
            });
        });
    });
}