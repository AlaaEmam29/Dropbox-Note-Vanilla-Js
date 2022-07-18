"use strict";
const addNoteBtn = document.querySelector(".btn-notes");
const ListOfNotes = JSON.parse(localStorage.getItem("notes"));

if (ListOfNotes) {
    ListOfNotes.forEach((note) => {
        createNoteContent(note)       
    });
}


function createNoteContent(text = "") {
    const row = document.querySelector(".row")
    const note = document.createElement("div");
    note.classList.add("col-md-6", "mb-3","col-lg-4");

    note.innerHTML = `
    <article  class="note  shadow">
    <header class="note-header p-2 d-flex justify-content-between align-content-center mb-0 text-dark">
        <h4 >
            Note
        </h4>
        <div class="note-icons">
            <i class="fas fa-trash-alt float-right px-3  delete"></i>
            <i class="fas fa-edit float-right  edit"></i>
        </div>
    </header>
   <div div class="main-note">
   <div class="note-content ${text ? "" : "hidden"}">
   <p>
${text? text : ''}
   </p>
   </div>
<textarea class="${text ? "hidden" : ""}"></textarea>


    </div>
    </article>
    `

    const editBtn = note.querySelector(".edit")
    const deleteBtn = note.querySelector(".delete")
    const noteContent = note.querySelector(".note-content")
    const content = note.querySelector(".note-content p")


    const textareaNote = note.querySelector("textarea")
    textareaNote.value = text;
    editBtn.addEventListener("click", () => {
        noteContent.classList.toggle("hidden");
        textareaNote.classList.toggle("hidden");
    });
    deleteBtn.addEventListener("click", () => {
        note.remove()
        getAllData()

    })
    textareaNote.addEventListener("input", (e) => {
        const { value } = e.target;
        content.innerHTML = value;
        getAllData()

    })
    row.appendChild(note)

}
addNoteBtn.addEventListener("click", function () {
    createNoteContent();
})

function getAllData() {
    const notes = document.querySelectorAll("textarea")
    const ListOfNotes = []
    notes.forEach(note=>{
        ListOfNotes.push(note.value)
    })
    localStorage.setItem("notes", JSON.stringify(ListOfNotes))
}