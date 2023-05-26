const btnView           = document.getElementById("btn-view");
const btnSaveNote       = document.getElementById("save-note");
const saveCards         = document.getElementById("Saved-cards");
const btnSearchFilter   = document.getElementById("Search-filter");
const dropZone          = document.getElementById("drop_zone");
const divNewContent     = document.getElementById("Container-new");
const divCardHead       = document.querySelector(".Saved-cards");

let id = 0;
let totalCards = 0;

(function savedNotes() {
    let article = "";
    fetch("http://127.0.0.1:5500/blocNotes/src/data/data.json")
        .then((response) => response.json())
        .then((data) => {
            totalCards = data.length;
            if (data.length === 0) {
                noFoundNotes();
            } else {
                data.forEach((element) => {
                    const id = element["id"];
                    const course_name = element["course_name"];
                    const operating_system = element["operating_system"];
                    const image = element["image"];
                    const categories = element["categories"];
                    article = `
                        <article class="Card" id="card${id}">
                            <div class="Card-background" style="background-color: ${(color = generarNuevoColor())}">
                                <div class="Card-system">
                                    <ul class="System-list">
                                        <li style="color: ${generarColorTexto(color)}; border: 1px ${generarColorTexto(
                        color
                    )} solid;">${operating_system}</li>
                                    </ul>
                                </div>
                                <img class="Card-icon" src="./public/img/icon-${image}.svg" alt="Networking">
                            </div>
                            <div class="Card-head">
                                <h3 class="Card-title">
                                    ${course_name}
                                </h3>
                                <div class="Card-areas">
                                    <ul class="Areas-list">
                                        <li title="Show"><i class="fa-regular fa-eye" id="btn-view" onclick="mostrarNota(${id})"></i></li>
                                        <li title="Edit"><i class="fa-regular fa-pen-to-square" id="btn-edit" onclick="editNota(${id})"></i></li>
                                        <li title="Print"><i class="fa-solid fa-print" id="btn-print" onclick="printNota(${id})"></i></li>
                                        <li title="Share"><i class="fa-solid fa-share-nodes" id="btn-share" onclick="shareNota(${id})"></i></li>
                                        <li title="Delete"><i class="fa-solid fa-trash" id="btn-delete" onclick="deleteNota(${id})"></i></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="Card-labels">
                                <ul class="Label-list">
                                    ${categories.map((element) => `<li>${element}</li>`).join("")}
                                </ul>
                            </div>
    
                        </article>
                    `;
                    saveCards.innerHTML += article;
                });
            }
        })
        .catch((error) => {
            console.error("Error al obtener los datos:", error);
        });
})();

function generarNuevoColor() {
    let simbolos, color;
    simbolos = "123456789ABCDEF";
    color = "#";

    for (let i = 0; i < 6; i++) {
        color += simbolos[Math.floor(Math.random() * simbolos.length)];
    }

    return color;
}

function generarColorTexto(colorFondo) {
    let colorTexto;

    // Evaluar el color de fondo
    let r = parseInt(colorFondo.substr(1, 2), 16);
    let g = parseInt(colorFondo.substr(3, 2), 16);
    let b = parseInt(colorFondo.substr(5, 2), 16);
    let luminosidad = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

    // Establecer el color de texto en función de la luminosidad del fondo
    if (luminosidad > 0.5) {
        colorTexto = "#000000"; // Texto negro para fondos oscuros
    } else {
        colorTexto = "#FFFFFF"; // Texto blanco para fondos claros
    }

    return colorTexto;
}

function mostrarNota(id) {
    console.info(id, "mostrarNota");
}

function editNota(id) {
    console.info(id, "editNota");
}

function printNota(id) {
    console.info(id, "printNota");
}

function shareNota(id) {
    console.info(id, "shareNota");
}

function deleteNota(id) {
    deleteCard(id);
    totalCards--;
    if (totalCards === 0) {
        noFoundNotes();
    }
}

function noFoundNotes() {
    article = `<p class="Saved-nofound">There are no saved data</p>`;
    saveCards.innerHTML += article;
    btnSearchFilter.setAttribute("disabled", true);
    btnSearchFilter.style.cursor = "not-allowed";
}

function deleteCard(id) {
    const cardElement = document.getElementById(`card${id}`);
    if (cardElement) {
        cardElement.remove();
    }
}

function uuidv4() {
    let id = Math.random().toString(36).substring(2, 8);
    return id;
}

