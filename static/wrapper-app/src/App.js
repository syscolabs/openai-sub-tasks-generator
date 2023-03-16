import React, { useEffect, useState } from "react";
import { invoke, Modal, view } from "@forge/bridge";
import { LoadingButton } from "@atlaskit/button";
import FlagErrorExample from "./Error";

function App() {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(false);
  const [openAiError, setOpenAiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkOpenAiApiKey = async () => {
    const data = await invoke("getOpenaiToken");
    if (JSON.stringify(data) === "{}") {
      const modal = new Modal({
        resource: "main-app",
        onClose: (payload) => {},
        size: "medium",
        context: {
          token,
        },
      });
      await modal.open();
      setData(true);
    } else {
      setToken(data);
      setData(true);
    }
  };

  const createSubTasksHandler = async () => {
    setIsLoading(true);
    const issueData = await invoke("getIssueDetailsById");
    const apiToken = await invoke("getOpenaiToken");
    const openAiResponse = await invoke("getSubTasksByOpenAi", {
      issueData,
      apiToken,
    });

    if (!openAiResponse?.error?.message) {
      const res = openAiResponse.choices[0].text;
      await invoke("createSubTasks", { res });
      view.refresh();
      setIsLoading(false);
    } else {
      setOpenAiError(openAiResponse?.error?.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkOpenAiApiKey();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        {openAiError && <FlagErrorExample errormsg={openAiError} />}
      </div>

      {!data ? (
        <div>Loading...</div>
      ) : (
        token && (
          <LoadingButton
            isLoading={isLoading}
            appearance="primary"
            onClick={createSubTasksHandler}
          >
            Generate Sub-tasks
          </LoadingButton>
        )
      )}
    </div>
  );
}

export default App;
