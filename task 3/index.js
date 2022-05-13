const users = require("./controler/users");
const yargs = require("yargs");
const heads = ["id", "name", "email", "status", "age", "createdAt"];
yargs.command({
  command: "addUser",
  discripe: "Add new user",
  builder: {
    id: {
      type: "number",
      default: Date.now(),
    },
    name: {
      type: "string",
      demandOption: true,
    },
    email: {
      type: "string",
      demandOption: true,
    },
    status: {
      type: "boolean",
      default: false,
    },
    age: {
      type: "number",
      demandOption: true,
    },
    createdAt: {
      type: "number",
      default: new Date(),
    },
  },
  handler(argv) {
    let task = {};
    heads.forEach((h) => {
      task[h] = argv[h];
    });
    users.adduser(task);
  },
});
yargs.command({
  command: "showAll",
  discripe: "show all user",
  handler() {
    console.log("show All User");
    users.allUser();
  },
});
yargs.command({
  command: "singleUser",
  discripe: "show single user",
  builder: {
    id: {
      type: "number",
      demandOption: true,
      descripe: "enter user ID",
    },
  },
  handler(argv) {
    console.log("show single User");
    users.singleUser(argv.id);
  },
});
yargs.command({
  command: "delUser",
  discripe: "delete single user",
  builder: {
    id: {
      type: "number",
      demandOption: true,
      descripe: "enter user ID",
    },
  },
  handler(argv) {
    console.log("delete User");
    users.delUser(argv.id);
  },
});
yargs.command({
  command: "editUser",
  discripe: "edit single user",
  builder: {
    id: {
      type: "number",
      demandOption: true,
      descripe: "enter user ID",
    },
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    status: {
      type: "boolean",
    },
    age: {
      type: "number",
    },
    createdAt: {
      type: "number",
      default: new Date(),
    },
  },
  handler(argv) {
    console.log("Edit single User");
    let task = {};
    heads.forEach((h) => {
      if (h !== "id") {
        task[h] = argv[h];
      }
    });
    users.editUser(argv.id, task);
  },
});
yargs.argv;
