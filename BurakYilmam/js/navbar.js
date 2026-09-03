// =====================================================
// INITIALIZE
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // =================================================
    // ELEMENTS
    // =================================================

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");

    const navItems =
        document.querySelectorAll(".nav-item");

    const languageToggle =
        document.getElementById("languageToggle");

    const languageText =
        document.getElementById("languageText");


    // =================================================
    // MOBILE MENU
    // =================================================

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isActive =
                navMenu.classList.toggle("active");

            const icon =
                menuToggle.querySelector("i");


            menuToggle.setAttribute(
                "aria-expanded",
                isActive.toString()
            );


            if (isActive) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

                menuToggle.setAttribute(
                    "aria-label",
                    "Menüyü kapat"
                );

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                menuToggle.setAttribute(
                    "aria-label",
                    "Menüyü aç"
                );
            }

        });

    }


    // =================================================
    // NAVIGATION
    // =================================================

    navItems.forEach(item => {

        item.addEventListener("click", function (e) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                !targetId.startsWith("#")
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            e.preventDefault();


            const navbar =
                document.querySelector(".navbar");


            const navbarHeight =
                navbar
                    ? navbar.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                10;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });


            // Mobil menüyü kapat
            if (
                window.innerWidth <= 1024 &&
                navMenu.classList.contains("active")
            ) {

                closeMobileMenu();

            }

        });

    });


    // =================================================
    // CLOSE MOBILE MENU
    // =================================================

    function closeMobileMenu() {

        if (!menuToggle || !navMenu) {
            return;
        }


        navMenu.classList.remove("active");


        const icon =
            menuToggle.querySelector("i");


        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Menüyü aç"
        );

    }


    // =================================================
    // WINDOW RESIZE
    // =================================================

    window.addEventListener("resize", () => {

        if (window.innerWidth > 1024) {

            closeMobileMenu();

        }

    });


    // =================================================
    // LANGUAGE SYSTEM
    // =================================================

    let translations = {};


    let currentLanguage =
        localStorage.getItem("language") || "tr";


    // =================================================
    // GET TRANSLATION
    // =================================================

    function getTranslation(key) {

        const keys =
            key.split(".");


        let value =
            translations[currentLanguage];


        for (const k of keys) {

            if (value === undefined) {
                return key;
            }


            value = value[k];

        }


        return value ?? key;

    }


    // =================================================
    // APPLY LANGUAGE
    // =================================================

    function applyLanguage(language) {

        // ---------------------------------------------
        // LANGUAGE CHECK
        // ---------------------------------------------

        if (!translations[language]) {

            console.error(
                "Dil bulunamadı:",
                language
            );

            return;
        }


        // ---------------------------------------------
        // SET CURRENT LANGUAGE
        // ---------------------------------------------

        currentLanguage =
            language;


        // ---------------------------------------------
        // TEXT TRANSLATIONS
        // ---------------------------------------------

        document
            .querySelectorAll("[data-i18n]")
            .forEach(element => {

                const key =
                    element.getAttribute("data-i18n");


                element.textContent =
                    getTranslation(key);

            });


        // ---------------------------------------------
        // LANGUAGE BUTTON
        // ---------------------------------------------

        if (languageText) {

            languageText.textContent =
                language === "tr"
                    ? "EN"
                    : "TR";

        }


        // ---------------------------------------------
        // HTML LANG
        // ---------------------------------------------

        document.documentElement.lang =
            language;


        // ---------------------------------------------
        // SAVE LANGUAGE
        // ---------------------------------------------

        localStorage.setItem(
            "language",
            language
        );


        // ---------------------------------------------
        // NOTIFY OTHER SYSTEMS
        // ---------------------------------------------

        document.dispatchEvent(
            new CustomEvent(
                "languageChanged",
                {
                    detail: {
                        language: language
                    }
                }
            )
        );


        // ---------------------------------------------
        // CONSOLE
        // ---------------------------------------------

        console.log(
            "Dil değiştirildi:",
            language
        );

    }


    // =================================================
    // LOAD LANGUAGE
    // =================================================

    async function loadLanguage() {

        try {

            const response =
                await fetch("../jsons/language.json");


            if (!response.ok) {

                throw new Error(
                    `language.json yüklenemedi: ${response.status}`
                );

            }


            translations =
                await response.json();


            console.log(
                "Dil dosyası yüklendi:",
                translations
            );


            // -----------------------------------------
            // APPLY CURRENT LANGUAGE
            // -----------------------------------------

            applyLanguage(
                currentLanguage
            );

        }
        catch (error) {

            console.error(
                "Dil dosyası yüklenirken hata oluştu:",
                error
            );

        }

    }


    // =================================================
    // LANGUAGE TOGGLE
    // =================================================

    if (languageToggle) {

        languageToggle.addEventListener(
            "click",
            () => {

                const newLanguage =
                    currentLanguage === "tr"
                        ? "en"
                        : "tr";


                applyLanguage(
                    newLanguage
                );

            }
        );

    }


    // =================================================
    // START LANGUAGE SYSTEM
    // =================================================

    loadLanguage();

});