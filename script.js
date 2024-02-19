// Function to populate countries based on the data fetched from the GeoNames API
function populateCountries() {
    var countrySelect = document.getElementById("country");

    // Fetch countries data from GeoNames API
    fetch("https://secure.geonames.org/countryInfoJSON?username=knightwolf07")
        .then(response => response.json())
        .then(data => {
            // Extract country names and sort alphabetically
            const countries = data.geonames.map(country => country.countryName).sort();

            // Populate countries as options
            countries.forEach(function(country) {
                var option = document.createElement("option");
                option.value = country;
                option.text = country;
                countrySelect.add(option);
            });
        })
        .catch(error => console.error("Error fetching countries:", error));
}

// Populate countries on page load
populateCountries();

// Variables to store GPA values
var plus2GPAValue = "";
var seeGPAValue = "";

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    var inputs = document.querySelectorAll("#registrationForm input, #registrationForm select, #registrationForm textarea");
    var isFormValid = true;

    inputs.forEach(function(input) {
        if (!input.value.trim()) {
            isFormValid = false;
            input.classList.add("error");
        } else {
            input.classList.remove("error");
        }
    });

    if (!isFormValid) {
        alert("Every field must be filled for successful submission.");
        return; // Exit the function if the form is not valid
    }

    // Gather all information for display
    var fullName = document.getElementById("fullName").value;
    var personalAddress = document.getElementById("personalAddress").value;
    var mobileNo = document.getElementById("mobileNo").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var country = document.getElementById("country").value;
    var course = document.getElementById("course").value;
    var pincode = document.getElementById("pincode").value;
    var email = document.getElementById("email").value;
    var education = document.getElementById("education").value;
    var plus2GPA = document.getElementById("plus2GPA").value;
    var seeGPA = document.getElementById("seeGPA").value;
    var scholarship = document.querySelector('input[name="scholarship"]:checked').value;
    var fileName = document.getElementById("fileInput").files[0].name;

    // Construct the message to display in the alert box
    var message = "Full Name: " + fullName + "\n";
    message += "Personal Address: " + personalAddress + "\n";
    message += "Mobile No: " + mobileNo + "\n";
    message += "Gender: " + gender + "\n";
    message += "Country: " + country + "\n";
    message += "Course: " + course + "\n";
    message += "Pincode: " + pincode + "\n";
    message += "Email ID: " + email + "\n";
    message += "Education: " + education + "\n";
    message += "Attached File: " + fileName + "\n";
    message += "+2 GPA: " + plus2GPA + "\n";
    message += "SEE GPA: " + seeGPA + "\n";
    message += "Interested in Scholarship: " + scholarship + "\n";

    // Display the message in the alert box
    alert(message);
});

// Event listener for form reset
document.getElementById("registrationForm").addEventListener("reset", function() {
    // Clear the GPA input fields and reset their values
    document.getElementById("plus2GPA").value = "";
    document.getElementById("seeGPA").value = "";

    // Reset GPA sections
    document.getElementById("education").selectedIndex = 0;
    document.querySelectorAll(".gpa-section").forEach(section => section.style.display = "none");

    // Reset file input
    document.getElementById("fileInputContainer").style.display = "none";
    document.getElementById("fileInput").value = "";
    document.getElementById("fileSizeMessage").innerText = "";
});

// Event listener for mode toggle button
document.getElementById('modeToggleBtn').addEventListener('click', toggleMode);

// Event listener for education dropdown change
document.getElementById("education").addEventListener("change", toggleGPASection);

// Function to toggle between light and dark mode
function toggleMode() {
    const container = document.querySelector('.container');
    const inputGroups = document.querySelectorAll('.input-group');
    const placeholders = document.querySelectorAll('input::placeholder, select::placeholder, textarea::placeholder');
    const radioLabels = document.querySelectorAll('.input-group label');
    const formHeading = document.querySelector('.form-heading'); // Select the form heading
    const yesOption = document.getElementById('Yes'); // Select the "Yes" radio option
    const noOption = document.getElementById('No'); // Select the "No" radio option


    container.classList.toggle('dark-mode');

    // Toggle input groups
    inputGroups.forEach(group => group.classList.toggle('dark-mode'));

    // Toggle placeholder text color
    placeholders.forEach(placeholder => {
        if (container.classList.contains('dark-mode')) {
            placeholder.style.color = '#fff'; // Dark mode placeholder text color
        } else {
            placeholder.style.color = '#000'; // Light mode placeholder text color
        }
    });

    // Toggle radio button options text color
    radioLabels.forEach(label => {
        if (container.classList.contains('dark-mode')) {
            label.style.color = '#fff'; // Dark mode radio button options text color
        } else {
            label.style.color = '#000'; // Light mode radio button options text color
        }
    });

    // Toggle form heading text color
    if (container.classList.contains('dark-mode')) {
        formHeading.style.color = '#fff'; // Dark mode form heading text color
    } else {
        formHeading.style.color = '#000'; // Light mode form heading text color
      }
    // Toggle "Yes" and "No" radio options text color
    if (container.classList.contains('dark-mode')) {
        yesOption.style.color = '#fff'; // Dark mode "Yes" radio option text color
        noOption.style.color = '#fff'; // Dark mode "No" radio option text color
    } else {
        yesOption.style.color = '#000'; // Light mode "Yes" radio option text color
        noOption.style.color = '#000'; // Light mode "No" radio option text color
    }
    // Set container's background color based on mode
    container.style.backgroundColor = container.classList.contains('dark-mode') ? '#000' : '#19ecec';
}

