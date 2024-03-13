import { useEffect, useState } from "react";
import "./Modal.css";
import "boxicons"

export default function Modal({
    adding,
    onAdding, 
    updating,
    onUpdate,
    cardToUpdate,
    toggleModalView
}) {


    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if(adding) {
            onAdding(formData)
            toggleModalView();
        }
        else if(updating) {
            onUpdate(formData);
            toggleModalView();
        }
      };


      useEffect(() => {
        if(cardToUpdate) {
            setFormData({
                ...cardToUpdate
            })
        }
      },[cardToUpdate])

    return (
        <dialog open >
            <div className="close-button">
                <form method="dialog">
                <button><box-icon name='x' size="md" onClick = {() => {
                    toggleModalView();
                }}></box-icon></button>
                </form>
            </div>
            <form onSubmit={handleSubmit} className="form-container">
                <div>
                    <label htmlFor="id">Id:</label>
                    <input
                    type="text"
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    className="input-field"
                    />
                </div>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-field"
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input-field"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    />
                </div>
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </dialog>
    )
}
