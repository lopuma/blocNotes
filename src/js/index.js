const btnView           = document.getElementById("btn-view");
const btnSaveNote       = document.getElementById("save-note");
const saveCards         = document.getElementById("Saved-cards");
const btnSearchFilter   = document.getElementById("Search-filter");
const dropZone          = document.getElementById("drop_zone");
const divNewContent     = document.getElementById("Container-new");
const divCardHead       = document.querySelector(".Saved-cards");
const formNewNote       = document.getElementById("New-note");
const newOption         = document.querySelector(".New-options");

let decreasePercentage = 10;
let resto = 110;
let id = 0;
let totalCards = 0;
let longWidthTextArea = 0;

formNewNote.addEventListener("submit", (e) => {
	e.preventDefault();
});

(function savedNotes() {
	let article = "";
	fetch("/notes")
		.then((response) => response.json())
		.then((data) => {
			const notes = data.notes;
			totalCards = notes.length;
			if (notes.length === 0) {
				noFoundNotes();
			} else {
				notes.forEach((element) => {
					const id = element["id"];
					const course_name = element["course_name"];
					const operating_system = element["operating_system"];
					const image = element["image"];
					const categories = element["categories"];
					article = `
                        <article class="Card" id="card${id}">
                            <div class="Card-background" style="background-color: ${(color = generarNuevoColor())}">
                                <div class="Card-content">
                                    <div class="Card-system">
                                        <span class="System-text" style="color: ${generarColorTexto(
																					color
																				)}; border: 1px ${generarColorTexto(color)} solid;">${operating_system}</span>
                                    </div>
                                    <div class="Card-icon">
                                        <img src="/image/icon-${image}.svg" alt="${operating_system}">
                                    </div>
                                </div>
                            </div>
                            <a href="https://commons.wikimedia.org/wiki/File:.NET_Core_Logo.svg">Jason Groce</a>, Public domain, via Wikimedia Commons
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
	let r = parseInt(colorFondo.substr(1, 2), 16);
	let g = parseInt(colorFondo.substr(3, 2), 16);
	let b = parseInt(colorFondo.substr(5, 2), 16);
	let luminosidad = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
	if (luminosidad > 0.5) {
		colorTexto = "#000000";
	} else {
		colorTexto = "#FFFFFF";
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

function moveUp(idDiv, idFormat, idTextArea) {
	const dropZone = document.getElementById("drop_zone");
	const items = dropZone.getElementsByClassName("Type-text");
	const itemsTextarea = document.querySelector(".Type-text");
	const textarea = document.getElementById(idDiv);
	console.log("UP", items.length);
	itemsTextarea.classList.remove("isSelected");
	textarea.classList.add("isSelected");
	for (let i = 0; i < items.length; i++) {
		if (items[i].classList.contains("isSelected")) {
			if (i > 0) {
				dropZone.insertBefore(items[i], items[i - 1]);
			}
			break;
		}
	}
}

function moveDown(idDiv, idFormat, idTextArea) {
	const dropZone = document.getElementById("drop_zone");
	const items = dropZone.getElementsByClassName("Type-text");
	const textarea = document.getElementById(idDiv);
	const itemsTextarea = document.querySelector(".Type-text");
	console.log("DOWN", items.length);
	itemsTextarea.classList.remove("isSelected");
	textarea.classList.add("isSelected");
	for (var i = items.length - 1; i >= 0; i--) {
		if (items[i].classList.contains("isSelected")) {
			if (i < items.length - 1) {
				dropZone.insertBefore(items[i + 1], items[i]);
			}
			break;
		}
	}
}

function crearElementoTexto() {
	const divTypeText = document.createElement("div");
	const divFormat = document.createElement("div");
	const divTextarea = document.createElement("div");
	const divResize = document.createElement("div");
	const buttonResizeRight = document.createElement("button");
	const buttonResizeLeft = document.createElement("button");
	const buttonUp = document.createElement("button");
	const buttonDown = document.createElement("button");
	const elementoTexto = document.createElement("textarea");
	const divButtons = document.createElement("div");
	const btnEliminar = document.createElement("button");
	const btnFormato = document.createElement("button");
	const typeTextID = uuidv4();
	const formatID = uuidv4();
	const resizeRightID = uuidv4();
	const resizeLeftID = uuidv4();
	const textareaID = uuidv4();
	const divResizeID = uuidv4();
	//TODO Añadimos la clase al elemento tipo text y lo añadimos al drop
	divTypeText.classList.add("Type-text");
	divTypeText.draggable = true;
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

	//TODO Añadimos botón de resize
    divResize.id = divResizeID;
	divResize.appendChild(buttonResizeRight);
	divResize.appendChild(buttonResizeLeft);
	divResize.appendChild(buttonUp);
	divResize.appendChild(buttonDown);
	divResize.classList.add("Div-resize");
    buttonDown.id = "move-button";
	buttonResizeRight.id = resizeRightID;
	buttonResizeLeft.id = resizeLeftID;
	buttonResizeRight.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;
	buttonResizeLeft.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
	buttonUp.innerHTML = `<i class="fa-solid fa-arrow-up"></i>`;
    buttonDown.innerHTML = `<i class="fa-solid fa-arrow-down"></i>`;
	// buttonDown.innerHTML = `<svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-4"><path d="M9.01 5.815v.01m0 6.99v.01m0 6.99v.01m0-13.01a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM15.344 5.815v.01m0 6.99v.01m0 6.99v.01m0-13.01a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
	longWidthTextArea = elementoTexto.clientWidth;
	buttonResizeRight.addEventListener("click", () => {
		resizeTextareaRight(resizeRightID, formatID, textareaID, longWidthTextArea);
	});
	buttonResizeLeft.addEventListener("click", () => {
		resizeTextareaLeft(resizeLeftID, formatID, textareaID);
	});
	buttonUp.addEventListener("click", () => {
		moveUp(typeTextID, formatID, textareaID);
	});
	buttonDown.addEventListener("click", () => {
		moveDown(typeTextID, formatID, textareaID);
	});

	//TODO Añadimos el elemento texto y los botones al div de typo text
	divTextarea.appendChild(divResize);
	divTextarea.appendChild(elementoTexto);
	divTextarea.appendChild(divButtons);

    //TODO Agsinamos eventos al elemento de tipo text
	eventosTypeText(elementoTexto, formatID, divResizeID);

}

function resizeTextareaRight(resizeID, formatID, textareaID) {
	const textarea = document.getElementById(textareaID);
	const format = document.getElementById(formatID);
	let widthPercentage = 91;
	if (widthPercentage >= 70) {
		widthPercentage -= decreasePercentage;
		const width = textarea.clientWidth - resto;
		textarea.style.maxWidth = width + "px";
		console.log({
			widthPercentage,
			width,
		});
	}
	const widthTextarea = textarea.clientWidth;
	const left = textarea.offsetLeft + 5;
	format.style.maxWidth = widthTextarea + "px";
	format.style.left = left + "px";
}

function resizeTextareaLeft(resizeID, formatID, textareaID) {
	const textarea = document.getElementById(textareaID);
	const format = document.getElementById(formatID);
	let widthPercentage = 70;
	if (widthPercentage < 91) {
		widthPercentage += decreasePercentage;
		const widthLeft = textarea.clientWidth + resto;
		textarea.style.maxWidth = widthLeft + "px";

		console.log({
			widthPercentage,
			widthLeft,
		});
	}
	const widthTextarea = textarea.clientWidth;
	const left = textarea.offsetLeft + 5;
	format.style.maxWidth = widthTextarea + "px";
	format.style.left = left + "px";
}

function resizeTextarea() {
	try {
        const textarea = document.querySelector(".Content-textarea");
        	const format = document.querySelector(".Div-format");
        	const left = textarea.offsetLeft + 5;
        	format.style.left = left + "px";
    } catch (error) { }
}

window.addEventListener("DOMContentLoaded", resizeTextarea);
window.addEventListener("resize", resizeTextarea);

function eventosTypeText(elementoTexto, formatID, divResizeID) {
    const resizeElement = document.getElementById(divResizeID);

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
    elementoTexto.addEventListener("mouseenter", function() {
        resizeElement.style.opacity = 1;
      });
      
    elementoTexto.addEventListener("mouseleave", function() {
        resizeElement.style.opacity = "";
    });

    elementoTexto.focus();
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

newOption.addEventListener("wheel", function (event) {
	event.preventDefault();
	newOption.scrollLeft += event.deltaY;
	if (newOption.scrollLeft < 0) {
		newOption.scrollLeft = 0;
	} else if (newOption.scrollLeft > newOption.scrollWidth - newOption.clientWidth) {
		newOption.scrollLeft = newOption.scrollWidth - newOption.clientWidth;
	}
});
