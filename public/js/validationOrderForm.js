function validateForm(){
    const orderNumberInput = document.getElementById('orderNumber');
    const orderTimeInput = document.getElementById('orderTime');
    const adresInput = document.getElementById('adres');

    const errorOrderNumber = document.getElementById('errorOrderNumber');
    const errorOrderTime = document.getElementById('errorOrderTime');
    const errorAdres = document.getElementById('errorAdres');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([orderNumberInput, orderTimeInput, adresInput],[errorOrderNumber,errorOrderTime,errorAdres],errorsSummary);

    let valid = true;

    if(!checkRequired(orderNumberInput.value)){
        valid = false;
        orderNumberInput.classList.add("error-input");
        errorOrderNumber.innerText = "Pole jest wymagane";
    }else if(!checkNumber(orderNumberInput.value)){
        valid = false;
        orderNumberInput.classList.add("error-input");
        errorOrderNumber.innerText = "Pole powinno być liczbą"
    }

    if(!checkRequired(orderTimeInput.value)){
        valid = false;
        orderTimeInput.classList.add("error-input");
        errorOrderTime.innerText = "Pole jest wymagane";
    }

    if(!checkRequired(adresInput.value)){
        valid = false;
        adresInput.classList.add("error-input");
        errorAdres.innerText = "Pole jest wymagane";
    }else if(!checkTextLengthRange(adresInput.value,5,20)){
        valid = false;
        adresInput.classList.add("error-input");
        errorAdres.innerText = "Pole powinno zawierać od 5 do 20 znaków";       
    }

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;

}