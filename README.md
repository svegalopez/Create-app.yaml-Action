# Create Google App Engine yaml file

This action creates an app.yaml (or however you name it) file to be used with Google App Engine when deploying via Github Actions.
It creates the file and saves it to your desired location. The file is populated with env variables that you pass when calling the action from a Github Actions workflow. This allows you to exclude your app.yaml file from source control, which is a more secure way to work.

## Inputs

### `filename`

**Optional**: The name of the file. Defaults to "app.yaml".

### `directory`

**Optional**: The directory where to save the file relative to the root of the workspace. Defaults to the root of the workspace.

## Example usage

```yaml
name: Deploy to GAE

on:
  push:
    branches: [main]

jobs:
  deploy:
    name: Deploying to Google Cloud
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Authenticate to Google Cloud
        id: auth
        uses: google-github-actions/auth@v1
        with:
          credentials_json: ${{ secrets.GCP_CREDENTIALS }}

      - name: Write app.yaml file
        uses: svegalopez/create-app-yaml-action@main
        with:
          filename: app.yaml
          directory: backend
        env:
          VALUE_runtime: nodejs18
          ENVKEY_MY_URL: https://api.something.com
          ENVKEY_MY_SECRET: ${{ secrets.MY_SECRET }}

      - name: Deploy to App Engine
        id: deploy
        uses: google-github-actions/deploy-appengine@v1
        with:
          working_directory: backend
          deliverables: app.yaml
          project_id: ${{ secrets.GCP_PROJECT }}
```

The above would result in an app.yaml file that looks like this:

```yaml
runtime: nodejs18
env_variables:
  MY_URL: "https://daring-solstice-386914.uc.r.appspot.com"
  MY_SECRET: "thisIsTh3Secret"
```

As you can see, prefixing a value with `"VALUE_"` causes it to be injected as a configuration parameter of the app.yaml file.
Prefixing a value with `"ENVKEY_"` will cause it to be injected as an environment variable (under the env_variables section) of the file.
