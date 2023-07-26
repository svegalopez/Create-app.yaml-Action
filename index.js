const core = require("@actions/core");
const yaml = require("js-yaml");

async function run() {
  try {
    let data = {
      runtime: "",
      env_variables: {},
    };

    let outFile = "";
    data.runtime = core.getInput("runtime") || "nodejs18";
    const envKeys = Object.keys(process.env);

    for (const key of envKeys) {
      if (key.startsWith("INPUT_ENVKEY_")) {
        const value = process.env[key] || "";

        if (value === "" && core.getInput("fail_on_empty") === "true") {
          throw new Error(`Empty env key found: ${key}`);
        }

        data.env_variables[key.slice(13)] = value;
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
