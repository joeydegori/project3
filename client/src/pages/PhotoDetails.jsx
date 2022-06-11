import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from '../components/Form';

const PhotoDetails = () => {
    const defaultFormData = {
        title: '',
        imageUrl: '',
    };

    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [editToggler, setEditToggler] = useState(false);
    const [formData, setFormData] = useState(defaultFormData);

    const getPhotoDetails = async () => {
        const { data } = await axios.get(`http://localhost:5005/photos/${id}`);
        setPhoto(() => data);
        setFormData(() => data);
    };

    const updatePhotoDetail = async () => {
        const { data } = await axios.post(
            `http://localhost:5005/photos/${id}`,
            formData
        );
        setPhoto(() => data);
        setEditToggler(() => !editToggler);
    };

    useEffect(() => {
        try {
            getPhotoDetails();
        } catch (error) {}
    }, []);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        try {
            updatePhotoDetail();
        } catch (error) {
            console.log(error);
        }
    };

    const editHandler = (e) => {
        setEditToggler(() => !editToggler);
    };

    return (
        <div>
            <h1>Photo Details</h1>
            {photo && !editToggler && (
                <div>
                    <p>Title: {photo.title}</p>
                    <img src={photo.imageUrl} />
                </div>
            )}
            <button onClick={editHandler}>Edit</button>
            {editToggler && (
                <div>
                    <Form
                        formData={formData}
                        submitHandler={submitHandler}
                        changeHandler={changeHandler}
                        editHandler={editHandler}
                    />
                    <button onClick={editHandler}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default PhotoDetails;
