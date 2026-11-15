// Event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.addEventListener("DOMContentLoaded", loadStates);
document.querySelector("#state").addEventListener("change", loadCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#password").addEventListener("focus", generatePassword);
document.querySelector("#password").addEventListener("change", validatePassword);
document.querySelector("#passwordAgain").addEventListener("change", validatePasswordMatch);
document.querySelector("#signupForm").addEventListener("submit", validateForm);

async function displayCity() {
    try {
        let zipCode = document.querySelector("#zip").value;
        let url = `https://csumb.space/api/geo/cityInfoAPI.php?zip=${zipCode}`;
        let response = await fetch(url);
        let data = await response.json();
        
        if (data === false) {
            document.querySelector("#city").textContent = "Zip code not found";
            document.querySelector("#latitude").textContent = "";
            document.querySelector("#longitude").textContent = "";
            return;
        }
        
        document.querySelector("#city").textContent = data.city;
        document.querySelector("#latitude").textContent = data.latitude;
        document.querySelector("#longitude").textContent = data.longitude;
    
    } catch (error) {
        document.querySelector("#city").textContent = "Unable to retrieve city";
        document.querySelector("#latitude").textContent = "Unable to retrieve latitude";
        document.querySelector("#longitude").textContent = "Unable to retrieve longitude";
        console.log(error);
    }
}

async function loadStates() {
    let stateMenu = document.querySelector("#state");
    
    stateMenu.textContent = "";
    
    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select One";
    stateMenu.appendChild(defaultOption);
    
    try {
        let url = "https://csumb.space/api/allStatesAPI.php";
        let response = await fetch(url);
        let data = await response.json();
        
        for (let item of data) {
            let option = document.createElement("option");
            option.value = item.usps;
            option.textContent = item.state;
            stateMenu.appendChild(option);
        }
    } catch (error) {
        console.error(error);
        
        stateMenu.textContent = "";
        
        let errorOption = document.createElement("option");
        errorOption.value = "";
        errorOption.textContent = "Unable to load states";
        stateMenu.appendChild(errorOption);
    }
}

async function loadCounties() {
    let countyMenu = document.querySelector("#county");
    countyMenu.textContent = "";
    
    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select One";
    countyMenu.appendChild(defaultOption);
    
    try {
        let state = document.querySelector("#state").value;
        let url = `https://csumb.space/api/geo/countyListAPI.php?state=${state}`;
        let response = await fetch(url);
        let data = await response.json();
        
        for (let item of data) {
            let option = document.createElement("option");
            option.value = item.county;
            option.textContent = item.county;
            countyMenu.appendChild(option);
        }
      } catch (error) {
            console.error(error);
            
            countyMenu.textContent = "";
            
            let errorOption = document.createElement("option");
            errorOption.value = "";
            errorOption.textContent = "Unable to load counties";
            countyMenu.appendChild(errorOption);
      }
}

async function checkUsername() {
    let username = document.querySelector("#username").value;
    let usernameError = document.querySelector("#usernameError");
    
    if (username.length === 0) {
        usernameError.textContent = "Username required";
        usernameError.style.color = "red";
        return false;
    }
    
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    
    if (data.available) {
        usernameError.textContent = "Username is available!";
        usernameError.style.color = "#198754";
        return true;
    } else {
        usernameError.textContent = "Username is taken";
        usernameError.style.color = "#dc3545";
        return false;
    }
}

function generatePassword(){
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz0123456789!@#$%";
    let password = "";
    for (let i = 0; i < 8; i++) {
        password += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    document.querySelector("#suggested").textContent = `Suggested Password: ${password}`;
}

function validatePassword() {
    let err = document.querySelector("#passErr");
    err.textContent = "";
    let password = document.querySelector("#password").value;
    if(password.length < 6){
        err.textContent = "Password must be at least 6 characters long";
        err.style.color = "#dc3545";
        return false;
    }
    return true;
}

function validatePasswordMatch(){
    let passwordErr = document.querySelector("#passwordError");
    passwordErr.textContent = "";
    let password = document.querySelector("#password").value;
    let passwordAgain = document.querySelector("#passwordAgain").value;
    if(password !== passwordAgain){
        passwordErr.textContent = "Password does not match";
        passwordErr.style.color = "#dc3545";
        return false;
    }
    return true;
}

async function validateForm(event) {
    event.preventDefault();
    
    let isValid = true;
    
    let username = document.querySelector("#username").value;
    let usernameError = document.querySelector("#usernameError");
    
    usernameError.textContent = "";
    
    if (username.length === 0) {
        usernameError.textContent = "Username required";
        usernameError.style.color = "#dc3545";
        isValid = false;
    } else {
        let usernameAvailable = await checkUsername();
        if (usernameAvailable === false) {
            isValid = false;
        }
    }
    
    if(!validatePassword() || !validatePasswordMatch()){
        isValid = false;
    }
    
    if (isValid) {
        document.querySelector("#signupForm").submit();
    }
}