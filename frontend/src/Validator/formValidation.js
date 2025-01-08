export const validate = (fieldValues, formData) => {
    let tempErrors = {}

    //name validation

    if ("name" in fieldValues) {
        if (!/^[a-zA-Z\s]+$/.test(fieldValues.name)) {
            tempErrors.name = "Name can only contain letters and spaces.";
        } else if (fieldValues.name.length < 2) {
            tempErrors.name = "Name must be at least 2 characters.";
        } else if (fieldValues.name.length > 50) {
            tempErrors.name = "Name must be less than 50 characters.";
        } else {
            tempErrors.name = "";
        }
    }

    // Email validation

    if ('email' in fieldValues) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValues.email)) {
            tempErrors.email = "Email is not valid.";
        } else {
            tempErrors.email = "";
        }

    }

    //phone number validation

    if ('phone' in fieldValues) {
        if (!/^\d{10}$/.test(fieldValues.phone)) {
            tempErrors.phone = "Phone number must be 10 digits.";
        } else {
            tempErrors.phone = "";
        }
    }

    //password number validation

    if ('password' in fieldValues) {
        if (fieldValues.password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters.";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(fieldValues.password)) {
            tempErrors.password = "Password must contain at least one special character.";
        } else {
            tempErrors.password = "";
        }

    }

    // Confirm password validation
    if ("confirmPassword" in fieldValues) {
        if (fieldValues.confirmPassword !== formData.password) {
            tempErrors.confirmPassword = "Passwords do not match.";
        } else {
            tempErrors.confirmPassword = "";
        }
    }

    return tempErrors;

};

export const isValid = (errors) => {
    return Object.values(errors).every((x) => x === "");
};