import Navbar from "../../components/navbar/navbar";
import "./home.css";
import img1 from "./images/carpenter.jpg";
import img2 from "./images/carpenter2.jpg";
import img3 from "./images/packers.jpg";
import img4 from "./images/paiter.jpg";
import img5 from "./images/plumbing.jpg";
import img6 from "./images/tiles.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Review from "../../components/review/review";
import Calender from "../../components/calender/calender";

export default function Home(props) {
  const id = useParams().id;
  const [user, setUser] = useState({});
  const [carpenter, setCarpenter] = useState([]);
  const [painter, setPainter] = useState([]);
  const [tilesMaker, setTilesMaker] = useState([]);
  const [plumber, setPlumber] = useState([]);
  const [packers, setPackers] = useState([]);
  const [electrician, setElectrician] = useState([]);
  const [isGot, setGot] = useState(false);
  if (isGot == false) {
    axios
      .get("http://localhost:8080/gettopservice/carpenter")
      .then((response) => {
        setCarpenter(response.data);
      })
      .catch((err) => {
        console.log(err + "carpenter error");
      });

    axios
      .get("http://localhost:8080/gettopservice/painter")
      .then((response) => {
        setPainter(response.data);
      })
      .catch((err) => {
        console.log(err + "painter error");
      });

    axios
      .get("http://localhost:8080/gettopservice/electrician")
      .then((response) => {
        setElectrician(response.data);
      })
      .catch((err) => {
        console.log(err + "electrician error");
      });

    axios
      .get("http://localhost:8080/gettopservice/plumber")
      .then((response) => {
        setPlumber(response.data);
      })
      .catch((err) => {
        console.log(err + "plumber error");
      });

    axios
      .get("http://localhost:8080/gettopservice/tilesmaker")
      .then((response) => {
        setTilesMaker(response.data);
      })
      .catch((err) => {
        console.log(err + "tilesmaker error");
      });

    axios
      .get("http://localhost:8080/gettopservice/packers")
      .then((response) => {
        setPackers(response.data);
      })
      .catch((err) => {
        console.log(err + "packers error");
      });
    axios
      .get("http://localhost:8080/get" + props.login + "/" + id)
      .then((response) => {
        setUser(response.data);
        console.log(response.data.profile);
      })
      .catch((err) => {
        console.log(err);
      });
    setGot(true);
  }
  if (props.login == "service") {
    return (
      <div>
        <Navbar login={"service"} id={id} />
        <div className="home">
          <div className="slider">
            <img className="img1" src={img1} />
            <img className="img2" src={img2} />
            <img className="img3" src={img3} />
            <img className="img4" src={img4} />
            <img className="img5" src={img5} />
            <img className="img6" src={img6} />
          </div>
          <h1 className="heading">Angello</h1>
          <div className="major-list">
            <h1>Looking for</h1>
            <div className="service-items">
              <a href={"/carpenter/service/" + id} className="small-card">
                <i class="major-icon fa-solid fa-hammer"></i>
                <h3>Carpenter</h3>
              </a>
              <a href={"/painter/service/" + id} className="small-card">
                <i class="major-icon fa-solid fa-brush"></i>
                <h3>Painter</h3>
              </a>
              <a href={"/electrician/service/" + id} className="small-card">
                <i class="major-icon fa-solid fa-plug"></i>
                <h3>Electrician</h3>
              </a>
              <a href={"/plumber/service/" + id} className="small-card">
                <i class="major-icon fa-solid fa-wrench"></i>
                <h3>Plumber</h3>
              </a>
              <a href={"/tilesmaker/service/" + id} className="small-card">
                <i class="major-icon fa-solid fa-person-digging"></i>
                <h3>Tiles Maker</h3>
              </a>
              <a href={"/packers/service/" + id} className="small-card">
                <i class="major-icon fa-solid fa-boxes-packing"></i>
                <h3>Packers & Movers</h3>
              </a>
            </div>
          </div>
          <div className="welcome">
            <div className="notifications">
              <div className="notification-icon-box">
                <a href={"/notifications/service/" + id} id="notify">
                  <i className="ringing fa-solid fa-bell"></i>
                  <h3>Notifications</h3>
                </a>
              </div>
            </div>
            <h1>Welcome {user.name}.</h1>
            <div className="user-profile-home">
              <img
                className="user-profile-home-img"
                src={"data:image/jpeg;base64," + user.profile}
              />
              <a href={"/profile-edit/" + user.id}>
                <i class="fa-solid fa-gear"></i>Edit profile
              </a>
            </div>
            <h3>see your dashboard</h3>
            <a href={"/service-dash/" + id}>
              <i class="fa-solid fa-clipboard-list"></i>Dashboard
            </a>
          </div>
          <Calender id={id}/>
          <div className="services">
            <div className="service-box">
              <h1 className="service-heading">
                <i class="major-icon fa-solid fa-hammer"></i>Top Carpenters
              </h1>
              <div className="box-item">
                {carpenter.map((item) => (
                  <div className="card" key={item.id}>
                    <img
                      className="card-image"
                      src={"data:image/jpeg;base64," + item.profile}
                      alt="myimg"
                    />
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <Review rating={item.rating} />
                    <a href={"/user-dash/service/" + id + "/" + item.id}>
                      See work...
                    </a>
                  </div>
                ))}
              </div>
              <div className="seeall">
                <a className="see-all" href={"/carpenter/service/" + id}>
                  See all...
                </a>
              </div>
            </div>
            <div className="service-box">
              <h1 className="service-heading">
                <i class="major-icon fa-solid fa-wrench"></i>Top Plumbers
              </h1>
              <div className="box-item">
                {plumber.map((item) => (
                  <div className="card" key={item.id}>
                    <img
                      className="card-image"
                      src={"data:image/jpeg;base64," + item.profile}
                      alt="myimg"
                    />
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <Review rating={item.rating} />
                    <a href={"/user-dash/service/" + id + "/" + item.id}>
                      See work...
                    </a>
                  </div>
                ))}
              </div>
              <div className="seeall">
                <a className="see-all" href={"/plumber/service/" + id}>
                  See all...
                </a>
              </div>
            </div>
            <div className="service-box">
              <h1 className="service-heading">
                <i class="major-icon fa-solid fa-person-digging"></i>Top
                Tiles-Maker
              </h1>
              <div className="box-item">
                {tilesMaker.map((item) => (
                  <div className="card" key={item.id}>
                    <img
                      className="card-image"
                      src={"data:image/jpeg;base64," + item.profile}
                      alt="myimg"
                    />
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <Review rating={item.rating} />
                    <a href={"/user-dash/service/" + id + "/" + item.id}>
                      See work...
                    </a>
                  </div>
                ))}
              </div>
              <div className="seeall">
                <a className="see-all" href={"/tilesmaker/service/" + id}>
                  See all...
                </a>
              </div>
            </div>
            <div className="service-box">
              <h1 className="service-heading">
                <i class="major-icon fa-solid fa-plug"></i>Top Electricians
              </h1>
              <div className="box-item">
                {electrician.map((item) => (
                  <div className="card" key={item.id}>
                    <img
                      className="card-image"
                      src={"data:image/jpeg;base64," + item.profile}
                      alt="myimg"
                    />
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <Review rating={item.rating} />
                    <a href={"/user-dash/service/" + id + "/" + item.id}>
                      See work...
                    </a>
                  </div>
                ))}
              </div>
              <div className="seeall">
                <a className="see-all" href={"/electrician/service/" + id}>
                  See all...
                </a>
              </div>
            </div>
            <div className="service-box">
              <h1 className="service-heading">
                {" "}
                <i class="major-icon fa-solid fa-brush"></i>Top Painters
              </h1>
              <div className="box-item">
                {painter.map((item) => (
                  <div className="card" key={item.id}>
                    <img
                      className="card-image"
                      src={"data:image/jpeg;base64," + item.profile}
                      alt="myimg"
                    />
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <Review rating={item.rating} />
                    <a href={"/user-dash/service/" + id + "/" + item.id}>
                      See work...
                    </a>
                  </div>
                ))}
              </div>
              <div className="seeall">
                <a className="see-all" href={"/painter/service/" + id}>
                  See all...
                </a>
              </div>
            </div>
            <div className="service-box">
              <h1 className="service-heading">
                <i class="major-icon fa-solid fa-boxes-packing"></i>Top Packers
                and Movers
              </h1>
              <div className="box-item">
                {packers.map((item) => (
                  <div className="card" key={item.id}>
                    <img
                      className="card-image"
                      src={"data:image/jpeg;base64," + item.profile}
                      alt="myimg"
                    />
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <Review rating={item.rating} />
                    <a href={"/user-dash/service/" + id + "/" + item.id}>
                      See work...
                    </a>
                  </div>
                ))}
              </div>
              <div className="seeall">
                <a className="see-all" href={"/packers/service/" + id}>
                  See all...
                </a>
              </div>
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
                <h4>Mail us at FlipsideCustomer@gmail.com</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar login="user" id={id} />
        <div className="home">
          <div className="slider">
            <img className="img1" src={img1} />
            <img className="img2" src={img2} />
            <img className="img3" src={img3} />
            <img className="img4" src={img4} />
            <img className="img5" src={img5} />
            <img className="img6" src={img6} />
          </div>
          <h1 className="heading">Angello</h1>
          <div className="major-list">
            <h1>Looking for</h1>
            <div className="service-items">
              <a href={"/carpenter/user/" + id} className="small-card">
                <i class="major-icon fa-solid fa-hammer"></i>
                <h3>Carpenter</h3>
              </a>
              <a href={"/painter/user/" + id} className="small-card">
                <i class="major-icon fa-solid fa-brush"></i>
                <h3>Painter</h3>
              </a>
              <a href={"/electrician/user" + id} className="small-card">
                <i class="major-icon fa-solid fa-plug"></i>
                <h3>Electrician</h3>
              </a>
              <a href={"/plumber/user/" + id} className="small-card">
                <i class="major-icon fa-solid fa-wrench"></i>
                <h3>Plumber</h3>
              </a>
              <a href={"/tilesmaker/user/" + id} className="small-card">
                <i class="major-icon fa-solid fa-person-digging"></i>
                <h3>Tiles Maker</h3>
              </a>
              <a href={"/packers/user/" + id} className="small-card">
                <i class="major-icon fa-solid fa-boxes-packing"></i>
                <h3>Packers & Movers</h3>
              </a>
            </div>
          </div>
          <div className="welcome">
            <div className="notifications">
              <div className="notification-icon-box">
                <a href={"/notifications/user/" + id} id="notify">
                  <i className="ringing fa-solid fa-bell"></i>
                  <h3>Notifications</h3>
                </a>
              </div>
            </div>
            <h1>Welcome {user.name}.</h1>
            <div className="user-profile-home">
              <img
                className="user-profile-home-img"
                src={"data:image/jpeg;base64," + user.profile}
              />
              <a href={"/user-edit/" + user.id}>
                <i class="fa-solid fa-gear"></i>Edit profile
              </a>
            </div>
            <h3>see your Orders</h3>
            <a href={"/orders/" + id}>
              <i class="fa-solid fa-clipboard-list"></i>Orders
            </a>
          </div>
          <div className="services">
            <div className="service-box">
              <h1 className="service-heading">
                <i class="major-icon fa-solid fa-hammer"></i>Top Carpenters
              </h1>
              <div className="box-item">
                {carpenter.map((item) => (
                  <div className="card" key={item.id}>
                    <img
                      className="card-image"
                      src={"data:image/jpeg;base64," + item.profile}
                      alt="myimg"
                    />
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <Review rating={item.rating} />
                    <a href={"/user-dash/user/" + id + "/" + item.id}>
                      See work...
                    </a>
                  </div>
                ))}
              </div>
              <div className="seeall">
                <a className="see-all" href={"/carpenter/user/" + id}>
                  See all...
                </a>
              </div>
            </div>
            <div className="service-box">
              <h1 className="service-heading">
                <i class="major-icon fa-solid fa-wrench"></i>Top Plumbers
              </h1>
              <div className="box-item">
                {plumber.map((item) => (
                  <div className="card" key={item.id}>
                    <img
                      className="card-image"
                      src={"data:image/jpeg;base64," + item.profile}
                      alt="myimg"
                    />
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <Review rating={item.rating} />
                    <a href={"/user-dash/user/" + id + "/" + item.id}>
                      See work...
                    </a>
                  </div>
                ))}
              </div>
              <div className="seeall">
                <a className="see-all" href={"/plumber/user/" + id}>
                  See all...
                </a>
              </div>
            </div>
            <div className="service-box">
              <h1 className="service-heading">
                <i class="major-icon fa-solid fa-person-digging"></i>Top
                Tiles-Maker
              </h1>
              <div className="box-item">
                {tilesMaker.map((item) => (
                  <div className="card" key={item.id}>
                    <img
                      className="card-image"
                      src={"data:image/jpeg;base64," + item.profile}
                      alt="myimg"
                    />
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <Review rating={item.rating} />
                    <a href={"/user-dash/user/" + id + "/" + item.id}>
                      See work...
                    </a>
                  </div>
                ))}
              </div>
              <div className="seeall">
                <a className="see-all" href={"/tilesmaker/user/" + id}>
                  See all...
                </a>
              </div>
            </div>
            <div className="service-box">
              <h1 className="service-heading">
                <i class="major-icon fa-solid fa-plug"></i>Top Electricians
              </h1>
              <div className="box-item">
                {electrician.map((item) => (
                  <div className="card" key={item.id}>
                    <img
                      className="card-image"
                      src={"data:image/jpeg;base64," + item.profile}
                      alt="myimg"
                    />
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <Review rating={item.rating} />
                    <a href={"/user-dash/user/" + id + "/" + item.id}>
                      See work...
                    </a>
                  </div>
                ))}
              </div>
              <div className="seeall">
                <a className="see-all" href={"/electrician/user/" + id}>
                  See all...
                </a>
              </div>
            </div>
            <div className="service-box">
              <h1 className="service-heading">
                {" "}
                <i class="major-icon fa-solid fa-brush"></i>Top Painters
              </h1>
              <div className="box-item">
                {painter.map((item) => (
                  <div className="card" key={item.id}>
                    <img
                      className="card-image"
                      src={"data:image/jpeg;base64," + item.profile}
                      alt="myimg"
                    />
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <Review rating={item.rating} />
                    <a href={"/user-dash/user/" + id + "/" + item.id}>
                      See work...
                    </a>
                  </div>
                ))}
              </div>
              <div className="seeall">
                <a className="see-all" href={"/painter/user/" + id}>
                  See all...
                </a>
              </div>
            </div>
            <div className="service-box">
              <h1 className="service-heading">
                <i class="major-icon fa-solid fa-boxes-packing"></i>Top Packers
                and Movers
              </h1>
              <div className="box-item">
                {packers.map((item) => (
                  <div className="card" key={item.id}>
                    <img
                      className="card-image"
                      src={"data:image/jpeg;base64," + item.profile}
                      alt="myimg"
                    />
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                    <Review rating={item.rating} />
                    <a href={"/user-dash/user/" + id + "/" + item.id}>
                      See work...
                    </a>
                  </div>
                ))}
              </div>
              <div className="seeall">
                <a className="see-all" href={"/packers/user/" + id}>
                  See all...
                </a>
              </div>
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
                <h4>Mail us at FlipsideCustomer@gmail.com</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
