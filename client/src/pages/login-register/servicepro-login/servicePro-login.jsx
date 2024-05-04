import { useState } from "react";
import "./user_login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import FormData from "form-data";

export default function ServiceLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) => {
    if (e.target.id == "email") {
      setEmail(e.target.value);
    }
    if (e.target.id == "password") {
      setPassword(e.target.value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    axios.put("http://localhost:8080/getservice", formdata).then((res) => {
      if (res.data == "not verified") {
        toast.error('Invalid Username or password', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      } else {
        navigate("/home/service/"+res.data)
      }
    }).catch((err)=>{
      console.log(err)
      toast.error('oops..Something went wrong', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    });
  };

  return (
    <div className="user-login">
      <div className="login-box3">
        <h1>Login</h1>
        <form action="" onSubmit={submitHandler}>
          <div className="login-option">
            <label for="email">
              <i class="fa-solid fa-user"></i>
            </label>
            <input
              type={"text"}
              placeholder="xyz@gmail.com"
              id="email"
              value={email}
              onChange={changeHandler}
            />
          </div>
          <div className="login-option">
            <label for="password">
              <i class="fa-solid fa-lock"></i>
            </label>
            <input
              type={"password"}
              placeholder="password"
              id="password"
              value={password}
              onChange={changeHandler}
            />
          </div>
          <div className="button-div">
            <button type="submit">Login</button>
          </div>
          <h5 style={{marginLeft:"35px",marginTop:"13px"}}>Forgot password? <a href="/forgot-password/service">Click here</a></h5>
        </form>
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
  );
}
