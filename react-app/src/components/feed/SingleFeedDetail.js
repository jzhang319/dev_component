import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  const numericId = Number(id);
  const allComponents = useSelector((state) => state.component);
  const [copiedComponentId, setCopiedComponentId] = useState(null);

  useEffect(() => {
    dispatch(componentActions.getComponentsThunk()).catch((error) => {
      console.error("Error fetching components:", error);
    });
  }, [dispatch]);

  const component = Object.values(allComponents).reduce(
    (foundComponent, currentComponent) => {
      return currentComponent.id === numericId
        ? currentComponent
        : foundComponent;
    },
    null
  );

  return (
    <div key={component?.id} className="feed__component p-10 bg-gray-800">
      <div className="flex justify-between">
        <h3 className="ml-3 text-3xl">{component?.type}</h3>
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
  );
};

export default SingleFeedDetail;
