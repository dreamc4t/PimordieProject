class Notes {
  render() {
    let toReturn = `
            <div id="notes-page">
                <div id="notes-menu">
                    <div id="add-note" class="note-list-item" onclick="notes.addNote()">
                        <h2>+</h2>
                    </div>
                    <div id="notes-list">
                        
                    </div>
                </div>
                <div id="currently-displayed-note">
                    <textarea class="note-input-field" id="noteTitle" oninput="notes.autoGrowTextarea()"></textarea>
                    <textarea class="note-input-field" id="notes-input" oninput="notes.autoGrowTextarea()"></textarea>
                    
                    <div id='file-container'></div> 
                    <button id="toggle-files-button" onclick="toggleFiles()">Show/hide files of this note</button>

                    <div id="file-list"> Ladda upp fil
                      <form class="file-upload-form" onsubmit="addFile(event)">
                        <input type='file' placeholder='select image'>
                        <button type='submit'>Add file</button>
                      </form>
                    </div>

                    <button class="save-button" onclick="notes.updateNote()" note_id="id-that-will-change-depending">Save Note</button>
                </div>
                
            </div>
        `;
    return toReturn;
  }

  //skapa en ny note
  async addNote() {
    let newNote = {
      title: "New Note",
      text: "",
    };
    await fetch("/rest/notes", {
      method: "post",
      body: JSON.stringify(newNote),
    });
    console.log("note added");
    this.renderNotesList(); //update notes-list
  }

  //ta bort en note
  async deleteNote(idToDelete) {
    let noteToDelete = {
      note_id: idToDelete,
    };
    await fetch("/rest/notes/" + idToDelete, {
      method: "delete",
      body: JSON.stringify(noteToDelete),
    });
    this.renderNotesList(); //update notes-list
    console.log("note " + idToDelete + " deleted");
  }

  //rendera listan där man kan välja vilken note man vill se
  async renderNotesList() {
    let notesFromDB = await this.getNotesFromDB();
    this.sortByCreationDateDescending(notesFromDB);
    let notesListToRender = "<style> #notesId{ background-color: rgb(129, 155, 129);  } </style>";
    for (let note of notesFromDB) {
      notesListToRender += `
                <span class="note-list-item">
                    <img class="notes-trashcan" src="img/trashcan.png" onclick="notes.deleteNote(${note.note_id})">
                    <div id="note-button-${note.note_id}" class="note-button"  onclick="notes.renderCurrentlyDisplayedNote(${note.note_id}); notes.markNoteListItemAsActive(${note.note_id}); notes.assignNewIdToSaveButton(${note.note_id})">
                        <h2>${note.title}</h2>
                    </div>
                </span>
            `;
    }
    document.querySelector("#notes-list").innerHTML = notesListToRender;
  }

  //Sortera efter nyast skapad först
  sortByCreationDateDescending(notes) {
    notes.sort(function (a, b) {
      return b.created_datetime - a.created_datetime;
    });
  }

  //Styr färgen på list-items så man ser vilken note som är vald
  async markNoteListItemAsActive(id) {
    for (let note of await this.getNotesFromDB()) {
      if (note.note_id === id) {
        document.getElementById(
          `note-button-${note.note_id}`
        ).style.backgroundColor = "rgba(68,140,93,0.5)";
      } else {
        document.getElementById(
          `note-button-${note.note_id}`
        ).style.backgroundColor = "rgb(30,53,109)";
      }
    }
  }

  //rendera den valda anteckningen så den visas på höger sida
  async renderCurrentlyDisplayedNote(id) {
    let currentNoteElement = document.querySelector("#notes-input");
    let currentNoteTitle = document.querySelector("#noteTitle");
    for (let note of await this.getNotesFromDB()) {
      if (note.note_id === id) {
        console.log("rendering currently displayed note")
        currentNoteTitle.value = note.title;
        currentNoteElement.value = note.text;
      }
    }
  }

  //fetcha alla anteckningar
  async getNotesFromDB() {
    let result = await fetch("/rest/notes");
    let notesFromDB = await result.json();
    return notesFromDB;
  }

  async updateNote() {
    let textInput = document.querySelector("#notes-input").value;
    let titleinput = document.querySelector("#noteTitle").value;
    let currentNoteId = document.querySelector(".save-button").getAttribute("id");
    let textUpdate = {
      text: textInput,
      note_id: currentNoteId,
      title: titleinput,
    };

    await fetch(`/rest/notes/` + currentNoteId, {
      method: "PUT",
      body: JSON.stringify(textUpdate)
    });
    this.renderNotesList();
  }

  autoGrowTextarea() {
    let textarea = document.querySelector("#notes-input");
    textarea.style.height = "5px";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  assignNewIdToSaveButton(id) {
    let saveButton = document.querySelector(".save-button");
    saveButton.setAttribute("id", id);
  }
}
