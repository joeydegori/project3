import { useEffect } from 'react';
import { authAxios } from '../customAxios/authAxios';
import { useState } from 'react';

const LikedPosts = () => {
    const [likes, setLikes] = useState([]);

    const getLikedPosts = async () => {
        try {
            const { data } = await authAxios.get(
                `http://localhost:5005/photos/getLikedPosts`
            );
            setLikes(() => data.likedposts);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getLikedPosts();
    }, []);
    return (
        <div>
            <p>Hello Saved Posts </p>
        </div>
    );
};

export default LikedPosts;

//data.likedposts -> all of likes
//then use map function to display data
