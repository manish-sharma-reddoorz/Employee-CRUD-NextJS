"use client"
import { useEffect, useState } from "react";
import Card from "./component/Card/Card.js"
import 'boxicons'



export default function page() {

  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

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

  return(
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "center "

    }}>

      <Card 
              key={0}
              id={"Id"}
              imageUrl={""}
              firstName={"First Name"}
              lastName={"Last Name"}
              email={"Email"}
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
          />
         })
      }
    </div>
  );
    
}
