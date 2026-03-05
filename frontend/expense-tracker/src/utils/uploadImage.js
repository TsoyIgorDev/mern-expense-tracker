import { API_PATH } from "./apiPaths";
import axiosInstance from "./axiosIstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const responce = await axiosInstance.post(API_PATH.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return responce.data;
    } catch (error) {
        console.error(error);
        throw error;
    }

}

export default uploadImage;