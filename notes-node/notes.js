// console.log('Startng notes.js ...');

const fs = require('fs');

var fetchNotes = () => {
  try{
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch(e){
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};


var addNote = (title, body) => {
  // console.log('Adding note', title, body);

  var notes = fetchNotes();
  var note = {
    title,
    body //ES6 syntax
  };
  var duplicateNote = notes.filter((note) => note.title === title);

  if(duplicateNote.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  // console.log('Getting all notes')
  return fetchNotes();
};

var getNote = (title) => {
  // console.log('Getting note', title);
  var notes = fetchNotes();
  var filteredNote = notes.filter((note) => note.title === title);
  return filteredNote[0];
};

var removeNote = (title) => {
  // console.log('Removing note', title);
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
  // debugger;
  console.log('------------');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote, //addnote = addNote if same name-- ES6 syntax
  getAll,
  getNote,
  removeNote,
  logNote
}
