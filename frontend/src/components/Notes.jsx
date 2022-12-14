import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const showAlert = props.showAlert;
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "General",
  });

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Updated Successfully", "success");
  };

  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      />
      <div
        className="modal fade text-light"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content text-bg-dark ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
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
                    rows={2}
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
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
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #485563 0%,#29323c  100%)",
                }}
              >
                {" "}
                <button
                  type="button"
                  className="btn btn-light text-light"
                  style={{
                    background:
                      "linear-gradient(135deg, #485563 0%,#29323c  100%)",
                  }}
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
              </div>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #485563 0%,#29323c  100%)",
                }}
              >
                <button
                  type="button"
                  className="btn btn-light text-light"
                  style={{
                    background:
                      "linear-gradient(135deg, #0575E6 0%,#021B79  100%)",
                  }}
                  onClick={handleClick}
                  disabled={
                    note.etitle.length < 3 || note.edescription.length < 5
                  }
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 row text-light">
        <div className="d-flex justify-content-center">
          <h2>Your Notes</h2>
        </div>
        <div className="container mt-2 mx-2">
          {notes.length === 0 && "No notes to display..."}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updateNote={updateNote}
              note={note}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
