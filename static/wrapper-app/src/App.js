import React, { useState } from "react";
import { invoke, view } from "@forge/bridge";
import { LoadingButton, ButtonGroup } from "@atlaskit/button";
import FlagError from "./FlagError";
import DropdownMenuTriggerButton from "./DropDown";

function App() {
  const [openAiError, setOpenAiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createSubTasksHandler = async () => {
    setIsLoading(true);
    const subTaskId = await invoke("getProjectMetaData");
    const issueData = await invoke("getIssueDetailsById");
    if (issueData.ticketDescription.length < 10) {
      setOpenAiError(
        "Please provide a meaningful description for your jira issue."
      );
      setIsLoading(false);
    } else {
      const apiToken = await invoke("getOpenaiToken");
      const openAiResponse = await invoke("getSubTasksByOpenAi", {
        issueData,
        apiToken,
      });

      if (!openAiResponse?.error?.message) {
        const res = openAiResponse.choices[0].text;
        await invoke("createSubTasks", { res, subTaskId });
        view.refresh();
        setIsLoading(false);
      } else {
        setOpenAiError(openAiResponse?.error?.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        {openAiError && <FlagError errormsg={openAiError} />}
      </div>

      <ButtonGroup>
        <LoadingButton
          isLoading={isLoading}
          appearance="primary"
          onClick={createSubTasksHandler}
        >
          Generate Sub-tasks
        </LoadingButton>
        <DropdownMenuTriggerButton />
      </ButtonGroup>
    </div>
  );
}

export default App;
