import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, get, set, ref, child } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

const firebaseConfig = {
  databaseURL: "https://lccs-project-dac60-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);

const form = document.getElementById("settings-form");
function showMessage(input, message, type) {
	// get the small element and set the message
	const msg = input.parentNode.querySelector("small");
	msg.innerText = message;
	// update the class for the input
	input.className = type ? "success" : "error";
	return type;
}

function showError(input, message) {
	return showMessage(input, message, false);
}

function validPercentage(input, invalidMsg) {
    // Valid by default if empty
    if (!input) {
		return true;
	}
    
    // Check if within range
    if (!(0<=input<=100)) {
        return showError(input,invalidMsg);
    }
    
    return true;
}

function hexToRGB(hex) {
    var validHEXInput = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!validHEXInput) {
        return false;
    }
    var output = {
        r: parseInt(validHEXInput[1], 16),
        g: parseInt(validHEXInput[2], 16),
        b: parseInt(validHEXInput[3], 16),
    };
    return output;
}

form.addEventListener('submit', (event) => {
    // Stop form submission
    event.preventDefault();
    
    let sens = document.getElementById("sensitivity").value;
    let start = document.getElementById("starttime").value;
    let end = document.getElementById("endtime").value;
    let colour = hexToRGB(document.getElementById("colour").value);

    // Validate the form
    let sensitivityValid = validPercentage(sens, "Please enter a valid percentage");

    if(sensitivityValid) {
        set(ref(db), {
            redLED:colour['r'],
            blueLED:colour['g'],
            greenLED:colour['b'],
            scheduleStart:start?start:"",
            scheduleEnd:end?end:"",
            sensitivity:sens?sens:50
          });
    }
});