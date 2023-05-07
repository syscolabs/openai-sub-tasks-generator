# AI Sub Tasks Generator For Jira

## Description

Introducing our Jira app powered by OpenAI, designed to save you time and streamline your project management workflow. With this app, you can easily break down complex tasks into smaller subtasks, simply by providing the issue description in Jira.

Our app uses OpenAI language processing technology to generate a list of subtasks based on the information provided. The result is a more detailed and organized project plan, without the need for manual task creation.

Get started today and experience the power of AI-assisted project management!"

https://user-images.githubusercontent.com/115063025/227199168-b8f8914d-11d5-404a-90b1-34362b12822a.mp4

## Getting started : local setup

This is a guide on how to set up this jira plugin locally. The Forge platform allows developers to build, host, and run cloud applications directly within Atlassian products like Jira.

#### Steps

1. Install the Forge CLI

   - The Forge CLI requires a fully supported [LTS release](https://nodejs.org/en/about/releases/) of Node.js installed; namely, versions 14.x, 16.x, or 18.x.
   - You'll also need to install Docker.
   - Install the Forge CLI globally by running:
     `npm install -g @forge/cli`

2. Install and build

   - `npm run setup`
   - This command will bundle our two static react apps _(static/main-app & static/wrapper-app)_ together into the _static/main-app/build & static/wrapper-app/build_ ,which is used as the resource path in the Forge app's manifest.yml.

3. Log in with an Atlassian API token
   - Go to [https://id.atlassian.com/manage/api-tokens](https://id.atlassian.com/manage/api-tokens).
   - Click **Create API token**.
   - Enter a label to describe your API token. For example, _forge-api-token_.
   - Click **Create**.
   - Click **Copy to clipboard** and close the dialog.
   - In the terminal run `forge login` command and you will be asked to enter your Atlassian email and API token you have created.
4. Deploy and Install your app

   - Navigate to the app's top-level directory and run `forge register` to register a new copy of this app to your developer account.
   - Deploy your app by running `forge deploy`
   - Install your app by running `forge install`

5. Testing the app
   - Run `cd static/main-app && npm start` to start the main-app
   - Run `cd static/wrapper-app && npm start` to start the wrapper-app
   - Run `forge tunnel` to run your forge app locally.Tunneling allows you to speed up development by avoiding the need to redeploy each code change.any changes you make to your app code can be viewed on your Atlassian site without losing the current app state.

## Contributing

- Thank you for your interest in contributing to OpenAI Sub-Tasks Generator !
- We welcome contributions from anyone, whether you're a seasoned developer or just getting started with open-source.
- Before you start working on a contribution, please open an issue to discuss your idea with the maintainers. This helps ensure that your contribution will align with the project's goals and avoid duplicate efforts.
- To make a contribution, follow these steps:

  1.  Fork the OpenAI Sub-Tasks Generator repository to your GitHub account.
  2.  Create a new branch for your changes.
  3.  Make your changes and commit them with a clear and concise message.
  4.  Push your branch to your forked repository.
  5.  Submit a pull request to the OpenAI Sub-Tasks Generator repository, explaining the changes you made and why they are beneficial.

- We will review your contribution as soon as possible and provide feedback or suggestions for improvement.
- Thank you for your help in making OpenAI Sub-Tasks Generator better!
