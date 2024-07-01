// function validateForm(){
//     const firstNameInput = document.getElementById('firstName');
//     const lastNameInput = document.getElementById('lastName');
//     const phoneNumberInput = document.getElementById('phoneNumber');
//    // const emeilInput = document.getElementById('emeil');

//     const errorFirstName = document.getElementById('errorFirstName');
//     const errorLastName = document.getElementById('errorLastName');
//     const errorPhoneNumber = document.getElementById('errorPhoneNumber');
//     // const errorEmeil = document.getElementById('errorEmeil');
//     const errorsSummary = document.getElementById('errorsSummary');


//     resetErrors([firstNameInput, lastNameInput, phoneNumberInput],[errorFirstName,errorLastName,errorPhoneNumber],errorsSummary);
    
//     let valid = true;

//     if(!checkRequired(firstNameInput.value)){
//         valid = false;
//         firstNameInput.classList.add("error-input");
//         errorFirstName.innerText = "Pole jest wymagane";
//     } else if(!checkTextLengthRange(firstNameInput.value,2,15)){
//         valid = false;
//         firstNameInput.classList.add("error-input");
//         errorFirstName.innerText = "Pole powinno zawierać od 2 do 15 znaków";
//     }

//     if(!checkRequired(lastNameInput.value)){
//         valid = false;
//         lastNameInput.classList.add("error-input");
//         errorLastName.innerText = "Pole jest wymagane";
//     } else if(!checkTextLengthRange(lastNameInput.value,2,15)){
//         valid = false;
//         lastNameInput.classList.add("error-input");
//         errorLastName.innerText = "Pole powinno zawierać od 2 do 15 znaków";
//     }

//     if(!checkRequired(phoneNumberInput.value)){
//         valid = false;
//         phoneNumberInput.classList.add("error-input");
//         errorPhoneNumber.innerText = "Pole jest wymagane";
//     } else if(!checkTextLengthRange(phoneNumberInput.value,9,9)){
//         valid = false;
//         phoneNumberInput.classList.add("error-input");
//         errorPhoneNumber.innerText = "Pole powinno zawierać 9 cyfr";   
//     }  else if(!checkNumber(phoneNumberInput.value)){
//         valid = false;
//         phoneNumberInput.classList.add("error-input");
//         errorPhoneNumber.innerText = "Pole powinno być liczbą"
//     }

//     // if(emeilInput.value !== "") {
//     //     if(!checkTextLengthRange(emeilInput.value, 0, 9)){
//     //         valid = false;
//     //         emeilInput.classList.add("error-input");
//     //         errorEmeil.innerText = "pole powino miec maximum 10 znakow";
//     //     }else if (!checkEmeil(emeilInput.value)) {
//     //         valid = false;
//     //         emeilInput.classList.add("error-input");
//     //         errorEmeil.innerText = "Field should have a right email adres";
//     //     }
//     // }


//     if(!valid){
//         errorsSummary.innerText = "Formularz zawiera błędy";
//     }
//     return valid;


// }