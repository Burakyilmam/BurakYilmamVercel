let summaryData = {};

document.addEventListener("DOMContentLoaded", () => {
    fetch("../jsons/summary.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("summary.json yüklenemedi.");
            }
            return response.json();
        })
        .then(data => {
            summaryData = data;
            applySummaryLanguage();
        })
        .catch(error => {
            console.error("Summary verileri yüklenirken hata oluştu:", error);
        });
});

function applySummaryLanguage() {
    const language = localStorage.getItem("language") || "tr";
    const languageData = summaryData[language];

    if (!languageData) {
        console.warn("Summary dili bulunamadı:", language);
        return;
    }

    const summaryTitle = document.querySelector(".summary-content h1");
    const summarySubtitle = document.querySelector(".summary-content h2");
    const summaryTech = document.querySelector(".summary-tech");

    if (summaryTitle && summaryData.name) {
        summaryTitle.innerHTML = `<span>${summaryData.name}</span>`;
    }

    if (summarySubtitle && languageData.title) {
        summarySubtitle.textContent = languageData.title;
    }

    if (summaryTech && Array.isArray(summaryData.technologies)) {
        summaryTech.innerHTML = "";
        summaryData.technologies.forEach(technology => {
            const span = document.createElement("span");
            span.textContent = technology;
            summaryTech.appendChild(span);
        });
    }

    if (summaryData.contacts) {
        setContact("contactPhone", summaryData.contacts.phone, "tel:");
        setContact("contactWhatsapp", summaryData.contacts.whatsapp);
        setContact("contactInstagram", summaryData.contacts.instagram);
        setContact("contactFacebook", summaryData.contacts.facebook);
        setContact("contactLinkedin", summaryData.contacts.linkedin);
        setContact("contactGithub", summaryData.contacts.gitHub);
        setContact("contactOutlook", summaryData.contacts.outlook, "mailto:");
        setContact("contactGmail", summaryData.contacts.gmail, "mailto:");
    }

    if (summaryData.stats) {
        const statYears = document.getElementById("statYears");
        const statTechnologies = document.getElementById("statTechnologies");
        const statCertificates = document.getElementById("statCertificates");
        const statProjects = document.getElementById("statProjects");

        if (statYears) {
            statYears.textContent = summaryData.stats.years;
        }
        if (statTechnologies) {
            statTechnologies.textContent = summaryData.stats.technologies;
        }
        if (statCertificates) {
            statCertificates.textContent = summaryData.stats.certificates;
        }
        if (statProjects) {
            statProjects.textContent = summaryData.stats.projects;
        }
    }
}

document.addEventListener("languageChanged", () => {
    applySummaryLanguage();
});

function setContact(id, value, prefix = "") {
    const element = document.getElementById(id);

    if (!element) {
        return;
    }

    if (!value || value.trim() === "") {
        element.style.display = "none";
        return;
    }

    element.style.display = "";
    element.href = prefix + value;
}