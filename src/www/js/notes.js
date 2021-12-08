
class Notes {

    render() {
        let toReturn = "";
        toReturn += `
            <div id="notes-container">
                ${this.prepareNotesRender()}
            </div>
        `;
        return toReturn;
    }

    prepareNotesRender() {
        let notesRender = "";
        let notes = this.getNotesFromDB();
        for (let note of notes) {
            notesRender += `
                <div class="note">
                    <h2>Title: ${note.title}</h2>
                    <h3>Text: ${note.text}</h3>
                </div>
            `;
        }
        return notesRender;
    }

    getNotesFromDB() {
        // Create temporary mock notes while waiting for backend to get ready
        let mockNotes = [];
        for(let i = 1; i <= 20; i++) {
            mockNotes.push({
                title: `Note ${i}`,
                text: `this is note number ${i}`
            })
        }
        return mockNotes;

        /*
        let result = await fetch("/rest/notes", {
            method: "GET"
        });
        let notesFromDB = await result.json();
        return notesFromDB;
        */
    }

}

/* ADD NOTE */ 
/*async function addNote() {
    console.log("Adding new note!");
    let note = {
        title: "test-title-for-text-note",
        text: "text text text test test test"
    }

    let result = await fetch("/rest/notes", {
        method: "POST",
        body: JSON.stringify(note)
    });
}*/




