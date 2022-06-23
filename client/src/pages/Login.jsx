import { useState, useContext } from 'react';
import axios from 'axios';
//context
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const defaultFormData = {
        username: '',
        password: '',
    };
    //Getting setUser function from UserContext to update the of user
    const { user, setUser } = useContext(UserContext);
    //This function will help us to navigate between routes
    const navigateTo = useNavigate();

    const [loginState, setLoginState] = useState('Login');

    const [formData, setFormData] = useState(defaultFormData);

    //Updating the user value from input field
    const changeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const submitFormData = async () => {
        try {
            const { data } = await axios.post(
                `http://localhost:5005/${loginState}`,
                formData
            );
            setUser(() => data);
            localStorage.setItem('token', JSON.stringify(data.token));
        } catch (error) {
            console.error(error);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        submitFormData();
        navigateTo('/profile');
    };

    const logoutHandler = (e) => {
        setUser(() => null);
        localStorage.removeItem('token');
    };

    const buttonLettersStyle = {
        color: '#fbf9f2',
    };

    return user ? (
        <div>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    ) : (
        <div>
            <h1 className='loginState'>{loginState}</h1>
            {/* <p style={buttonLettersStyle}>Please Register/Login</p> */}
            <button
                className='loginButton'
                onClick={() => setLoginState('Login')}
            >
                Login
            </button>
            <button
                className='loginButton'
                onClick={() => setLoginState('Register')}
            >
                Register
            </button>
            <form onSubmit={submitHandler}>
                <label className='userDets'>Username: </label>
                <input
                    className='boxUserDets'
                    type='text'
                    name='username'
                    onChange={changeHandler}
                    value={formData.username}
                />
                <label className='userDets'>Password: </label>
                <input
                    className='boxUserDets'
                    type='text'
                    name='password'
                    onChange={changeHandler}
                    value={formData.password}
                />
                <button className='submitLogin'>Submit</button>
            </form>
        </div>
    );
};

export default Login;
