import { setPost } from "@/redux/postSlice";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux";


const useGetAllPosts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get('https://posts-0qau.onrender.com/api/v1/post/all', { withCredentials: true });
                if (res.data.success) {
                    console.log(res.data.posts);
                    dispatch(setPost(res.data.posts))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllPost();
    }, [])
}

export default useGetAllPosts
