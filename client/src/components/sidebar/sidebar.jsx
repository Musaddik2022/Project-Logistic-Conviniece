import Review from "../review/review";
import "./sidebar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CalenderShow from "../calender/calenderShow";
export default function Sidebar(props) {
  const userData = props.userData;
  console.log(userData)
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:8080/setappointment/" + props.id + "/" + userData.id
      )
      .then((response) => {
        if (response.data == "orders updated") {
          toast.success("Order has been set..", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (response.data == "already appointed") {
          toast.warn("Service is Already appointed", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Sorry order cannot be placed at moment", {
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
        toast.error("Order cannot be placed at moment", {
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
  if (props.login == "user") {
    return (
      <div className="sidebar">
        <img
          className="user-image"
          src={"data:image/jpeg;base64," + userData.profile}
        />
        <h3>{userData.name}</h3>
        <Review rating={userData.rating} />
        <p>{userData.description}</p>
        <form action="" onSubmit={submitHandler}>
          <button className="appoint" type="submit">
            <i class="fa-solid fa-handshake"></i>Appoint
          </button>
        </form>
        <CalenderShow busyDates={userData.busyDates} id={userData.id}/> 
        <div className="service-contact">
          <h2>Contact</h2>
          <div classname="contact-box-2">
            <span className="icon-info">
              <i class="fa-solid fa-phone"></i>
              <h4>Phone: {userData.mobile}</h4>
            </span>
            <span className="icon-info">
              <i class="fa-solid fa-envelope"></i>
              <h4>Email: {userData.email}</h4>
            </span>
            <span className="icon-info">
              <i class="fa-solid fa-location-dot"></i>
              <h4>
                Address:
                {userData.adress + "," + userData.city + "," + userData.state}
              </h4>
            </span>
          </div>
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
    );
  }

  if (props.login == "service" && props.id != userData.id) {
    return (
      <div className="sidebar">
        <img
          className="user-image"
          src={"data:image/jpeg;base64," + userData.profile}
        />
        <h3>{userData.name}</h3>
        <Review rating={userData.rating} />
        <p>{userData.description}</p>
        <CalenderShow busyDates={userData.busyDates} id={userData.id}/> 
        <div className="service-contact">
          <h2>Contact</h2>
          <div classname="contact-box-2">
            <span className="icon-info">
              <i class="fa-solid fa-phone"></i>
              <h4>Phone: {userData.mobile}</h4>
            </span>
            <span className="icon-info">
              <i class="fa-solid fa-envelope"></i>
              <h4>Email: {userData.email}</h4>
            </span>
            <span className="icon-info">
              <i class="fa-solid fa-location-dot"></i>
              <h4>
                Address:
                {userData.adress + "," + userData.city + "," + userData.state}
              </h4>
            </span>
          </div>
        </div>
      </div>
    );
  }
  if (props.login == "service" && props.id == userData.id) {
    return (
      <div className="sidebar">
        <div className="edit-icon">
          <a href={"/profile-edit/" + props.id}>
            <i class="fa-solid fa-user-pen"></i>Edit Profile
          </a>
        </div>
        <img
          className="user-image"
          src={"data:image/jpeg;base64," + userData.profile}
        />
        <h3>{userData.name}</h3>
        <Review rating={userData.rating} />
        <p>{userData.description}</p>
        <CalenderShow busyDates={userData.busyDates} id={userData.id}/> 
        <div className="service-contact">
          <h2>Contact</h2>
          <div classname="contact-box-2">
            <span className="icon-info">
              <i class="fa-solid fa-phone"></i>
              <h4>Phone: {userData.mobile}</h4>
            </span>
            <span className="icon-info">
              <i class="fa-solid fa-envelope"></i>
              <h4>Email: {userData.email}</h4>
            </span>
            <span className="icon-info">
              <i class="fa-solid fa-location-dot"></i>
              <h4>
                Address:
                {userData.adress + "," + userData.city + "," + userData.state}
              </h4>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
