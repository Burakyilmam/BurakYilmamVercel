// =====================================================
// SUMMARY
// =====================================================

let summaryData = {};


// =====================================================
// LOAD SUMMARY DATA
// =====================================================

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

            // İlk dili uygula
            applySummaryLanguage();

        })

        .catch(error => {

            console.error(
                "Summary verileri yüklenirken hata oluştu:",
                error
            );

        });

});


// =====================================================
// APPLY SUMMARY LANGUAGE
// =====================================================

function applySummaryLanguage() {

    const language =
        localStorage.getItem("language") || "tr";


    const languageData =
        summaryData[language];


    if (!languageData) {

        console.warn(
            "Summary dili bulunamadı:",
            language
        );

        return;
    }


    // =================================================
    // SUMMARY CONTENT
    // =================================================

    const summaryTitle =
        document.querySelector(
            ".summary-content h1"
        );


    const summarySubtitle =
        document.querySelector(
            ".summary-content h2"
        );


    const summaryTech =
        document.querySelector(
            ".summary-tech"
        );


    // =================================================
    // NAME
    // =================================================

    if (summaryTitle && summaryData.name) {

        summaryTitle.innerHTML =
            `<span>${summaryData.name}</span>`;
    }


    // =================================================
    // TITLE
    // =================================================

    if (summarySubtitle && languageData.title) {

        summarySubtitle.textContent =
            languageData.title;
    }


    // =================================================
    // TECHNOLOGIES
    // =================================================

    if (
        summaryTech &&
        Array.isArray(summaryData.technologies)
    ) {

        summaryTech.innerHTML = "";


        summaryData.technologies.forEach(
            technology => {

                const span =
                    document.createElement("span");

                span.textContent =
                    technology;

                summaryTech.appendChild(span);

            }
        );
    }


    // =================================================
    // SUMMARY CONTACTS
    // =================================================

    if (summaryData.contacts) {

        setContact(
            "contactPhone",
            summaryData.contacts.phone,
            "tel:"
        );

        setContact(
            "contactWhatsapp",
            summaryData.contacts.whatsapp
        );

        setContact(
            "contactInstagram",
            summaryData.contacts.instagram
        );

        setContact(
            "contactFacebook",
            summaryData.contacts.facebook
        );

        setContact(
            "contactLinkedin",
            summaryData.contacts.linkedin
        );

        setContact(
            "contactGithub",
            summaryData.contacts.gitHub
        );

        setContact(
            "contactOutlook",
            summaryData.contacts.outlook,
            "mailto:"
        );

        setContact(
            "contactGmail",
            summaryData.contacts.gmail,
            "mailto:"
        );
    }


    // =================================================
    // STATISTICS
    // =================================================

    if (summaryData.stats) {

        const statYears =
            document.getElementById("statYears");

        const statTechnologies =
            document.getElementById(
                "statTechnologies"
            );

        const statCertificates =
            document.getElementById(
                "statCertificates"
            );

        const statProjects =
            document.getElementById(
                "statProjects"
            );


        if (statYears) {

            statYears.textContent =
                summaryData.stats.years;
        }


        if (statTechnologies) {

            statTechnologies.textContent =
                summaryData.stats.technologies;
        }


        if (statCertificates) {

            statCertificates.textContent =
                summaryData.stats.certificates;
        }


        if (statProjects) {

            statProjects.textContent =
                summaryData.stats.projects;
        }
    }

}


// =====================================================
// LANGUAGE CHANGED EVENT
// =====================================================

document.addEventListener(
    "languageChanged",
    () => {

        applySummaryLanguage();

    }
);


// =====================================================
// SET CONTACT
// =====================================================

function setContact(
    id,
    value,
    prefix = ""
) {

    const element =
        document.getElementById(id);


    if (!element) {
        return;
    }


    if (
        !value ||
        value.trim() === ""
    ) {

        element.style.display = "none";

        return;
    }


    element.style.display = "";

    element.href =
        prefix + value;
}