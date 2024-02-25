function populateCountries() {
    var countrySelect = document.getElementById("country");

    fetch("https://secure.geonames.org/countryInfoJSON?username=sudinrai")
        .then(response => response.json())
        .then(data => {

            const countries = data.geonames.map(country => country.countryName).sort();

            countries.forEach(function(country) {
                var option = document.createElement("option");
                option.value = country;
                option.text = country;
                countrySelect.add(option);
            });
        })
        .catch(error => console.error("Error fetching countries:", error));
}
populateCountries();

var plus2GPAValue = "";
var seeGPAValue = "";

document.getElementById("plus2GPA").addEventListener("input", function() {
    plus2GPAValue = this.value;
});

document.getElementById("seeGPA").addEventListener("input", function() {
    seeGPAValue = this.value;
});

document.getElementById("education").addEventListener("change", toggleGPASection);

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    if (plus2GPAValue === "" || seeGPAValue === "") {
        alert("Please enter both Plus 2 GPA and SEE GPA before submitting the form.");
        return;
    }

    var fullName = document.getElementById("fullName").value;
    var personalAddress = document.getElementById("personalAddress").value;
    var mobileNo = document.getElementById("mobileNo").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var country = document.getElementById("country").value;
    var course = document.getElementById("course").value;
    var email = document.getElementById("email").value;

    var message = "Full Name: " + fullName + "\n";
    message += "Personal Address: " + personalAddress + "\n";
    message += "Mobile No: " + mobileNo + "\n";
    message += "Gender: " + gender + "\n";
    message += "Country: " + country + "\n";
    message += "Course: " + course + "\n";
    message += "Plus 2 GPA: " + plus2GPAValue + "\n";
    message += "SEE GPA: " + seeGPAValue + "\n";
    message += "Email ID: " + email + "\n";

    alert(message);
});

function toggleGPASection() {
    var education = document.getElementById("education").value;
    var plus2GPASection = document.getElementById("plus2GPASection");
    var seeGPASection = document.getElementById("seeGPASection");

    plus2GPASection.style.display = education === "+2" ? "block" : "none";
    seeGPASection.style.display = education === "SEE" ? "block" : "none";
}

function toggleFileInput() {
    var fileInputContainer = document.getElementById("fileInputContainer");
    var fileInput = document.getElementById("fileInput");
    var fileSizeMessage = document.getElementById("fileSizeMessage");

    if (document.getElementById("Yes").checked) {
        fileInputContainer.style.display = "block";
        fileInput.setAttribute("required", true); 
        fileSizeMessage.innerText = "File size should be less than 200KB";
    } else {
        fileInputContainer.style.display = "none";
        fileInput.removeAttribute("required"); 
        fileInput.value = ""; 
        fileSizeMessage.innerText = ""; 
    }
}

function validateFileSize() {
    var fileInput = document.getElementById("fileInput");
    var fileSizeMessage = document.getElementById("fileSizeMessage");

    if (fileInput.files[0].size > 200000) { 
        fileSizeMessage.innerText = "File size must be less than 200KB";
        fileInput.value = ""; 
    } else {
        fileSizeMessage.innerText = "";
    }
}
function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
    } else {
        sidebar.style.left = "0px";
    }
}
function closeSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.style.left = "-250px";
}
function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
        closeSidebar();
    } else {
        sidebar.style.left = "0px";
    }
}

document.body.addEventListener('click', function(event) {
    var sidebar = document.getElementById("sidebar");
    var menuToggle = document.querySelector(".menutoggle");
    var isClickInsideSidebar = sidebar.contains(event.target);
    var isClickOnMenuToggle = menuToggle.contains(event.target);

    if (!isClickInsideSidebar && !isClickOnMenuToggle) {
        closeSidebar();
    }
});

document.getElementById('modeToggleBtn').addEventListener('click', toggleMode);

function toggleMode() {
    const container = document.querySelector('.container');
    const inputGroups = document.querySelectorAll('.content');
    const placeholders = document.querySelectorAll('input::placeholder, select::placeholder, textarea::placeholder');
    const radioLabels = document.querySelectorAll('.content label');
    const formHeading = document.querySelector('.heading'); 
    const yesOption = document.getElementById('Yes'); 
    const noOption = document.getElementById('No'); 

    container.classList.toggle('dark-mode');

    inputGroups.forEach(group => group.classList.toggle('dark-mode'));

    placeholders.forEach(placeholder => {
        if (container.classList.contains('dark-mode')) {
            placeholder.style.color = 'white'; 
        } else {
            placeholder.style.color = 'black';
        }
    });

    radioLabels.forEach(label => {
        if (container.classList.contains('dark-mode')) {
            label.style.color = 'white'; 
        } else {
            label.style.color = 'black';
        }
    });

    if (container.classList.contains('dark-mode')) {
        formHeading.style.color = 'white'; 
    } else {
        formHeading.style.color = 'black';
      }

    if (container.classList.contains('dark-mode')) {
        yesOption.style.color = 'white'; 
        noOption.style.color = 'white'; 
    } else {
        yesOption.style.color = 'black'; 
        noOption.style.color = 'black'; 
    }
    container.style.backgroundColor = container.classList.contains('dark-mode') ? 'black' : '#19ecec';
}

document.getElementById("needHelpBtn").addEventListener("click", showHelpPopup);

function showHelpPopup() {
    var popup = document.getElementById("helpPopup");
    popup.style.display = "block";
}

function closePopup() {
    var popup = document.getElementById("helpPopup");
    popup.style.display = "none";
}

document.getElementById("registrationForm").addEventListener("reset", function() {
    document.getElementById("plus2GPA").value = "";
    document.getElementById("seeGPA").value = "";

    document.getElementById("education").selectedIndex = 0;
    document.querySelectorAll(".gpasection").forEach(section => section.style.display = "none");

    document.getElementById("fileInputContainer").style.display = "none";
    document.getElementById("fileInput").value = "";
    document.getElementById("fileSizeMessage").innerText = "";
});
