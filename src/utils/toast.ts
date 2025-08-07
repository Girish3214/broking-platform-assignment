import toast from "react-hot-toast";

function showToast(message: string, type: "success" | "error" = "success") {
  const options = {
    duration: 3000,
    style: {
      background: type === "success" ? "#4caf50" : "#f44336",
      color: "#fff",
      fontSize: "16px",
      padding: "10px 20px",
      borderRadius: "8px",
    },
  };

  if (type === "success") {
    toast.success(message, options);
  } else {
    toast.error(message, options);
  }
}

export default showToast;
