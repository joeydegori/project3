import Form from '../components/Form';
import UserContext from '../contexts/UserContext';
import { authAxios } from '../customAxios/authAxios';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const [photos, setPhotos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const getUser = async () => {
        const { data } = await authAxios.get(`http://localhost:5005/profile`);
        setUser(() => data);
    };

    return (
        <div key={user.id}>
            {/* <img src={user.imageUrl} alt='Photos' /> */}
            <h1>{user ? `Welcome ${user.username}!` : <></>}</h1>
            <p>
                <button>
                    <Link to={user.id}>Profile Details </Link>
                    {console.log(user.id)}
                </button>
            </p>
        </div>
    );
};

export default Profile;
