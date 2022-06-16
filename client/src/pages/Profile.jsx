import Form from '../components/Form';
import UserContext from '../contexts/UserContext';
import { authAxios } from '../customAxios/authAxios';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    return (
        <div>
            <h1>{user ? `Welcome ${user.username}!` : <></>}</h1>
            <button>
                <Link to='/'>Edit Profile</Link>
            </button>
        </div>
    );
};

export default Profile;
