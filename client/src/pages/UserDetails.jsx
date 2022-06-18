import Form from '../components/Form';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authAxios } from '../customAxios/authAxios';
import UserContext from '../contexts/UserContext';
import service from '../api/service';

const UserDetails = () => {
    const defaultFormData = {
        username: '',
        password: '',
        likedposts: '',
        role: '',
        imageUrl: '',
    };

    const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();

        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/movies' POST route
        uploadData.append('imageUrl', e.target.files[0]);

        service
            .uploadImage(uploadData)
            .then((response) => {
                console.log('response is: ', response);
                // response carries "fileUrl" which we can use to update the state
                setUser(() => ({
                    ...user,
                    imageUrl: response.fileUrl,
                }));
            })
            .catch((err) =>
                console.log('Error while uploading the file: ', err)
            );
    };

    const navigateTo = useNavigate();
    const [editToggler, setEditToggler] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const { id } = useParams();

    const updateUserDetail = async () => {
        const { data } = await authAxios.post(
            `http://localhost:5005/profile/${id}`,
            user
        );
        setUser(() => data);
        setEditToggler(() => !editToggler);
    };

    const deleteUser = async () => {
        const { data } = await authAxios.delete(
            `http://localhost:5005/profile/${id}`
        );
        navigateTo('/');
    };

    const editHandler = (e) => {
        setEditToggler(() => !editToggler);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        try {
            updateUserDetail();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteHandler = () => {
        try {
            deleteUser();
        } catch (error) {
            console.error(error);
        }
    };

    const changeHandler = (e) => {
        console.log('hi');
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h1>Edit Profile</h1>
            {user && !editToggler && (
                <div key={user.id}>
                    <p>Username: {user.username}</p>
                    <p>
                        Profile Photo: <img src={user.imageUrl} />
                        {console.log('hel')}
                    </p>
                </div>
            )}
            <button onClick={editHandler}>Edit</button>
            {user.role === 'admin' && (
                <button onClick={deleteHandler}>Delete</button>
            )}

            {editToggler && (
                <div>
                    <form onSubmit={submitHandler}>
                        <label>Username:</label>
                        <input
                            type='text'
                            name='username'
                            value={user.username}
                            onChange={(e) => changeHandler(e)}
                        />
                        <br />
                        <label>Profile Photo: </label>
                        <input
                            type='file'
                            name='imageUrl'
                            onChange={(e) => handleFileUpload(e)}
                        />
                        <br />
                        <button type='submit'>Submit</button>
                    </form>
                    <button onClick={editHandler}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default UserDetails;
