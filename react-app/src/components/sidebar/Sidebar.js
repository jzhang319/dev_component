import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as componentActions from "../../store/component";
import { ArrowDownwardIcon, ArrowForwardIcon } from "../../exports";

const Sidebar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [show, setShow] = useState(null);
  const [data, setData] = useState({});
  const listItems = [
    "Getting Started",
    "Components",
    "My Components",
    "Liked Components",
  ];

  const handleClick = async (text) => {
    if (text === "My Components" && !sessionUser) {
      alert("Please log in to view your components."); // Display a popup if there's no session user
      return;
    }
    setShow(show === text ? null : text);

    let action;
    switch (text) {
      case "Getting Started":
        // action = componentActions.getGettingStartedThunk();
        break;
      case "Components":
        action = componentActions.getComponentsThunk();
        break;
      case "My Components":
        action = componentActions.getUserComponentsThunk();
        break;
      case "Liked Components":
        // action = componentActions.getLikedComponentsThunk();
        break;
      default:
        break;
    }

    if (action) {
      const fetchedData = await dispatch(action);
      setData({ ...data, [text]: fetchedData });
      // console.log(fetchedData, " <----- fetchedData frontend");
    }
  };

  return (
    <div className="sidebar absolute flex-col h-full w-1/5 mt-25 z-50">
      <div className="sidebar__wrapper mt-8">
        {listItems.map((text) => (
          <div key={text} className="list">
            <div className="list__wrapper flex flex-col">
              {show === text ? (
                <div
                  className={`list__toggle active`}
                  onClick={() => handleClick(text)}
                >
                  <ArrowDownwardIcon
                    className="list__icon"
                    style={{ fontSize: "2rem" }}
                  />
                  <span className="list__button">{text}</span>
                </div>
              ) : (
                <div className="list__toggle" onClick={() => handleClick(text)}>
                  <ArrowForwardIcon
                    className="list__icon"
                    style={{ fontSize: "2rem" }}
                  />
                  <span className="list__button">{text}</span>
                </div>
              )}
              {show === text && data[text] && (
                <div className="list__data flex flex-col w-100">
                  {data[text].map((item) => (
                    <p key={item.id}>ID {item.id} Type: {item.type}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
