import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Modal from "../../common/modal";
import { FORM } from "../../constants";
import { isEmail } from "validator";

// import AuthService from "../../services/auth.service";

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

const ForgotPassword = () => {
  //   let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    form.current.validateAll();
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Modal
          buttonText="update password!"
          titleText={FORM.FORGOT_PASSWORD_TITLE}
        >
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
                onClick={() => setShowPassword(true)}
              >
                {FORM.UPDATE_PASS_BUTTON}
              </button>
            </div>

            {showPassword && <UpdateContent />}

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </Modal>
      </div>
    </div>
  );
};

const UpdateContent = () => {
  return (
    <>
      <p>send email successfully</p>
    </>
  );
};

export default ForgotPassword;
