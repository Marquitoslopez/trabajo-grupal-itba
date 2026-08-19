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