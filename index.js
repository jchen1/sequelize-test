const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres://postgres:donut@localhost:5432/vesta");
sequelize.beforeConnect(async c => {
  console.log("beforeConnect");
});

sequelize.afterConnect(async c => { console.log("afterConnect"); });

const oldAcquire = sequelize.connectionManager.pool.acquire.bind(sequelize.connectionManager.pool);

sequelize.connectionManager.pool.acquire = (async (...args) => {
  const startTime = process.hrtime.bigint();
  const result = await oldAcquire(...args);
  console.log(`acquiring connection took ${process.hrtime.bigint() - startTime} microseconds`);
  return result;
});

async function run() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.query("select 1 + 1 as result");
    await sequelize.query("select 1 + 1 as result");
    await sequelize.query("select 1 + 1 as result");
  } catch (e) {
    console.error(e);
  }
}

run().then(console.log, console.error);
