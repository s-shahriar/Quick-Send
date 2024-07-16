import axios from "axios";

const AllBookLoader = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-book`, {
        params: {
          limit: 'all'
        }
      });
    return res.data
};


export default AllBookLoader