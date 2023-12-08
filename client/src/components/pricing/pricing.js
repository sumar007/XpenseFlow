import React from "react";
import "./pricing.css"; // Make sure to adjust the CSS file name
import image from "./x2.png";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
console.log(image);
function Pricing() {
  return (
    <>
      <Header />
      <div className="pricing-container">
        <div className="pricing-text">
          <h1>Pricing plans built around the unique needs of your team</h1>
          <p>
            BigTime helps professional services businesses operate more
            effectively to better plan, manage, and get paid for client work.
          </p>
        </div>
        <div className="pricing-plans">
          <div className="pricing-plan">
            <h2>ESSENTIALS</h2>
            <h3>$9.99</h3>
            <p>per user/month</p>
            <button className="demo-btn">REQUEST DEMO</button>
            {/* Add more details or features as needed */}
          </div>
          <div className="vertical-line"></div>
          <div className="pricing-plan">
            <h2>ADVANCED</h2>
            <h3>$9.99</h3>
            <p>per user/month</p>
            <button className="demo-btn">REQUEST DEMO</button>
          </div>
          <div className="vertical-line"></div>
          <div className="pricing-plan">
            <h2>PREMIER</h2>
            <h3>$9.99</h3>
            <p>per user/month</p>
            <button className="demo-btn">REQUEST DEMO</button>
          </div>
          <div className="vertical-line"></div>
          <div className="pricing-plan">
            <h2>PROJECTOR</h2>
            <h3>$9.99</h3>
            <p>per user/month</p>
            <button className="demo-btn">REQUEST DEMO</button>
          </div>
        </div>
        <div className="price-features">
          <h1 className="deliver">DELIVER GREAT WORK</h1>
          <p>Streamline the basics so you can deliver great work, faster</p>
        </div>
        <div className="features-row">
          <div className="package-features">
            <ul>
              <li>Time tracking</li>
              <li>Rate management</li>
              <li>Approvals</li>
              <li>Expense management</li>
              <li>Project management</li>
              {/* Add more features if needed */}
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              {/* Add more features if needed */}
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              {/* Add more features if needed */}
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              {/* Add more features if needed */}
            </ul>
          </div>
        </div>

        <div className="price-features">
          <h1 className="deliver">GET PAID</h1>
          <p>Accelerate your cash flow</p>
        </div>
        <div className="features-row">
          <div className="package-features">
            <ul>
              <li>Time tracking</li>
              <li>Rate management</li>
              <li>Approvals</li>
              <li>Expense management</li>
              <li>Project management</li>
              {/* Add more features if needed */}
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              {/* Add more features if needed */}
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              {/* Add more features if needed */}
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              {/* Add more features if needed */}
            </ul>
          </div>
        </div>

        <div className="price-features">
          <h1 className="deliver">INTEGRATE</h1>
          <p>Easily integrate with current and future systems</p>
        </div>
        <div className="features-row">
          <div className="package-features">
            <ul>
              <li>Time tracking</li>
              <li>Rate management</li>
              <li>Approvals</li>
              <li>Expense management</li>
              <li>Project management</li>
              {/* Add more features if needed */}
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              {/* Add more features if needed */}
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              {/* Add more features if needed */}
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              {/* Add more features if needed */}
            </ul>
          </div>
        </div>

        <div className="price-features">
          <h1 className="deliver">SUPPORT & SERVICES</h1>
          <p>Trust a smarter partner</p>
        </div>
        <div className="features-row">
          <div className="package-features">
            <ul>
              <li>Time tracking</li>
              <li>Rate management</li>
              <li>Approvals</li>
              <li>Expense management</li>
              <li>Project management</li>
              {/* Add more features if needed */}
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              {/* Add more features if needed */}
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              {/* Add more features if needed */}
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              {/* Add more features if needed */}
            </ul>
          </div>
        </div>
        <div className="performance-container">
          <div className="performance-header">
            <h3>Top performers use XpenseFlow</h3>
          </div>
          <div className="img-container">
            <img src={image} alt="" />
          </div>
          <div className="ready-container">
            <div className="left-side"></div>
            <div className="text-container">
              <h1 className="started">Ready To Get Started</h1>
              <br />
              <p>Make the first step towards operational excellence today</p>
            </div>
            <div className="right-side">
              <button>REGISTER FOR DEMO</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Pricing;
