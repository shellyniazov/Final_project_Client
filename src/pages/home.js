import { Card, CardColumns } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API } from '../API';
import '../style/home.css';



const Home = (props) => {

  const [categories, SetCategories] = useState([])


  const LoadCategories = async () => {

    let res = await fetch(API.CATEGORIES.GET, { method: 'GET' });
    let data = await res.json();

    SetCategories(data);
  }




  useEffect(() => {

    LoadCategories();

  }, [])


  return (

    <div >

      <div className="StyleCarousel">

        <img
          className="d-block w-100"
          src={require("../images/home.jpg").default}
        />
        {/* <div class="bottom-left"><p>Here you will find in every field a cluster you need ,
          <br />And ask people any question you need and they will answer you .
          <br />We are here to help you!</p></div> */}
      </div>


      <br></br>


      <CardColumns>

        {categories.map(category =>


          <Card>
            <Card.Img variant="top" src="" height="150px" width="70px" border-radius="10%" />
            <Card.ImgOverlay>

              <Card.Title><NavLink to={`/CommunityPage/${category.Serial_code}`}
                style={{ textDecoration: "none", color: "#28a745" }}
              >{category.Name_category}</NavLink></Card.Title>
              <Card.Text>

              </Card.Text>
            </Card.ImgOverlay>
          </Card>

        )}

      </CardColumns>

      <br></br>
      <br></br>
      <br></br>
      <br></br>


    </div>
  );
}

export default Home;