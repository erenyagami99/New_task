import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { v4 as uuidv4 } from "uuid";

const LoginPage = () => {
  const Navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [buttonActive, setButtonActive] = useState(false);
  const [viewPass, setViewPass] = useState(false);

  const handleSubmit = async (e) => {
    const uuid = uuidv4();

    const formData = {
      name: name,
      uuid: uuid,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
    Navigate(`/home`);
  };

  useEffect(() => {
    if (name.length > 0 && password.length > 5) {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  }, [password, name]);

  return (
    <div className="login-container">
      <h1>Enroll</h1>
      <form
        className="login-form"
        onSubmit={() => (buttonActive ? handleSubmit() : "")}
      >
        <label htmlFor="name">Name</label>
        <form className="text-input">
          <input
            id="name"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            type="name"
            readonly
            onfocus="this.removeAttribute('readonly');"
            className="login-input"
          />
        </form>
        <label htmlFor="password">Password</label>
        <div className="text-input">
          <input
            className="login-input"
            type={viewPass ? "text" : "password"}
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            readonly
            onfocus="this.removeAttribute('readonly');"
          />
          {password.length > 0 && (
            <img
              className="eye-icon"
              onClick={() => setViewPass((prevState) => !prevState)}
              src={viewPass ? "/images/eyeOpen.svg" : "/images/eyeClose.svg"}
              alt="eyeIcon"
            />
          )}
        </div>

        <button
          type={buttonActive ? "submit" : ""}
          className={buttonActive ? "enroll-filled" : "enroll"}
        >
          Enroll
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
