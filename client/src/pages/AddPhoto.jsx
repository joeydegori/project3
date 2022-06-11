import { useState } from 'react';
import Form from '../components/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPhoto = () => {
    const defaultFormData = {
        title: '',
        imageUrl: '',
    };

    const [formData, setFormData] = useState(defaultFormData);
    console.log({ formData });
    const navigateTo = useNavigate();

    const addNewPhoto = async () => {
        const { data } = await axios.post(
            `http://localhost:5005/photos/newphoto`,
            formData
        );
        navigateTo('/photos');
    };

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        try {
            addNewPhoto();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Add Post</h1>
            <Form
                formData={formData}
                setFormData={setFormData}
                submitHandler={submitHandler}
                changeHandler={changeHandler}
            />
        </div>
    );
};
export default AddPhoto;
