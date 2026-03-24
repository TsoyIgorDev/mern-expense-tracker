import { API_PATH } from "./apiPaths";
import axiosInstance from "./axiosIstance";

interface UploadImageResponse {
    imageUrl?: string;
}

const uploadImage = async (imageFile: File | string): Promise<UploadImageResponse> => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post<UploadImageResponse>(API_PATH.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default uploadImage;
