import React, { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';
import img1 from "./user.webp";

export default function Test() {
   const [users,setUsers] = useState([]);
   axios.get("http://localhost:8080/users").then((res)=>{
    setUsers(res.data);
   }).catch((err)=>{
     console.log(err);
   })
  return (
    <div>
        {users.map((item)=>(
            <div>
            <h1>{item.name}</h1>
            <img src={"data:image/png;base64,"+item.image}/>
            </div>
        ))}
    </div>
  )
}
