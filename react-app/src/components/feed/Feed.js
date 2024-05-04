import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import * as componentActions from "../../store/component";

const Feed = ({ show, setShow, text }) => {
  const dispatch = useDispatch();

  const allComponents = useSelector((state) => Object.values(state.component));
  // console.log(allComponents, " <----- allComponents");

  const [copy, setCopy] = useState(false);
  const [copiedComponentId, setCopiedComponentId] = useState(null);

  useEffect(() => {
    dispatch(componentActions.getComponentsThunk());
  }, [dispatch]);

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
    <div className="feed mx-auto my-auto">
      <div className="feed__wrapper">
        {/* <div>
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
        </div> */}

        {allComponents?.map((component) => (
          <div key={component.id} className="feed__component m-10">
            {copiedComponentId === component.id ? (
              <button className="ml-2 mt-2">
                <span>
                  <ClipboardIcon />
                </span>
                Copied!
              </button>
            ) : (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(component.code);
                  setCopiedComponentId(component.id);
                  setTimeout(() => {
                    setCopiedComponentId(null);
                  }, 3000);
                }}
                className="ml-2 mt-2"
              >
                <span>
                  <ClipboardIcon />
                </span>
                Copy Code
              </button>
            )}
            <h2 className="ml-3">{component.type}</h2>
            <SyntaxHighlighter
              language="jsx"
              style={coldarkDark}
              customStyle={{ padding: "2.5rem" }}
              wrapLongLines={true}
            >
              {component.code}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
