import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import * as componentActions from "../../store/component";
import { ArrowDownwardIcon, ArrowForwardIcon } from "../../exports";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  // const userComponents = useSelector((state) => state.session.user?.components);
  const [show, setShow] = useState(null);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const listItems = [
    "Getting Started",
    "Components",
    "My Components",
    "Liked Components",
  ];

  useEffect(() => {
    console.log("Show: ", show);
    console.log("Data: ", data);
  }, [show, data]);

  const handleClick = async (text) => {
    if (text !== "Components" && !sessionUser) {
      alert("Please log in to view your components.");
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
        // setData({ ...data, [text]: userComponents });
        // return;
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
      setData({ [text]: fetchedData });
      // console.log(fetchedData, " <----- fetchedData frontend");
    }
  };
  const handleComponentClick = (id) => {
    history.push(`/components/${id}`);
  };

  return (
    <div className="sidebar absolute flex-col h-full w-1/5 mt-25 z-50">
      <div className="sidebar__wrapper mt-8">
        {listItems.map((text) => (
          <div key={text} className="list w-full">
            <div className="list__wrapper">
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
              {show === text && data[text] && data[text].length > 0 && (
                <div className="list__data flex flex-col w-100">
                  {data[text].map((item) => (
                    <p
                      key={item.id}
                      onClick={() => handleComponentClick(item.id)}
                      className="component__item"
                    >
                      ID {item.id} Type: {item.type}
                    </p>
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
