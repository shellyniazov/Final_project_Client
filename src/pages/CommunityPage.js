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


    // for popup add topic close or open window
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [TopicTitle, setTopicTitle] = useState(''); //input
    const [TopicText, setTopicText] = useState('');

    const [titleCategory, SetTitleCategory] = useState([]);

    const [topics, SetTopics] = useState([]);
    //const [topicsDeleted, SetTopicsDeleted] = useState([]);

    let { id } = useParams();
    let Category_code = id;




    // פונקציה הטוענת אשכול מסוים לפי קטגוריה מסוימת אליה הוא משתייך
    const LoadTopics = async () => {

        let res = await fetch(`${API.CATEGORIES.GET}/${id}/topics`, { method: 'GET' });
        let data = await res.json();

        SetTopics(data);
    }


    // const LoadTopicsDeletedByCategory = async () => {

    //     let res = await fetch(`${API.CATEGORIES.GET}/${id}/topicsDeletdByCategory`, { method: 'GET' });
    //     let data = await res.json();

    //     SetTopicsDeleted(data);
    // }


    // טיפול בשגיאות - אם השדות של הוספת אשכול ריקים
    const checkTopic = async () => {

        if (TopicTitle == '' || TopicText == '') {
            swal("Stop", "You need to fill in all the fields!", "warning");
            return;
        }

        else {
            addTopic();
        }
    }



    // פונקציה המטפלת בהוספת אשכול
    const addTopic = async () => {
        let userData = JSON.parse(sessionStorage.getItem("user"));

        // אם המשתמש לא מחובר הוא לא יכול להוסיף אשכול
        if (userData == null || userData == undefined) {
            swal("Stop", "You need to sign in!", "warning");
        }


        try {
            let Publish_by = userData.User_code;

            swal("Added a topic successfully!", "", "success");
            let d = new Date(); // הגדרת משתנה לתאריך

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



    // פונקציה האחראית על הצגה של שם הקטגוריה הספציפית שרואים כעת את האשכולים שלה -> דף אשכול
    const LoadCategory = async () => {

        let res = await fetch(`${API.CATEGORIES.GET}/${id}`, { method: 'GET' });
        let data = await res.json();

        SetTitleCategory(data);
    }



    useEffect(() => {
        LoadTopics();
        LoadCategory();
        //LoadTopicsDeletedByCategory();
    }, [])




    return (

        <div className="posts-table">

            {titleCategory.map(topic =>

                <div className="titlePageCommunity">
                    <p>
                        <NavLink to={`/`}>
                            <img src={require("../images/hhh.png").default}
                                style={{ margin: "5px", paddingBottom: "4px" }}
                                width="37"
                                height="37"
                                alt="Profile"
                            />
                        </NavLink>

                          Community Page {'> '}

                        {topic.Name_category}
                    </p>

                    <Button variant="success" size="sm"
                        onClick={handleShow}
                        style={{ textDecoration: "none", color: "white", fontSize: "14px" }}>
                        Add New Cluster
                    </Button>
                </div>
            )}


            <Modal show={show} onHide={handleClose} animation={true} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <section className="window">

                    <div className="boxWin image">

                        <div className="imageTopicAdd">

                            <Form >
                                <Form.Text className="text-muted1">
                                    <p>Create new Topic</p>
                                </Form.Text>
                                <br></br>
                            </Form>
                        </div>
                    </div>



                    <div className="boxWin contectWin">

                        <div className="AddTopicPop">

                            <label for="fname" style={{ fontFamily: "Verdana" }}>Topic Title :</label><br />
                            <input type="text"
                                required
                                placeholder="Title"
                                value={TopicTitle}
                                onChange={(event) => setTopicTitle(event.target.value)}
                            />

                            <br></br>

                            <label for="fname" style={{ fontFamily: "Verdana" }}>Write Post :</label><br />
                            <textarea type="text"
                                required
                                placeholder="Post"
                                value={TopicText}
                                onChange={(event) => setTopicText(event.target.value)}

                            />

                            <br></br>

                            <Button variant="success" type="addTopic" onClick={checkTopic}
                                style={{ fontFamily: "Verdana" }} >
                                Add New Topic
                            </Button>

                        </div>
                    </div>
                </section>
            </Modal>



            <div className="table-head">
                <div className="status">Users</div>
                <div className="subjects">Topics</div>
                <div className="replies">Replies</div>
                <div className="last-reply">Date Publish</div>
            </div>



            {
                topics.map(topic =>

                    <div className="table-row" >

                        <div className="status">
                            <img
                                src={topic.Photo}
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
                )

            }

            {
                // topicsDeleted.map(topicsdeleted =>

                //     <div className="table-row" >

                //         <div class="status">
                //             <img
                //                 src={topicsdeleted.Photo}
                //                 alt="Profile" />
                //         </div>

                //         <div className="subjects">

                //             <NavLink to=
                //                 {`/MessagePage/${topicsdeleted.Serial_code}`}
                //                 style={{ textDecoration: "none", color: "green", fontSize: "18px" }}>
                //                 {topicsdeleted.Topic_title}
                //             </NavLink>
                //             <br />

                //             <span
                //                 style={{ textDecoration: "none", color: "black", fontSize: "13px" }}>
                //                 Started by
                //                 <b> {topicsdeleted.First_name} {topicsdeleted.Last_name}</b>
                //             </span>
                //         </div>

                //         <div className="replies">
                //             {topicsdeleted.Count_Comments}
                //         </div>

                //         <div className="datePublish">
                //             {topicsdeleted.Date_published}
                //         </div>

                //     </div>
                // )


            }

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </div >
    );
}

export default CommunityPage;