import { createContext, useState, useEffect } from 'react';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
    const [likes, setLikes] = useState(
        JSON.parse(localStorage.getItem('likes')) || []
    );

    //store the likes(liked books id) in the local storage
    useEffect(() => {
        localStorage.setItem('likes', JSON.stringify(likes));
    }, [likes]);

    const uniqueLikes = (photoId) => {
        if (!likes.includes(photoId))
            setLikes((prevLikes) => [...prevLikes, photoId]);
    };

    const updateLikedBooks = (likeState, photoId) => {
        likeState
            ? uniqueLikes(photoId)
            : setLikes((prevLikes) => prevLikes.filter((id) => id !== photoId));
    };
    return (
        <LikeContext.Provider value={{ likes, updateLikedBooks }}>
            {children}
        </LikeContext.Provider>
    );
};

export default LikeContext;
