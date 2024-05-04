import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./otp.css";
import "../../../components/navbar/navbar.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

export default function Otp(props) {
    var number = useParams().phone;
    const [digit1, setdigit1] = useState("");
    const [digit2, setdigit2] = useState("");
    const [digit3, setdigit3] = useState("");
    const [digit4, setdigit4] = useState("");
    

    useEffect(() => {
        var first = document.getElementById("1digit");
        first.focus()
    }, [])

    


    const changeHandler = (e) => {
        if (e.target.id == "1digit") {
            console.log(e.target.value)
            setdigit1(e.target.value);
            var second = document.getElementById("2digit")
            second.focus()
        } else if (e.target.id == "2digit") {
            setdigit2(e.target.value);
            var third = document.getElementById("3digit")
            third.focus()
        } else if (e.target.id == "3digit") {
            setdigit3(e.target.value);
            var fourth = document.getElementById("4digit")
            fourth.focus()
        } else if (e.target.id == "4digit") {
            setdigit4(e.target.value);
        }
    }

    const submitHandler = (e) => {
        console.log(props.otp)
        console.log("your OTP=> " + digit1 + digit2 + digit3 + digit4)
        if(props.otp == ""+digit1 + digit2 + digit3 + digit4){
            props.stateChanger(true);
            toast.success(
                "Congrats..! Number is Verified",
                {
                  position: "top-center",
                  autoClose: 4000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
          
                var otpCard = document.getElementById("verify-box");
                otpCard.style.display = "none";
            
        }else{
            toast.error("OTP not matched", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            
                var otpCard = document.getElementById("verify-box");
                otpCard.style.display = "none";
            
        }
    }
    
    const clickHandler =(e)=>{
        if(e.target.id == "close-otp"){
            var otpCard = document.getElementById("verify-box");
            otpCard.style.display = "none";
        }
    }

    return (

        <div className='otp-card' id="verify-box">
            <div className='close-div'>
                <button type={'button'} id="close-otp" onClick={clickHandler}>X</button>
            </div>
            <div className='heading-otp'>
                <h1>Confirm OTP</h1>
                <h4>We have sent a OTP to Your Number : {props.number} </h4>
            </div>
            <div className='otp-input'>
                <div className='otps'>
                    <input type="text" maxLength={1} id="1digit" onChange={changeHandler} value={digit1} />
                    <input type="text" maxLength={1} id="2digit" onChange={changeHandler} value={digit2} />
                    <input type="text" maxLength={1} id="3digit" onChange={changeHandler} value={digit3} />
                    <input type="text" maxLength={1} id="4digit" onChange={changeHandler} value={digit4} />
                </div>
                <div className='submit-button-div'>
                    <button onClick={submitHandler}>Verify</button>
                </div>
            </div>
            <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        </div>

    )
}
