import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FORM } from "../../constants";
import { isEmail } from "validator";
import AuthService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        {FORM.ALERT}
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const ForgotPassword = ({ mode, handleMode }) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (checkBtn.current.context._errors.length === 0) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <>
      <Form onSubmit={handleUpdate} ref={form}>
        <div className="form-group">
          <label htmlFor="email">{FORM.EMAIL.LABLE}</label>
          <Input
            type="text"
            className="form-control"
            name="email"
            value={email}
            onChange={onChangeEmail}
            validations={[required, validEmail]}
          />
        </div>

        <div className="form-group">
          <button
            className="btn btn-primary btn-block"
            // onClick={() => setShowPassword(true)}
            type="submit"
          >
            {FORM.UPDATE_PASS_BUTTON}
          </button>
        </div>

        {/* {showPassword && <UpdateContent />} */}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />

        {status === "success" && (
          <p>
            We have sent the update password link to your emial, please check
            that ！
          </p>
        )}
        {status === "error" && <p>Password reset failed.</p>}
      </Form>

      <div className="flex row justify-content-between px-3">
        <div className="">
          <span>Already have an account?</span>
          <Button variant="link" onClick={() => handleMode("signin")}>
            Signin
          </Button>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
