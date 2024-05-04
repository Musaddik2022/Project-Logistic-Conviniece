import "./service.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Review from "../../components/review/review";
import img from "./img/user.jpeg";

export default function ServiceDash(props) {
  const id = useParams().id;
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [comment, setComment] = useState([]);
  const [orders, setOrders] = useState([]);
  const [work, setWork] = useState([]);
  const [isGot, setGot] = useState(false);
  if (isGot == false) {
    axios
      .get("http://localhost:8080/getservice/" + id)
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:8080/getwork/service/" + id)
      .then((response) => {
        setWork(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:8080/getorders/service/" + id)
      .then((response) => {
        setOrders(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8080/getrating/" + id)
      .then((response) => {
        setComment(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setGot(true);
  }

  const deleteHandler = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:8080/deleteorder/" + id + "/" + e.target.id)
      .then((response) => {
        if (response.data == "deleted") {
          toast.success("order is deleted successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setInterval(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error("Couldnt delete order", {
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
        toast.error("Cant delete Order..Contact Costumer Care", {
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

  const completeHandler = (e) => {
    e.preventDefault();
    axios
      .delete("http://localhost:8080/completeorder/" + id + "/" + e.target.id)
      .then((response) => {
        if (response.data == "deleted") {
          toast.success("order is completed successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setInterval(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error("Couldnt complete order", {
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
        toast.error("Cant complete Order..Contact Costumer Care", {
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

  return (
    <div>
      <Navbar login={props.login} id={id} />
      <div className="service-dash">
        <Sidebar login={props.login} userData={userData} id={userData.id} />
        <div className="second">
          <div className="pending-orders">
            <div className="order-head">
              <h2>
                <i class="fa-solid fa-bars-progress"></i>Pending orders
              </h2>
            </div>
            <div className="order-container">
              {orders.map((item) => (
                <div className="single-order">
                  <div className="name">{item.name}</div>
                  <div className="single-contact">
                    <div className="contact-box-order">
                      <div className="single-contact">
                        <i class="select-icon fa-solid fa-square-phone"></i>
                        <h4>{item.mobile}</h4>
                      </div>
                      <div className="single-contact">
                        <i class="fa-solid fa-envelope"></i>
                        <h4>{item.email}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="complete-delete">
                    <form action="" id={item.id} onSubmit={completeHandler}>
                      <button type="submit" className="done-button">
                        <i class="select-icon fa-solid fa-circle-check"></i>
                      </button>
                    </form>
                    <form action="" id={item.id} onSubmit={deleteHandler}>
                      <button className="delete-button" type="submit">
                        <i class="select-icon fa-solid fa-trash"></i>
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="my-work">
            <div className="edit">
              <a href={"/work-edit/" + id}>
                <i class="fa-solid fa-pen-to-square"></i>Edit Work
              </a>
            </div>
            <h2 className="head-template">
              <i class="fa-solid fa-briefcase"></i>Work
            </h2>
            <div className="work-container">
              {work.map((item) => (
                <img src={"data:image/jpeg;base64," + item.work} />
              ))}
            </div>
          </div>
          <div className="comments2">
            <div className="comments-heading">
              <div className="heading-box-comment">
                <h2>
                  <i class="fa-solid fa-comments"></i> Comments
                </h2>
              </div>
            </div>
            <div className="comment-box">
              {comment.map((item) => (
                <div className="single-comment-box">
                  <div className="first-box">
                    <img
                      className="user-img-comment"
                      src={"data:image/jpeg;base64," + item.user.profile}
                    />
                    <h3>{item.user.name}</h3>
                  </div>
                  <div className="second-box">
                    <Review rating={item.comment.rating} />
                    <h4>{item.comment.comment}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