// Function to toggle GPA sections based on education selection
function toggleGPASection() {
    var education = document.getElementById("education").value;
    var plus2GPASection = document.getElementById("plus2GPASection");
    var seeGPASection = document.getElementById("seeGPASection");

    plus2GPASection.style.display = education === "+2" ? "block" : "none";
    seeGPASection.style.display = education === "SEE" ? "block" : "none";

    // Restore GPA values if available
    document.getElementById("plus2GPA").value = education === "+2" ? plus2GPAValue : "";
    document.getElementById("seeGPA").value = education === "SEE" ? seeGPAValue : "";
}

// Event listener for GPA inputs
document.getElementById("plus2GPA").addEventListener("input", function() {
    plus2GPAValue = this.value;
});

document.getElementById("seeGPA").addEventListener("input", function() {
    seeGPAValue = this.value;
});

function handleFormReset() {
    // Clear the GPA input fields and reset their values
    document.getElementById("plus2GPA").value = "";
    document.getElementById("seeGPA").value = "";

    // Reset the stored GPA values
    plus2GPAValue = "";
    seeGPAValue = "";
}

function toggleFileInput() {
    var fileInputContainer = document.getElementById("fileInputContainer");
    var fileInput = document.getElementById("fileInput");
    var fileSizeMessage = document.getElementById("fileSizeMessage");

    if (document.getElementById("Yes").checked) {
        fileInputContainer.style.display = "block";
        fileSizeMessage.innerText = "File size should be less than 200KB"; // Reset file size message
    } else {
        fileInputContainer.style.display = "none";
        fileInput.value = ""; // Reset file input
        fileSizeMessage.innerText = ""; // Clear file size message
    }
}

function validateFileSize() {
    var fileInput = document.getElementById("fileInput");
    var fileSizeMessage = document.getElementById("fileSizeMessage");

    if (fileInput.files[0].size > 200000) { // 200KB in bytes
        fileSizeMessage.innerText = "File size must be less than 200KB";
        fileInput.value = ""; // Reset file input
    } else {
        fileSizeMessage.innerText = "";
    }
}
// Function to show the help popup
function showHelpPopup() {
    var helpText = "1. Fill every part of the form carefully.\n";
    helpText += "2. Select both options one by one in the education section and add GPA in both sections.";

    alert(helpText);
}

// Event listener for "Need Help" button
document.getElementById("needHelpBtn").addEventListener("click", showHelpPopup);


// Function to show the help popup
function showHelpPopup() {
    var popup = document.getElementById("helpPopup");
    popup.style.display = "block";
}

// Function to close the popup
function closePopup() {
    var popup = document.getElementById("helpPopup");
    popup.style.display = "none";
}

// Event listener for "Need Help" button
document.getElementById("needHelpBtn").addEventListener("click", showHelpPopup);


function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
    } else {
        sidebar.style.left = "0px";
    }
}


// Function to close sidebar
function closeSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.style.left = "-250px";
}

// Function to toggle sidebar
function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
        closeSidebar();
    } else {
        sidebar.style.left = "0px";
    }
}

// Event listener for document body click to close sidebar
document.body.addEventListener('click', function(event) {
    var sidebar = document.getElementById("sidebar");
    var menuToggle = document.querySelector(".menu-toggle");
    var isClickInsideSidebar = sidebar.contains(event.target);
    var isClickOnMenuToggle = menuToggle.contains(event.target);

    if (!isClickInsideSidebar && !isClickOnMenuToggle) {
        closeSidebar();
    }
});
