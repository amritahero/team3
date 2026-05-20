

let registrations = [];
let count = 0;

// Generate Register Number
function generateRegNo() {

    let randomNum =
        Math.floor(100 + Math.random() * 900);

    return "TN" + randomNum;
}

// Initial Register Number
document.getElementById("regno").value =
    generateRegNo();

// Form Submit
document.getElementById("regForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let name =
        document.getElementById("name").value.trim();

    let email =
        document.getElementById("email").value.trim();

    let mobile =
        document.getElementById("mobile").value.trim();

    let regno =
        document.getElementById("regno").value;

    let event =
        document.getElementById("event").value;

    let ptype =
        document.getElementById("ptype").value;

    let teamname =
        document.getElementById("teamname").value.trim();

    let teamsize =
        document.getElementById("teamsize").value;

    let message =
        document.getElementById("message");

    message.innerHTML = "";
    message.className = "";

    // Validation
    if(name === ""){
        showError("Name required");
        return;
    }

    if(email === ""){
        showError("Email required");
        return;
    }

    if(!/^[0-9]{10}$/.test(mobile)){
        showError("Invalid mobile number");
        return;
    }

    if(event === ""){
        showError("Select an event");
        return;
    }

    if(event === "Gaming"){
        showError("Gaming event registration is closed");
        return;
    }

    if(ptype === "Team"){

        if(teamname === ""){
            showError("Team name required");
            return;
        }

        if(teamsize < 2 || teamsize > 4){
            showError("Team size must be between 2 and 4");
            return;
        }
    }

    // Duplicate Check
    let duplicate = registrations.find(
        r => r.name === name && r.event === event
    );

    if(duplicate){
        showError("Duplicate registration detected");
        return;
    }

    // Store Data
    registrations.push({
        name,
        regno,
        event
    });

    count++;

    document.getElementById("count").innerHTML =
        count;

    // Success Message
    message.innerHTML =
        "Registration Successful!";

    message.className = "success";

    // Participant Details
    document.getElementById("participantDetails")
    .innerHTML += `

        <div class="card">

            <h4>${name}</h4>

            <p><strong>Register No:</strong> ${regno}</p>

            <p><strong>Event:</strong> ${event}</p>

            <p><strong>Participation:</strong> ${ptype}</p>

        </div>

    `;

    // Reset Form
    document.getElementById("regForm").reset();

    document.getElementById("regno").value =
        generateRegNo();

});

// Error Function
function showError(msg){

    let message =
        document.getElementById("message");

    message.innerHTML = msg;

    message.className = "error";
}