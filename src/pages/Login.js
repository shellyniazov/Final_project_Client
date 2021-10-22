import { useHistory } from 'react-router-dom';
import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import '../style/login_page.css';
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { API } from '../API';
import swal from 'sweetalert';


const Login = (props) => {

  const history = useHistory()

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');



  const loginUser = async () => {

    try {
      let user = { Email, Password }

      let res = await fetch(API.USERS.LOGIN, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      let data = await res.json()
      let u = JSON.parse(sessionStorage.getItem("user"));

      if (u != null || u != undefined) {
        swal("Stop", "You need to logout first!", "warning");
        return;
      }

      if (data.UserType_code == 1) {
        sessionStorage.setItem("user", JSON.stringify(data))
        history.push(`/Profile/${data.User_code}`);
        window.location.reload(false); // רענון דף
      }

      if (data.UserType_code == 2) {
        sessionStorage.setItem("user", JSON.stringify(data))
        history.push(`/Admin/${data.User_code}`);
        window.location.reload(false); // רענון דף
      }


    } catch (error) {
      console.log(error)
    }
  }




  return (

    <div>
      <section className="banner">

        <div className="box contect">

          <div className="log">
            <h3>How good you are back to us!</h3>

            <label for="fname">Email:</label><br />
            <input type="email"
              id="fname"
              name="fname"
              placeholder="Email"
              value={Email}
              onChange={(event) => setEmail(event.target.value)} />

            <br></br>


            <label for="fname">Password:</label><br />
            <input type="password"
              id="fname"
              name="fname"
              placeholder="Password"
              value={Password}
              onChange={(event) => setPassword(event.target.value)}
            />


            <br></br>

            <Button variant="primary" type="Login" onClick={loginUser}>
              Login
            </Button>


            <Form.Text className="text-muted">
              Forgot your password? Immediate recovery from here.
              Or you can contact us.
            </Form.Text>


            {/* <Button variant="primary" type="Admin User">
            <NavLink to="/admin"
              style={{ textDecoration: "none", color: "white", fontSize: "14px" }}>
              To admin account</NavLink>
          </Button> */}

          </div>
        </div>



        <div className="box image">

          <div className="imageLogin">

            <Form>
              <Form.Text className="text-muted1">
                <p>you don't have user?</p>
              </Form.Text>
              <br></br>

              <Button variant="primary" type="Login">
                <NavLink to="/register"
                  style={{ textDecoration: "none", color: "white", fontSize: "17px" }}>
                  Register here!</NavLink>
              </Button>

            </Form>

          </div>
        </div>

      </section>

    </div>

  );

}

export default Login;