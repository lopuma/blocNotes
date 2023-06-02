const fs = require('fs')

const json_notes = fs.readFileSync('src/data/data.json', 'utf-8');
let notes = JSON.parse(json_notes);
const json_subCategorias = fs.readFileSync('src/data/subCategorias.json', 'utf-8');
let subCategorias = JSON.parse(json_subCategorias);
const json_system = fs.readFileSync('src/data/system.json', 'utf-8');
let system = JSON.parse(json_system);
const indexController = {
	indexget: async (req, res) => {
		res.status(200).render("home", {subCategorias, system});
	},
    notesget: async (req, res) => {
        res.status(200).send({
            notes
        });
    }
};

module.exports = indexController;
