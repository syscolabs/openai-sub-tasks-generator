import Resolver from "@forge/resolver";
import { REQUESTED_HEADERS } from "./constants/constants";
import api, { fetch, route, properties } from "@forge/api";
import { extractingSubtasksFromOpenAiResponse } from "./utils/extractSubtasks";

const resolver = new Resolver();

resolver.define("getProjectMetaData", async (req) => {
  const { project } = req.context.extension;
  try {
    const response = await api
      .asUser()
      .requestJira(route`/rest/api/3/project/${project.id}`, {
        headers: {
          Accept: "application/json",
        },
      });

    const data = await response.json();
    const subTaskId = data?.issueTypes?.find(
      (issueType) => issueType.name.toLowerCase() === "sub-task"
    )?.id;

    return subTaskId;
  } catch (error) {
    console.error(error);
  }
});

resolver.define("getIssueDetailsById", async (req) => {
  const { issue, project } = req.context.extension;
  try {
    const response = await api
      .asUser()
      .requestJira(route`/rest/api/3/issue/${issue.id}?expand=renderedFields`, {
        headers: REQUESTED_HEADERS,
      });
    const data = await response.json();
    return {
      projectId: project.id,
      issueParentKey: issue.key,
      ticketDescription: data.renderedFields.description,
    };
  } catch (error) {
    console.error(error);
  }
});

resolver.define("getOpenaiToken", async (req) => {
  const { project } = req.context.extension;
  try {
    const data = await properties
      .onJiraProject(project.key)
      .get("open-ai-token");
    return data;
  } catch (error) {
    return error;
  }
});

resolver.define("setOpenaiToken", async (req) => {
  const { project } = req.context.extension;
  try {
    const res = await properties
      .onJiraProject(project.key)
      .set("open-ai-token", req.payload.token);

    return res;
  } catch (error) {
    console.log(error);
  }
});

resolver.define("deleteOpenaiToken", async (req) => {
  const { project } = req.context.extension;
  try {
    await properties.onJiraProject(project.key).delete("open-ai-token");
  } catch (error) {
    return error;
  }
});

resolver.define("getSubTasksByOpenAi", async (req) => {
  const { apiToken, issueData } = req.payload;
  try {
    const requestPayload = {
      model: "text-davinci-003",
      prompt: `Give an array of objects in this format "[{summary:"sub-task-title",description:"sub-task-description"},...]", after breaking this jira tiket description:"${issueData.ticketDescription}" into the meaningful possibe jira sub tasks`,
      max_tokens: 1000,
      temperature: 0,
    };
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        ...REQUESTED_HEADERS,
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify(requestPayload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
});

resolver.define("createSubTasks", async (req) => {
  const { issue, project } = req.context.extension;
  const { res, subTaskId } = req.payload;

  try {
    const formattedArray = extractingSubtasksFromOpenAiResponse(res);
    for (const element of formattedArray) {
      const requestBody = JSON.stringify({
        fields: {
          description: {
            content: [
              {
                content: [
                  {
                    text: element.description,
                    type: "text",
                  },
                ],
                type: "paragraph",
              },
            ],
            type: "doc",
            version: 1,
          },
          issuetype: {
            id: subTaskId,
          },
          parent: {
            key: issue.key,
          },
          project: {
            id: project.id,
          },
          summary: element.summary,
        },
      });
      await api.asUser().requestJira(route`/rest/api/3/issue`, {
        method: "POST",
        headers: REQUESTED_HEADERS,
        body: requestBody,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

export const handler = resolver.getDefinitions();
