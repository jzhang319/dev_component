import React, { useState } from "react";
import { ArrowDownwardIcon, ArrowForwardIcon } from "../../exports";

const List = ({ text }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="list">
      <div className="list__wrapper">
        {show ? (
          // click or mouse-over
          <div className="list__toggle" onClick={() => setShow(false)}>
            {/* <div className='list__toggle' onMouseOut={() => setShow(false)}> */}
            <ArrowDownwardIcon
              className="list__icon"
              style={{ fontSize: "2rem" }}
            />
            <span className="list__button">{text}</span>
          </div>
        ) : (
          <div className="list__toggle" onClick={() => setShow(true)}>
            {/* <div className='list__toggle'  onMouseOver={() => setShow(true)}> */}
            <ArrowForwardIcon
              className="list__icon"
              style={{ fontSize: "2rem" }}
            />
            <span className="list__button">{text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
