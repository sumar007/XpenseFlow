import Header from "./Header.js";
import Footer from "./Footer.js";
import "./Home.css";
import {
  MdOutlineManageAccounts,
  MdArchitecture,
  MdEngineering,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TfiWorld } from "react-icons/tfi";
import { SlNote } from "react-icons/sl";
import image1 from "../Images/image1.webp";
import image2 from "../Images/image2.jpg";
const Data = [
  { icon: MdOutlineManageAccounts, heading: "Accounting" },
  { icon: MdArchitecture, heading: "Architecture" },
  { icon: MdEngineering, heading: "Engineering" },
  { icon: CgProfile, heading: "Consulting" },
  { icon: TfiWorld, heading: "IT Services" },
  { icon: SlNote, heading: "GovCon" },
];
const Home = () => {
  return (
    <>
      <Header />
      <div className="home-page-main-container">
        <div className="home-page-container1">
          <div className="home-page-container1-sub1">
            <h1 className="home-page-container1-heading">
              Streamline operations, improve productivity, and boost
              profitability
            </h1>
            <p className="home-page-container1-text">
              See how BigTime helps your project-driven firm track and bill its
              most important asset: time.
            </p>
            <button className="home-page-container1-button">Learn More</button>
          </div>
          <div className="home-page-container1-image-container">
            <img className="home-page-container1-image" alt="kk" src={image1} />
          </div>
        </div>
        <div className="home-page-container3">
          <h1 className="home-page-container3-heading">
            A universal platform for running anything from small businesses to
            large enterprises
          </h1>
          <p className="home-page-container3-text">
            From a powerful time tracker to project management, human resource
            planning, and running an office. Everything is fully customizable
            and can be turned on and off for the whole company or specific
            users.
          </p>
        </div>
        <div className="home-page-support-services-main-container">
          <h1 className="home-page-container1-heading">
            We support professional services firms with teams of 5 to 500+
          </h1>
          <div className="home-page-support-services-sub-container">
            {Data.map((each) => {
              return (
                <div className="home-page-support-services-card">
                  <each.icon className="home-page-support-services-card-icon" />
                  <p className="home-page-support-services-card-heading">
                    {each.heading}
                  </p>
                  <button className="home-page-support-services-card-button">
                    Learn More
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <h1 className="home-page-container3-heading">
          The impacts of flying blind on projects and budget are all too
          familiar
        </h1>
        <div className="home-page-container4">
          <div className="home-page-container4-sub1">
            <h1 className="home-page-container4-heading">
              A time tracker that helps you go paperless
            </h1>
            <p className="home-page-container4-text">
              Revolutionize your productivity with our paperless time tracker.
            </p>
          </div>
          <div className="home-page-image-container-4">
            <img
              src={image2}
              className="home-page-container4-image"
              alt="image1"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
