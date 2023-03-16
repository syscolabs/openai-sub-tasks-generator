import React from "react";
import { invoke, view } from "@forge/bridge";
import noop from "@atlaskit/ds-lib/noop";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";

import Flag from "@atlaskit/flag";

const FlagErrorExample = ({ errormsg }) => {
  const deleteTokenHandler = async () => {
    await invoke("deleteOpenaiToken");
    view.refresh();
  };

  return (
    <Flag
      appearance="error"
      icon={
        <ErrorIcon
          label="Error"
          secondaryColor={token("color.background.danger.bold", R400)}
        />
      }
      id="error"
      key="error"
      title="Error"
      description={errormsg}
      actions={[
        {
          content: "Update OpenAI API token",
          onClick: () => deleteTokenHandler(),
        },
      ]}
    />
  );
};

export default FlagErrorExample;
