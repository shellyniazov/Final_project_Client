
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import './style_componets/footer.css';
import { Link } from 'react-router-dom'



const Footer = () => {


	return (

		<footer className="footer-distributed">

			<div className="footer-left">

				<Link to="/" style={{ textDecoration: "none" }}><h3>Forum<span>logo</span></h3></Link>

				<p className="footer-links">
					<a href="#" className="link-1"><Link to="/"><span>Home</span></Link></a>

					<a href="#" className="link-2"><Link to="/Register"><span>Register</span></Link></a>

					<a href="#" className="link-3"><Link to="/Profile"><span>Profile</span></Link></a>

					<a href="#" className="link-4"><Link to="/Login"><span>Login</span></Link></a>

				</p>

				<p className="footer-company-name">Company Name © 2021</p>
			</div>

			<div className="footer-center">

				<div>
					<i className="fa fa-map-marker"></i>
					<p><span>444 S. Cedros Ave</span> Solana Beach, California</p>
				</div>

				<div>
					<i className="fa fa-phone"></i>
					<p>+1.555.555.5555</p>
				</div>

				<div>
					<i className="fa fa-envelope"></i>
					<p><a href="mailto:support@company.com">support@company.com</a></p>
				</div>

			</div>

			<div className="footer-right">

				<p className="footer-company-about">
					<span>About the company</span>
					Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
				</p>

				<div className="footer-icons">

					<a href="https://www.facebook.com/" >
						<i>
							<img class="image1"
								src={require("../images/f.jpg").default}
								width="30"
								height="30"
								alt="Profile"
							/>
						</i>
					</a>

					<a href="https://www.instagram.com">
						<i>
							<img class="image2"
								src={require("../images/Instagram.png").default}
								width="30"
								height="30"
								alt="Profile"
							/>
						</i>
					</a>

					<a href="https://twitter.com/twitter">
						<i>
							<img class="image3"
								src={require("../images/Twitter.png").default}
								width="30"
								height="30"
								alt="Profile"
							/>
						</i>
					</a>

					<a href="https://mail.google.com/">
						<i>
							<img class="image4"
								src={require("../images/Gmail.png").default}
								width="30"
								height="30"
								alt="Profile"
							/>
						</i>
					</a>

				</div>
			</div>
		</footer>

	);
}

export default Footer;


