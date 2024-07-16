import axios from "axios";

const CategoryLoader = async ({ params }) => {
    const res = await axios(`${import.meta.env.VITE_API_URL}/books-by-category/${params.name}`);
    return res.data
};


export default CategoryLoader