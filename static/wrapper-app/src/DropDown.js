import React, { useState, useEffect } from "react";

import Button from "@atlaskit/button/standard-button";
import MoreIcon from "@atlaskit/icon/glyph/more";
import { invoke, Modal } from "@forge/bridge";
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from "@atlaskit/dropdown-menu";

const DropdownMenuTriggerButton = () => {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(false);

  const checkOpenAiApiKey = async () => {
    const data = await invoke("getOpenaiToken");
    if (JSON.stringify(data) === "{}") {
      setData(true);
      setToken(null);
    } else {
      setToken(data);
      setData(true);
    }
  };

  const handleModelOpen = async () => {
    const modal = new Modal({
      resource: "main-app",
      onClose: (payload) => {},
      size: "small",
      context: {
        token,
      },
    });
    await modal.open();
  };

  useEffect(() => {
    checkOpenAiApiKey();
  }, []);

  return (
    <DropdownMenu
      trigger={({ triggerRef, ...props }) => (
        <Button
          {...props}
          iconBefore={<MoreIcon label="more" />}
          ref={triggerRef}
        />
      )}
    >
      <DropdownItemGroup>
        <DropdownItem onClick={handleModelOpen}>
          {!token && data ? "Add API token" : "Update API Token"}
        </DropdownItem>
      </DropdownItemGroup>
    </DropdownMenu>
  );
};

export default DropdownMenuTriggerButton;
