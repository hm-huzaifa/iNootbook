import React, { useContext } from "react";
import { useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
    props.showAlert("Note Added Successfully", "success");
  };

  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  return (
    <div className="container text-light ">
      <div className="d-flex justify-content-center">
        <h2>Add Notes</h2>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Add Title..."
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={3}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            rows={3}
            placeholder="Write some Description..."
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter a tag..."
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>

        <div id="button" className="rowForm">
          <button
            disabled={note.title.length < 3 || note.description.length < 5}
            type="submit"
            onClick={handleClick}
          >
            Add Note
          </button>
        </div>
      </form>

      <hr />
    </div>
  );
};

export default AddNote;
