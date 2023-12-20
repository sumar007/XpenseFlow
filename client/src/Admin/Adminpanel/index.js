import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../UserPanel";

const checkGoogleDetails = (googleprofileList) => {
  console.log(googleprofileList);
  return (
    <div>
      <img alt="pic" src={googleprofileList.picture} />
      <h1>Login successfully</h1>
    </div>
  );
};

const normaladminpage = () => {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <SideBar />
    </div>
  );
};

const AdminPanel = (props) => {
  const [isGoogle, setGoogle] = useState(false);
  const [googleprofileList, setGoogleProfileList] = useState(null);
  const location = useLocation();
  console.log("updated to state");
  console.log(isGoogle);
  console.log(googleprofileList);

  useEffect(() => {
    const fetchData = async () => {
      const profile = location.state?.profile;
      if (profile) {
        console.log("Content below is checking props");
        console.log(profile);

        const updatedProfileList = {
          accessToken: profile.access_token,
          tokenType: profile.token_type,
          expiresIn: profile.expires_in,
          scope: profile.scope,
          sub: profile.sub,
          name: profile.name,
          givenName: profile.given_name,
          familyName: profile.family_name,
          picture: profile.picture,
          locale: profile.locale,
          email: profile.email, // Add email if available in your data
        };

        console.log("Below content is from admin panel");
        console.log(updatedProfileList);

        setGoogle(true);
        setGoogleProfileList(updatedProfileList); // Set state after data is processed
      }
    };

    fetchData();
  }, [location]);

  // return isGoogle ? checkGoogleDetails(googleprofileList) : normaladminpage();
  return normaladminpage();
};

export default AdminPanel;
