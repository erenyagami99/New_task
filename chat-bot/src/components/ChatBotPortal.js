import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch } from "react-redux";
import { addData } from "../redux/actions";

const ChatBotPortal = (props) => {
  const dispatch = useDispatch();
  const sessions = [
    { id: 1, time: "09:00AM" },
    { id: 2, time: "10:00AM" },
    { id: 3, time: "11:00AM" },
    { id: 4, time: "02:00PM" },
    { id: 5, time: "03:00PM" },
    { id: 6, time: "04:00PM" },
  ];

  const { setChatModal } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [dateLoading, setDateLoading] = useState(true);
  const [dayLoading, setDayLoading] = useState(true);
  const [nameLoading, setNameLoading] = useState(true);
  const [ageLoading, setAgeLoading] = useState(true);
  const [exitLoading, setExitLoading] = useState(true);
  const [slot, setSlot] = useState("");
  const [start, setStart] = useState(false);
  const [isCalendar, setIsCalendar] = useState(false);
  const [date, setDate] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [count, setCount] = useState();

  function closeBot() {
    setChatModal(false);
  }
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    if (!exitLoading) {
      const timer = setInterval(() => {
        if (count > 1) {
          setCount(count - 1);
        } else {
          clearInterval(timer);
          handleAddItem();
          closeBot();
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  });

  const startSession = () => {
    setStart(true);
    setTimeout(() => {
      setDayLoading(false);
      setIsCalendar(true);
    }, 3000);
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate());

  const isDisabled = (date) => {
    return date < tomorrow;
  };

  const onChange = (newDate) => {
    setTimeout(() => {
      setDateLoading(false);
    }, 3000);
  };

  function formatDate(selectedDate) {
    if (selectedDate) {
      const dateParts = selectedDate.toString().split(" ");
      const day = dateParts[2];
      const monthAbbreviation = dateParts[1].toUpperCase().substring(0, 3);
      const dayOfWeekAbbreviation = dateParts[0].toUpperCase().substring(0, 3);

      const formattedDate = `${day} ${monthAbbreviation}, ${dayOfWeekAbbreviation}`;
      setDate(formattedDate);
    }
  }

  const onDateSelect = (selectedDate) => {
    formatDate(selectedDate);
    setIsCalendar(false);
  };
  function nameLoad() {
    setTimeout(() => {
      setNameLoading(false);
    }, 3000);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setName(event.target.value);
      setTimeout(() => {
        setAgeLoading(false);
      }, 3000);
    }
  };
  const handleKeyDownAge = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setAge(event.target.value);
      setTimeout(() => {
        setExitLoading(false);
        setCount(5);
      }, 3000);
    }
  };

  let studentData = {
    name: name,
    age: age,
    date: date,
    slot: slot,
  };

  const handleAddItem = () => {
    dispatch(addData(studentData));
  };

  return (
    <div className="popup-container">
      <div className="popup-div">
        <div className="chat-div">
          <img src="images/robot-assistant.png" alt="bot" />
          <img
            onClick={() => {
              setChatModal(false);
            }}
            style={{ cursor: "pointer" }}
            src="images/close-icon.png"
            alt="close"
          />
        </div>
        <div className="chat-container">
          <div className="message-div" style={{ justifyContent: "flex-start" }}>
            <div>
              <div className="bot-div">
                <img src="images/chat-icon.png" alt="bot" />
                <div class="message received">
                  {isLoading ? (
                    <div class="dot-elastic"></div>
                  ) : (
                    <p>Hello, Welcome to student info system!</p>
                  )}
                </div>
              </div>
              {!isLoading && !start && (
                <button
                  onClick={() => {
                    startSession();
                  }}
                  className="button-got"
                >
                  Got it!
                </button>
              )}
            </div>
          </div>
          {start && (
            <div
              className="message-div"
              style={{
                right: "10px",
                position: "absolute",
                justifyContent: "flex-end",
              }}
            >
              <div class="message sent">
                <p>Got it!</p>
              </div>
              <img src="images/user-icon.png" alt="user" />
            </div>
          )}
          {start && (
            <div
              className="message-div"
              style={{ marginTop: "60px", justifyContent: "flex-start" }}
            >
              <div>
                <div className="bot-div">
                  <img src="images/chat-icon.png" alt="bot" />
                  <div class="message received">
                    {dayLoading ? (
                      <div class="dot-elastic"></div>
                    ) : (
                      <p>Select Enrollment Date</p>
                    )}
                  </div>
                </div>
                {isCalendar && !dayLoading && (
                  <>
                    <Calendar
                      onChange={onChange}
                      value={date}
                      tileDisabled={({ date }) => isDisabled(date)}
                      onClickDay={onDateSelect}
                    />
                  </>
                )}
              </div>
            </div>
          )}
          {date && (
            <div
              className="message-div"
              style={{
                right: "10px",
                position: "absolute",
                justifyContent: "flex-end",
              }}
            >
              <div class="message sent">
                <p>{date}</p>
              </div>
              <img src="images/user-icon.png" alt="user" />
            </div>
          )}
          {date && (
            <div
              className="message-div"
              style={{ marginTop: "60px", justifyContent: "flex-start" }}
            >
              <div>
                <div className="bot-div">
                  <img src="images/chat-icon.png" alt="bot" />
                  <div class="message received">
                    {dateLoading ? (
                      <div class="dot-elastic"></div>
                    ) : (
                      <p>Pick a Slot!</p>
                    )}
                  </div>
                </div>
                {slot === "" && !dateLoading && (
                  <div className="session-container">
                    {sessions.map((session) => (
                      <div
                        onClick={() => {
                          setSlot(session.time);
                          nameLoad();
                        }}
                        className="session-div"
                      >
                        {session.time}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {slot && (
            <div
              className="message-div"
              style={{
                right: "10px",
                position: "absolute",
                justifyContent: "flex-end",
              }}
            >
              <div class="message sent">
                <p>
                  {date}&nbsp;&nbsp;
                  {slot}
                </p>
              </div>
              <img src="images/user-icon.png" alt="user" />
            </div>
          )}
          {slot && (
            <div
              className="message-div"
              style={{ marginTop: "60px", justifyContent: "flex-start" }}
            >
              <div>
                <div className="bot-div">
                  <img src="images/chat-icon.png" alt="bot" />
                  <div class="message received">
                    {nameLoading ? (
                      <div class="dot-elastic"></div>
                    ) : (
                      <p>Enter Student Name</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {!nameLoading && (
            <div
              className="message-div"
              style={{
                right: "10px",
                position: "absolute",
                justifyContent: "flex-end",
              }}
            >
              <div class="message sent">
                {!name ? (
                  <input
                    type="text"
                    className="name-input"
                    placeholder="Enter Student Name"
                    onKeyDown={handleKeyDown}
                  />
                ) : (
                  <p>{name}</p>
                )}
              </div>
              <img src="images/user-icon.png" alt="user" />
            </div>
          )}
          {name && (
            <div
              className="message-div"
              style={{ marginTop: "60px", justifyContent: "flex-start" }}
            >
              <div>
                <div className="bot-div">
                  <img src="images/chat-icon.png" alt="bot" />
                  <div class="message received">
                    {ageLoading ? (
                      <div class="dot-elastic"></div>
                    ) : (
                      <p>Enter Student Age</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {!ageLoading && (
            <div
              className="message-div"
              style={{
                right: "10px",
                position: "absolute",
                justifyContent: "flex-end",
              }}
            >
              <div class="message sent">
                {!age ? (
                  <input
                    type="number"
                    className="name-input custom-input"
                    placeholder="Enter Student Name"
                    onKeyDown={handleKeyDownAge}
                  />
                ) : (
                  <p>{age}</p>
                )}
              </div>
              <img src="images/user-icon.png" alt="user" />
            </div>
          )}
          {age && (
            <div
              className="message-div"
              style={{ marginTop: "60px", justifyContent: "flex-start" }}
            >
              <div>
                <div className="bot-div">
                  <img src="images/chat-icon.png" alt="bot" />
                  <div class="message received">
                    {exitLoading ? (
                      <div class="dot-elastic"></div>
                    ) : (
                      <p>Thank You</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {!exitLoading && (
            <div
              className="message-div"
              style={{ marginTop: "60px", justifyContent: "flex-start" }}
            >
              <div>
                <div className="bot-div">
                  <img src="images/chat-icon.png" alt="bot" />
                  <div class="message received">
                    <p>Exiting in {count} seconds !!!</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBotPortal;
