"use client"
import { useEffect, useRef, useState } from "react";
import Card from "./component/Card/Card.js"
import 'boxicons'
import Modal from "./component/Modal/Modal.js";


// states -> returns UI -> useEffects


export default function page() {

  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [modal, setModal] = useState({
    action: '',
    open: false,
  })
  const [cardToUpdate, setCardToUpdate] = useState(undefined);

  function toggleModalView(action="") {
    setModal((prev) =>( {
      ...prev,
      open: !prev.open,
      action: action,
    }))
  }

  
  

  useEffect(() => {

    async function fetchData() {

      try {
        let response = await fetch('https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001')
        response = await response.json();
        setData(response);
      } catch (error) {
        setError(error);
      }
      finally{
        setLoading(false);
      }

    }

    fetchData();
  },[])


  function onDelete(id) {
    const dataAfterDeleting = data.filter((item) => item.id !== id)
    console.log(dataAfterDeleting)
    setData(dataAfterDeleting);
  }


  function onAdding(card) {
    setData((prev)=>{
      return [
        card,
        ...prev
      ]
    })
  }


  function getCardIdAndOpenUpdateModal(id) {

    for(const card of data) {
      if(card.id === id) {
        setCardToUpdate({
          ...card
        })
      }
    }
    toggleModalView('update');
  }


  function onUpdate(card) {
    let newData = data.filter((item) => {
      return item.id !== cardToUpdate.id
    })

    setData([
      card,
      ...newData
    ])
  }



  if(loading) {
     return <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
     }}>
      Loading....
     </div>
  }

  if(error) {
    return <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
     }}>
      {error}
     </div>
  }


  function renderModalUsingSwitch() {
    if(modal.open) {
      switch(modal.action) {
        case "add": {
          return <Modal 
          adding={true}
          onAdding={onAdding}
          toggleModalView={toggleModalView}
        />

            
          break;
        }

        case "update": {
          return <Modal 
          updating = {true}
          onUpdate={onUpdate}
          cardToUpdate = {cardToUpdate}
          toggleModalView={toggleModalView}
        />
            


          break;
        }
      }
    }
  }

  return(

    <>
        {
          renderModalUsingSwitch()
        }
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center ",
          marginTop: "30px"
        }}>

          <Card 
                  key={0}
                  id={"Id"}
                  imageUrl={""}
                  firstName={"First Name"}
                  lastName={"Last Name"}
                  email={"Email"}
          />

          <Card 
            addButton={true} 
            toggleModalView = {toggleModalView}
          />
          {
            data.map((item)=>{
              return <Card
                  key={item.id}
                  id = {item.id}
                  imageUrl={item.imageUrl}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  email={item.email}
                  heading
                  onDelete = {onDelete}
                  getCardIdAndOpenUpdateModal = {getCardIdAndOpenUpdateModal}
              />
            })
          }
        </div>
    </>
  );
    
}
