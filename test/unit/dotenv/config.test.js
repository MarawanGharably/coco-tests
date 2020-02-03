const path = require("path");
const dotenv = require("dotenv");

describe("dotenv config tests", () => {
    afterEach(() => {
        delete process.env.npm_lifecycle_script;
    });
    beforeEach(() => {
        jest.resetModules();
    });

    const newPrev = {};
    const getEnvKeys = (parsedEnv) => Object.keys(parsedEnv).reduce((_prev, next) => {
        newPrev[`process.env.${next}`] = JSON.stringify(parsedEnv[next]);
        return newPrev;
    }, {});

    const isConfigCorrect = (webpackEnv) => {
        process.env.npm_lifecycle_script = `webpack -p --config ./webpack/webpack.config.js --env ${webpackEnv} --progress --display-error-details --mode development`;
        let parsedEnv;
        const { env, envKeys } = require("../../../dotenv/config");
        switch (env) {
            case "dev":
                if (env !== "dev") { return false; }
                parsedEnv = dotenv.config({ path: path.resolve(process.cwd(), "dotenv/dev.env") }).parsed;
                break;
            case "beta":
                if (env !== "beta") { return false; }
                parsedEnv = dotenv.config({ path: path.resolve(process.cwd(), "dotenv/beta.env") }).parsed;
                break;
            case "prod":
                if (env !== "prod") { return false; }
                parsedEnv = dotenv.config({ path: path.resolve(process.cwd(), "dotenv/prod.env") }).parsed;
                break;
            default:
                return false;
        }
        const config = getEnvKeys(parsedEnv);
        return JSON.stringify(envKeys) === JSON.stringify(config);
    };

    it("gets config matching dotenv/dev.env", () => {
        expect(isConfigCorrect("dev")).toBeTruthy();
    });
    it("gets config matching dotenv/beta.env", () => {
        expect(isConfigCorrect("beta")).toBeTruthy();
    });
    it("gets config matching dotenv/prod.env", () => {
        expect(isConfigCorrect("prod")).toBeTruthy();
    });
    it("throws error", () => {
        expect(() => { isConfigCorrect("other"); }).toThrow();
    });
});
