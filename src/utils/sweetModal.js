import Swal from "sweetalert2";

const swalModal = (title, text, icon) => {
  Swal.fire({
    title: title || "Deleted!",
    text: text || "Your file has been deleted.",
    icon: icon || "success",
  });
};

export default swalModal;
