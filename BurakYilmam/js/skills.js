// =====================================================
// SKILLS
// =====================================================

async function loadSkills() {

    try {

        const response =
            await fetch("../jsons/skills.json");

        if (!response.ok) {
            throw new Error(
                `skills.json yüklenemedi: ${response.status}`
            );
        }

        const data =
            await response.json();

        const container =
            document.getElementById("skillsContainer");

        if (!container) {
            return;
        }

        // =================================================
        // CURRENT LANGUAGE
        // =================================================

        const language =
            localStorage.getItem("language") || "tr";

        const skills =
            data[language]?.skills;

        if (!Array.isArray(skills)) {

            console.error(
                "Skills bulunamadı:",
                language
            );

            return;
        }

        // =================================================
        // CLEAR
        // =================================================

        container.innerHTML = "";

        // =================================================
        // CREATE SKILLS
        // =================================================

        skills.forEach(skill => {

            const skillItem =
                document.createElement("div");

            skillItem.className =
                "skill-item";

            skillItem.innerHTML = `
                <div class="skill-header">
                
<div class="skill-icon">
    ${skill.icon.startsWith("http") || skill.icon.startsWith("/")
                    ? `<img src="${skill.icon}" alt="${skill.name}">`
                    : `<i class="${skill.icon}"></i>`
                }
</div>

                    <span class="skill-name">
                        ${skill.name}
                    </span>

                </div>

                <div class="skill-bar">

                    <div class="skill-progress">

                        <span class="skill-percentage">
                            0%
                        </span>

                    </div>

                </div>
            `;

            container.appendChild(skillItem);

            const progress =
                skillItem.querySelector(
                    ".skill-progress"
                );

            const percentage =
                skillItem.querySelector(
                    ".skill-percentage"
                );

            let currentWidth = 0;

            const speed = 1;

            const animation =
                setInterval(() => {

                    if (
                        currentWidth >=
                        skill.percentage
                    ) {

                        clearInterval(animation);
                        return;
                    }

                    currentWidth += speed;

                    progress.style.width =
                        currentWidth + "%";

                    percentage.textContent =
                        currentWidth + "%";

                    // =================================================
                    // SKILL COLOR
                    // =================================================

                    if (currentWidth < 25) {

                        progress.style.background =
                            "#22c55e";

                    }
                    else if (currentWidth < 50) {

                        progress.style.background =
                            "#eab308";

                    }
                    else if (currentWidth < 75) {

                        progress.style.background =
                            "#f97316";

                    }
                    else {

                        progress.style.background =
                            "#ef4444";
                    }

                }, 50);

        });

    }
    catch (error) {

        console.error(
            "Skills verileri yüklenirken hata oluştu:",
            error
        );
    }
}


// =====================================================
// INITIAL LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    loadSkills
);


// =====================================================
// LANGUAGE CHANGE
// =====================================================

document.addEventListener(
    "languageChanged",
    loadSkills
);