import { useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar(props) {
  const navigate = useNavigate();
  const LogoutHandler = (e) => {
    navigate("/");
  };
  if (props.login == "service") {
    return (
      <div className="navbar">
        <a href={"/home/service/" + props.id}>
          <i className="home-icon fa-solid fa-house-chimney"></i>Home
        </a>

        <div className="login-register-box">
          <form action="" onSubmit={LogoutHandler}>
            <button className="order-link" type={"submit"}>
              <i class="fa-solid fa-right-from-bracket"></i>Log Out
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="navbar">
        <a href={"/home/user/" + props.id}>
          <i className="home-icon fa-solid fa-house-chimney"></i>Home
        </a>

        <div className="login-register-box">
          <form action="" onSubmit={LogoutHandler}>
            <button className="order-link" type={"submit"}>
              <i class="fa-solid fa-right-from-bracket"></i>Log Out
            </button>
          </form>
        </div>
      </div>
    );
  }
}
