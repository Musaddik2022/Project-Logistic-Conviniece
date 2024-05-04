import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Review from "../../components/review/review";
import "./carpenter.css";

export default function Electrician(props) {
  const id = useParams().id;
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
  const [isGot, setGot] = useState(false);
  if (isGot == false) {
    axios
      .get("http://localhost:8080/getall/electrician/all/xyz")
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
          .get("http://localhost:8080/getall/electrician/rating/xyz")
          .then((response) => {
            setUsers(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (e.target.value == "nearby") {
        axios
          .get(
            "http://localhost:8080/getall/electrician/nearby/" + userData.city
          )
          .then((response) => {
            setUsers(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (e.target.value == "all") {
        axios
          .get("http://localhost:8080/getall/electrician/all/xyz")
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
              src="https://empire-s3-production.bobvila.com/articles/wp-content/uploads/2021/01/The-Best-Electrician-Near-Me.jpg"
              className="slider-img"
            />
            <img
              src="https://img.freepik.com/premium-photo/electrician-testing-electric-current-control-panel_34936-2970.jpg?w=2000"
              className="slider-img"
            />
            <img
              src="https://www.procrewschedule.com/wp-content/uploads/2020/06/Electrician-working-on-switchboard-of-house-building-construction-site.jpg"
              className="slider-img"
            />
            <img
              src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/03/featured-image-electrician.jpeg.jpg"
              className="slider-img"
            />
            <img
              src="https://cdn.homeguide.com/assets/images/content/homeguide-electrical-wiring-installation-of-outlets-and-switches.jpg"
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
