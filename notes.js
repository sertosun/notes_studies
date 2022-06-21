const noteContainer = document.getElementById("notes");
const addNoteBtn = noteContainer.querySelector(".add-note");
var idCount = 0;

addNoteBtn.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes") || "[]"); //json -> js
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes", JSON.stringify(notes)); // js -> json
}

getNotes().forEach((note) => {
  const noteElement = createNoteText(note.id, note.content);
  noteContainer.insertBefore(noteElement, addNoteBtn);
});

function addNote() {
  const notes = getNotes();

  idCount++;
  console.log(notes);
  const noteObject = {
    id: idCount,
    content: "",
  };

  const noteElement = createNoteText(noteObject.id, noteObject.content);
  noteContainer.insertBefore(noteElement, addNoteBtn);
  notes.push(noteObject);
  saveNotes(notes);
}

function createNoteText(id, content) {
  const textElement = document.createElement("textarea");
  textElement.classList.add("note");
  textElement.value = content;
  textElement.placeholder = "Write something";
  textElement.addEventListener("change", () => {
    updateNote(id, textElement.value);
  });

  textElement.addEventListener("dblclick", () => {
    const deleteNote = confirm("Diese Notiz wird unwiderruflich gelöscht");
    console.log(deleteNote);
    if (deleteNote) {
      deleteNoteMethod(id, textElement);
    }
  });
  return textElement;
}

function updateNote(id, userContent) {
  const notes = getNotes();
  console.log(notes);
  const targetNote = notes.filter((note) => note.id == id)[0];
  targetNote.content = userContent;
  console.log(targetNote);
  saveNotes(notes);
}
function deleteNoteMethod(id, element) {
  const notes = getNotes().filter((note) => note.id != id);
  saveNotes(notes);
  noteContainer.removeChild(element);
}
