import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className="container-login col-lg-4 col-sm-10 col-md-10">
      <div className="title">Login</div>
      <div className="text">Email or User</div>
      <div>
        <input
          type="text"
          placeholder="Email or userName..."
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div className="pass">
        <input
          type={isShowPassword === true ? "text" : "password"}
          placeholder="Password..."
          value={password}
          onChange={(event) => {
            setPassWord(event.target.value);
          }}
        />
        <i
          class={
            isShowPassword === true
              ? "fa-regular fa-eye"
              : "fa-regular fa-eye-slash"
          }
          onClick={() => {
            setIsShowPassword(!isShowPassword);
          }}
        ></i>
      </div>
      <button
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
      >
        Login
      </button>
      <div className="back">
        <i class="fa-solid fa-angles-left"></i>Go Back
      </div>
    </div>
  );
}
