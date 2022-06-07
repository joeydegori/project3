import { createContext, useState, useEffect } from 'react';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
    const [likes, setLikes] = useState(
        JSON.parse(localStorage.getItem('likes')) || []
    );

    //store the likes(liked photos id) in the local storage
    useEffect(() => {
        localStorage.setItem('likes', JSON.stringify(likes));
    }, [likes]);

    const uniqueLikes = (photoId) => {
        if (!likes.includes(photoId))
            setLikes((prevLikes) => [...prevLikes, photoId]);
    };

    const updateLikedPhotos = (likeState, photoId) => {
        likeState
            ? uniqueLikes(photoId)
            : setLikes((prevLikes) => prevLikes.filter((id) => id !== photoId));
    };
    return (
        <LikeContext.Provider value={{ likes, updateLikedPhotos }}>
            {children}
        </LikeContext.Provider>
    );
};

export default LikeContext;
