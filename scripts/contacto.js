document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");

    if (!form) return;

    const fields = {
        fullName: document.getElementById("full-name"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone"),
        subject: document.getElementById("subject"),
        message: document.getElementById("message"),
        privacy: document.getElementById("privacy")
    };

    const confirmation = document.getElementById("confirmacion-envio");

    function showError(field, message) {
        const error = document.querySelector(
            `.contact-form__error[data-error-of="${field.id}"]`
        );

        if (error) {
            error.textContent = message;
        }

        field.classList.add("input-error");
        field.setAttribute("aria-invalid", "true");
    }

    function clearError(field) {
        const error = document.querySelector(
            `.contact-form__error[data-error-of="${field.id}"]`
        );

        if (error) {
            error.textContent = "";
        }

        field.classList.remove("input-error");
        field.removeAttribute("aria-invalid");
    }

    function validateName() {
        const value = fields.fullName.value.trim();

        clearError(fields.fullName);

        if (value === "") {
            showError(fields.fullName, "El nombre y apellido es obligatorio.");
            return false;
        }

        if (value.length < 3) {
            showError(
                fields.fullName,
                "El nombre debe tener al menos 3 caracteres."
            );
            return false;
        }

        if (!/^[a-zA-ZÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(value)) {
            showError(
                fields.fullName,
                "El nombre solo puede contener letras y espacios."
            );
            return false;
        }

        return true;
    }

    function validateEmail() {
        const value = fields.email.value.trim();

        clearError(fields.email);

        if (value === "") {
            showError(fields.email, "El correo electrónico es obligatorio.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
            showError(
                fields.email,
                "Ingresá un correo electrónico válido."
            );
            return false;
        }

        return true;
    }

    function validatePhone() {
        const value = fields.phone.value.trim();

        clearError(fields.phone);

        if (value === "") {
            return true;
        }

        const phoneRegex = /^[0-9+\-()\s]{7,20}$/;

        if (!phoneRegex.test(value)) {
            showError(
                fields.phone,
                "Ingresá un número de teléfono válido."
            );
            return false;
        }

        return true;
    }

    function validateSubject() {
        clearError(fields.subject);

        if (fields.subject.value === "") {
            showError(
                fields.subject,
                "Seleccioná un motivo de consulta."
            );
            return false;
        }

        return true;
    }

    function validateMessage() {
        const value = fields.message.value.trim();

        clearError(fields.message);

        if (value === "") {
            showError(fields.message, "El mensaje es obligatorio.");
            return false;
        }

        if (value.length < 10) {
            showError(
                fields.message,
                "El mensaje debe tener al menos 10 caracteres."
            );
            return false;
        }

        return true;
    }

    function validatePrivacy() {
        clearError(fields.privacy);

        if (!fields.privacy.checked) {
            showError(
                fields.privacy,
                "Debés aceptar la política de privacidad."
            );
            return false;
        }

        return true;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const validName = validateName();
        const validEmail = validateEmail();
        const validPhone = validatePhone();
        const validSubject = validateSubject();
        const validMessage = validateMessage();
        const validPrivacy = validatePrivacy();

        const isValid =
            validName &&
            validEmail &&
            validPhone &&
            validSubject &&
            validMessage &&
            validPrivacy;

        if (!isValid) {
            const firstError = form.querySelector(".input-error");

            if (firstError) {
                firstError.focus();
            }

            return;
        }

        confirmation.style.display = "flex";

        form.reset();

        Object.values(fields).forEach((field) => {
            clearError(field);
        });

        setTimeout(() => {
            confirmation.style.display = "none";
        }, 5000);
    });

    fields.fullName.addEventListener("blur", validateName);
    fields.email.addEventListener("blur", validateEmail);
    fields.phone.addEventListener("blur", validatePhone);
    fields.subject.addEventListener("change", validateSubject);
    fields.message.addEventListener("blur", validateMessage);
    fields.privacy.addEventListener("change", validatePrivacy);

    fields.fullName.addEventListener("input", () => {
        if (fields.fullName.value.trim() !== "") {
            clearError(fields.fullName);
        }
    });

    fields.email.addEventListener("input", () => {
        if (fields.email.value.trim() !== "") {
            clearError(fields.email);
        }
    });

    fields.phone.addEventListener("input", () => {
        clearError(fields.phone);
    });

    fields.message.addEventListener("input", () => {
        if (fields.message.value.trim() !== "") {
            clearError(fields.message);
        }
    });
});

