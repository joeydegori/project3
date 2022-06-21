import { useEffect, useContext } from 'react';
import { authAxios } from '../customAxios/authAxios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const LikedPosts = () => {
    const [likes, setLikes] = useState([]);
    const { user } = useContext(UserContext);

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

    return user ? (
        <div>
            <h1></h1>
            <div>
                <p></p>
            </div>

            {likes.map((like) => {
                console.log(like);
                return (
                    <div key={like._id}>
                        <img src={like.imageUrl} alt='Photos' />

                        <p>
                            {/* <button>
                                <Link to={`/photos/likedposts`}>Hello</Link>
                            </button> */}
                        </p>
                    </div>
                );
            })}
        </div>
    ) : (
        <></>
    );

    //    return ( likes.map((like) => {
    //         console.log(likes);
    //         return(
    //             <div key={like._id}>
    //                 <img src={like} alt='Photos' />
    //                 <p>
    //                     <button>
    //                         <Link to={`/photos/likedposts`}>Hello</Link>
    //                     </button>
    //                 </p>
    //             </div>
    //         ))
    //     });
};

export default LikedPosts;

//data.likedposts -> all of likes
//then use map function to display data
