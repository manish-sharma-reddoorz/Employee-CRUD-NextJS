"use client"
import Image from 'next/image';
import React from 'react'
import "./Card.css"
const employee =   {
    "id": 1001,
    "imageUrl": "https://hub.dummyapis.com/Image?text=KK&height=120&width=120",
    "firstName": "Kira",
    "lastName": "Klocko",
    "email": "Kira.Klocko@dummyapis.com",
    "contactNumber": "4400899101",
    "age": 41,
    "dob": "14/09/1983",
    "salary": 1.0,
    "address": "Address1"
  };

export default function Card({

    id,
    imageUrl,
    firstName,
    lastName,
    email,
    heading,
    onDelete,
    addButton,
    toggleModalView,
    getCardIdAndOpenUpdateModal
}) {
  return (

    <div className={`card flex-row-center ${addButton ? 'dashed-border' : ''}`} onClick={() =>{
      toggleModalView('add');
    }}>

        {
          addButton ? (
            <>
              <div className="flex-row-center add-button" style={{
                width: "1250px",
              }}>
                <button className='flex-row-center' style={{
                  backgroundColor: "transparent",
                  gap: '5px',
                  width: "fit-content",
                 
                }}><box-icon name='plus-circle' size="md" color="#777373"></box-icon></button>
              </div>
            </>
          )

          :

          (
            <>

                <div className="image-container">
                    {
                      imageUrl ? 
                        (<img src={imageUrl} alt="employee image"/> )
                        :
                        (<box-icon type='solid' name='user' size="lg"></box-icon>)
                    }
                </div>

                <div className="flex-row-center form-group id">
                  {id}
                </div>

                <div className="flex-row-center form-group firstName">
                  {firstName}
                </div>
                

                <div className="flex-row-center form-group lastName">
                  {lastName}
                </div>


                <div className=" flex-row-center form-group email">
                  {email}
                </div>


                <div className="flex-row-center button-container">
                  {
                    heading ? (<>

                      <div className="edit-button">
                          <button onClick={(event) => {
                            event.stopPropagation();
                            getCardIdAndOpenUpdateModal(id)
                          }}><box-icon name='pencil'></box-icon></button>
                          
                      </div>
                      <div className=" delete-button">
                        <button onClick = {(event) => {
                          event.stopPropagation();
                          onDelete(id)
                        }} ><box-icon name='trash'></box-icon></button>
                      </div>
                    </>)
                    : 
                    (
                      "Actions"
                    )
                  }
                </div>
            </>
          )

        }

       
    </div>
  )
}
