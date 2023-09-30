import React, { useState } from "react";
import { toast } from "react-toastify";
import { LoginUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { loginContext } = useContext(UserContext);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("chưa nhập email,password");
      return;
    }
    setLoading(true);
    const res = await LoginUser(email, password);
    if (res && res.token) {
      loginContext(email, res.token);
      toast.success("login success");
      nav("/");
    }
    if (res && res.status === 400) {
      toast.error("email or password incorrect");
    }
    setLoading(false);
  };
  return (
    <div className="container-login col-lg-4 col-sm-10 col-md-10">
      <div className="title">Login</div>
      <div className="text">Email or User (eve.holt@reqres.in)</div>
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
        onClick={() => {
          handleLogin();
        }}
      >
        {loading ? <i class="fas fa-circle-notch fa-spin"></i> : null}
        <span className="ms-2">Login</span>
      </button>
      <div
        className="back"
        onClick={() => {
          nav("/");
        }}
      >
        <i class="fa-solid fa-angles-left"></i>Go Back
      </div>
    </div>
  );
}
