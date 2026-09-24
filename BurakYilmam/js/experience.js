async function loadExperience() {
    try {
        const response = await fetch("../jsons/experience.json");

        if (!response.ok) {
            throw new Error(`experience.json yüklenemedi: ${response.status}`);
        }

        const data = await response.json();
        const timeline = document.getElementById("experienceTimeline");

        if (!timeline) {
            return;
        }

        const language = localStorage.getItem("language") || "tr";
        const experiences = data[language]?.experiences;

        if (!Array.isArray(experiences)) {
            console.error("Experience verisi bulunamadı:", language);
            return;
        }

        timeline.innerHTML = "";

        experiences.forEach(experience => {
            const item = document.createElement("div");
            item.className = "experience-item";

            if (experience.current) {
                item.classList.add("current");
            }

            const descriptionItems = experience.description
                .split("\n\n")
                .filter(text => text.trim() !== "");

            const descriptionHtml = descriptionItems
                .map(text => `<li>${text.trim()}</li>`)
                .join("");

            item.innerHTML = `
                <div class="experience-date">
                    <span>${experience.startDate}</span> - <span>${experience.endDate}</span>
                </div>
                <div class="experience-marker"></div>
                <div class="experience-content">
                    <div class="experience-company">${experience.company}</div>
                    ${experience.position ? `<div class="experience-position">${experience.position}</div>` : ""}
                    <ul class="experience-description">${descriptionHtml}</ul>
                </div>
            `;

            timeline.appendChild(item);
        });
    } catch (error) {
        console.error("Experience verileri yüklenirken hata oluştu:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadExperience);
document.addEventListener("languageChanged", loadExperience);