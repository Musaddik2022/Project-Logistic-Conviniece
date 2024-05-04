import axios from "axios";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./order.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function MyOrders(props) {
  const id = useParams().id;
  const [orders, setOrders] = useState([]);
  const [isGot, setGot] = useState(false);
  if (isGot == false) {
    axios
      .get("http://localhost:8080/getorders/user/" + id)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setGot(true);
  }

  const deleteHandler = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8080/deleterequest/" + id + "/" + e.target.id)
      .then((response) => {
        if (response.data == "ok to send") {
          axios
            .put(
              "http://localhost:8080/deleterequest/" + id + "/" + e.target.id
            )
            .then((response) => {
              if (response.data == "added") {
                toast.success("Request has been sent Successfully!", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                toast.error("culdnt send the request", {
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
              toast.error("oops.something went wrong!", {
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
          toast.warn("Request is Sent Already!", {
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
        toast.error("culdnt send the request", {
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
      <div className="my-orders">
        <div className="order-box">
          <h1>My Orders</h1>
          <div className="order-container-my">
            {orders.map((item) => (
              <div className="single-order some-height">
                <img
                  className="service-img"
                  src={"data:image/jpeg;base64," + item.profile}
                />
                <div className="name">{item.name}</div>
                <div className="single-contact">
                  <a href="">
                    <i class="select-icon fa-solid fa-square-phone"></i>
                  </a>
                  <h4>{item.mobile}</h4>
                </div>
                <div className="complete-delete">
                  <form action="" onSubmit={deleteHandler} id={item.id}>
                    <button type="submit">
                      <i class="select-icon fa-solid fa-trash"></i>
                    </button>
                  </form>
                </div>
              </div>
            ))}
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
