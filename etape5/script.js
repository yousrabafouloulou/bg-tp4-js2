"use strict"; // slide 51 du cours

const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

let lignes = 0;        // Compteur du nombre de lignes insérées
let total_points = 0;  // Somme totale des points

function doInsertRowTable(num, nom, prenom, points) {

    // Ici on sélectionne un élément HTML par son sélecteur CSS avec querySelector (slide 76)
    const table = document.querySelector("#table_container table");

    // Ici on crée un élément tr avec createElement (slide 104)
    const row = document.createElement("tr");

    // Ici on modifie l'attribut class avec la méthode setAttribute (slides 106 et 107)
    row.setAttribute("class", "row");

    // Ici on crée les 5 cellules td avec createElement (slide 104)
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // Ici on modifie le contenu textuel des cellules avec innerText (slides 90 et 91)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    // Ici on crée un élément input (checkbox) avec createElement (slide 104)
    const chkbox = document.createElement("input");
    // Ici on affecte l'attribut type="checkbox" avec setAttribute (slides 106 et 107)
    chkbox.setAttribute("type", "checkbox");
    // Ici on ajoute l'élément enfant checkbox dans la cellule col5 avec appendChild (slides 103 et 104)
    col5.appendChild(chkbox);

    // Ici on affecte les classes CSS correspondantes aux colonnes avec setAttribute (slides 106 et 107)
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    row.append(col1, col2, col3, col4, col5);

    // Ici on sélectionne le tbody du tableau ou la table (slide 76)
    const tbody = table.querySelector("tbody") || table;

    // Ici on insère la ligne row dans le tableau avec appendChild (slides 103 et 104)
    tbody.appendChild(row);
}

function update_summary() {
    // Ici on sélectionne un élément par son identifiant id avec getElementById (slides 61 à 63)
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");

    // Ici on modifie le contenu textuel avec innerText (slides 90 et 91)
    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Total point(s)= " + total_points;
}

function doInsert(nom, prenom, points) {
    lignes++;
    const num = lignes;

    total_points += Number(points);

    doInsertRowTable(num, nom, prenom, points);
    update_summary();
}

function doNewData() {
    // Ici on récupère l'élément HTML avec l'id form_nom grâce à getElementById (slides 61 à 63)
    const elt_nom = document.getElementById("form_nom");

    // Ici on récupère l'élément HTML avec l'id form_prenom grâce à getElementById (slides 61 à 63)
    const elt_prenom = document.getElementById("form_prenom");

    // Ici on récupère l'élément HTML avec l'id form_points grâce à getElementById (slides 61 à 63)
    const elt_points = document.getElementById("form_points");

    // Ici on accède à l'attribut value de elt_nom et on le stocke dans "nom" (slides 92 et 93)
    const nom = elt_nom.value.trim();

    // Ici on accède à l'attribut value de elt_prenom et on le stocke dans "prenom" (slides 92 et 93)
    const prenom = elt_prenom.value.trim();

    // Ici on accède à l'attribut value et on convertit en entier avec parseInt (slides 37 et 92)
    const points = parseInt(elt_points.value);

    // Ici on utilise une structure conditionnelle if..else avec l'opérateur OU (||) (slides 41 et 42)
    // Pour points, on utilise Number.isNaN(points) qui retourne true si l'entier est vide/invalide
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        // Ici on affiche un message d'alerte avec la méthode alert de window (slides 34 et 116)
        window.alert("Formulaire incomplet !");
    } else {
        
        doInsert(nom, prenom, points);

        // Ici on insère également les nouvelles données dans le tableau persons avec push
        persons.push({ nom: nom, prenom: prenom, points: points });

        // Ici on remet le contenu des champs à vide (attribut value) (slides 92 et 93)
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}

function init() {
    for (const p of persons) {
        doInsert(p.nom, p.prenom, p.points);
    }
}

function consoleTableau() {
    console.log(persons);
}

const ConsoleTableau = consoleTableau;

init();

