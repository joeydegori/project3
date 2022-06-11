import { useState, useEffect } from 'react';
import axios from 'axios';
import { authAxios } from '../customAxios/authAxios';
import { Link } from 'react-router-dom';

const Photos = () => {
    const [photos, setPhotos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    //Requestiong all the photos from our database
    //authAxios is custom axios instance, it allows us to send Bearer tokens with the request
    //We are using authAxios here to prevent unauthorized user to view the photos list
    const getPhotos = async () => {
        const { data } = await axios.get(`http://localhost:5005/photos`);
        setPhotos(() => data);
    };

    const changeHandler = (e) => {
        setSearchTerm(e.target.value);
    };

    //This useEffect will execute getbooks function only one time when this page loads
    useEffect(() => {
        try {
            getPhotos();
        } catch (error) {
            console.error(error);
        }
    }, []); //<-- No dependency, means it will execute only one time

    return (
        <div>
            <h1>Photos List</h1>
            <div>
                <p>
                    Search:{' '}
                    <input
                        type='search'
                        value={searchTerm}
                        onChange={changeHandler}
                    />
                </p>
            </div>

            {/* Filter method will filter out all other books which dont contain same search terms based on the book title. */}
            {photos
                .filter((photo) =>
                    searchTerm.length > 0
                        ? photo.title
                              .toLocaleLowerCase()
                              .includes(searchTerm.toLocaleLowerCase())
                        : photo
                )
                .map((photo) => {
                    return (
                        <div key={photo._id}>
                            <img src={photo.imageUrl} alt='Photos' />
                            <p>
                                <button>
                                    <Link to={photo._id}>{photo.title}</Link>
                                </button>
                            </p>
                        </div>
                    );
                })}
        </div>
    );
};
export default Photos;
