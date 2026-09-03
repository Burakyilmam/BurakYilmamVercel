// =====================================================
// EDUCATION
// =====================================================

async function loadEducation() {

    try {

        const response =
            await fetch("../jsons/education.json");


        if (!response.ok) {

            throw new Error(
                `education.json yüklenemedi: ${response.status}`
            );
        }


        const data =
            await response.json();


        const educationContainer =
            document.getElementById(
                "educationContainer"
            );


        if (!educationContainer) {
            return;
        }


        // =================================================
        // CURRENT LANGUAGE
        // =================================================

        const language =
            localStorage.getItem("language") || "tr";


        const educations =
            data[language]?.educations;


        if (!Array.isArray(educations)) {

            console.error(
                "Education verisi bulunamadı:",
                language
            );

            return;
        }


        // =================================================
        // CLEAR
        // =================================================

        educationContainer.innerHTML = "";


        // =================================================
        // CREATE EDUCATION CARDS
        // =================================================

        educations.forEach(education => {

            const card =
                document.createElement("div");


            card.className =
                "education-card";


            card.innerHTML = `

                <div class="education-info">

                    ${
                        education.department
                            ? `
                                <h3>
                                    ${education.department}
                                </h3>
                              `
                            : ""
                    }

                    <h4>
                        ${education.school}
                    </h4>

                </div>


                <span class="education-date">
                    ${education.date}
                </span>


                ${
                    education.gpa
                        ? `
                            <p class="education-gpa">
                                GPA: ${education.gpa}
                            </p>
                          `
                        : ""
                }

            `;


            educationContainer.appendChild(card);

        });

    }
    catch (error) {

        console.error(
            "Education verileri yüklenirken hata oluştu:",
            error
        );
    }
}


// =====================================================
// INITIAL LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    loadEducation
);


// =====================================================
// LANGUAGE CHANGE
// =====================================================

document.addEventListener(
    "languageChanged",
    loadEducation
);