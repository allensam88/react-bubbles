import React, { useState } from 'react';
import AxiosWithAuth from '../utils/AxiosWithAuth';

const AddColor = props => {
    const [newColor, setNewColor] = useState({
        id: '',
        color: '',
        code: { hex: '' }
    });

    const showHideClassName = props.modal ? "modal display-block" : "modal display-none";

    const handleChange = (event) => {
        setNewColor({ ...newColor, [event.target.name]: event.target.value });
    }

    const handleHexChange = (event) => {
        setNewColor({ ...newColor, code: { [event.target.name]: event.target.value } });
    }

    const submitForm = event => {
        event.preventDefault();
        AxiosWithAuth()
            .post('/colors', newColor)
            .then(res => {
                alert(`Successfully added ${newColor.color}`);
                props.updateColors(res.data)
            })
            .catch(err => console.log(err));
        props.handleClose();
    };

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <form onSubmit={submitForm} className='add-form-container'>
                    <input
                        type='text'
                        name='color'
                        value={newColor.color}
                        onChange={handleChange}
                        placeholder='color name'
                        autoComplete='off'
                        className='add-input'
                    />
                    <input
                        type='text'
                        name='hex'
                        value={newColor.code.hex}
                        onChange={handleHexChange}
                        placeholder='hex value'
                        autoComplete='off'
                        className='add-input'
                    />
                    <button className='add-button'>Add Color</button>
                </form>
                <button onClick={props.handleClose} className='exit-button'>exit</button>
            </section>
        </div>
    )
}

export default AddColor;