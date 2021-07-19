const path = require("path");
const dotenv = require("dotenv");

const getEnv = () => {
    let env = JSON.stringify(process.env.npm_lifecycle_script.substr(process.env.npm_lifecycle_script.indexOf("--env ") + "--env ".length, process.env.npm_lifecycle_script.substr(process.env.npm_lifecycle_script.indexOf("--env ") + "--env ".length).search(/($|\s)/)));
    env = env.replace(/\"/g, "");
    return env;
};

const env = getEnv() === "analyze" ? "prod" : getEnv();
let parsedEnv = null;
switch (env) {
    case "local":
        parsedEnv = dotenv.config({ path: path.resolve(process.cwd(), "dotenv/local.env") }).parsed;
        break;
    case "dev":
        parsedEnv = dotenv.config({ path: path.resolve(process.cwd(), "dotenv/dev.env") }).parsed;
        break;
    case "develop":
        parsedEnv = dotenv.config({ path: path.resolve(process.cwd(), "dotenv/dev.env") }).parsed;
        break;
    case "feature":
        parsedEnv = dotenv.config({ path: path.resolve(process.cwd(), "dotenv/feature.env") }).parsed;
        break;
    case "beta":
        parsedEnv = dotenv.config({ path: path.resolve(process.cwd(), "dotenv/beta.env") }).parsed;
        break;
    case "prod":
        parsedEnv = dotenv.config({ path: path.resolve(process.cwd(), "dotenv/prod.env") }).parsed;
        break;
    default:
        throw new Error(`Unsupported env: ${env}!`);
}

// reduce it to a object, the same as before, so we can use process.env.* outside of webapck
const newPrev = Object.create(parsedEnv);
const envKeys = Object.keys(parsedEnv).reduce((_prev, next) => {
    newPrev[`process.env.${next}`] = JSON.stringify(parsedEnv[next]);
    return newPrev;
}, {});

module.exports = {
    env,
    envKeys,
};
