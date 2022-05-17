const app = require("./app/server");
const PORT = process.env.port || 4000;
app.listen(PORT, () => {
  console.log(`localHost:${PORT}`);
});
