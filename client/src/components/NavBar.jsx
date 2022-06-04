import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
// import LikeContext from '../contexts/LikeContext';
import UserContext from '../contexts/UserContext';

const styles = {
    display: 'flex',
    justifyContent: 'space-around',
};

//Key difference between Link and NavLink is to hace access of this "isActive" object.
// const activeStyle = ({ isActive }) => {
//     return { color: isActive ? 'Red' : 'Green' };
// };

const NavBar = () => {
    //     const { likes } = useContext(LikeContext);
    const { user } = useContext(UserContext);

    return (
        // this empty <> calls React fragments
        <Navbar bg='dark'>
            <div style={styles}>
                <NavLink to='/' style={styles}>
                    Home
                </NavLink>
                <NavLink to='login' style={styles}>
                    Login
                </NavLink>
            </div>
            <hr />
        </Navbar>
    );
};
export default NavBar;
