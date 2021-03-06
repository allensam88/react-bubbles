import React, { useState } from "react";
import AxiosWithAuth from '../utils/AxiosWithAuth';
import AddColor from './AddColor';

const initialColor = {
    color: "",
    code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
    const [editing, setEditing] = useState(false);
    const [colorToEdit, setColorToEdit] = useState(initialColor);
    const [modal, setModal] = useState(false);

    const showModal = () => {
        setModal(true);
      };
    
    const hideModal = () => {
        setModal(false);
      };

    const editColor = color => {
        setEditing(true);
        setColorToEdit(color);
    };

    const saveEdit = e => {
        e.preventDefault();
        AxiosWithAuth()
            .put(`/colors/${colorToEdit.id}`, colorToEdit)
            .then(res => {
                //alternate way: use .map to return the colors, but switch out colorToEdit with id match
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
            <AddColor modal={modal} handleClose={hideModal} updateColors={updateColors}/>
            <button onClick={showModal} className='add-link'>Add Color</button>
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
