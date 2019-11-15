import React, { useState } from "react";
import { Link } from 'react-router-dom';
import AxiosWithAuth from '../utils/AxiosWithAuth';

const initialColor = {
    color: "",
    code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
    const [editing, setEditing] = useState(false);
    const [colorToEdit, setColorToEdit] = useState(initialColor);

    const editColor = color => {
        setEditing(true);
        setColorToEdit(color);
    };

    const saveEdit = e => {
        e.preventDefault();
        AxiosWithAuth()
            .put(`/colors/${colorToEdit.id}`, colorToEdit)
            .then(res => {
                updateColors([...colors.filter(item => { return item.id !== colorToEdit.id}), colorToEdit]);
                setEditing(false);
                alert(`Successfully updated ${colorToEdit.color}`)
            })
            .catch(err => console.log(err));
    };

    const deleteColor = color => {
        AxiosWithAuth()
        .delete(`/colors/${color.id}`)
        .then(res => {
            updateColors([...colors.filter(item => { return item.id !== color.id})]);
            alert(`Successfully deleted ${color.color}`)
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="colors-wrap">
            <p>colors</p>
            <ul>
                {colors.map(color => (
                    <li key={color.color} onClick={() => editColor(color)}>
                        <span>
                            <span className="delete" onClick={e => {
                                e.stopPropagation();
                                deleteColor(color)
                            }
                            }>
                                x
              </span>{" "}
                            {color.color}
                        </span>
                        <div
                            className="color-box"
                            style={{ backgroundColor: color.code.hex }}
                        />
                    </li>
                ))}
            </ul>
            <Link to={'/add-color'} className='add-button'>Add Color</Link>
            {editing && (
                <form onSubmit={saveEdit}>
                    <legend>edit color</legend>
                    <label>
                        color name:
                        <input
                            onChange={e =>
                                setColorToEdit({ ...colorToEdit, color: e.target.value })
                            }
                            value={colorToEdit.color}
                        />
                    </label>
                    <label>
                        hex code:
                        <input
                            onChange={e =>
                                setColorToEdit({
                                    ...colorToEdit,
                                    code: { hex: e.target.value }
                                })
                            }
                            value={colorToEdit.code.hex}
                        />
                    </label>
                    <div className="button-row">
                        <button type="submit">save</button>
                        <button onClick={() => setEditing(false)}>cancel</button>
                    </div>
                </form>
            )}
            <div className="spacer" />
        </div>
    );
};

export default ColorList;
