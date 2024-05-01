import {toast} from "react-toastify";

const showToastSuccessMessage = (message) => {
    toast.success(message ? message : "User registered successfully!", {
    });
};

const showToastErrorMessage = (message) => {
    toast.error(message ? message : "User with the provided email already exist!", {
    });
};

const showToastWarningMessage = (message) => {
    toast.warning(message ? message : "Warning", {
    });
};

export { showToastSuccessMessage, showToastErrorMessage,showToastWarningMessage }