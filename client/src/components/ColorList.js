import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from './AxiosWithAuth';


const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth().put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(response => {
        console.log(response, 'Edit Success')
      })
      .catch(error => {
        console.log(error, 'Edit Error')
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color

    axiosWithAuth().delete(`/colors/${color.id}`)
      .then(response => {
        console.log(response, 'Delete Success')
      })
      .catch(error => {
        console.log(error, 'Delete Error')
      })
  };

  const newColor = e => {
    e.preventDefault();
    axiosWithAuth().post(`/colors`, addColor)
      .then(response => {
        updateColors([...colors, response.data]);
      })
      .catch(error => {
        console.log(error, 'Add Error')
      })
  }

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
      {/* stretch - build another form here to add a color */}
      
      <form onSubmit={newColor}>
          <label>Color Name</label>
          <input type='text' name='colorName' placeholder='Color Name' onChange={e => setAddColor({ ...addColor, color: e.target.value })
          } />

          <label>Color Hex #</label>
          <input type='text' name='colorHex' placeholder='Color Hex #' onChange={e => setAddColor({ ...addColor, code: e.target.value })
          } />
          
          <button type='submit'>Add New Color</button>
        </form>
    </div>
  );
};

export default ColorList;
