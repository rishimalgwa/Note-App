const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note added!"));
  } else {
    console.log(chalk.red.inverse("Title already in use"));
  }
};
const saveNotes = (notes) => {
  const jsonString = JSON.stringify(notes);
  fs.writeFileSync("note.json", jsonString);
};
const loadNotes = () => {
  try {
    const bufferData = fs.readFileSync("note.json");
    const jsonData = bufferData.toString();
    return JSON.parse(jsonData);
  } catch (e) {
    return [];
  }
};
const removeNote = (title) => {
  const noteArray = loadNotes();
  const filterList = noteArray.filter((note) => note.title !== title);
  if (noteArray.length > filterList.length) {
    console.log(chalk.green.inverse("Note removed!"));
    saveNotes(filterList);
  } else {
    console.log(chalk.red.inverse("No Note removed"));
  }
};
const listNotes = () => {
  console.log(chalk.cyan.inverse("Note titles"));
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(note.title);
  });
};
const readNote = (title) => {
  const notes = loadNotes();
  const matchNote = notes.find((note) => {
    return note.title === title;
  });
  if (matchNote) {
    console.log(chalk.green.inverse("Note found"));
    console.log(title);
    console.log(matchNote.body);
  } else {
    console.log(chalk.red.inverse("No Note found"));
  }
};
module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
