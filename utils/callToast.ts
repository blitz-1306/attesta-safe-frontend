import {toast} from "react-toastify";

export default function (type: "error" | "success", message: string) {
    toast[type](message, {
        position: "bottom-right",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
}
