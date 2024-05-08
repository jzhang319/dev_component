import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as componentActions from "../../store/component";
import { ClipboardIcon } from "../../exports";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
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

const SingleFeedDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const component = useSelector((state) => state.components);
  const [copiedComponentId, setCopiedComponentId] = useState(null);

  useEffect(() => {
    dispatch(componentActions.getComponentThunk(id)).catch((error) => {
      console.error("Error fetching components:", error);
    });
  }, [dispatch, id]);

  console.log(component, ' <--- component from react')

  return (
    <div className="feed flex w-full">
      <div
        key={component?.id}
        className="feed__component w-3/4 mx-auto p-10 bg-gray-800"
      >
        <div className="flex justify-between">
          <h3 className="ml-3 text-3xl">{component?.type}</h3>
          <h4 className="ml-3 text-xl">User: {component?.user?.username}</h4>
          {copiedComponentId === component?.id ? (
            <button className="m-2">
              <ClipboardIcon className="mr-1" />
              Copied!
            </button>
          ) : (
            <button
              onClick={() => {
                navigator.clipboard.writeText(component?.code);
                setCopiedComponentId(component?.id);
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
          {component?.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default SingleFeedDetail;
