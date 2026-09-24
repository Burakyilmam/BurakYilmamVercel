let contactData = {};

async function loadContact() {
    try {
        const response = await fetch("../jsons/summary.json");

        if (!response.ok) {
            throw new Error("Summary JSON yüklenemedi.");
        }

        contactData = await response.json();
        renderContact();
    } catch (error) {
        console.error("Contact yüklenirken hata oluştu:", error);
    }
}

function renderContact() {
    const container = document.getElementById("contactContainer");

    if (!container) {
        console.error("contactContainer bulunamadı.");
        return;
    }

    const contacts = contactData.contacts;

    if (!contacts) {
        console.error("Contact bilgileri bulunamadı.");
        return;
    }

    const language = localStorage.getItem("language") || "tr";

    const contactTitles = {
        tr: {
            phone: "Telefon",
            whatsapp: "WhatsApp",
            instagram: "Instagram",
            facebook: "Facebook",
            linkedin: "LinkedIn",
            gitHub: "GitHub",
            outlook: "Outlook",
            gmail: "Gmail"
        },
        en: {
            phone: "Phone",
            whatsapp: "WhatsApp",
            instagram: "Instagram",
            facebook: "Facebook",
            linkedin: "LinkedIn",
            gitHub: "GitHub",
            outlook: "Outlook",
            gmail: "Gmail"
        }
    };

    const titles = contactTitles[language] || contactTitles.tr;

    container.innerHTML = "";

    const contactItems = [
        {
            title: titles.phone,
            url: `tel:${contacts.phone}`,
            type: "phone",
            fontAwesome: "fas fa-phone"
        },
        {
            title: titles.whatsapp,
            url: contacts.whatsapp,
            type: "whatsapp",
            fontAwesome: "fab fa-whatsapp"
        },
        {
            title: titles.instagram,
            url: contacts.instagram,
            type: "instagram",
            fontAwesome: "fab fa-instagram"
        },
        {
            title: titles.facebook,
            url: contacts.facebook,
            type: "facebook",
            fontAwesome: "fab fa-facebook-f"
        },
        {
            title: titles.linkedin,
            url: contacts.linkedin,
            type: "linkedin",
            fontAwesome: "fab fa-linkedin-in"
        },
        {
            title: titles.gitHub,
            url: contacts.gitHub,
            type: "github",
            fontAwesome: "fab fa-github"
        },
        {
            title: titles.outlook,
            icon: "../icons/outlook.webp",
            url: `mailto:${contacts.outlook}`,
            type: "outlook"
        },
        {
            title: titles.gmail,
            icon: "../icons/gmail.webp",
            url: `mailto:${contacts.gmail}`,
            type: "gmail"
        }
    ];

    contactItems.forEach(contact => {
        const card = document.createElement("a");

        card.className = `contact-card contact-${contact.type}`;
        card.title = contact.title;
        card.href = contact.url;

        if (
            contact.url.startsWith("http://") ||
            contact.url.startsWith("https://")
        ) {
            card.target = "_blank";
            card.rel = "noopener noreferrer";
        }

        if (contact.fontAwesome) {
            card.innerHTML = `<i class="${contact.fontAwesome}"></i>`;
        } else {
            card.style.backgroundImage = `url("${contact.icon}")`;
        }

        container.appendChild(card);
    });
}

document.addEventListener("languageChanged", () => {
    renderContact();
});

function loadContactMap() {
    const mapElement = document.getElementById("contactMap");

    if (!mapElement) {
        return;
    }

    const latitude = 40.2137;
    const longitude = 28.9884;

    const map = L.map("contactMap").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup("<b>Burak Yılmam</b>");
}

loadContact();
loadContactMap();