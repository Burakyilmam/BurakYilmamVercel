async function loadCertificates() {

    const response = await fetch("../jsons/certificates.json");
    const data = await response.json();

    const container = document.getElementById("certificatesContainer");

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
}

loadCertificates();