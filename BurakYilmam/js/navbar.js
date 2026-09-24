document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navItems = document.querySelectorAll(".nav-item");
    const languageToggle = document.getElementById("languageToggle");
    const languageText = document.getElementById("languageText");
    const languageFlag = document.getElementById("languageFlag");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isActive = navMenu.classList.toggle("active");
            const icon = menuToggle.querySelector("i");

            menuToggle.setAttribute("aria-expanded", isActive.toString());

            if (isActive) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
                menuToggle.setAttribute("aria-label", "Menüyü kapat");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
                menuToggle.setAttribute("aria-label", "Menüyü aç");
            }
        });
    }

    navItems.forEach(item => {
        item.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            e.preventDefault();

            const navbar = document.querySelector(".navbar");
            const navbarHeight = navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                10;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            if (
                window.innerWidth <= 1024 &&
                navMenu.classList.contains("active")
            ) {
                closeMobileMenu();
            }
        });
    });

    function closeMobileMenu() {
        if (!menuToggle || !navMenu) {
            return;
        }

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Menüyü aç");
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) {
            closeMobileMenu();
        }
    });

    let translations = {};
    let currentLanguage = localStorage.getItem("language") || "tr";

    function getTranslation(key) {
        const keys = key.split(".");
        let value = translations[currentLanguage];

        for (const k of keys) {
            if (value === undefined) {
                return key;
            }
            value = value[k];
        }

        return value ?? key;
    }

    function applyLanguage(language) {
        if (!translations[language]) {
            console.error("Dil bulunamadı:", language);
            return;
        }

        currentLanguage = language;

        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.getAttribute("data-i18n");
            element.textContent = getTranslation(key);
        });

        if (languageText) {
            languageText.textContent = language === "tr" ? "EN" : "TR";
        }

        if (languageFlag) {
            languageFlag.src =
                language === "tr"
                    ? "/images/en-flag.png"
                    : "/images/tr-flag.png";

            languageFlag.alt =
                language === "tr" ? "English" : "Türkçe";
        }

        document.documentElement.lang = language;
        localStorage.setItem("language", language);

        document.dispatchEvent(
            new CustomEvent("languageChanged", {
                detail: {
                    language: language
                }
            })
        );

        console.log("Dil değiştirildi:", language);
    }

    async function loadLanguage() {
        try {
            const response = await fetch("../jsons/language.json");

            if (!response.ok) {
                throw new Error(`language.json yüklenemedi: ${response.status}`);
            }

            translations = await response.json();
            console.log("Dil dosyası yüklendi:", translations);

            applyLanguage(currentLanguage);
        } catch (error) {
            console.error("Dil dosyası yüklenirken hata oluştu:", error);
        }
    }

    if (languageToggle) {
        languageToggle.addEventListener("click", () => {
            const newLanguage = currentLanguage === "tr" ? "en" : "tr";
            applyLanguage(newLanguage);
        });
    }

    loadLanguage();
});