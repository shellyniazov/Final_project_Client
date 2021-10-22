import '../style/MessagePage_CommunityPage.css';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { API } from '../API';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';


const MessagePage = (props) => {

    let history = useHistory();

    const [topics, SetTopics] = useState([])
    const [comments, SetComments] = useState([])
    const [comment, SetComment] = useState('')
    let { id } = useParams();


    const LoadTopics = async () => {

        let res = await fetch(`${API.TOPICS.GET}/${id}/message`, { method: 'GET' });
        let data = await res.json();

        SetTopics(data);
    }


    const LoadComments = async () => {

        let res = await fetch(`${API.COMMENTS.GET}/${id}/comments`, { method: 'GET' });
        let data = await res.json();

        SetComments(data);
    }



    const addComment = async () => {

        let userData = JSON.parse(sessionStorage.getItem("user"));

        if (userData == null || userData == undefined) {
            swal("Stop!", "You need to sign in!", "warning");
            history.push("/Login");
        }

        try {
            let publishBy = userData.User_code;
            swal("Added a comment successfully!", "", "success");
            let d = new Date();

            let user = {
                Topic_number: id,
                Comment: comment,
                Publish_by: publishBy,
                Date_published: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
            }
            console.log(user);
            let res = await fetch(API.COMMENTS.ADD, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            let data = await res.json()
            console.log(data)
            SetComments(prev => [...prev, data]);//עדכון אוטומטי
        } catch (error) {
            console.log(error)
        }
    }




    useEffect(() => {
        LoadTopics();
        LoadComments();
    }, [])



    return (

        <div className="formMessage">

            {topics.map(topic =>

                <div className="titlePageMessage">
                    <p >
                        <NavLink to={`/`}
                            style={{ textDecoration: "none", color: "#6b6b6b" }}>
                            <img src="https://img.icons8.com/material-outlined/24/000000/home--v2.png"
                                style={{ paddingBottom: "4px", margin: "5px" }} />
                        </NavLink>

                        <NavLink to={`/CommunityPage/${topic.Category_code}`}
                            style={{ textDecoration: "none", color: "#6b6b6b" }}>
                            <a target="_blank">- Community Page - </a>
                        </NavLink>

                        Message Page {'> '}

                        {topic.Topic_title}
                    </p>
                </div>
            )}

            <div className="topic-container">

                <div className="head">

                    <div className="authors">Author</div>
                    <div className="content">Topic : random topic</div>

                </div>

                {topics.map(topic =>
                    <div className="body">

                        <div className="authors">
                            <img src="" alt="" height="100px" width="100" border-radius="10%" />

                            <div className="username"
                                style={{ textDecoration: "none", color: "lightseagreen", fontSize: "17px" }}>
                                Name User : {topic.First_name} {topic.Last_name}</div>

                            <div className="date">Date Publish : <p>{topic.Date_published}</p></div>

                        </div>

                        <div className="content">
                            {topic.Topic_text}
                        </div>

                    </div>
                )}
            </div>




            {comments.map(comment =>
                <div class="body">

                    <div class="authors">
                        <div class="username">
                            <img src="" alt="" height="100px" width="100" border-radius="10%" />

                            <div className="username"
                                style={{ textDecoration: "none", color: "green", fontSize: "17px" }}>
                                Name User : {comment.Publish_by}</div>

                            <div className="date">Date Publish : <p>{comment.Date_published}</p></div>

                        </div>
                    </div>

                    <div class="content">
                        {comment.Comment}
                    </div>

                </div>
            )}



            <div class="comment-area hide" id="comment-area" >
                <textarea name="comment" id="" placeholder="comment here ... "
                    value={comment}
                    onChange={(event) => SetComment(event.target.value)}></textarea>
            </div>

            <Button variant="success" onClick={addComment}>
                Send Message
            </Button>


        </div>
    );
}

export default MessagePage;