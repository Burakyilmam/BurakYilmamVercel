async function loadProjects() {
    const container = document.getElementById("projects-container");

    if (!container) {
        console.error("projects-container bulunamadı.");
        return;
    }

    try {
        const response = await fetch("../jsons/projects.json");

        if (!response.ok) {
            throw new Error(`projects.json yüklenemedi: ${response.status}`);
        }

        const data = await response.json();
        const language = localStorage.getItem("language") || "tr";
        const projects = data[language]?.projects;

        if (!Array.isArray(projects)) {
            console.error(`projects.json içerisinde '${language}' dili bulunamadı.`);
            return;
        }

        container.innerHTML = "";

        projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";

            card.innerHTML = `
                <img src="${project.image}" alt="${project.name}" class="project-image">
                <div class="project-overlay">
                    <div class="project-content">
                        <h3>${project.name}</h3>
                        <p class="project-description">${project.description}</p>
                        <div class="project-links">
                            ${project.github ? `
                                <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link" title="GitHub">
                                    <i class="fab fa-github"></i>
                                </a>
                            ` : ""}
                            ${project.url ? `
                                <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-link" title="Live Demo">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            ` : ""}
                        </div>
                    </div>
                </div>
            `;

            if (project.github) {
                card.addEventListener("click", function (event) {
                    if (event.target.closest(".project-link")) {
                        return;
                    }
                    window.open(project.github, "_blank", "noopener,noreferrer");
                });
            }

            container.appendChild(card);

            const description = card.querySelector(".project-description");

            if (description) {
                description.addEventListener("mouseenter", () => {
                    const tooltip = document.createElement("div");
                    tooltip.className = "project-tooltip";
                    tooltip.textContent = project.description;
                    document.body.appendChild(tooltip);

                    const rect = description.getBoundingClientRect();
                    const tooltipWidth = 340;
                    const gap = 15;
                    let left;
                    let top;

                    if (rect.right + tooltipWidth + gap <= window.innerWidth) {
                        left = rect.right + gap;
                        top = rect.top;
                    } else if (rect.left - tooltipWidth - gap >= 0) {
                        left = rect.left - tooltipWidth - gap;
                        top = rect.top;
                    } else {
                        left = rect.left;
                        top = rect.bottom + gap;
                    }

                    const maxTop = window.innerHeight - tooltip.offsetHeight - 10;
                    if (top > maxTop) {
                        top = Math.max(10, maxTop);
                    }

                    if (left + tooltip.offsetWidth > window.innerWidth - 10) {
                        left = window.innerWidth - tooltip.offsetWidth - 10;
                    }

                    if (left < 10) {
                        left = 10;
                    }

                    tooltip.style.left = `${left}px`;
                    tooltip.style.top = `${top}px`;

                    description._tooltip = tooltip;
                });

                description.addEventListener("mouseleave", () => {
                    if (description._tooltip) {
                        description._tooltip.remove();
                        description._tooltip = null;
                    }
                });
            }
        });
    } catch (error) {
        console.error("Projeler yüklenirken hata oluştu:", error);
        container.innerHTML = `<p class="projects-error">Projeler yüklenirken bir hata oluştu.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", loadProjects);
document.addEventListener("languageChanged", () => {
    loadProjects();
});