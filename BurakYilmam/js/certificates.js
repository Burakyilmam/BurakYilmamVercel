async function loadCertificates() {
    try {
        const response = await fetch("../jsons/certificates.json");
        if (!response.ok) {
            throw new Error(`certificates.json yüklenemedi: ${response.status}`);
        }

        const data = await response.json();
        const container = document.getElementById("certificatesContainer");

        if (!container) return;

        container.innerHTML = "";

        data.certificates.forEach(certificate => {
            const certificateItem = document.createElement("div");
            certificateItem.className = "certificate-item";

            certificateItem.innerHTML = `
                <div class="certificate-card">
                    <a
                        href="${certificate.url}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="${certificate.image}"
                            alt="${certificate.name}"
                            loading="lazy"
                        >
                    </a>
                </div>
            `;

            container.appendChild(certificateItem);
        });
    } catch (error) {
        console.error("Sertifikalar yüklenirken hata oluştu:", error);
    }
}

loadCertificates();