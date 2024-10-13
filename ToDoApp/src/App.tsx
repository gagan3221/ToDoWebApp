import "./App.css";
import NoteItem from "./components/NoteItem";
import { useState, ChangeEventHandler, useEffect } from "react";
import axios from "axios";

const App = () => {
  //const [title, setTitle] = useState("");
  //const [description, setDescription] = useState("");

  type noteType = {
    id: string;
    title: string;
    description?: string;
  };
  const [noteToView, setNoteToView] = useState<noteType>();
  const [notes, setNotes] = useState<noteType[]>([]);
  const [values, setValues] = useState({
    title: "",
    description: "",
  });
  const [selectedNoteId, setSelectedNoteId] = useState("");
  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };
  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await axios.get("http://localhost:8000/note");
      setNotes(data.notes);
    };
    fetchNotes();
  }, []);
  return (
    <div className="max-w-3xl shadow-lg mx-auto rounded">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (selectedNoteId) {
            const { data } = await axios.patch(
              "http://localhost:8000/note/" + selectedNoteId,
              {
                title: values.title,
                description: values.description,
              }
            );
            const updatedNotes = notes.map((note) => {
              if (note.id === selectedNoteId) {
                note.title = data.note.title;
                note.description = data.note.description;
              }
              return note;
            });
            setNotes([...updatedNotes]);
            setValues({ title: "", description: "" });
            return;
          }
          const { data } = await axios.post(
            "http://localhost:8000/note/create",
            {
              title: values.title,
              description: values.description,
            }
          );
          setNotes([data.note, ...notes]);
          setValues({ title: "", description: "" });
        }}
        className="space-y-6"
      >
        <h1 className="font-bold text-6xl text-amber-400 text-center">
          Note Application
        </h1>
        <div>
          {values.title.trim() && values.title.length < 3 ? (
            <p className="text-red-500 font-semibold">Title is too short</p>
          ) : null}
          <input
            type="text"
            className=" font-mono font-bold text-4xl  bg-amber-100  text-center w-full self-center "
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={values.title}
          />
        </div>
        <div className="w-full ">
          <textarea
            className="font-mono font-bold text-4xl text bg-amber-100 h-60 mb-20 text-center ml-44"
            placeholder="Description"
            value={values.description}
            name="description"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <button
            onClick={() => {
              console.log(values);
            }}
            className="text-center bg-amber-400 w-[90%] text-zinc-50 h-16 font-mono text-2xl rounded mx-8"
          >
            Submit
          </button>
        </div>
      </form>
      {/*Note Items*/}
      {notes.map((note) => {
        return (
          <NoteItem
            key={note.id}
            title={note.title}
            onEditClick={() => {
              setSelectedNoteId(note.id);
              setValues({
                title: note.title,
                description: note.description || "",
              });
            }}
            onDeleteClick={async () => {
              const result = confirm(
                "Are you sure , you want to delete this note?"
              );
              if (result) {
                //delete
                await axios.delete("http://localhost:8000/note/" + note.id);
                const updatedNotes = notes.filter(({ id }) => {
                  if (id !== note.id) {
                    return note;
                  }
                });
                setNotes([...updatedNotes]);
              }
            }}
            onViewClick={() => {
              if (noteToView) {
                setNoteToView(undefined)
              } else {
                setNoteToView(note);
              }
            }}
            description={
              noteToView?.id === note.id ? noteToView?.description : ""
            }
          />
        );
      })}
    </div>
  );
};

export default App;
