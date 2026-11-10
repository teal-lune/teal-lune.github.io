displayQ4Choices();
let validationFdbk = document.querySelector("#validationFdbk");
validationFdbk.className = "hidden";
let totalScore = document.querySelector("#totalScore");
totalScore.className = "hidden";
let congrats = document.querySelector("#congrats");
congrats.className = "hidden";


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function displayQ4Choices() {
  let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
  shuffleArray(q4ChoicesArray);

  let choicesContainer = document.querySelector("#q4Choices");
  choicesContainer.textContent = "";

  for (let choice of q4ChoicesArray) {
    let singleChoiceCont = document.createElement('div');
    singleChoiceCont.className = "form-check";
    
    let input = document.createElement("input");
    input.type = "radio";
    input.name = "q4";
    input.id = choice;
    input.value = choice;
    input.className = "form-check-input";

    let label = document.createElement("label");
    label.htmlFor = choice;
    label.textContent = choice;
    label.className = "form-check-label";
    singleChoiceCont.appendChild(input);
    singleChoiceCont.appendChild(label);
    choicesContainer.appendChild(singleChoiceCont);
  }
}

let attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
    attempts = 0;
} else {
    attempts = Number(attempts);
}

document.querySelector("button").addEventListener("click", gradeQuiz);

let score = 0;

function setMarkImage(index, imageName, altText) {
  let markContainer = document.querySelector(`#markImg${index}`);
  markContainer.textContent = "";

  let img = document.createElement("img");
  img.src = `img/${imageName}`;
  img.alt = altText;
  img.style.width = "20px";
  markContainer.appendChild(img);
}

function rightAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Correct!";
  feedback.className = "text-success";
  setMarkImage(index, "checkmark.png", "Checkmark");
  score += 10;
}

function wrongAnswer(index) {
  let feedback = document.querySelector(`#q${index}Feedback`);
  feedback.textContent = "Incorrect!";
  feedback.className = "text-danger";
  setMarkImage(index, "xmark.png", "X mark");
}

function isFormValid(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10) {
    let isValid = true;
    
    if(q1 === "" && q2 === "" && q3 === true && q4 === null && q5 === "" && q6 === "" && q7 === "" && q8 === "" && q9 === "" && q10 === ""){
        isValid = false;
        validationFdbk.className = "alert alert-danger";
        validationFdbk.textContent = "Answer at least one question";
        
        for(let i = 1; i < 11; i++){
            wrongAnswer(i);
        }
    }
    return isValid;
}



function gradeQuiz() {
    validationFdbk.className = "hidden";
    validationFdbk.textContent = "";
    
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let isQ3Empty = !document.querySelector("#Jefferson").checked && !document.querySelector("#Roosevelt").checked && !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked;
    
    let selectedQ4 = document.querySelector("input[name=q4]:checked");
    let q5Response = document.querySelector("#q5").value;
    let q6Response = document.querySelector("#q6").value.toLowerCase();
    let q7Response = document.querySelector("#q7").value.toLowerCase();
    let q8Response = document.querySelector("#q8").value;
    let q9Response = document.querySelector("#q9").value.toLowerCase();
    let q10Response = document.querySelector("#q10").value.toLowerCase();
    
    if(!isFormValid(q1Response, q2Response, isQ3Empty, selectedQ4, q5Response, q6Response, q7Response, q8Response, q9Response, q10Response)){
        totalScore.className = "hidden";
        congrats.className = "hidden";
        congrats.textContent = "";
        return;
    }      
    
    if (q1Response === "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }
    
    if (q2Response === "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }
    
    if (document.querySelector("#Jefferson").checked &&
        document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked &&
        !document.querySelector("#Franklin").checked) {
      rightAnswer(3);
    } else {
      wrongAnswer(3);
    }
    
    if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }
    
    if (q5Response === "1959-08-21") {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }
    
    if (q6Response === "arizona") {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }
    
    if (q7Response === "hawaii") {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }
    
    if (q8Response === "50") {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }
    
    if (q9Response === "yellowstone") {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }
    
    if (q10Response === "alaska") {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }
    
    totalScore.textContent = `Total Score: ${score}`;
    if(score >= 80) {
        totalScore.className = "alert alert-success";
        congrats.className = "hidden";
        congrats.textContent = "";
    } else {
        totalScore.className = "alert alert-danger";
        congrats.className = "hidden";
        congrats.textContent = "";
    }
    
    if(score > 80) {
        congrats.className = "alert alert-warning";
        congrats.textContent = "Congratulations! You are a geography buff!";
    }
    attempts++;
    document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
    document.querySelector("#totalAttempts").className = "alert alert-info"
    localStorage.setItem("total_attempts", attempts);
}