import "./register.css"

export default function RegisterMiddle() {
  return (
    <div className="login-middle">
    <h1>Register as</h1>
     <div className="login-box2">
        <div className="login-box-plate">
        <i class="fa-solid fa-user"></i>
        <a href="/register-user">User</a>
        </div>
        <div className="login-box-plate">
        <i class="fa-solid fa-user-tie"></i>
        <a href="/register-service">Service Provider</a>
        </div>
     </div>
</div>
  )
}
