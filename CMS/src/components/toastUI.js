import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function showSuccess(message = "Success") {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
    style: {
      background: "#34D399",
      color: "#FFFFFF",
    },
  }).showToast();
}

function showError(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "bottom",
    position: "right",
    style: {
      background: "#EF4444",
      color: "#FFFFFF",
    },
  }).showToast();
}

export { showSuccess, showError };
