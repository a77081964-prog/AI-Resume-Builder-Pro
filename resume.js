function updateResume() {

    document.getElementById("pname").textContent =
        document.getElementById("name").value || "Your Name";

    document.getElementById("pemail").textContent =
        document.getElementById("email").value || "Email";

    document.getElementById("pphone").textContent =
        document.getElementById("phone").value || "Phone";

    document.getElementById("psummary").textContent =
        document.getElementById("summary").value || "Professional Summary";

    document.getElementById("peducation").textContent =
        (document.getElementById("degree").value || "Degree") +
        " - " +
        (document.getElementById("college").value || "College");

    const skillsContainer = document.getElementById("pskills");

skillsContainer.innerHTML = "";

const skills = document.getElementById("skills").value.split(",");

skills.forEach(skill => {

    if(skill.trim() !== ""){

        const badge = document.createElement("span");

        badge.className = "skill-badge";

        badge.textContent = skill.trim();

        skillsContainer.appendChild(badge);

    }

});
}
// Save data to Local Storage
localStorage.setItem("name", document.getElementById("name").value);
localStorage.setItem("email", document.getElementById("email").value);
localStorage.setItem("phone", document.getElementById("phone").value);
localStorage.setItem("summary", document.getElementById("summary").value);
localStorage.setItem("college", document.getElementById("college").value);
localStorage.setItem("degree", document.getElementById("degree").value);
localStorage.setItem("skills", document.getElementById("skills").value);
// Update preview while typing
document.querySelectorAll("input, textarea").forEach(element => {
    element.addEventListener("input", updateResume);
});

// Keep the Preview button working too
document.getElementById("previewBtn").addEventListener("click", updateResume);
const photoInput = document.getElementById("photo");

photoInput.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (event) {

            document.getElementById("previewPhoto").src = event.target.result;

        };

        reader.readAsDataURL(file);

    }

});
// Load saved data when the page opens
window.onload = function () {

    document.getElementById("name").value =
        localStorage.getItem("name") || "";

    document.getElementById("email").value =
        localStorage.getItem("email") || "";

    document.getElementById("phone").value =
        localStorage.getItem("phone") || "";

    document.getElementById("summary").value =
        localStorage.getItem("summary") || "";

    document.getElementById("college").value =
        localStorage.getItem("college") || "";

    document.getElementById("degree").value =
        localStorage.getItem("degree") || "";

    document.getElementById("skills").value =
        localStorage.getItem("skills") || "";

    // Refresh the preview
    const savedTemplate = localStorage.getItem("template") || "template1";

document.getElementById("templateSelect").value = savedTemplate;

document
    .querySelector(".preview-section")
    .classList.add(savedTemplate);

    updateResume();

};
document.getElementById("downloadBtn").addEventListener("click", function () {

    const resume = document.querySelector(".preview-section");

    const options = {

        margin: 0.5,
        filename: "My_Resume.pdf",

        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {
            scale: 2
        },

        jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait"
        }

    };

    html2pdf().set(options).from(resume).save();

});
const templateSelect = document.getElementById("templateSelect");

templateSelect.addEventListener("change", function(){

    const preview = document.querySelector(".preview-section");

    preview.classList.remove(
        "template1",
        "template2",
        "template3"
    );

    preview.classList.add(this.value);

    localStorage.setItem("template", this.value);

});
document.getElementById("analyzeBtn").addEventListener("click", function(){

    const suggestions = document.getElementById("suggestions");

    suggestions.innerHTML = "";

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const summary = document.getElementById("summary").value;
    const skills = document.getElementById("skills").value
                    .split(",")
                    .filter(skill => skill.trim() !== "");

    function addSuggestion(text){
        const li = document.createElement("li");
        li.textContent = text;
        suggestions.appendChild(li);
    }

    if(name.trim() === ""){
        addSuggestion("Add your full name.");
    }

    if(!email.includes("@")){
        addSuggestion("Enter a valid email address.");
    }

    if(summary.length < 50){
        addSuggestion("Write a longer professional summary (at least 50 characters).");
    }

    if(skills.length < 5){
        addSuggestion("Add at least 5 skills to strengthen your resume.");
    }

    if(suggestions.children.length === 0){
        addSuggestion("Great job! Your resume looks complete.");
    }

});
function displayProjects(){

    const preview =
        document.getElementById("projectPreview");

    preview.innerHTML = "";

    projects.forEach(project=>{

        const card =
            document.createElement("div");

        card.className = "project-card fade-in";

        card.innerHTML = `
            <h4>${project.title}</h4>
            <p>${project.description}</p>
        `;

        preview.appendChild(card);

    });

}
const projects = [];

document.getElementById("addProjectBtn").addEventListener("click", function(){

    const title =
        document.getElementById("projectTitle").value.trim();

    const description =
        document.getElementById("projectDescription").value.trim();

    if(title === "" || description === ""){

        showToast("Please enter both project title and description.");
        return;

    }

    projects.push({

        title,
        description

    });

    showToast("Project added successfully!");
    document.getElementById("projectTitle").value = "";

    document.getElementById("projectDescription").value = "";

});
function showToast(message){

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },3000);

}