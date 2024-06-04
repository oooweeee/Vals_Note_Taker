//this will get route for the notes
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// this will get route for retrieving all the notes
notes.get('/notes', (req, res) => {
  readFromFile('./Develop/db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// this will get a route for a specific note
notes.get('/:note_id', (req, res) => {
  const noteId = req.params.tip_id;
  readFromFile('./Develop/db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

// this will DELETE a route for a specific note
notes.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./Develop/db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // this is going to make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);

      // this is going to save that array to the filesystem
      writeToFile('./Develop/db/notes.json', result);

      // this will respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

// this is going to POST Route for a new note
notes.post('/notes', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './Develop/db/notes.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;