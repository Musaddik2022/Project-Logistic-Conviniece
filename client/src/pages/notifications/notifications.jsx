import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./notifications.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function MyNotifications(props) {
  const id = useParams().id;
  const [Request, setDeleteRequest] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [isGot, setGot] = useState(false);

  if (isGot == false && props.login == "user") {
    axios
      .get("http://localhost:8080/getcompletedorders/" + id)
      .then((response) => {
        setCompleted(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8080/getdeletedorders/" + id)
      .then((response) => {
        setDeleted(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setGot(true);
  }

  if (isGot == false && props.login == "service") {
    axios
      .get("http://localhost:8080/deleterequest/" + id)
      .then((response) => {
        setDeleteRequest(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setGot(true);
  }

  const deleteHandlerC = (e) => {
    e.preventDefault();
    axios
      .delete(
        "http://localhost:8080/finaldelete/completed/" + e.target.id + "/" + id
      )
      .then((response) => {
        if (response.data == "deleted") {
          toast.success("Deleted Successfully", {
            position: "top-right",
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
          toast.error("Cannot delete The order", {
            position: "top-right",
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
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const deleteHandlerD = (e) => {
    e.preventDefault();
    axios
      .delete(
        "http://localhost:8080/finaldelete/deleted/" + e.target.id + "/" + id
      )
      .then((response) => {
        if (response.data == "deleted") {
          toast.success("Deleted Successfully", {
            position: "top-right",
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
          toast.error("Cannot delete The order", {
            position: "top-right",
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
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const requestDeleteHandler = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:8080/acceptdeleterequest/" + e.target.id + "/" + id
      )
      .then((response) => {
        if (response.data == "deleted") {
          toast.success("Delete request Accepted", {
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
          toast.error("could not accept the request", {
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

  if (props.login == "user") {
    return (
      <div>
        <Navbar login={props.login} id={id} />
        <div className="my-orders">
          <div className="order-box">
            <h1>
              <i class="ringing fa-solid fa-bell"></i>Notifications
            </h1>
            <div className="order-container-my">
              {completed.map((item) => (
                <div className="single-order some-height">
                  <img
                    className="service-img"
                    src={"data:image/jpeg;base64," + item.profile}
                  />
                  <div className="name">{item.name}</div>
                  <div className="message">Work completed Successfully!</div>
                  <div className="complete-delete">
                    <a
                      className="rate-icon"
                      href={"/rate/" + item.id + "/" + id}
                    >
                      <i class="fa-solid fa-flag-checkered"></i>
                      rate work
                    </a>
                    <form id={item.id} onSubmit={deleteHandlerC}>
                      <button type="submit">
                        <i class="select-icon fa-solid fa-trash"></i>
                      </button>
                    </form>
                  </div>
                </div>
              ))}
              {deleted.map((item) => (
                <div className="single-order some-height">
                  <img
                    className="service-img"
                    src={"data:image/jpeg;base64," + item.profile}
                  />
                  <div className="name">{item.name}</div>
                  <div className="message">
                    Work is Rejected by service provider!
                  </div>
                  <div className="complete-delete">
                    <form id={item.id} onSubmit={deleteHandlerD}>
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

  if (props.login == "service") {
    return (
      <div>
        <Navbar login={props.login} id={id} />
        <div className="my-orders">
          <div className="order-box">
            <h1>
              <i class="ringing fa-solid fa-bell"></i>Notifications
            </h1>
            <div className="order-container-my">
              {Request.map((item) => (
                <div className="single-order some-height">
                  <img
                    className="service-img"
                    src={"data:image/jpeg;base64," + item.profile}
                  />
                  <div className="name">{item.name}</div>
                  <div className="message">Request to cancel order</div>
                  <div className="complete-delete">
                    <form id={item.id} onSubmit={requestDeleteHandler}>
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
}
