import UserContext from '../contexts/UserContext';
import { useContext } from 'react';

const Profile = () => {
    const { user } = useContext(UserContext);
    return (
        <div>
            <h1>{user ? `Welcome ${user.username}!` : <></>}</h1>
        </div>
    );
};

export default Profile;
