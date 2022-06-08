import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PhotoDetails = () => {
    const defaultFormData = {
        title: '',
        image: '',
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

    return (
        <div>
            <h1>Photo Details</h1>
            {photo && !editToggler && (
                <div>
                    <p>Title: {photo.title}</p>
                    <img src={photo.image} />
                </div>
            )}
            <button onClick={() => setEditToggler(() => !editToggler)}>
                Edit
            </button>
            {editToggler && (
                <div>
                    <form onSubmit={submitHandler}>
                        <label>Title: </label>
                        <input
                            type='text'
                            name='title'
                            value={formData.title}
                            onChange={changeHandler}
                        />
                        <br />
                        <label>Image UrL: </label>
                        <input
                            type='text'
                            name='image'
                            value={formData.image}
                            onChange={changeHandler}
                        />
                        <br />
                        <button type='submit'>Submit</button>
                    </form>
                    <button onClick={() => setEditToggler(() => !editToggler)}>
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default PhotoDetails;
