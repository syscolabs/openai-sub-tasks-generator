## Getting started : local setup

This is a guide on how to set up this jira plugin locally. The Forge platform allows developers to build, host, and run cloud applications directly within Atlassian products like Jira.

#### Steps

1. Install the Forge CLI

   - The Forge CLI requires a fully supported [LTS release](https://nodejs.org/en/about/releases/) of Node.js installed; namely, versions 14.x, 16.x, or 18.x.
   - You'll also need to install Docker.
   - Install the Forge CLI globally by running:
     `npm install -g @forge/cli`

2. Install required npm packages
   `npm install`

3. Log in with an Atlassian API token
   - Go to [https://id.atlassian.com/manage/api-tokens](https://id.atlassian.com/manage/api-tokens).
   - Click **Create API token**.
   - Enter a label to describe your API token. For example, _forge-api-token_.
   - Click **Create**.
   - Click **Copy to clipboard** and close the dialog.
   - In the terminal run `forge login` command and you will be asked to enter your Atlassian email and API token you have created.
4. Deploy and Install your app

   - Navigate to the app's top-level directory and deploy your app by running `forge deploy`
   - Install your app by running `forge install --upgrade`

5. Tunneling
   - Tunneling allows you to speed up development by avoiding the need to redeploy each code change.any changes you make to your app code can be viewed on your Atlassian site without losing the current app state. You don’t need to run any other commands; you only need to refresh the page.
   - run `forge tunnel` on your terminal
