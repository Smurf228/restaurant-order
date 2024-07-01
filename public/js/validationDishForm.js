function validateForm(){
    const clientNameInput = document.getElementById('clientName');
    const orderNumberInput = document.getElementById('orderNumber');
    const firstNameInput = document.getElementById('firstName');
    const weightInput = document.getElementById('weight');
    const priceInput = document.getElementById('price');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorClientName = document.getElementById('errorClientName');
    const errorOrderNumber = document.getElementById('errorOrderNumber');
    const errorWeight = document.getElementById('errorWeight');
    const errorPrice = document.getElementById('errorPrice');
    const errorsSummary = document.getElementById('errorsSummary');


    resetErrors([firstNameInput, clientNameInput, orderNumberInput, weightInput, priceInput],[errorFirstName,errorClientName,errorOrderNumber, errorWeight, errorPrice],errorsSummary);
    
    let valid = true;

    if(!checkRequired(firstNameInput.value)){
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(firstNameInput.value,2,15)){
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 5 do 15 znaków";
    }

    if(!checkRequired(clientNameInput.value)){
        valid = false;
        clientNameInput.classList.add("error-input");
        errorClientName.innerText = "Pole jest wymagane";
    }

    if(!checkRequired(orderNumberInput.value)){
        valid = false;
        orderNumberInput.classList.add("error-input");
        errorOrderNumber.innerText = "Pole jest wymagane";
    }

    if(!checkRequired(priceInput.value)){
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole jest wymagane"
    } else if(!checkNumber(priceInput.value)){
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole powinno być liczbą"
    }



    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }
    return valid;

}