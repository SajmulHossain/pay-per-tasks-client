import axios from "axios";

const uploadImg = async (imgData) => {
  const formData = new FormData();
  formData.append("image", imgData);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgBB_api}`,
    formData
  );
  
  return { imgUrl: data.data.display_url, imgDeleteUrl: data.data.delete_url };
};

export default uploadImg;
