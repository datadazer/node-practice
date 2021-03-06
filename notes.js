const fs = require('fs');

const getNotes = function() {
  return 'Your notes...';
}

const addNote = function(title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => {
    return note.title === title;
  })

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes);
    console.log('New note added.')
  } else {
    console.log('Failed to add: Note title is already taken.')
  }
}

const removeNote = (title) => {
  const notes = loadNotes();
  const updatedNotes = notes.filter((note) => {
    return note.title !== title;
  })

  try {
    saveNotes(updatedNotes);
  } catch (error) {
    console.log('Failed to remove note.');
  }
}

const loadNotes = function() {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

const saveNotes = function(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
};