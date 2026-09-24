let aboutData = {};

document.addEventListener("DOMContentLoaded", () => {
    fetch("../jsons/about.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("about.json yüklenemedi.");
            }
            return response.json();
        })
        .then(data => {
            aboutData = data;

            // İlk dili uygula
            applyAboutLanguage();
        })
        .catch(error => {
            console.error(
                "About verileri yüklenirken hata oluştu:",
                error
            );
        });
});

function applyAboutLanguage() {
    const aboutText = document.getElementById("aboutText");

    if (!aboutText || !aboutData) {
        return;
    }

    const language = localStorage.getItem("language") || "tr";
    const about = aboutData[language]?.about;

    if (!about) {
        console.warn("About çevirisi bulunamadı:", language);
        return;
    }

    aboutText.innerHTML = "";

    const paragraphs = about.split(/\n\s*\n/);

    paragraphs.forEach(text => {
        const paragraph = document.createElement("p");
        paragraph.textContent = text.trim();
        aboutText.appendChild(paragraph);
    });
}

document.addEventListener("languageChanged", () => {
    applyAboutLanguage();
});