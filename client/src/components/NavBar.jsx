import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import LikeContext from '../contexts/LikeContext';
import UserContext from '../contexts/UserContext';

const styles = {
    display: 'flex',
    justifyContent: 'space-around',
};

//Key difference between Link and NavLink is to hace access of this "isActive" object.
const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    fontFamily: 'Joan',
    fontSize: '15px',
    margin: '10px',
    height: '100px',
};

const navbarColor = {
    display: 'flex',
    justifyContent: 'end',
    backgroundColor: '#B1BCA0',
    height: '150px',
    margin: '10px',
};

const NavBar = () => {
    const { likedposts } = useContext(LikeContext);
    const { user } = useContext(UserContext);

    return (
        <Navbar style={navbarColor}>
            {user ? (
                <NavLink to='addphoto' style={linkStyle}>
                    Post
                </NavLink>
            ) : (
                <></>
            )}
            {user ? (
                <NavLink to='photos/likedposts' style={linkStyle}>
                    Liked Posts
                </NavLink>
            ) : (
                <></>
            )}
            {user ? (
                <NavLink to='photos' style={linkStyle}>
                    Search
                </NavLink>
            ) : (
                <></>
            )}
            <NavLink to='/' style={linkStyle}>
                Home
            </NavLink>

            {user ? (
                <NavLink to='login' style={linkStyle}>
                    Logout
                </NavLink>
            ) : (
                <NavLink to='login' style={linkStyle}>
                    Login
                </NavLink>
            )}

            {user ? (
                <NavLink to='profile' style={linkStyle}>
                    Profile
                </NavLink>
            ) : (
                <NavLink to='login' style={linkStyle}>
                    Signup
                </NavLink>
            )}
            <hr />
        </Navbar>
    );
};
export default NavBar;
