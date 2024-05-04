import { useState } from "react";
import "./profile-edit.css";
import img1 from "./images/user-pro.jpg";
import Navbar from "../../../components/navbar/navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FormData from "form-data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfileEdit(props) {
  const [img, setImg] = useState();
  const [actimg, setActImg] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [adress, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const id = useParams().id;
  const [isGot, setGot] = useState(false);
  const [isChanged, setChanged] = useState(false);
  const navigate = useNavigate();

  if (isGot == false) {
    axios
      .get("http://localhost:8080/getservice/" + id)
      .then((response) => {
        const user = response.data;
        setImg("data:image/jpeg;base64," + user.profile);
        setActImg(img1);
        setName(user.name);
        setDescription(user.description);
        setEmail(user.email);
        setPhone(user.mobile);
        setAdress(user.adress);
        setCity(user.city);
        setState(user.state);
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
    if (e.target.id == "description") {
      setDescription(e.target.value);
    }
    if (e.target.id == "email") {
      setEmail(e.target.value);
    }
    if (e.target.id == "phone") {
      setPhone(e.target.value);
    }
    if (e.target.id == "adress") {
      setAdress(e.target.value);
    }
    if (e.target.id == "city") {
      setCity(e.target.value);
    }
    if (e.target.id == "state") {
      setState(e.taregt.value);
    }
  };

  const deleteAccountHandler = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:8080/deleteservice/" + id)
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
    formdata.append("description", description);
    formdata.append("email", email);
    formdata.append("phone", phone);
    formdata.append("adress", adress);
    formdata.append("city", city);
    formdata.append("state", state);
    formdata.append("profile", actimg);
    if (
      name == "" ||
      description == "" ||
      email == "" ||
      phone == "" ||
      city == "" ||
      state == "" ||
      adress == ""
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
      if (isChanged == true) {
        axios
          .put(
            "http://localhost:8080/updateservice/withprofile/" + id,
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
                navigate("/service-dash/" + id);
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
            toast.error("Missing user Image", {
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
            "http://localhost:8080/updateservice/withoutprofile/" + id,
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
                navigate("/service-dash/" + id);
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
            toast.error("Missing user Image", {
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
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                value={description}
                cols="27"
                placeholder="Describe your bussiness.."
                rows="10"
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
              <label htmlFor="adrress">Address</label>
              <input
                type="text"
                placeholder="Street"
                id="adress"
                value={adress}
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
