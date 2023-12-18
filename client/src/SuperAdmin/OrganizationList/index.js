import { useState, useEffect } from "react";
// import SideBar from "../SideBar";
import "./index.css";
import Modal from "react-modal";
// import OrganizationDetails from "../OrganizationDetailView";
import Cookies from "js-cookie";

const ColorList = ["#EFBEBE", "#B9EDBB", "#BBF2EF", "#E6ECA3"];

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function OrganizationList() {
  const [organizations, setOrganizations] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedOrgId, setSelectedOrgId] = useState(null);

  function openDetailPage(orgId) {
    setSelectedOrgId(orgId); // Set the selected organization's ID
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const containerCount = 4; // Number of containers
  //   const storedColor = localStorage.getItem('randomColor');
  //const [randomColors, setRandomColors] = useState(getInitialRandomColors(containerCount));

  //   useEffect(() => {
  //     if (!storedColor) {
  //       // Set random colors only when the component mounts
  //       const newRandomColors = getRandomColors(containerCount);
  //       setRandomColors(newRandomColors);
  //       localStorage.setItem('randomColor', JSON.stringify(newRandomColors));
  //     }
  //   }, [storedColor, containerCount]);

  //   function getRandomColor() {
  //     const randomIndex = Math.floor(Math.random() * ColorList.length);
  //     return ColorList[randomIndex];
  //   }

  //   function getRandomColors(count) {
  //     return Array.from({ length: count }, () => getRandomColor());
  //   }

  //   function getInitialRandomColors(count) {
  //     const storedColors = JSON.parse(localStorage.getItem('randomColor'));
  //     return storedColors || getRandomColors(count);
  //   }

  const randomColors = ["a", "b", "c", "d", "e", "f"];

  useEffect(() => {
    const token = Cookies.get("_a_p_k");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetchData = async () => {
      const api = "http://localhost:3009/api/v1/organizationlist";
      try {
        const response = await fetch(api, options);

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        setOrganizations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const PDF_URL = process.env.REACT_APP_PDF_URL;
  console.log(organizations)

  return (
    <div style={{ display: "flex" }}>
      {/* <SideBar /> */}
      <div className="orgainization-list-display-organization-container">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {/* <button onClick={closeModal}>close</button>
          {selectedOrgId && (
            // <OrganizationDetails id={selectedOrgId} /> // Pass selectedOrgId as a prop
          )} */}
        </Modal>
        {organizations && organizations.length > 0 ? (
          organizations.map((eachOrganization, index) => (
            <div
              className="organization-list-main-container"
              style={{
                backgroundColor: ColorList[index % ColorList.length],
              }}
            >
              <div className="organization-list-details-and-logo-container">
                <div className="organization-list-detail-container">
                  <h1 className="organization-list-main-heading">
                    {eachOrganization.organizationName}
                  </h1>
                  <p className="organization-list-content">
                    Phone : <span>{eachOrganization.phone}</span>
                  </p>
                  <p className="organization-list-content">
                    Email : <span>{eachOrganization.companyEmail}</span>
                  </p>
                  <p className="organization-list-content">
                    Website : <span>{eachOrganization.website}</span>
                  </p>
                  <p className="organization-list-content">
                    Responsible Person :{" "}
                    <span>{eachOrganization.responsiblePerson}</span>
                  </p>
                </div>
                <div className="organization-list-logo-container">
                  <img
                    src={`${PDF_URL}${eachOrganization.companyLogo}`}
                    alt=""
                    className="organization-list-logo"
                  />
                </div>
              </div>
              <div className="organization-list-view-detail-button-container">
                <button
                  className="organization-list-view-detail-button"
                  onClick={() => openDetailPage(eachOrganization.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Organizations</p>
        )}
      </div>
    </div>
  );
}
export default OrganizationList;
