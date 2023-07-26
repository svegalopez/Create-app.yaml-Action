const core = require("@actions/core");
const yaml = require("js-yaml");

async function run() {
  try {
    let data = {
      env_variables: {},
    };

    for (const key of Object.keys(process.env)) {
      const value = process.env[key];
      if (key.startsWith("ENVKEY_")) {
        data.env_variables[key.slice(7)] = value;
      } else if (key.startsWith("INPUT_")) {
        data[key.slice(6)] = value;
      }
    }

    // const directory = core.getInput("directory") || "";
    // const fileName = core.getInput("file_name") || ".env";
    // let filePath = process.env["GITHUB_WORKSPACE"] || ".";

    // if (filePath === "" || filePath === "None") {
    //   filePath = ".";
    // }

    // if (directory === "") {
    //   filePath = path.join(filePath, fileName);
    // } else if (directory.startsWith("/")) {
    //   throw new Error(
    //     "Absolute paths are not allowed. Please use a relative path."
    //   );
    // } else if (directory.startsWith("./")) {
    //   filePath = path.join(filePath, directory.slice(2), fileName);
    // } else {
    //   filePath = path.join(filePath, directory, fileName);
    // }

    const yamlDump = yaml.dump(data);

    core.info(JSON.stringify(data));
    core.info(yamlDump);

    //fs.writeFileSync(filePath, outFile);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
