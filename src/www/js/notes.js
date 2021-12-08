
class Notes {

    render() {
        let notesRender = prepareNotesForRender();
        let renderToReturn =  `
            <div id="notes-container">
                ${notesRender}
            </div>
        `;
        return renderToReturn;
    }

    prepareNotesForRender() {
        let toReturn = "";
        let notes = this.getNotesFromDB();
        for (let note of notes) {
            toReturn += `
                <div class="note">
                    <h2>Title: ${note.title}</h2>
                    <h3>Text: ${note.text}</h3>
                </div>
            `;
        }
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




