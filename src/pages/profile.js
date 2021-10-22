import '../style/profile.css';
import { useEffect, useState } from 'react';
import { API } from '../API';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import { Button, Form, Col, Row, Tab, Tabs, Table } from 'react-bootstrap'



const Profile = (props) => {
    let history = useHistory();
    const [user, SetUser] = useState({})

    // for popup add topic close or open window
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    // const [validated, setValidated] = useState(false);
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [City, setCity] = useState('');
    const [Birthday, setBirthday] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Id, setId] = useState('');
    const [file, setFile] = useState('');

    const [showDeletedTopics, setDeletedTopics] = useState([]);

    const [topics, setTopics] = useState([]);
    const [comments, setComments] = useState([]);
    let iTopics = 1;
    let iComments = 1;



    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const form = event.currentTarget;

    //     if (form.checkValidity() === false) {
    //         event.stopPropagation();
    //     }

    //     setValidated(true);
    //     UpdateProfileUser(user.User_code);
    // };



    const LoadSpecificUser = async () => {

        let u = JSON.parse(sessionStorage.getItem("user"))
        if (u == null || u == undefined) {
            history.push("/Login");
        }
        else {
            SetUser(u);
        }
    }



    const LoadTopics = async () => {

        let u = JSON.parse(sessionStorage.getItem("user"))
        if (u == null || u == undefined) { setTopics("") }

        else {
            let res = await fetch(`${API.TOPICS.GET}/${u.User_code}/showTopicsUser`, { method: 'GET' });
            let data = await res.json();

            setTopics(data);
        }
    }


    const LoadComments = async () => {

        let u = JSON.parse(sessionStorage.getItem("user"))
        if (u == null || u == undefined) { setTopics("") }

        else {
            let res = await fetch(`${API.COMMENTS.GET}/${u.User_code}/showCommentsUser`, { method: 'GET' });
            let data = await res.json();

            setComments(data);
        }
    }


    //Update Functions
    const UpdateProfileUser = async (x) => {

        try {
            let d = new Date(Birthday);

            let user = {
                First_name: FirstName,
                Last_name: LastName,
                City,
                Birthday: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
                Email,
                User_password: Password,
                Id,
                UserType_code: 1,
                Photo: null,
                Confirm_password: ConfirmPassword
            }

            let res = await fetch(`${API.USERS.GET}/update/${x}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            let data = await res.json()
            console.log(data)

            SetUser(user);

        } catch (error) {
            console.log(error)
        }
    }





    const DeleteTopic = async (Id) => {

        let res = await fetch(`${API.TOPICS.GET}/delete/${Id}`, { method: 'DELETE' });
        window.location.reload(false); // רענון דף
    }


    const DeleteComment = async (Id) => {

        let res = await fetch(`${API.COMMENTS.GET}/delete/${Id}`, { method: 'DELETE' });
        window.location.reload(false); // רענון דף
    }



    // מחיקת כל הפרטים 
    const clearAll = (event) => {
        event.preventDefault(); //ביטול ניקוי הטופס באופן דיפולטיבי
        sessionStorage.clear();

        history.push("/");
        window.location.reload(false); // רענון דף
    }



    const checkAdmin = async () => {

        if (user.UserType_code == 2) {
            history.push(`/Admin/${user.User_code}`);
        }
        else {
            alert("You don`t have permission to access this page!");
        }
    }


    const handleFormSubmit = (e) => {

        e.preventDefault();
        UpdateProfileUser(user.User_code);
    }


    useEffect(() => {
        LoadSpecificUser();
        LoadTopics();
        LoadComments();
    }, [])


    useEffect(() => {
        setFirstName(user.First_name)
        setLastName(user.Last_name)
        setCity(user.City)
        setBirthday(user.Birthday)
        setEmail(user.Email)
        setPassword(user.User_password)
        setConfirmPassword(user.Confirm_password)
        setId(user.Id)
        setFile(user.Photo)

        sessionStorage.setItem("user", JSON.stringify(user));

    }, [user])




    if (user.UserType_code == 2) {
        return (
            <div>
                <div className="ProfileInfo emp-profile">

                    <div className="titlePageProfile">
                        <p>Welcome To Your Profile Page <span> - Here you can control and see your Info</span></p>
                        <Button className="adminBtn" variant="info" size="sm" onClick={checkAdmin}>Admin Page</Button>
                        <Button variant="danger" size="sm" onClick={clearAll}>Log out</Button>
                    </div>

                    <form method="post">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="profile-img">
                                    <img src={user.Photo} alt="" />

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="profile-head">
                                    <h5>
                                        Hello  {user.First_name} !
                                    </h5>



                                    <p className="proile-rating"></p>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <Button variant="info" size="sm"
                                    onClick={handleShow}
                                    style={{ textDecoration: "none", color: "white", fontSize: "16px" }}>
                                    Edit profile
                                </Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">

                            </div>
                            <div className="col-md-8">
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>First name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.First_name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Last name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.Last_name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.Email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div class="col-md-6">
                                                <label>Birthday</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.Birthday}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>City</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.City}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div class="col-md-6">
                                                <label>Id number</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.Id}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>


                    <div className="popup">
                        <Modal show={show} onHide={handleClose} animation={true} size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >

                            <Form onSubmit={handleFormSubmit}>


                                <div className="titlePageRegister">
                                    <p>Update Your Details</p>
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
                                        <Form.Control type="file" value={file} onChange={(event) => setFile(event.target.value)} />
                                        <br></br>
                                        <Form.Check
                                            required
                                            label="Agree to terms and conditions"
                                            feedback="You must agree before submitting."
                                        />
                                    </Form.Group>
                                </Row>

                                <Button type="submit"  >Update details</Button>

                            </Form>

                        </Modal>
                    </div>
                </div>

                <div>
                    <Tabs defaultActiveKey="Topics" transition={false} id="noanim-tab-example">
                        <Tab eventKey="Topics" title="Topics">
                            <Table striped bordered hover size="sm" style={{ fontSize: "13px" }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: "19px" }}>#</th>
                                        <th style={{ width: "30px" }}>Serial code</th>
                                        <th style={{ width: "30px" }}>Category code</th>
                                        <th style={{ width: "50px" }}>Topic title</th>
                                        <th style={{ width: "210px" }}>Topic text</th>
                                        <th style={{ width: "70px" }}>Date published</th>
                                        <th style={{ width: "70px" }}>Publish by-user code</th>
                                        <th style={{ width: "10px" }}></th>
                                        <th style={{ width: "10px" }}></th>
                                    </tr>
                                </thead>

                                {topics.map(topic =>
                                    <tbody>
                                        <tr>
                                            <td>{iTopics++}</td>
                                            <td>{topic.Serial_code}</td>
                                            <td>{topic.Category_code}</td>
                                            <td>{topic.Topic_title}</td>
                                            <td>{topic.Topic_text}</td>
                                            <td>{topic.Date_published}</td>
                                            <td>{topic.Publish_by}</td>
                                            <td><Button variant="primary" size="sm" >Update</Button>{' '}</td>
                                            <td><Button variant="danger" size="sm" onClick={() => DeleteTopic(topic.Serial_code)}>Delete</Button></td>
                                        </tr>
                                    </tbody>
                                )}

                            </Table>
                        </Tab>


                        <Tab eventKey="Comments" title="Comments">
                            <Table striped bordered hover size="sm" style={{ fontSize: "13px", marginBottom: "270px" }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: "19px" }}>#</th>
                                        <th style={{ width: "30px" }}>Serial code</th>
                                        <th style={{ width: "20px" }}>Topic number</th>
                                        <th style={{ width: "230px" }}>Comment</th>
                                        <th style={{ width: "60px" }}>Publish by-user code</th>
                                        <th style={{ width: "40px" }}></th>
                                        <th style={{ width: "30px" }}></th>

                                    </tr>
                                </thead>

                                {comments.map(comment =>
                                    <tbody>
                                        <tr>
                                            <td>{iComments++}</td>
                                            <td>{comment.Serial_code}</td>
                                            <td>{comment.Topic_number}</td>
                                            <td>{comment.Comment}</td>
                                            <td>{comment.Publish_by}</td>
                                            <td><Button variant="primary" size="sm">Update</Button>{' '}</td>
                                            <td><Button variant="danger" size="sm" onClick={() => DeleteComment(comment.Serial_code)}>Delete</Button></td>
                                        </tr>
                                    </tbody>
                                )}



                            </Table>
                        </Tab>
                    </Tabs>

                </div>
            </div>
        );
    }

    else 
    {
        return(
            <div>
            <div className="ProfileInfo emp-profile">

                <div className="titlePageProfile">
                    <p>Welcome To Your Profile Page <span> - Here you can control and see your Info</span></p>
                    <Button variant="danger" size="sm" onClick={clearAll}>Log out</Button>
                </div>

                <form method="post">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={user.Photo} alt="" />

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                    Hello  {user.First_name} !
                                </h5>



                                <p className="proile-rating"></p>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <Button variant="info" size="sm"
                                onClick={handleShow}
                                style={{ textDecoration: "none", color: "white", fontSize: "16px" }}>
                                Edit profile
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">

                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>First name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.First_name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Last name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.Last_name}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.Email}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div class="col-md-6">
                                            <label>Birthday</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.Birthday}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>City</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.City}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div class="col-md-6">
                                            <label>Id number</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{user.Id}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>


                <div className="popup">
                    <Modal show={show} onHide={handleClose} animation={true} size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >

                        <Form onSubmit={handleFormSubmit}>


                            <div className="titlePageRegister">
                                <p>Update Your Details</p>
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
                                    <Form.Control type="file" value={file} onChange={(event) => setFile(event.target.value)} />
                                    <br></br>
                                    <Form.Check
                                        required
                                        label="Agree to terms and conditions"
                                        feedback="You must agree before submitting."
                                    />
                                </Form.Group>
                            </Row>

                            <Button type="submit"  >Update details</Button>

                        </Form>

                    </Modal>
                </div>
            </div>

            <div>
                <Tabs defaultActiveKey="Topics" transition={false} id="noanim-tab-example">
                    <Tab eventKey="Topics" title="Topics">
                        <Table striped bordered hover size="sm" style={{ fontSize: "13px" }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "19px" }}>#</th>
                                    <th style={{ width: "30px" }}>Serial code</th>
                                    <th style={{ width: "30px" }}>Category code</th>
                                    <th style={{ width: "50px" }}>Topic title</th>
                                    <th style={{ width: "210px" }}>Topic text</th>
                                    <th style={{ width: "70px" }}>Date published</th>
                                    <th style={{ width: "70px" }}>Publish by-user code</th>
                                    <th style={{ width: "10px" }}></th>
                                    <th style={{ width: "10px" }}></th>
                                </tr>
                            </thead>

                            {topics.map(topic =>
                                <tbody>
                                    <tr>
                                        <td>{iTopics++}</td>
                                        <td>{topic.Serial_code}</td>
                                        <td>{topic.Category_code}</td>
                                        <td>{topic.Topic_title}</td>
                                        <td>{topic.Topic_text}</td>
                                        <td>{topic.Date_published}</td>
                                        <td>{topic.Publish_by}</td>
                                        <td><Button variant="primary" size="sm" >Update</Button>{' '}</td>
                                        <td><Button variant="danger" size="sm" onClick={() => DeleteTopic(topic.Serial_code)}>Delete</Button></td>
                                    </tr>
                                </tbody>
                            )}

                        </Table>
                    </Tab>


                    <Tab eventKey="Comments" title="Comments">
                        <Table striped bordered hover size="sm" style={{ fontSize: "13px", marginBottom: "270px" }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "19px" }}>#</th>
                                    <th style={{ width: "30px" }}>Serial code</th>
                                    <th style={{ width: "20px" }}>Topic number</th>
                                    <th style={{ width: "230px" }}>Comment</th>
                                    <th style={{ width: "60px" }}>Publish by-user code</th>
                                    <th style={{ width: "40px" }}></th>
                                    <th style={{ width: "30px" }}></th>

                                </tr>
                            </thead>

                            {comments.map(comment =>
                                <tbody>
                                    <tr>
                                        <td>{iComments++}</td>
                                        <td>{comment.Serial_code}</td>
                                        <td>{comment.Topic_number}</td>
                                        <td>{comment.Comment}</td>
                                        <td>{comment.Publish_by}</td>
                                        <td><Button variant="primary" size="sm">Update</Button>{' '}</td>
                                        <td><Button variant="danger" size="sm" onClick={() => DeleteComment(comment.Serial_code)}>Delete</Button></td>
                                    </tr>
                                </tbody>
                            )}



                        </Table>
                    </Tab>
                </Tabs>

            </div>
        </div>
        );
    }
}




export default Profile;