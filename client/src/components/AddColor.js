import React, { useState } from 'react';
import AxiosWithAuth from '../utils/AxiosWithAuth';

const AddColor = props => {
    const [newColor, setNewColor] = useState({
        id: '',
        color: '',
        code: ''
    });
    
    const handleChange = (event) => {
        event.persist();
        // // let value = event.target.value;
        // if (event.target.name === 'code') {
        //     let value = JSON.parse(`{ 'hex': ${event.target.value} }`);
        //     setNewColor({ ...newColor, [event.target.name]: value });
        // var params = `[{"hex": ${event.target.name}}]`;
        // obj = JSON.parse(params);
        // console.log(obj)
        // }
        
        setNewColor({ ...newColor, [event.target.name]: event.target.value });
    }

    const submitForm = event => {
        event.preventDefault();
        const addColor = {
            id: Date.now(),
            color: newColor.color,
            code: newColor.code,
        };
        AxiosWithAuth()
            .post('/colors', addColor)
            .then(res => {
                props.history.push('/bubble-page')
                alert(`Successfully added ${addColor.color}`);
            })
            .catch(err => console.log(err));
        setNewColor({
            id: '',
            color: '',
            code: ''
        });
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
                    name='code'
                    value={newColor.code}
                    onChange={handleChange}
                    placeholder='code'
                    autoComplete='off'
                />
                <button className='button'>Add Color</button>
            </form>
        </div>
    )
}

export default AddColor;