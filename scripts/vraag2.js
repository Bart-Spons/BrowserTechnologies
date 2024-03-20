// call in de DOM

function initForm5Inputs() {
    document.querySelectorAll('#form5 fieldset input[type="text"]').forEach(input => {
        input.addEventListener('input', checkInputsAndDisableOthers);
    });
}

function checkInputsAndDisableOthers() {
    const inputs = document.querySelectorAll('#form5 fieldset input[type="text"]');
    const anyInputFilled = Array.from(inputs).some(input => input.value.trim() !== '');

    inputs.forEach(input => {
        input.disabled = anyInputFilled && input.value.trim() === '';
    });
}