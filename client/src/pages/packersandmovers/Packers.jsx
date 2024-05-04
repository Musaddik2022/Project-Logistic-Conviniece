import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Review from "../../components/review/review";
import "./carpenter.css";

export default function Packers(props) {
  const id = useParams().id;
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
  const [isGot, setGot] = useState(false);
  if (isGot == false) {
    axios
      .get("http://localhost:8080/getall/packers/all/xyz")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (props.login == "user") {
      axios
        .get("http://localhost:8080/getuser/" + id)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get("http://localhost:8080/getservice/" + id)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setGot(true);
  }

  const changeHandler = (e) => {
    if (e.target.id == "sort") {
      if (e.target.value == "rating") {
        axios
          .get("http://localhost:8080/getall/packers/rating/xyz")
          .then((response) => {
            setUsers(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (e.target.value == "nearby") {
        axios
          .get("http://localhost:8080/getall/packers/nearby/" + userData.city)
          .then((response) => {
            setUsers(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (e.target.value == "all") {
        axios
          .get("http://localhost:8080/getall/packers/all/xyz")
          .then((response) => {
            setUsers(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  return (
    <div>
      <Navbar login={props.login} id={id} />
      <div className="major-service">
        <div className="socket">
          <div className="slider-bar">
            <img
              src="https://www.assureshift.in/sites/default/files/styles/cover_image/public/images/cover/D2-Packers-Movers-Delhi.jpg?itok=UpM9w_9Z&c=030371e3c32a4cee15c95d9df6565dd7"
              className="slider-img"
            />
            <img
              src="https://www.movingsolutions.in/blog/wp-content/uploads/2021/02/iba-approved-packers-and-movers-in-pune.jpg"
              className="slider-img"
            />
            <img
              src="http://www.ewire-news.com/wp-content/uploads/2021/08/Lawrence-Movers.jpg"
              className="slider-img"
            />
            <img
              src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1000,h_667/https://sundaymovers.ca/wp-content/uploads/2022/01/two-movers-transporting-cardboard-boxes-in-apartme-9ZTCW5Z-min.jpg"
              className="slider-img"
            />
            <img
              src="https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/at%2Freal-estate%2Fmovers-moving-boxes"
              className="slider-img"
            />
          </div>
        </div>
        <div className="operations">
          <div className="option">
            <label for="sort">Sort By</label>
            <select id="sort" onChange={changeHandler}>
              <option value="all">Show All</option>
              <option value="rating">Rating</option>
              <option value="nearby">Nearby</option>
            </select>
          </div>
        </div>
        <div className="major-service-list">
          {users.map((item) => (
            <div className="service-pro-box">
              <img
                className="service-pro-img"
                src={"data:image/jpeg;base64," + item.profile}
              />
              <div className="details-box">
                <h2>{item.name}</h2>
                <Review rating={item.rating} />
                <p>{item.description}</p>
                <a
                  className="see-all"
                  href={"/user-dash/" + props.login + "/" + id + "/" + item.id}
                >
                  See work..
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="Contact">
          <h1>Contact us</h1>
          <div className="social">
            <a href="">
              <i class="social-icon fa-brands fa-facebook-square"></i>
            </a>
            <a href="">
              <i class="social-icon fa-brands fa-twitter-square"></i>
            </a>
            <a href="">
              <i class="social-icon fa-brands fa-instagram-square"></i>
            </a>
            <a href="">
              <i class="social-icon fa-brands fa-reddit-square"></i>
            </a>
          </div>
          <div className="other">
            <h4>Helpline-231-345671</h4>
            <h4>Mail us FlipsideCustomer@gmail.com</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
