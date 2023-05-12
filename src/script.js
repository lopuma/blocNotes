const noteForm = document.getElementById('note-form');
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');
const noteType = document.getElementById('note-type');
const noteContainer = document.getElementById('note-container');
const savedNotesContainer = document.getElementById('saved-notes-container');
const saveNoteBtn = document.getElementById('save-note');
const notesContainer = document.getElementById('notes-container');


// Función para crear un nuevo elemento de nota y agregarlo al contenedor de arrastrar y soltar
function createNoteElement(title, content, type) {
  // Crear el elemento de nota
  const noteElement = document.createElement('div');
  noteElement.classList.add('note');
  noteElement.setAttribute('draggable', true);

  // Crear el contenido de la nota
  const noteHeader = document.createElement('div');
  noteHeader.classList.add('note-header');
  const noteTitleElement = document.createElement('h3');
  noteTitleElement.innerText = title;
  noteHeader.appendChild(noteTitleElement);
  noteElement.appendChild(noteHeader);
  const noteContentElement = document.createElement('p');
  noteContentElement.innerText = content;
  noteElement.appendChild(noteContentElement);
  savedNotesContainer.appendChild(noteContentElement);
  // Agregar la nota al contenedor de arrastrar y soltar
  noteContainer.appendChild(noteElement);
}

// Función para manejar el envío del formulario de nota
function handleFormSubmit(event) {
  event.preventDefault();
  // Obtener los valores del formulario de nota
  const title = noteTitle.value;
  const content = noteContent.value;
  const type = noteType.value;
  // Crear una nueva nota y agregarla al contenedor de arrastrar y soltar
  createNoteElement(title, content, type);
  // Resetear el formulario
  noteForm.reset();

  // Guardar la nota en el almacenamiento local
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const newNote = { title, content, type };
  notes.push(newNote);
  localStorage.setItem('notes', JSON.stringify(notes));
}

// // Función para cargar las notas guardadas en el almacenamiento local al iniciar la página
// function loadNotes() {
//   const notes = JSON.parse(localStorage.getItem('notes')) || [];
//   notes.forEach(note => {
//     createNoteElement(note.title, note.content, note.type);
//   });
// }

// Cargar las notas guardadas al iniciar la página
// #loadNotes();

  

// Función para mostrar las notas guardadas en el menú desplegable
function showSavedNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  savedNotesContainer.innerHTML = '';
  notes.forEach(note => {
    const savedNoteElement = document.createElement('div');
    savedNoteElement.classList.add('saved-note');
    savedNoteElement.innerText = note.title;
    savedNoteElement.addEventListener('click', () => {
      createNoteElement(note.title, note.content, note.type);
    });
    savedNotesContainer.appendChild(savedNoteElement);
  });
}

// Mostrar las notas guardadas al iniciar la página
showSavedNotes();


function saveNote() {
    const title = noteTitle.value;
    const content = noteContent.value;
    const type = noteType.value;
  
    // Guardar la nota en el almacenamiento local
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({ title, content, type });
    localStorage.setItem('notes', JSON.stringify(notes));
  
    // Crear la nota en el drag-and-drop
    // createNoteElement(title, content, type);
  
    // Limpiar los campos de entrada
    noteTitle.value = '';
    noteContent.value = '';
    noteType.value = 'text';
  }
  

saveNoteBtn.addEventListener('click', saveNote);

function loadNotes(notesContainer) {
    const notes = getNotes();
    if (notes && notes.length) {
      notes.forEach((note) => {
        const noteEl = createNoteElement(note);
        if (notesContainer) { // Verifica que notesContainer exista
          notesContainer.appendChild(noteEl);
        }
      });
    }
  }

// loadNotes(notesContainer);

function getNotes() {
const notes = JSON.parse(localStorage.getItem('notes'));
return notes || [];
}
  