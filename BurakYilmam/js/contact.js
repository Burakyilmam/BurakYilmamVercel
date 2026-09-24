let contactData = {};

async function loadContact() {
    try {
        const response = await fetch("../jsons/summary.json");

        if (!response.ok) {
            throw new Error(`Summary JSON yüklenemedi. Status: ${response.status}`);
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
        console.error("contactContainer elemanı DOM'da bulunamadı.");
        return;
    }

    const contacts = contactData?.contacts;

    if (!contacts) {
        console.error("Contact bilgileri JSON içinde bulunamadı.");
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
            info: contacts.phone || "",
            url: contacts.phone ? `tel:${contacts.phone}` : "#",
            type: "phone",
            fontAwesome: "fas fa-phone"
        },
        {
            title: titles.whatsapp,
            info: contacts.phone || "",
            url: contacts.whatsapp || "#",
            type: "whatsapp",
            fontAwesome: "fab fa-whatsapp"
        },
        {
            title: titles.instagram,
            info: "@byilmam98",
            url: contacts.instagram || "#",
            type: "instagram",
            fontAwesome: "fab fa-instagram"
        },
        {
            title: titles.facebook,
            info: "burakyilmamm",
            url: contacts.facebook || "#",
            type: "facebook",
            fontAwesome: "fab fa-facebook-f"
        },
        {
            title: titles.linkedin,
            info: "Burak Yılmam",
            url: contacts.linkedin || "#",
            type: "linkedin",
            fontAwesome: "fab fa-linkedin-in"
        },
        {
            title: titles.gitHub,
            info: "Burakyilmam",
            url: contacts.gitHub || "#",
            type: "github",
            fontAwesome: "fab fa-github"
        },
        {
            title: titles.outlook,
            info: contacts.outlook || "",
            icon: "../icons/outlook.webp",
            url: contacts.outlook ? `mailto:${contacts.outlook}` : "#",
            type: "outlook"
        },
        {
            title: titles.gmail,
            info: contacts.gmail || "",
            icon: "../icons/gmail.webp",
            url: contacts.gmail ? `mailto:${contacts.gmail}` : "#",
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

        const frontContent = contact.fontAwesome
            ? `<i class="${contact.fontAwesome}"></i>`
            : `<div class="contact-image-front" style="background-image: url('${contact.icon}')"></div>`;

        card.innerHTML = `
            <div class="contact-card-inner">
                <div class="contact-card-front">
                    ${frontContent}
                </div>
                <div class="contact-card-back">
                    <strong>${contact.title}</strong>
                    <span>${contact.info}</span>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

let contactMapInstance = null;

function loadContactMap() {
    const mapElement = document.getElementById("contactMap");

    if (!mapElement) {
        return;
    }

    if (contactMapInstance !== null) {
        contactMapInstance.remove();
    }

    const latitude = 40.2137;
    const longitude = 28.9884;

    contactMapInstance = L.map("contactMap").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(contactMapInstance);

    const marker = L.marker([latitude, longitude]).addTo(contactMapInstance);
    marker.bindPopup("<b>Burak Yılmam</b>");
}

document.addEventListener("languageChanged", () => {
    renderContact();
});

document.addEventListener("DOMContentLoaded", () => {
    loadContact();
    loadContactMap();
});