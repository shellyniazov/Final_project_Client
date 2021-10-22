import { Button } from 'react-bootstrap'
import '../style/MessagePage_CommunityPage.css';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API } from '../API';
import { useParams, useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'
import React from 'react';
import { Form } from 'react-bootstrap';
import swal from 'sweetalert';



const CommunityPage = (props) => {

    let history = useHistory();

    // for popup add topic close or open window
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [TopicTitle, setTopicTitle] = useState('');
    const [TopicText, setTopicText] = useState('');
    const [DatePublished, setDatePublished] = useState('');

    const [titleCategory, SetTitleCategory] = useState({});

    const [topics, SetTopics] = useState([]);

    let { id } = useParams();
    let Category_code = id;



    const LoadTopics = async () => {

        let res = await fetch(`${API.CATEGORIES.GET}/${id}/topics`, { method: 'GET' });
        let data = await res.json();

        SetTopics(data);
    }





    const addTopic = async () => {
        let userData = JSON.parse(sessionStorage.getItem("user"));

        if (userData == null || userData == undefined) {
            swal("Stop", "You need to sign in!", "warning");
        }

        try {
            let Publish_by = userData.User_code;
            swal("Added a topic successfully!", "", "success");
            let d = new Date();

            let user = {
                Category_code,
                TopicTitle,
                TopicText,
                DatePublished: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
                Publish_by
            }

            let res = await fetch(API.TOPICS.ADD, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            window.location.reload(false); // רענון דף
            let data = await res.json()
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }



    const LoadCategory = async () => {

        let res = await fetch(`${API.CATEGORIES.GET}/${id}`, { method: 'GET' });
        let data = await res.json();

        SetTitleCategory(data);
    }



    useEffect(() => {
        LoadTopics();
        LoadCategory();
    }, [])




    return (

        <div className="posts-table">

            <div className="titlePageCommunity">
                <p>
                    <NavLink to={`/`}>
                        <img src="https://img.icons8.com/material-outlined/24/000000/home--v2.png"
                            style={{ margin: "5px", paddingBottom: "4px" }}
                        />
                    </NavLink>

                    - Community Page {'> '}

                    {titleCategory.Name_category}
                </p>

                <Button variant="info" size="sm"
                    onClick={handleShow}
                    style={{ textDecoration: "none", color: "white", fontSize: "16px" }}>
                    Add New Cluster
                </Button>
            </div>


            <Modal show={show} onHide={handleClose} animation={true} size="lg"
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

                            <label for="fname" style={{ fontFamily: "monospace" }}>Topic Title :</label><br />
                            <input type="text"
                                required
                                placeholder="Title"
                                value={TopicTitle}
                                onChange={(event) => setTopicTitle(event.target.value)}
                            />

                            <br></br>

                            <label for="fname" style={{ fontFamily: "monospace" }}>Write Post :</label><br />
                            <textarea type="text"
                                required
                                placeholder="Post"
                                value={TopicText}
                                onChange={(event) => setTopicText(event.target.value)}

                            />

                            <br></br>

                            {/* <Button variant="danger" onClick={handleClose}>
                                Close
                            </Button> */}

                            <Button variant="success" type="addTopic" onClick={addTopic}>
                                Add New Topic
                            </Button>

                        </div>
                    </div>
                </section>
            </Modal>



            <div className="table-head">
                <div class="status"></div>
                <div class="subjects">Topic's</div>
                <div class="replies">Replies</div>
                <div class="last-reply">Date Publish</div>
            </div>


            {topics.map(topic =>

                <div className="table-row" >  {/* onload={LoadUsers(topic.Publish_by)} */}

                    <div class="status">
                        <img
                            src={require("../images/p9.png").default}
                            alt="Profile" />
                    </div>

                    <div className="subjects">
                        <NavLink to=
                            {`/MessagePage/${topic.Serial_code}`}
                            style={{ textDecoration: "none", color: "green", fontSize: "18px" }}>
                            {topic.Topic_title}
                        </NavLink>

                        <br />
                        <span
                            style={{ fontSize: "14px" }}>
                            {topic.Topic_text}
                        </span>
                        <br />

                        <span
                            style={{ textDecoration: "none", color: "black", fontSize: "13px" }}>
                            Started by
                            <b> {topic.First_name} {topic.Last_name}</b>
                        </span>
                    </div>

                    <div className="replies">
                        {topic.Count_Comments}
                    </div>

                    <div className="datePublish">
                        {topic.Date_published}
                    </div>

                </div>
            )}
        </div>

    );
}


export default CommunityPage;