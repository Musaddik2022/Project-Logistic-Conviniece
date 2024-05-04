import "./user-register.css";
import img from "./login.png";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import img1 from "./img/user.jpeg";
import Otp from "../Otp/otp";

export default function UserRegister() {
  const [pic, setPic] = useState(img1);
  const [actPic, setActPic] = useState("");
  const [isChanged, setChanged] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [isValidate, setValidate] = useState(false);
  const [otp, setOtp] = useState(Math.floor(Math.random() * (10000 - 1000) + 1000));

  const changeHandler = (e) => {
    if (e.target.id == "profile") {
      setActPic(e.target.files[0]);
      setChanged(true);
      setPic(URL.createObjectURL(e.target.files[0]));
    }
    if (e.target.id == "name") {
      setName(e.target.value);
    }
    if (e.target.id == "email") {
      setEmail(e.target.value);
    }
    if (e.target.id == "phone") {
      setPhone(e.target.value);
    }
    if (e.target.id == "password") {
      setPassword(e.target.value);
    }
    if (e.target.id == "city") {
      setCity(e.target.value);
    }
    if (e.target.id == "state") {
      setState(e.target.value);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      name == "" ||
      email == "" ||
      password == "" ||
      phone == "" ||
      city == "" ||
      state == ""
    ) {
      toast.error("All data must be provided", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (isValidate == false) {
        toast.error("Validate phone Number", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        if(isChanged == true){
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("mobile", phone);
        formdata.append("password", password);
        formdata.append("city", city);
        formdata.append("state", state);
        formdata.append("profile", actPic);
        axios
          .post("http://localhost:8080/adduser", formdata)
          .then((response) => {
            if (response.data == "already exists") {
              toast.error("Email already exists", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              toast.success(
                "🦄Wooohoo..! User is registered successfully! login again!",
                {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
              setTimeout(() => {
                navigate("/");
              }, 4000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }else{
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("mobile", phone);
        formdata.append("password", password);
        formdata.append("city", city);
        formdata.append("state", state);
        axios
          .post("http://localhost:8080/adduserwithoutprofile", formdata)
          .then((response) => {
            if (response.data == "already exists") {
              toast.error("Email already exists", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              toast.success(
                "🦄Wooohoo..! User is registered successfully! login again!",
                {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
              setTimeout(() => {
                navigate("/");
              }, 4000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    }
  };

  const clickListner = (e) => {
    if (e.target.id == "verify") {
      if (isValidate == false) {
        if (phone != "") {
          var varify = document.getElementById("verify-box");
          varify.style.display = "flex";
          axios.get("https://www.fast2sms.com/dev/bulkV2?authorization=bhplEVGHSwu9qZ84Ck1N0mfvB6IKtAzjsacUXrW3gPJDeiyF2Mf6JEkDeHMqwpTR3O1SFd7QsG9hxVcn&variables_values="+otp+"&numbers="+phone+"&route=otp").then(res=>{
            if(res.data.return == true){
                 console.log(res.data);
            }else{
              varify.style.display = "none";
              toast.error("Please provided a valid phone number", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setOtp(Math.floor(Math.random() * (10000 - 1000) + 1000));
            }
          }).catch(err=>{
            console.log(err);
            varify.style.display = "none";
            toast.error("OOPs..Something went Wrong!!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setOtp(Math.floor(Math.random() * (10000 - 1000) + 1000));
          })
        }
      } else {
        toast.error("Please provided phone number", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }

  return (
    <div className="user-register">
      <div className="register-box">
        <img className="back" src={img} alt="" />
        <h1>Register</h1>
        <form action="" onSubmit={submitHandler}>
          <img src={pic} className="user-image-register" />
          <div className="input-box">
            <label for="profile">
              <i class="fa-solid fa-id-badge"></i>
            </label>
            <input id="profile" type="file" onChange={changeHandler} />
          </div>
          <div className="input-box">
            <label for="name">
              <i class="fa-solid fa-user"></i>
            </label>
            <input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={changeHandler}
            />
          </div>
          <div className="input-box">
            <label for="email">
              <i class="fa-solid fa-envelope"></i>
            </label>
            <input
              id="email"
              placeholder="xyz@pmail.com"
              value={email}
              onChange={changeHandler}
            />
          </div>
          <div className="input-box">
            <label for="phone">
              <i class="fa-solid fa-square-phone"></i>
            </label>
            <input
              id="phone"
              placeholder="Mobile Number"
              value={phone}
              onChange={changeHandler}
            />
          </div>
          <div className="input-box">
            <button type={"button"} onClick={clickListner} id="verify">Verify</button>
          </div>
          <div className="input-box">
            <label for="city">
              <i class="fa-solid fa-city"></i>
            </label>
            <input
              id="city"
              placeholder="City"
              value={city}
              onChange={changeHandler}
            />
          </div>
          <div className="input-box">
            <label for="state">
              <i class="fa-solid fa-building-user"></i>
            </label>
            <input
              id="state"
              placeholder="state"
              value={state}
              onChange={changeHandler}
            />
          </div>
          <div className="input-box">
            <label for="password">
              <i class="fa-solid fa-lock"></i>
            </label>
            <input
              id="password"
              placeholder="password"
              value={password}
              onChange={changeHandler}
            />
          </div>
          <button type="submit">Register</button>
        </form>
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
      <Otp otp={otp} number={phone} stateChanger={setValidate}/>
    </div>
  );
}
