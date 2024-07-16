import axios from "axios";

const HomeBookLoader = async () => {
    const res = await axios(`${import.meta.env.VITE_API_URL}/all-book-home`);
    return res.data
};


export default HomeBookLoader