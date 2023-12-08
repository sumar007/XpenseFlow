import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div class="Ecommerce-Website-Footer-Section-bg pb-5 pt-5">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-3">
            <div class="d-flex flex-column justify-conent-start justify-conent-md-start ">
              <div class="text-md-left text-center mb-3">
                {/* <img src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/ecommerce-website-logo-img.png" class="Ecommerce-Website-Footer-Section-logo" /> */}
                <h1 style={{ color: "#fff" }}>Xpense Flow</h1>
              </div>
              <div class="d-flex flex-row justify-content-md-start justify-conent-center  mb-3">
                <div class="Ecommerce-Website-Footer-Section-logo-card mr-2">
                  <i
                    class="fa fa-google"
                    style={{ color: "#fff" }}
                    aria-hidden="true"
                  ></i>
                </div>
                <div class="Ecommerce-Website-Footer-Section-logo-card mr-2">
                  <i
                    class="fa fa-twitter"
                    style={{ color: "#fff" }}
                    aria-hidden="true"
                  ></i>
                </div>
                <div class="Ecommerce-Website-Footer-Section-logo-card mr-2">
                  <i
                    class="fa fa-instagram"
                    style={{ color: "#fff" }}
                    aria-hidden="true"
                  ></i>
                </div>
                <div class="Ecommerce-Website-Footer-Section-logo-card">
                  <i
                    class="fa fa-linkedin-square"
                    style={{ color: "#fff" }}
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              <div class="text-center text-md-left">
                <h1 class="Ecommerce-Website-Footer-Section-address">
                  Malakpet, Hyderabad
                </h1>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-6 col-lg-3">
            <div>
              <h1 class="Ecommerce-Website-Footer-Section-heading">
                Get to know us
              </h1>
              <p className="footer-text1">About us</p>
              <p className="footer-text1">Career</p>
              <p className="footer-text1">Press Releases</p>
              <p className="footer-text1">Gift a smile</p>
            </div>
          </div>
          <div class="col-6 col-md-6 col-lg-3">
            <div>
              <h1 class="Ecommerce-Website-Footer-Section-heading">
                Contact with us
              </h1>
              <p className="footer-text1">Facebook</p>
              <p className="footer-text1">Twitter</p>
              <p className="footer-text1">Instagram</p>
            </div>
          </div>
          <div class="col-6 col-md-6 col-lg-3">
            <div>
              <h1 class="Ecommerce-Website-Footer-Section-heading">
                Let Us Help You
              </h1>
              <p className="footer-text1">100% Purchase</p>
              <p className="footer-text1">Protection</p>
              <p className="footer-text1">Your Account</p>
              <p className="footer-text1">Return Center</p>
              <p className="footer-text1">Help</p>
            </div>
          </div>
        </div>
        <p className="privacy-text">
          <Link to="/Privacy-Policy">Privacy Policy</Link>
        </p>
        <p className="privacy-text">
          <Link to="/Terms-and-conditions">Terms & Conditions</Link>
        </p>

        <hr class="Ecommerce-Website-Footer-Section-line" />
        <div class="d-flex flex-row justify-content-center">
          <div class="Ecommerce-Website-Footer-Section-copy-right">
            <i class="fa fa-copyright" aria-hidden="true"></i>
          </div>
          <div class="ml-2 mt-1">
            <h1 class="Ecommerce-Website-Footer-Section-address">
              2023 Xpense Flow
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
