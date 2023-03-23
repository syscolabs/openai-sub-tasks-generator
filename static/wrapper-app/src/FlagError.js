import React from "react";
import { view } from "@forge/bridge";
import ErrorIcon from "@atlaskit/icon/glyph/error";
import { R400 } from "@atlaskit/theme/colors";
import { token } from "@atlaskit/tokens";
import Flag from "@atlaskit/flag";

const FlagError = ({ errormsg }) => {
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
          content: "Close",
          onClick: () => view.refresh(),
        },
      ]}
    />
  );
};

export default FlagError;
