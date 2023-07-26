# Create app.yaml file Action

This action creates an app.yaml (or however you name it) file to be used with Google App Engine.
It creates the file and saves it to your desired location.

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

```yaml
uses: actions/hello-world-javascript-action@e76147da8e5c81eaf017dede5645551d4b94427b
with:
  who-to-greet: "Mona the Octocat"
```
