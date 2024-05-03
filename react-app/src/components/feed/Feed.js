import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  ArrowDownwardIcon,
  ArrowForwardIcon,
  ClipboardIcon,
  check,
} from "../../exports";
import {
  coy,
  dark,
  funky,
  okaidia,
  solarizedlight,
  tomorrow,
  twilight,
  prism,
  a11yDark,
  atomDark,
  base16AteliersulphurpoolLight,
  cb,
  coldarkCold,
  coldarkDark,
  coyWithoutShadows,
  darcula,
  dracula,
  duotoneDark,
  duotoneEarth,
  duotoneForest,
  duotoneLight,
  duotoneSea,
  duotoneSpace,
  ghcolors,
  gruvboxDark,
  gruvboxLight,
  holiTheme,
  hopscotch,
  lucario,
  materialDark,
  materialLight,
  materialOceanic,
  nightOwl,
  nord,
  oneDark,
  oneLight,
  pojoaque,
  shadesOfPurple,
  solarizedDarkAtom,
  synthwave84,
  vs,
  vscDarkPlus,
  xonokai,
  zTouch,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const Feed = ({ show, setShow, text }) => {
  const [copy, setCopy] = useState(false);

  let content = `<div className="list__wrapper">

  {show ?
    <div className='list__toggle' >
      <ArrowDownwardIcon className='list__icon' style={{fontSize: '2rem'}}/>
      <span className="list__button"  onClick={() => setShow(false)}>{text}</span>
    </div>
    :
  <div className='list__toggle' >
    <ArrowForwardIcon className='list__icon' style={{fontSize: '2rem'}}/>
    <span className="list__button"  onClick={() => setShow(true)}>{text}</span>
  </div>
  }
</div>`;
  return (
    <div className="feed">
      <div className="feed__wrapper">
        <div>
          <p>Example code</p>
          {copy ? (
            <button>
              <span>
                <ClipboardIcon />
              </span>
              Copied!
            </button>
          ) : (
            <button
              onClick={() => {
                navigator.clipboard.writeText(content);
                setCopy(true);
                setTimeout(() => {
                  setCopy(false);
                }, 3000);
              }}
            >
              <span>
                <ClipboardIcon />
              </span>
              Copy Code
            </button>
          )}
        </div>
        <SyntaxHighlighter
          language="jsx"
          style={coldarkDark}
          customStyle={{ padding: "2.5rem" }}
          wrapLongLines={true}
        >
          {content}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Feed;
