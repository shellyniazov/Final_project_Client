import '../style/admin.css';
import { Button, Form, Col, Row, Tab, Tabs, Table } from 'react-bootstrap'
import { API } from '../API';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'


const Admin = (props) => {

  let history = useHistory();



  // for popup add topic close or open window
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);

  const [NameCategory, setNameCategory] = useState('');

  const [users, SetUsers] = useState([])
  const [catergories, setCatergories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [comments, setComments] = useState([]);

  const [showDeletedUsers, setDeletedUsers] = useState([]);
  const [showDeletedCategories, setDeletedCategories] = useState([]);
  const [showDeletedTopics, setDeletedTopics] = useState([]);
  const [showDeletedComments, setDeletedComments] = useState([]);


  //update props
  const [UpdateNameCategory, setUpdateNameCategory] = useState('');

  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [City, setCity] = useState('');
  const [Birthday, setBirthday] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Id, setId] = useState('');
  const [file, setFile] = useState('');

  const [Category_code, setCategoryCode] = useState('');
  const [TopicTitle, setTopicTitle] = useState('');
  const [TopicText, setTopicText] = useState('');
  const [DatePublished, setDatePublished] = useState('');
  const [Publish_by, setPublishBy] = useState('');





  let iUsers = 1;
  let iCatergories = 1;
  let iTopics = 1;
  let iComments = 1;



  const LoadUsers = async () => {

    let res = await fetch(API.USERS.GET, { method: 'GET' });
    let data = await res.json();

    SetUsers(data);
  }


  const LoadCatergories = async () => {

    let res = await fetch(API.CATEGORIES.GET, { method: 'GET' });
    let data = await res.json();

    setCatergories(data);
  }


  const LoadTopics = async () => {

    let res = await fetch(API.TOPICS.GET, { method: 'GET' });
    let data = await res.json();

    setTopics(data);
  }


  const LoadComments = async () => {

    let res = await fetch(API.COMMENTS.GET, { method: 'GET' });
    let data = await res.json();

    setComments(data);
  }




  const LoadDeletedUsers = async () => {

    let res = await fetch(API.USERS.SHOW, { method: 'GET' });
    let data = await res.json();

    setDeletedUsers(data);
  }


  const LoadDeletedCategories = async () => {

    let res = await fetch(API.CATEGORIES.SHOW, { method: 'GET' });
    let data = await res.json();

    setDeletedCategories(data);
  }


  const LoadDeletedTopics = async () => {

    let res = await fetch(API.TOPICS.SHOW, { method: 'GET' });
    let data = await res.json();

    setDeletedTopics(data);
  }


  const LoadDeletedComments = async () => {

    let res = await fetch(API.COMMENTS.SHOW, { method: 'GET' });
    let data = await res.json();

    setDeletedComments(data);
  }


  //Delete Functions
  const DeleteUser = async (Id) => {

    let res = await fetch(`${API.USERS.GET}/delete/${Id}`, { method: 'DELETE' });
    window.location.reload(false); // רענון דף
  }

  const DeleteCategory = async (Id) => {

    let res = await fetch(`${API.CATEGORIES.GET}/delete/${Id}`, { method: 'DELETE' });
    window.location.reload(false); // רענון דף
  }

  const DeleteTopic = async (Id) => {

    let res = await fetch(`${API.TOPICS.GET}/delete/${Id}`, { method: 'DELETE' });
    window.location.reload(false); // רענון דף
  }

  const DeleteComment = async (Id) => {

    let res = await fetch(`${API.COMMENTS.GET}/delete/${Id}`, { method: 'DELETE' });
    window.location.reload(false); // רענון דף
  }



  //Update Functions
  const UpdateCategory = async (Id) => {

    try {
      let user = { Name_category: UpdateNameCategory }
      let res = await fetch(`${API.CATEGORIES.GET}/update/${Id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      let data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }



  const UpdateUser = async (Id) => {

    try {
      let user = { FirstName, LastName, City, Birthday, Email, Password, Id, UserTypeCode: 1, Photo: null, ConfirmPassword }
      let res = await fetch(`${API.USERS.GET}/update/${Id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      let data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }


  const UpdateTopic = async (Category_code, Publish_by, Id) => {

    try {
      let user = { Category_code, TopicTitle, TopicText, DatePublished, Publish_by }
      let res = await fetch(`${API.TOPICS.GET}/update/${Id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      let data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }



  //Reactivate Functions
  const ReactivateUser = async (Id) => {

    let res = await fetch(`${API.USERS.GET}/reactivate/${Id}`, { method: 'PUT' });
    window.location.reload(false); // רענון דף
  }

  const ReactivateCategories = async (Id) => {

    let res = await fetch(`${API.CATEGORIES.GET}/reactivate/${Id}`, { method: 'PUT' });
    window.location.reload(false); // רענון דף
  }

  const ReactivateTopics = async (Id) => {

    let res = await fetch(`${API.TOPICS.GET}/reactivate/${Id}`, { method: 'PUT' });
    window.location.reload(false); // רענון דף
  }

  const ReactivateComments = async (Id) => {

    let res = await fetch(`${API.COMMENTS.GET}/reactivate/${Id}`, { method: 'PUT' });
    window.location.reload(false); // רענון דף
  }




  // מחיקת כל הפרטים 
  const clearAll = (event) => {
    event.preventDefault(); //ביטול ניקוי הטופס באופן דיפולטיבי
    sessionStorage.clear();

    history.push("/");
    window.location.reload(false); // רענון דף
  }

  useEffect(() => {
    LoadUsers();
    LoadCatergories();
    LoadTopics();
    LoadComments();
    LoadDeletedUsers();
    LoadDeletedCategories();
    LoadDeletedTopics();
    LoadDeletedComments();
  }, [])



  const addCategoryAdmin = async () => {

    try {
      let user = { Name_category: NameCategory }
      let res = await fetch(API.CATEGORIES.ADD, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      let data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }




  return (


    <div className="reg">

      <div className="titlePage">
        <p>Admin Page</p>
        <Button variant="danger" size="sm" onClick={clearAll}>Log out</Button>
      </div>


      <Tabs defaultActiveKey="Users" transition={false} id="noanim-tab-example">
        <Tab eventKey="Users" title="Users">
          <Table striped bordered hover size="sm" style={{ fontSize: "13px" }}>
            <thead>
              <tr>
                <th style={{ width: "19px" }}>#</th>
                <th style={{ width: "80px" }}>Photo</th>
                <th style={{ width: "10px" }}>User Type code</th>
                <th style={{ width: "10px" }}>User code</th>
                <th style={{ width: "70px" }}>First Name</th>
                <th style={{ width: "70px" }}>Last Name</th>
                <th style={{ width: "100px" }}>Birthday</th>
                <th style={{ width: "70px" }}>City</th>
                <th style={{ width: "80px" }}>Id</th>
                <th style={{ width: "110px" }}>Email</th>
                <th style={{ width: "110px" }}>Password</th>
                <th style={{ width: "70px" }}></th>
                <th style={{ width: "50px" }}></th>
              </tr>
            </thead>

            {users.map(user =>
              <tbody>
                <tr>
                  <td>{iUsers++}</td>
                  <td>{user.Photo}</td>
                  <td>{user.UserType_code}</td>
                  <td>{user.User_code}</td>
                  <td>{user.First_name}</td>
                  <td>{user.Last_name}</td>
                  <td>{user.Birthday}</td>
                  <td>{user.City}</td>
                  <td>{user.Id}</td>
                  <td>{user.Email}</td>
                  <td>{user.User_password}</td>
                  <td><Button variant="primary" size="sm" onClick={handleShow1} >Update</Button>{' '}</td>
                  <td><Button variant="danger" size="sm" onClick={() => DeleteUser(user.User_code)}>Delete</Button></td>
                </tr>
              </tbody>
            )}

            {showDeletedUsers.map(user =>
              <tbody>
                <tr>
                  <td>{iUsers++}</td>
                  <td>{user.Photo}</td>
                  <td>{user.UserType_code}</td>
                  <td>{user.User_code}</td>
                  <td>{user.First_name}</td>
                  <td>{user.Last_name}</td>
                  <td>{user.Birthday}</td>
                  <td>{user.City}</td>
                  <td>{user.Id}</td>
                  <td>{user.Email}</td>
                  <td>{user.User_password}</td>
                  <td></td>
                  <td><Button variant="success" size="sm" onClick={() => ReactivateUser(user.User_code)}>Reactivate</Button></td>
                </tr>


                <Modal show={show1} onHide={handleClose1} animation={true} size="xl"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >

                  <section className="window">

                    <div className="boxWin image">

                      <div className="imageTopicAdd">

                        <Form>

                          <br></br>
                        </Form>
                      </div>
                    </div>



                    <div className="boxWin contectWin">

                      <div className="AddTopicPop">

                        <Form >

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
                          <Button variant="success" type="addCategory" onClick={() => UpdateUser(user.User_code)} >
                            Update User
                          </Button>
                        </Form>
                        <br></br>
                        <br></br>


                      </div>
                    </div>
                  </section>
                </Modal>

              </tbody>
            )}
          </Table>
          <p className="userType">* User Type code :<br />1 - Regular user <br />2 - Admin</p>
        </Tab>



        <Tab eventKey="Catergories" title="Catergories">
          <Table striped bordered hover size="sm" style={{ fontSize: "13px", marginBottom: "50px" }}>
            <thead>
              <tr>
                <th style={{ width: "19px" }}>#</th>
                <th style={{ width: "40px" }}>Serial code</th>
                <th style={{ width: "40px" }}>Name category</th>
                <th style={{ width: "20px" }}></th>
                <th style={{ width: "20px" }}></th>
              </tr>
            </thead>

            {catergories.map(category =>
              <tbody>
                <tr>
                  <td>{iCatergories++}</td>
                  <td>{category.Serial_code}</td>
                  <td>{category.Name_category}</td>

                  <td><Button variant="primary" size="sm" onClick={() => handleShow()}>Update</Button>{' '}</td>
                  <td><Button variant="danger" size="sm" onClick={() => DeleteCategory(category.Serial_code)}>Delete</Button></td>
                </tr>


                <Modal show={show} onHide={handleClose} animation={true} size="xl"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >

                  <section className="window">

                    <div className="boxWin image">

                      <div className="imageTopicAdd">

                        <Form>
                          <Form.Text className="text-muted1">
                            <p>Create new Topic</p>
                          </Form.Text>
                          <br></br>
                        </Form>
                      </div>
                    </div>



                    <div className="boxWin contectWin">

                      <div className="AddTopicPop">

                        <label for="fname" style={{ fontFamily: "monospace" }}>Name Category :</label><br />
                        <input type="text"
                          required
                          type="text"
                          // placeholder="Add name category"
                          value={UpdateNameCategory}
                          onChange={(event) => setUpdateNameCategory(event.target.value)}
                        />

                        <br></br>
                        <br></br>
                        <Button variant="success" type="addCategory" onClick={() => UpdateCategory(category.Serial_code)} >
                          Update Category
                        </Button>

                      </div>
                    </div>
                  </section>
                </Modal>

              </tbody>
            )}





            {showDeletedCategories.map(category =>
              <tbody>
                <tr>
                  <td>{iCatergories++}</td>
                  <td>{category.Serial_code}</td>
                  <td>{category.Name_category}</td>
                  <td></td>
                  <td><Button variant="success" size="sm" onClick={() => ReactivateCategories(category.Serial_code)}>Reactivate</Button></td>
                </tr>
              </tbody>
            )}
          </Table>
        </Tab>


        <Tab eventKey="Topics" title="Topics">
          <Table striped bordered hover size="sm" style={{ fontSize: "13px", marginBottom: "176px" }}>
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
                  <td><Button variant="primary" size="sm" onClick={() => handleShow2()}>Update</Button>{' '}</td>
                  <td><Button variant="danger" size="sm" onClick={() => DeleteTopic(topic.Serial_code)}>Delete</Button></td>
                </tr>
              </tbody>
            )}
            {showDeletedTopics.map(topic =>
              <tbody>
                <tr>
                  <td>{iTopics++}</td>
                  <td>{topic.Serial_code}</td>
                  <td>{topic.Category_code}</td>
                  <td>{topic.Topic_title}</td>
                  <td>{topic.Topic_text}</td>
                  <td>{topic.Date_published}</td>
                  <td>{topic.Publish_by}</td>
                  <td></td>
                  <td><Button variant="success" size="sm" onClick={() => ReactivateTopics(topic.Serial_code)}>Reactivate</Button></td>
                </tr>



                <Modal show={show2} onHide={handleClose2} animation={true} size="xl"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >

                  <section className="window">

                    <div className="boxWin image">

                      <div className="imageTopicAdd">

                        <Form>

                          <br></br>
                        </Form>
                      </div>
                    </div>



                    <div className="boxWin contectWin">

                      <div className="AddTopicPop">

                        <label for="fname" style={{ fontFamily: "monospace" }}>Topic Title :</label><br />
                        <input type="text"
                          required
                          type="text"
                          placeholder="Title"
                          value={TopicTitle}
                          onChange={(event) => setTopicTitle(event.target.value)}
                        />

                        <br></br>

                        <label for="fname" style={{ fontFamily: "monospace" }}>Write Post :</label><br />
                        <textarea type="text"
                          placeholder="Post"
                          value={TopicText}
                          onChange={(event) => setTopicText(event.target.value)}
                          required
                        />

                        <label for="fname" style={{ fontFamily: "monospace" }}>Date Published :</label><br />
                        <input type="date"
                          value={DatePublished}
                          type="date"
                          onChange={(event) => setDatePublished(event.target.value)}
                          required
                        />

                        <br></br>


                        <Button variant="success" type="addTopic" onClick={() => UpdateTopic(topic.Category_code, topic.Publish_by, topic.Serial_code)}>
                          Update topic
                        </Button>

                      </div>
                    </div>
                  </section>
                </Modal>


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

            {showDeletedComments.map(comment =>
              <tbody>
                <tr>
                  <td>{iComments++}</td>
                  <td>{comment.Serial_code}</td>
                  <td>{comment.Topic_number}</td>
                  <td>{comment.Comment}</td>
                  <td>{comment.Publish_by}</td>
                  <td></td>
                  <td><Button variant="success" size="sm" onClick={() => ReactivateComments(comment.Serial_code)}>Reactivate</Button></td>
                </tr>
              </tbody>
            )}
          </Table>
        </Tab>



        <Tab eventKey="Add Category" title="Add Category" style={{ marginBottom: "220px" }}>

          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} md="3" controlId="validationCustom01" style={{ fontWeight: "bold" }}>
                <Form.Label>Name Category:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Name Category"
                  value={NameCategory}
                  onChange={(event) => setNameCategory(event.target.value)}
                />
              </Form.Group>
            </Row>

            <Button type="submit" onClick={addCategoryAdmin}>Add Category</Button>
          </Form>

        </Tab>

      </Tabs>

    </div>


  );
}

export default Admin;