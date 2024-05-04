import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { ToastContainer, toast } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';
import "./feedback.css"

export default function Feedback() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("");
    

    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://smtpjs.com/v3/smtp.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);


    const changeHandler = (e) => {
        if (e.target.id == "name") {
            setName(e.target.value);
        } else if (e.target.id == "email") {
            setEmail(e.target.value);
        } else if (e.target.id == "message") {
            setMessage(e.target.value);
        }
    }

    const submitHandler = (e) => {
        window.Email.send({
            Host: "smtp.elasticemail.com",
            Username: "mulla.musaddik77@gmail.com",
            Password: "3708DFF15892AE0839A72BAB0067BA8EFC06",
            To: 'nitin3.ak@gmail.com',
            From: "mulla.musaddik77@gmail.com",
            Subject: "Feedback from " + name,
            Body: message+"\n"+"email: "+email
        }).then(
            res=>{
                console.log(res)
                if(res == "OK"){
                    toast.success('Message is Sent! Our team will contact you soon ..', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }else{
                    toast.error('Message cant be sent..try again later!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
            }
        );
    }
    return (
        <>
        <div className='navbar2'>
        <a href='/'><i class="fa-solid fa-arrow-left"></i></a>
        </div>
        <div className='feed-box'>
            <div className='feed-card'>
                <div className='input-box-feed'>
                    <label htmlFor='name'>Name</label>
                    <input type={"text"} id="name" value={name} onChange={changeHandler} placeholder="Name"/>
                </div>
                <div className='input-box-feed'>
                    <label htmlFor='email'>email</label>
                    <input type={"text"} id="email" value={email} onChange={changeHandler} placeholder="email"/>
                </div>
                <div className='input-box-feed'>
                    <label htmlFor='message'>message</label>
                    <textarea type={"textarea"} id="message" value={message} onChange={changeHandler} />
                </div>
                <button type="button" onClick={submitHandler}>Send</button>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
        </>
    )
}
