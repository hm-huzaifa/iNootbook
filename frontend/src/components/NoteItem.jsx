import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { note, updateNote, showAlert } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <>
      {/* <div className="notes-wrapper col-md-3 text-dark">
        <div className="notes">
          <h4 className="notes-name">{note.title}</h4>
          <p className="notes-text">{note.description}</p>
          <div>
            <i
              className="fa-solid fa-pen-to-square  mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
            <i
              className="fa-solid fa-trash-can mx-2"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted Successfully", "success");
              }}
            ></i>
          </div>
        </div>
      </div> */}
      <div className="col-md-3 my-2">
        <div
          className="card text-bg-dark "
          style={{
            background: "linear-gradient(135deg, #0F2027 0%, #2C5364  100%)",
            boxShadow:
              "1rem 1rem 3rem rgba(0, 0, 0, 0.4), -1rem -1rem 3rem rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            style={{
              position: "absolute",
              justifyContent: "flex-end",
              display: "flex",
              right: "0",
            }}
          >
            <span className="badge rounded-pill text-bg-danger mx-1 my-1">
              {note.tag}
            </span>
          </div>

          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title mt-2">{note.title}</h5>
            </div>
            <p className="card-text">{note.description} </p>
            <i
              className="fa-solid fa-pen-to-square  mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
            <i
              className="fa-solid fa-trash-can mx-2"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Deleted Successfully", "success");
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
