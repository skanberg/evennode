const ftp = require("basic-ftp");
const fs = require("fs");
const { rm, cp } = require("shelljs");
const createLogger = require("progress-estimator");
const config = require("../ftp.json");

const upload = () =>
  new Promise(async (resolve, reject) => {
    const client = new ftp.Client();
    client.ftp.verbose = false;

    rm("-rf", "public/weather");
    cp("-R", "weather-client/build/", "public/weather");

    const uploadFile = async file =>
      client.upload(fs.createReadStream(file), file);

    try {
      await client.access(config);

      await uploadFile("package-lock.json");
      await uploadFile("package.json");

      await client.ensureDir("src");
      await client.uploadDir("src");

      await client.cd("/");
      await client.ensureDir("public");
      await client.uploadDir("public");

      resolve();
    } catch (err) {
      reject(err);
    } finally {
      client.close();
    }
  });

async function deploy() {
  const logger = createLogger();
  await logger(upload(), "Deploy");
}

deploy();
