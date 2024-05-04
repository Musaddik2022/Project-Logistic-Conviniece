import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../../components/navbar/navbar";
import img1 from "./images/user-pro.jpg";

export default function UserProfile(props) {
  const [img, setImg] = useState("");
  const [actimg, setActImg] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const id = useParams().id;
  const [ischanged, setChanged] = useState(false);
  const [user2, setUser2] = useState({});
  const [isGot, setGot] = useState(false);
  const navigate = useNavigate();

  if (isGot == false) {
    axios
      .get("http://localhost:8080/getuser/" + id)
      .then((response) => {
        const user = response.data;
        setUser2(response.data);
        setImg("data:image/jpeg;base64," + user.profile);
        setActImg(user.profile);
        setName(user.name);
        setEmail(user.email);
        setPhone(user.mobile);
        setCity(user.city);
        setState(user.state);
        setPassword(user.password);
      })
      .catch((err) => {
        console.log(err);
      });
    setGot(true);
  }

  const changeHandler = (e) => {
    if (e.target.id == "dp") {
      if (e.target.length != 0) {
        setImg(URL.createObjectURL(e.target.files[0]));
        setActImg(e.target.files[0]);
        setChanged(true);
      }
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
    if (e.target.id == "city") {
      setCity(e.target.value);
    }
    if (e.target.id == "state") {
      setState(e.target.value);
    }
    if (e.target.id == "password") {
      setPassword(e.target.value);
    }
  };

  const deleteAccountHandler = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:8080/deleteuser/" + id)
      .then((response) => {
        if (response.data == "deleted") {
          navigate("/");
        } else {
          toast.error("Something went wrong", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("something went wrong", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("mobile", phone);
    formdata.append("city", city);
    formdata.append("state", state);
    formdata.append("profile", actimg);
    formdata.append("password", password);
    if (
      name == "" ||
      email == "" ||
      phone == "" ||
      city == "" ||
      state == "" ||
      password == ""
    ) {
      toast.error("Fields cant be empty", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (ischanged == true) {
        axios
          .put("http://localhost:8080/updateuser/withprofile/" + id, formdata)
          .then((response) => {
            if (response.data == "updated") {
              toast.success("Data has been updated successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {
                navigate("/home/user/" + id);
              }, 3000);
            } else {
              toast.error("Cant update the data", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Some error occured", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      } else {
        axios
          .put(
            "http://localhost:8080/updateuser/withoutprofile/" + id,
            formdata
          )
          .then((response) => {
            if (response.data == "updated") {
              toast.success("Data has been updated successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {
                navigate("/home/user/" + id);
              }, 3000);
            } else {
              toast.error("Cant update the data", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error("Some error occured", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      }
    }
  };
  return (
    <div>
      <Navbar login={props.login} id={id} />
      <div className="profile-edit">
        <div className="delete-account">
          <form onSubmit={deleteAccountHandler}>
            <button type="submit">
              <i class="fa-solid fa-user-xmark"></i>Delete Account
            </button>
          </form>
        </div>
        <div className="profile-edit-box">
          <form className="edit-form" onSubmit={submitHandler}>
            <div className="edit-group-dp">
              <img src={img} className="user-dp" />
              <div className="edit-group">
                <label htmlFor="dp">Edit Picture</label>
                <input type="file" id="dp" onChange={changeHandler} />
              </div>
            </div>
            <div className="edit-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Name"
                id="name"
                value={name}
                onChange={changeHandler}
              />
            </div>
            <div className="edit-group">
              <label htmlFor="mobile">Phone No.</label>
              <input
                type="text"
                placeholder="Phone number"
                id="phone"
                value={phone}
                onChange={changeHandler}
              />
            </div>
            <div className="edit-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="xyz@email.com"
                id="email"
                value={email}
                onChange={changeHandler}
              />
            </div>
            <div className="edit-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                placeholder="City"
                id="city"
                value={city}
                onChange={changeHandler}
              />
            </div>
            <div className="edit-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                placeholder="State"
                id="state"
                value={state}
                onChange={changeHandler}
              />
            </div>
            <div className="edit-group">
              <label htmlFor="state">Password</label>
              <input
                type="text"
                placeholder="Password"
                id="password"
                value={password}
                onChange={changeHandler}
              />
            </div>
            <div className="button-div">
              <button type="submit">Save</button>
            </div>
          </form>
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
  );
}
