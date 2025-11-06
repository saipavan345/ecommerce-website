import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const title = "SignUp";
const socialTitle = "Login With Social Media";
const btnText = "Signup";

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail, createUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleSignup = (event) => {
    event.preventDefault();
    const form = event.target;
    //console.log(form);
    const email = form.email.value;
    const password = form.password.value;
    const conformpwd = form.ConformPassword.value;
    // console.log(email,password,conformpwd);
    if (password != conformpwd) {
      setErrorMessage("Password doesn't Match");
    } else {
      setErrorMessage("");
      createUser(email,password).then((userCredential)=>{
        const user = userCredential.user;
        alert("Account create successfully.");
        navigate(from,{replace:true});
      }).catch((error)=>{
        console.log(error.message);
        alert(`${error.message}`);

      })
    }
  };

  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errormsg = error.message;
        setErrorMessage("Please Provide Valid Email & Password.");
      });
  };
  return (
    <div className="login-section padding-tb section-bg">
      <div className="container">
        <div className="account-wrapper">
          <h3 className="title">{title}</h3>
          <form className="account-form" onSubmit={handleSignup}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="ConformPassword"
                id="ConformPassword"
                placeholder="Conform Password"
                required
              />
            </div>
            {/* SHOWING MESSAGES */}
            {errorMessage && (
              <div className="error-message text-danger mb-1">
                {errorMessage}
              </div>
            )}
            <div className="form-group">
              <button type="submit" className="d-block lab-btn">
                <span>{btnText}</span>
              </button>
            </div>
          </form>

          {/* ACCOUNT BOTTOM */}
          <div className="account-bottom">
            <span className="d-block cate pt-10">
              Have An Account? <Link to="/login">Login</Link>
            </span>
            <span className="or">or</span>
            {/* SOCIAL LOGIN */}
            <h5 className="subtitle">{socialTitle}</h5>
            <ul className="lab-ul social-icons justify-content-center">
              <li>
                <button className="github" onClick={handleRegister}>
                  <i className="icofont-github"></i>
                </button>
              </li>
              <li>
                <a href="/" className="facebook">
                  <i className="icofont-facebook"></i>
                </a>
              </li>
              <li>
                <a href="/" className="twitter">
                  <i className="icofont-twitter"></i>
                </a>
              </li>
              <li>
                <a href="/" className="linkedin">
                  <i className="icofont-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="/" className="instagram">
                  <i className="icofont-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
