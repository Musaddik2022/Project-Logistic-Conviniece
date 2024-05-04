import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Review from "../../components/review/review";
import "./carpenter.css";

export default function TileMaker(props) {
  const id = useParams().id;
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
  const [isGot, setGot] = useState(false);
  if (isGot == false) {
    axios
      .get("http://localhost:8080/getall/tilesmaker/all/xyz")
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
          .get("http://localhost:8080/getall/tilesmaker/rating/xyz")
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
            "http://localhost:8080/getall/tilesmaker/nearby/" + userData.city
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
          .get("http://localhost:8080/getall/tilesmaker/all/xyz")
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
              src="https://img.freepik.com/premium-photo/wood-flooring-workers-construction-worker-installing-new-laminate-wooden-floor-house_64073-438.jpg?w=2000"
              className="slider-img"
            />
            <img
              src="https://media.istockphoto.com/photos/man-installing-new-laminated-wooden-floor-picture-id508420412?k=20&m=508420412&s=612x612&w=0&h=ZEXv3eh1GiYLyXCgC3NYViTV0Cxc4J5FMtWgQZ5YAQU="
              className="slider-img"
            />
            <img
              src="https://www.mrhandyman.com/images/blog/flooring-installation.jpg"
              className="slider-img"
            />
            <img
              src="https://img.freepik.com/free-photo/people-renovating-house-concept_53876-20664.jpg?w=2000"
              className="slider-img"
            />
            <img
              src="https://img.freepik.com/premium-photo/worker-repairman-puts-large-ceramic-tiles_327697-17.jpg?w=2000"
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
