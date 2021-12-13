
class Notes {

    render() {
        let toReturn = `
            <div id="notes-page">
                <div id="notes-menu">
                    <span id="add-note" class="note-list-item" onclick="notes.addNote()">
                        <h2>+</h2>
                    </span>
                    <div id="notes-list">
                        
                    </div>
                </div>
                <div id="currently-displayed-note"></div>
            </div>
        `;
        return toReturn;
    }

    //skapa en ny note
    async addNote() {
        let newNote = {
            title: 'New Note',
            text: ''
        }
        await fetch('/rest/notes', {
            method: 'post',
            body: JSON.stringify(newNote)
        });
        console.log('note added');
        this.renderNotesList(); //update notes-list
    }

    //ta bort en note
    async deleteNote(idToDelete) {
        let noteToDelete = {
            note_id: idToDelete
        }
        await fetch('/rest/notes/' + idToDelete, {
            method: 'delete',
            body: JSON.stringify(noteToDelete)
        });
        this.renderNotesList(); //update notes-list
        console.log('note ' + idToDelete + ' deleted');
    }

    //rendera listan där man kan välja vilken note man vill se
    async renderNotesList() {
        let notesList = "";
        for (let note of await this.getNotesFromDB()) {
            notesList += `
                <span class="note-list-item">
                    <img class="notes-trashcan" src="img/trashcan.png" onclick="notes.deleteNote(${note.note_id})">
                    <div id="note-button-${note.note_id}" class="note-button"  onclick="notes.renderCurrentlyDisplayedNote(${note.note_id}); notes.markNoteListItemAsActive(${note.note_id})">
                        <h2>${note.title}</h2>
                    </div>
                </span>
            `;
        }
        document.querySelector('#notes-list').innerHTML = notesList;
    }

    //Styr färgen på list-items så man ser vilken note som är vald
    async markNoteListItemAsActive(id) {
        for (let note of await this.getNotesFromDB()) {
            if(note.note_id === id) {
                document.getElementById(`note-button-${note.note_id}`).style.backgroundColor = "rgba(68,140,93,0.5)";
            } else {
                document.getElementById(`note-button-${note.note_id}`).style.backgroundColor = "rgb(68,140,93)";
            }
        }
    }

    //rendera den valda anteckningen så den visas på höger sida
    async renderCurrentlyDisplayedNote(id) {
        let currentNoteElement = document.querySelector('#currently-displayed-note');
        for (let note of await this.getNotesFromDB()) {
            if(note.note_id === id) {
                currentNoteElement.innerHTML = `<p>${note.text}</p>`;
            }
        }

    }

    //fetcha alla anteckningar
    async getNotesFromDB() {
        let result = await fetch('/rest/notes');
        let notesFromDB = await result.json();
        return notesFromDB;
    }
}




