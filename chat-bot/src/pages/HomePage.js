import React, { useEffect, useState } from "react";
import ChatBotPortal from "../components/ChatBotPortal";
import { useSelector } from "react-redux";

const HomePage = () => {
  const reduxState = useSelector((state) => state);

  const [userDetails, setUserDetails] = useState({});
  const [students, setStudents] = useState();
  const [chatModal, setChatModal] = useState(false);

  function logOut() {
    localStorage.clear();
    window.location.reload();
  }
  useEffect(() => {
    const userDetails = localStorage.getItem("formData");
    const data = JSON.parse(userDetails);
    setUserDetails(data);
    setStudents(reduxState.dataArray);
    console.log(reduxState.dataArray, "redux");
  }, [reduxState]);

  console.log(students, "sriniavss");

  return (
    <>
      <div>
        <div className="header">
          <div className="logo">Hi {userDetails.name}</div>
          <button
            onClick={() => {
              logOut();
            }}
            className="logout-btn"
          >
            Logout
          </button>
        </div>

        <div className="container-center">
          <h1>Welcome to Student Info System !</h1>
          <div className="user-container">
            {students && students.length > 0 ? (
              students.map((data) => (
                <div className="user-details">
                  <div className="details-div">
                    <h1>
                      Name : <span>{data.name}</span>
                    </h1>
                    <h1>
                      Age : <span>{data.age}</span>
                    </h1>
                    <h1>
                      Schedule-Session :{" "}
                      <span>
                        {data.date}&nbsp;&nbsp;
                        {data.slot}
                      </span>
                    </h1>
                  </div>
                </div>
              ))
            ) : (
              <p className="warning-message">** No Students Added Yet !!!</p>
            )}
          </div>
          <button
            onClick={() => {
              setChatModal(true);
            }}
            className="student-add"
          >
            Add Students to the System
            <img src="/images/add-icon.png" alt="addIcon" />
          </button>
        </div>
      </div>
      {chatModal && <ChatBotPortal setChatModal={setChatModal} />}
    </>
  );
};

export default HomePage;
