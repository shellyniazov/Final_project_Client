import { useEffect, useState } from 'react';
import './style_componets/menu.css';
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';


const Menu = () => {

  const [user, SetUser] = useState({})
  const history = useHistory()



  const LoadUserName = async () => {

    let u = JSON.parse(sessionStorage.getItem("user"))

    if (u == null || u == undefined) {
      SetUser("");
    }
    else {
      SetUser(u);
    }
  }



  const checkProfile = async () => {
    let u = JSON.parse(sessionStorage.getItem("user"))

    if (u == null || u == undefined) {
      swal("Stop", "You need to login first!", "warning");
    }
    else {
      history.push(`/Profile/${user.User_code}`);
    }
  }



  useEffect(() => {
    LoadUserName();
  }, [])


  return (

    <>
      <Navbar style={{ background: "#f6f5fa" }} expand="lg">
        <Navbar.Brand className="Logo"><Link to="/" style={{ textDecoration: "none" }}><h3>Forum<span>logo</span></h3></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >

            <div className="linksChoise">

              <Button style={{ margin: "5px" }} variant="primary"><a href="https://www.facebook.com/" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}><p>Facebook</p></a></Button>{' '}

              <Button style={{ margin: "5px" }} variant="outline-success"><Link to="/Login" style={{ textDecoration: "none", color: "black" }}><p>Login</p></Link></Button>{' '}

              <Button style={{ margin: "5px" }} variant="outline-success"><Link to="/Register" style={{ textDecoration: "none", color: "black" }}><p>Register</p></Link></Button>{' '}

            </div>


          </Nav>

          {/* <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button> */}

          <Form className="d-flex">
            <img
              className="d-block w-100"
              src={require("../images/user1.png").default}
              width="33"
              height="33"
              style={{ cursor: "pointer" }}
              className="d-inline-block align-top"
              alt="Profile"
              onClick={checkProfile}
            />

            <p
              style={{ textDecoration: "none", color: "#6b6b6b", fontSize: "13px" }}>
              {user.First_name}
            </p>
          </Form>

        </Navbar.Collapse>
      </Navbar>
    </>

  );
}

export default Menu;