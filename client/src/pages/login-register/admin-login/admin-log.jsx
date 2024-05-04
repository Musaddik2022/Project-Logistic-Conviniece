import "./admin-login.css"

export default function AdminLogin() {
  return (
    <div className="user-login">
         
         <div className="login-box3">
            <h1>Login</h1>
            <form action="">
            <div className="login-option">
                <label for="email"><i class="fa-solid fa-user"></i></label>
                <input type={"text"} placeholder="xyz@gmail.com"/>
            </div>
            <div className="login-option">
                <label for="password"><i class="fa-solid fa-lock"></i></label>
                <input type={"password"} placeholder="password"/>
            </div>
            <div className="button-div">
                <button type="submit">Login</button>
            </div>
            </form>
         </div>
    </div>
  )
}
