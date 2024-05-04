import "./user.css";
import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Review from "../../components/review/review";
import img from "./img/user.jpeg";

export default function UserDash(props) {
  const [comment, setComment] = useState([]);
  const [isGot, setGot] = useState(false);
  const [work, setWork] = useState([]);
  const [user, setUser] = useState({});
  const serviceId = useParams().serviceid;
  const userid = useParams().userid;
  if (isGot == false) {
    axios
      .get("http://localhost:8080/getservice/" + serviceId)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:8080/getrating/" + serviceId)
      .then((response) => {
        setComment(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8080/getwork/service/" + serviceId)
      .then((response) => {
        setWork(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setGot(true);
  }
  return (
    <div>
      <Navbar login={props.login} id={userid} />
      <div className="service-dash">
        <Sidebar
          login={props.login}
          isUserdash={"true"}
          userData={user}
          id={userid}
        />
        <div className="second">
          <div className="my-work">
            <h2 className="head-template">
              <i class="fa-solid fa-briefcase"></i> Work
            </h2>
            <div className="work-container">
              {work.map((item) => (
                <img src={"data:image/jpeg;base64," + item.work} />
              ))}
            </div>
          </div>
          <div className="comments">
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
    </div>
  );
}