// MODAL - POLÍTICA DE PRIVACIDAD
const privacyLink = document.querySelector(".contact-form__checkbox-link");

if (privacyLink) {

    // Crear modal
    const privacyModal = document.createElement("div");

    privacyModal.className = "privacy-modal";
    privacyModal.setAttribute("role", "dialog");
    privacyModal.setAttribute("aria-modal", "true");
    privacyModal.setAttribute("aria-labelledby", "privacy-modal-title");
    privacyModal.setAttribute("aria-hidden", "true");

    privacyModal.innerHTML = `
        <div class="privacy-modal__content">
            <button 
                type="button" 
                class="privacy-modal__close" 
                aria-label="Cerrar política de privacidad">
                &times;
            </button>

            <h2 id="privacy-modal-title">
                Política de Privacidad
            </h2>

            <div class="privacy-modal__body">
                <p>
                    En Hermanos Jota nos comprometemos a proteger la privacidad
                    de nuestros usuarios y a tratar sus datos personales de
                    manera responsable.
                </p>

                <h3>¿Qué datos recopilamos?</h3>

                <p>
                    Podemos recopilar los datos que ingreses voluntariamente
                    mediante nuestro formulario de contacto, como nombre,
                    correo electrónico, teléfono y el contenido de tu consulta.
                </p>

                <h3>¿Para qué utilizamos tus datos?</h3>

                <p>
                    Utilizamos esta información únicamente para responder
                    consultas, brindar atención personalizada y comunicarnos
                    con vos en relación con nuestros productos y servicios.
                </p>

                <h3>Protección de la información</h3>

                <p>
                    Nos comprometemos a mantener tus datos protegidos y a no
                    vender, alquilar ni compartir tu información personal con
                    terceros con fines comerciales.
                </p>

                <h3>Aceptación</h3>

                <p>
                    Al aceptar la política de privacidad, confirmás que leíste
                    y comprendiste el tratamiento de tus datos personales
                    descrito anteriormente.
                </p>
            </div>

            <button 
                type="button" 
                class="privacy-modal__button">
                Entendido
            </button>
        </div>
    `;

    document.body.appendChild(privacyModal);

    const closeButton = privacyModal.querySelector(
        ".privacy-modal__close"
    );

    const understoodButton = privacyModal.querySelector(
        ".privacy-modal__button"
    );

    // Abrir modal
    function openPrivacyModal(event) {
        event.preventDefault();

        privacyModal.classList.add("privacy-modal--open");
        privacyModal.setAttribute("aria-hidden", "false");

        closeButton.focus();
    }

    // Cerrar modal
    function closePrivacyModal() {
        privacyModal.classList.remove("privacy-modal--open");
        privacyModal.setAttribute("aria-hidden", "true");

        privacyLink.focus();
    }

    // Click en el enlace
    privacyLink.addEventListener("click", openPrivacyModal);

    // Botón X
    closeButton.addEventListener("click", closePrivacyModal);

    // Botón "Entendido"
    understoodButton.addEventListener("click", closePrivacyModal);

    // Cerrar haciendo click fuera de la ventana
    privacyModal.addEventListener("click", (event) => {
        if (event.target === privacyModal) {
            closePrivacyModal();
        }
    });

    // Cerrar con la tecla Escape
    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            privacyModal.classList.contains("privacy-modal--open")
        ) {
            closePrivacyModal();
        }
    });
}