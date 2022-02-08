const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres://postgres:donut@localhost:5432/vesta");
sequelize.beforeConnect(async c => {
  console.log("beforeConnect");
});

sequelize.afterConnect(async c => { console.log("afterConnect"); });

async function run() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log("1", await sequelize.query("select 1 + 1 as result"));
    console.log("2", await sequelize.query("select 1 + 1 as result"));
    console.log("3", await sequelize.query("select 1 + 1 as result"));
  } catch (e) {
    console.error(e);
  }
}

run().then(console.log, console.error);
