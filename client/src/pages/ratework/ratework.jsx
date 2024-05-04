import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./ratework.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Ratework(props) {
  const [rate, setRate] = useState(1);
  const userid = useParams().userid;
  const serviceid = useParams().serviceid;
  const [user, setuser] = useState({});
  const [isGot, setGot] = useState(false);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  if (isGot == false) {
    axios
      .get("http://localhost:8080/getservice/" + serviceid)
      .then((response) => {
        setuser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setGot(true);
  }

  const clickHandle = (e) => {
    setRate(e.target.id);
  };

  const changeHandler = (e) => {
    if (e.target.id == "comment") {
      setComment(e.target.value);
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(rate);
    const formdata = new FormData();
    formdata.append("comment", comment);
    formdata.append("userid", userid);
    axios
      .put(
        "http://localhost:8080/setrating/" + serviceid + "/" + rate,
        formdata
      )
      .then((response) => {
        if (response.data == "rating is registered") {
          axios
            .delete(
              "http://localhost:8080/finaldelete/completed/" +
                serviceid +
                "/" +
                userid
            )
            .then((response) => {
              if (response.data == "deleted") {
                toast.success("Thanks for working with us!!", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                setInterval(() => {
                  navigate("/notifications/" + props.login + "/" + userid);
                }, 2000);
              }
            });
        } else {
          toast.error("Cant register rating", {
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
        toast.error("oops something went wrong", {
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

  const rows = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= rate) {
      rows.push(
        <i
          className="blue-color fa-solid fa-star"
          id={i}
          key={i}
          onClick={clickHandle}
        ></i>
      );
    } else {
      rows.push(
        <i
          className="fa-solid fa-star"
          id={i}
          key={i}
          onClick={clickHandle}
        ></i>
      );
    }
  }

  return (
    <div>
      <Navbar login={props.login} id={userid} />
      <div className="ratework">
        <div className="ratework-box">
          <h1>Rate your Experience</h1>
          <img
            className="user-image-rate"
            src={"data:image/jpeg;base64," + user.profile}
          />
          <h3>{user.name}</h3>
          <h4>Help us by reviewing our service</h4>
          <div className="rate-box">{rows}</div>
          {/* <div className="rate-cal">{rate}/5</div> */}
          <div>
            <form
              action=""
              className="button-div form-div"
              onSubmit={submitHandle}
            >
              <textarea
                name="comment"
                id="comment"
                cols="50"
                rows="10"
                value={comment}
                onChange={changeHandler}
                placeholder="Share your experience..."
              ></textarea>
              <button type="submit">Submit</button>
            </form>
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
