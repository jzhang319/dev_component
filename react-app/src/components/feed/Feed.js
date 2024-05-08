import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as componentActions from "../../store/component";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
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
import {
  ArrowDownwardIcon,
  ArrowForwardIcon,
  ClipboardIcon,
  check,
} from "../../exports";

const Feed = ({ show, setShow, text }) => {
  const dispatch = useDispatch();

  const allComponents = useSelector((state) => Object.values(state.components));
  // const allComponents = useSelector(state => state.components)
  // console.log(allComponents, " <----- allComponents");
  // console.log(allComponents)

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
    <div className="feed mx-auto">
      <div className="feed__wrapper space-x-4">
        {allComponents?.map((component) => (
          <Link to={`/components/${component.id}`} key={component.id}>
            <div className="feed__component p-10 bg-gray-800 border-2 border-transparent hover:border-secondary hover:border-2 transition-all duration-200">
              <div className="flex justify-between">
                <h3 className="ml-3 text-3xl">Type: {component.type}</h3>
                <h4 className="ml-3 text-xl">
                  User: {component.user?.username}
                </h4>
                {copiedComponentId === component.id ? (
                  <button className="m-2">
                    <ClipboardIcon className="mr-1" />
                    Copied!
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(component.code);
                      setCopiedComponentId(component.id);
                      setTimeout(() => {
                        setCopiedComponentId(null);
                      }, 3000);
                    }}
                    className="m-2"
                  >
                    <ClipboardIcon className="mr-1" />
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
                {component.code}
              </SyntaxHighlighter>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feed;
