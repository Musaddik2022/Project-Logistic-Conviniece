import "./user_login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";

export default function UserLogin() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) => {
    if (e.target.id == "email") {
      setemail(e.target.value);
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
    axios.put("http://localhost:8080/getuser", formdata).then((response) => {
      if (response.data == "not verified") {
        toast.error('Invalid Email or Password', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      } else {
          navigate("/home/user/"+response.data);
      }
    }).catch(err=>{
      console.log(err);
      toast.error('Some error occured', {
        position: "top-center",
        autoClose: 3000,
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
          <h5 style={{marginLeft:"35px",marginTop:"13px"}}>Forgot password? <a href="/forgot-password/user">Click here</a></h5>
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
