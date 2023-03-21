const {
  extractingSubtasksFromOpenAiResponse,
} = require("../src/utils/extractSubtasks");

describe("extractSubtasks.js", () => {
  test("should be rendered formatted sub-tasks array", () => {
    const text = `[
        {summary: "Set up Jenkins on the server", description: "Configure Jenkins to pull code from the repository"},
        {summary: "Create pipeline job", description: "Create a pipeline job to build, test, and deploy the application"}
      ]`;

    const result = [
      {
        summary: "Set up Jenkins on the server",
        description: "Configure Jenkins to pull code from the repository",
      },
      {
        summary: "Create pipeline job",
        description:
          "Create a pipeline job to build, test, and deploy the application",
      },
    ];

    const expectedResult = extractingSubtasksFromOpenAiResponse(text);

    expect(expectedResult).toEqual(result);
  });
});
