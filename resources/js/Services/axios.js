export const PostRequest = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}