import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleLoginRedux } from "../redux/actions/UserAction";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  // const [loading, setLoading] = useState(false);

  const loading = useSelector((state) => state.user.isLoading);
  const account = useSelector((state) => state.user.account);

  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (account && account.auth === true) {
      nav("/");
    }
  }, [account]);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("chưa nhập email,password");
      return;
    }
    // setLoading(true);

    dispatch(handleLoginRedux(email, password));
    // const res = await LoginUser(email.trim(), password.trim());
    // if (res && res.token) {
    //   loginContext(email, res.token);
    //   toast.success("login success");
    //   nav("/");
    // }
    // if (res && res.status === 400) {
    //   toast.error("email or password incorrect");
    // }

    // setLoading(false);
  };

  const handlePressEnter = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
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
          onKeyDown={(event) => {
            handlePressEnter(event);
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
