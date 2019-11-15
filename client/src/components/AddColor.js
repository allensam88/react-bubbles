import React, { useState } from 'react';
import AxiosWithAuth from '../utils/AxiosWithAuth';

const AddColor = props => {
    const [newColor, setNewColor] = useState({
        id: '',
        color: '',
        code: {hex: ''}
    });
    
    const handleChange = (event) => {
        setNewColor({ ...newColor, [event.target.name]: event.target.value });
    }

    const handleHexChange = (event) => {
        setNewColor({ ...newColor, code: {[event.target.name]: event.target.value} });
    }

    const submitForm = event => {
        event.preventDefault();
        AxiosWithAuth()
            .post('/colors', newColor)
            .then(res => {
                props.history.push('/bubble-page')
                alert(`Successfully added ${newColor.color}`);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <form onSubmit={submitForm} className='add-form'>
                <input
                    type='text'
                    name="color"
                    value={newColor.color}
                    onChange={handleChange}
                    placeholder='color'
                    autoComplete='off'
                />
                <input
                    type='text'
                    name='hex'
                    value={newColor.code.hex}
                    onChange={handleHexChange}
                    placeholder='code'
                    autoComplete='off'
                />
                <button className='button'>Add Color</button>
            </form>
        </div>
    )
}

export default AddColor;