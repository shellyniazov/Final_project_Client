import { Button, Form, Col, Row } from 'react-bootstrap'
import { useState } from "react";
import "../style/register.css";
import { API } from '../API';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

const Register = (props) => {
  // הגדרת משתנים עבור טופס הרשמה
  const history = useHistory()


  const [validated, setValidated] = useState(false);
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [City, setCity] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Id, setId] = useState('');
  const [file, setFile] = useState('');


  const handleSubmit = (event) => {
    // event.preventDefault();
    // const form = event.currentTarget;

    // if (form.checkValidity() === false) {
    //   event.stopPropagation();
    // }

    // setValidated(true);
    // registerUser();
    // debugger
    // history.push(`/`);
  };


  const registerUser = async () => {

    try {
      let user = {
        FirstName,
        LastName,
        City,
        Birthday,
        Email,
        Password,
        Id,
        UserTypeCode: 1,
        ConfirmPassword
      }
      console.log(file)
      const form = new FormData();
      form.append("photo", file);
      let res = await fetch(API.USERS.UPLOAD, {
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: form
      });
      let data = await res.json()
      console.log(data)
      swal("You have successfully registered!", "", "success");
    } catch (error) {
      console.log(error)
    }
  }



  return (

    <div className="reg">
      <Form noValidate validated={validated} onSubmit={handleSubmit} enctype="multipart/form-data" action="/api/users/upload">


        <div className="titlePageRegister">
          <p>Another moment and you are with us 😃</p>
        </div>

        <Row className="mb-3">

          <Form.Group as={Col} md="3" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              value={FirstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>


          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              value={LastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>



        </Row>

        <Row className="mb-3">

          <Form.Group as={Col} md="3" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text"
              placeholder="City"
              value={City}
              onChange={(event) => setCity(event.target.value)}
              required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              placeholder="Birthday"
              value={Birthday}
              type="date"
              onChange={(event) => setBirthday(event.target.value)}
              required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group as={Col} md="4" controlId="validationCustom05">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"
              placeholder="Email"
              value={Email}
              onChange={(event) => setEmail(event.target.value)}
              required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>


        </Row>

        <Row className="mb-3">

          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              value={Password}
              onChange={(event) => setPassword(event.target.value)}
              required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label> Confirm password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password"
              value={ConfirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Id</Form.Label>
            <Form.Control type="number" placeholder="Id"
              value={Id}
              onChange={(event) => setId(event.target.value)}
              required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group as={Col} md="4" className="mb-3">
            <br></br>
            <Form.Control type="file" onChange={(event) => setFile(event.target.files[0])} />
            <br></br>
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
        </Row>

        <Button type="submit">Submit form</Button>

      </Form>

    </div>

  );
}

export default Register;