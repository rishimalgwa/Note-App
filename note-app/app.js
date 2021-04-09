const notes = require("./notes.js");
const validator = require("validator");
const yargs = require("yargs");

yargs
  .command(
    "add",
    "add new note",
    {
      title: {
        type: "string",
        describe: "Note title",
      },
      body: {
        type: "string",
        describe: "body here",
      },
    },
    function (argv) {
      notes.addNote(argv.title, argv.body);
    }
  )
  .command("remove", "remove note",
  
  {
    title: {
      type: "string",
      describe: "Remove Note",
    },
  }, function (argv) {
    notes.removeNote(argv.title);
  })
  .command("read", "read note", 
  {
    title:{
      type:"string",
      describe:"Read notes",
    }
  }
  ,function (argv) {
    notes.readNote(argv.title);
  })
  .command("list", "list notes", function () {
    notes.listNotes();
  })
  .help().argv;
