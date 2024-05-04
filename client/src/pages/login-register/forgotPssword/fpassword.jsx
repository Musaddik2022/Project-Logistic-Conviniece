import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./fpassword.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { genPass } from './passwordGenerator';


export default function Fpassword(props) {
    const login = props.login;
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [newPass, setPass] = useState(genPass());
    const navigate = useNavigate()

    const changeHandler = (e) => {
        if (e.target.id == "email") {
            setEmail(e.target.value);
        } else if (e.target.id == "number") {
            setPhone(e.target.value);
        }
    }

    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://smtpjs.com/v3/smtp.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);



    const submitHandler = (e) => {
        if (e.target.id == "submit") {
            const formdata = new FormData();
            formdata.append("email", email);
            formdata.append("phone", phone);

            if (props.login == "user") {
                axios.post("http://localhost:8080/checkemailandphone/user", formdata).then(resp => {
                    if (resp.data != "400F") {
                        window.Email.send({
                            Host: "smtp.elasticemail.com",
                            Username: "mulla.musaddik77@gmail.com",
                            Password: "3708DFF15892AE0839A72BAB0067BA8EFC06",
                            To: email,
                            From: "mulla.musaddik77@gmail.com",
                            Subject: "Password from Angello",
                            Body: "Your Password form Angello Account is "+"\""+resp.data+"\""+" We Suggest you to change your password once you log in.You can do so in edit profile section, Happy Angello..!!"
                        }).then(
                            res => {
                                console.log(res)
                                if (res == "OK") {
                                    toast.success('Password is Sent to your Email! please check your spam', {
                                        position: "top-center",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                    setInterval(()=>{
                                        navigate("/")
                                    },1500)
                                    
                                } else {
                                    toast.error('Email is Invalid!', {
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
                    } else {
                        toast.error('Invalid email or phone number', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setPass(genPass)
                    }
                })
            }
            else if (props.login == "service") {
                axios.post("http://localhost:8080/checkemailandphone/service", formdata).then(resp => {
                    if (resp.data != "400F") {
                        window.Email.send({
                            Host: "smtp.elasticemail.com",
                            Username: "mulla.musaddik77@gmail.com",
                            Password: "3708DFF15892AE0839A72BAB0067BA8EFC06",
                            To: email,
                            From: "mulla.musaddik77@gmail.com",
                            Subject: "Password from Angello",
                            Body: "Your Password form Angello Account is "+"\""+resp.data+"\""+" We Suggest you to change your password once you log in.You can do so in edit profile section, Happy Angello..!!"
                        }).then(
                            res => {
                                console.log(res)
                                if (res == "OK") {
                                    toast.success('Password is Sent to your Email! please check your smap folder', {
                                        position: "top-center",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                    setInterval(()=>{
                                        navigate("/")
                                    },1500)
                                } else {
                                    toast.error('Email is Invalid!', {
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
                    } else {
                        toast.error('Invalid email or phone number', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setPass(genPass)
                    }
                })
            }

        }

    }

    return (
        <>
            <div className='navbar'>
            </div>
            <div className='fpassword-box'>
                <div className='fpassword-card'>
                    <h1>Please provide</h1>
                    <div className='input-box-f'>
                        <h3>registered Email</h3>
                        <input id="email" type={"text"} placeholder="Email@Email.com" onChange={changeHandler} value={email} />
                        <h3>registered phone number</h3>
                        <input id="number" type={"text"} placeholder="Phone Number" onChange={changeHandler} value={phone} />
                        <button type="button" onClick={submitHandler} id="submit">Send Password</button>
                    </div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {/* Same as */}
                <ToastContainer />
            </div>
        </>
    )
}
