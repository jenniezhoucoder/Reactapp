import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Modal from "../../common/modal";
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

const ForgotPassword = () => {
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
                We have sent the update password link to your emial, please
                check that ！
              </p>
            )}
            {status === "error" && <p>Password reset failed.</p>}
          </Form>
        </Modal>
      </div>
    </div>
  );
};

// const UpdateContent = () => {
//   return (
//     <>
//       <p>send email successfully</p>
//     </>
//   );
// };

export default ForgotPassword;