function crearElementoTexto() {
    const divTypeText   = document.createElement("div");
    const divFormat     = document.createElement("div");
    const divTextarea   = document.createElement("div");
    const elementoTexto = document.createElement("textarea");
    const divButtons    = document.createElement("div");
    const btnEliminar   = document.createElement("button");
    const btnFormato    = document.createElement("button");
    const typeTextID    = uuidv4();
    const formatID      = uuidv4();
    const textareaID    = uuidv4();
    //TODO Añadimos la clase al elemento tipo text y lo añadimos al drop
    divTypeText.classList.add("Type-text");
    divTypeText.id = typeTextID;
    dropZone.appendChild(divTypeText);
    //TODO Añadimos a los demas elementos sus clases
    divFormat.classList.add("Div-format");
    divFormat.id = formatID;
    divFormat.innerHTML = `
        <div class="col">
            <div class="first box">
                <input id="font-size" type="number" value="16" min="1" max="100" onchange="f1(this)">
            </div>
            <div class="second box">
                <button class="Second-button" type="button" onclick="f2(this)">
                    <i class="fa-solid fa-bold"></i>
                </button>
                <button class="Second-button" type="button" onclick="f3(this)">
                    <i class="fa-solid fa-italic"></i>
                </button>
                <button class="Second-button" type="button" onclick="f4(this)">
                    <i class="fa-solid fa-underline"></i>
                </button>
            </div>
            <div class="third box">
                <button class="Second-button" type="button" onclick="f5(this)">
                    <i class="fa-solid fa-align-left"></i>
                </button>
                <button  class="Second-button" type="button" onclick="f6(this)">
                    <i class="fa-solid fa-align-center"></i>
                </button>
                <button class="Second-button" type="button" onclick="f7(this)">
                    <i class="fa-solid fa-align-right"></i>
                </button>
            </div>
            <div class="fourth box">
                <button class="Second-button" type="button" onclick="f8(this)">aA</button>
                <button class="Second-button" type="button" onclick="f9()">
                    <i class="fa-solid fa-text-slash"></i>
                </button>
                <input type="color" onchange="f10(this)">
            </div>
        </div>
    `;
    divTextarea.classList.add("Div-textarea");
    divButtons.classList.add("Div-buttons");
    //TODO Añadimos los div para crear el text area al elemento de tipo texto
    divTypeText.appendChild(divFormat);
    divTypeText.appendChild(divTextarea);
    //TODO Atributos al textarea
    elementoTexto.placeholder = "Editar texto";
    elementoTexto.contentEditable = true;
    elementoTexto.classList.add("Content-textarea");
    elementoTexto.id = textareaID;
    elementoTexto.focus();
    //TODO Agsinamos eventos al elemento de tipo text
    eventosTypeText(elementoTexto, formatID);
    //TODO Botones para interactuar con el elemento de tipo texto
    btnEliminar.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    btnEliminar.title = "Delete";
    btnEliminar.addEventListener("click", function () {
        eliminarElementoTexto(formatID, typeTextID);
    });
    btnFormato.innerHTML = `<i class="fa-solid fa-spell-check"></i>`;
    btnFormato.title = "Format";
    btnFormato.addEventListener("click", function () {
        showdivFormato(formatID, textareaID);
    });
    //TODO Agregamos los botones div de botones
    divButtons.appendChild(btnFormato);
    divButtons.appendChild(btnEliminar);
    //TODO Añadimos el elemento texto y los botones al div de typo text
    divTextarea.appendChild(elementoTexto);
    divTextarea.appendChild(divButtons);
}

function eventosTypeText(elementoTexto, formatID) {
    elementoTexto.addEventListener("input", function () {
        ajustarAlturaTexto(elementoTexto);
    });
    elementoTexto.setSelectionRange(elementoTexto.value.length, elementoTexto.value.length);
    elementoTexto.addEventListener("paste", function () {
        setTimeout(function () {
            const contenido = elementoTexto.value;
            if (contenido.endsWith("\n")) {
                elementoTexto.value = contenido.slice(0, -1);
                ajustarAlturaTexto(elementoTexto);
            }
        }, 0);
    });
    elementoTexto.onblur = function () {
        const displayFormat = document.getElementById(formatID);
        displayFormat.classList.add("isNoFocus");
    };
    elementoTexto.onfocus = function () {
        const displayFormat = document.getElementById(formatID);
        displayFormat.classList.remove("isNoFocus");
    };
}

function showdivFormato(formatID, textareaID) {
    const displayFormat = document.getElementById(formatID);
    const editTextarea = document.getElementById(textareaID);
    displayFormat.classList.toggle("isVisible");
    displayFormat.classList.remove("isNoFocus");
    editTextarea.classList.toggle("isFormat");
    ajustarAlturaTexto(editTextarea);
    editTextarea.focus();
}

function eliminarElementoTexto(formatID, typeTextID) {
    const editTextarea = document.getElementById(typeTextID);
    const displayFormat = document.getElementById(formatID);
    editTextarea.remove();
    displayFormat.remove();
}

function ajustarAlturaTexto(elementoTexto) {
    elementoTexto.style.height = "auto";
    let alturaDeseada = elementoTexto.scrollHeight + 2;
    elementoTexto.style.height = alturaDeseada + "px";
}

divCardHead.addEventListener("mouseover", () => {
    divNewContent.classList.add("isZindex");
});

divCardHead.addEventListener("mouseleave", () => {
    divNewContent.classList.remove("isZindex");
});