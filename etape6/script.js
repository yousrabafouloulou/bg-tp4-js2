"use strict"; // slide 51

const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

let lignes = 0;             // Compteur du nombre de lignes insérées
let total_points = 0;       // Somme totale des points

function doInsertRowTable(num, nom, prenom, points) {

    // on sélectionne un élément HTML par son sélecteur CSS avec querySelector (slide 76)
    const table = document.querySelector("#table_container table");

    // on crée un élément tr avec createElement (slide 104)
    const row = document.createElement("tr");

    // on modifie l'attribut class avec la méthode setAttribute (slides 106 et 107)
    row.setAttribute("class", "row");

    // on crée les 5 cellules td avec createElement (slide 104)
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // on modifie le contenu textuel des cellules avec innerText (slides 90 et 91)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    // on crée un élément input (checkbox) avec createElement (slide 104)
    const chkbox = document.createElement("input");
    // on affecte l'attribut type="checkbox" avec setAttribute (slides 106 et 107)
    chkbox.setAttribute("type", "checkbox");
    // on ajoute l'élément enfant checkbox dans la cellule col5 avec appendChild (slides 103 et 104)
    col5.appendChild(chkbox);

    // on affecte les classes CSS correspondantes aux colonnes avec setAttribute (slides 106 et 107)
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    row.append(col1, col2, col3, col4, col5);

    // on sélectionne le tbody du tableau ou la table (slide 76)
    const tbody = table.querySelector("tbody") || table;

    // on insère la ligne row dans le tableau avec appendChild (slides 103 et 104)
    tbody.appendChild(row);
}

function update_summary() {
    // on sélectionne un élément par son identifiant id avec getElementById (slides 61 à 63)
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");

    // on modifie le contenu textuel avec innerText (slides 90 et 91)
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
    // on récupère l'élément HTML avec l'id form_nom grâce à getElementById (slides 61 à 63)
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    // on accède à l'attribut value de elt_nom et on le stocke dans "nom" (slides 92 et 93)
    const nom = elt_nom.value.trim();
    const prenom = elt_prenom.value.trim();

    // on accède à l'attribut value et on convertit en entier avec parseInt (slides 37 et 92)
    const points = parseInt(elt_points.value);

    // on utilise une structure conditionnelle if..else avec l'opérateur logique OU (||) (slides 41 et 42)
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        // on affiche un message d'alerte avec la méthode alert de window (slides 34 et 116)
        window.alert("Formulaire incomplet !");
    } else {
        // on appelle la fonction doInsert avec les nouvelles données récupérées (slide 45)
        doInsert(nom, prenom, points);

        // on insère également les nouvelles données dans le tableau persons avec push (slides 38 et 40)
        persons.push({ nom: nom, prenom: prenom, points: points });

        // on remet le contenu des champs à vide (attribut value) (slides 92 et 93)
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}

function deleteRow() {

    // Étape 1 : Vérifier si le tableau est vide
    // on teste si la variable lignes est égale à 0 avec if et === (slides 41 et 42)
    if (lignes === 0) {
        // on affiche une alerte avec alert de window (slides 34 et 116)
        window.alert("Le tableau est déjà vide !");
        return; 
    }

    // Étape 2 : Récupérer le tableau et la liste des checkbox cochées
    // on sélectionne le tableau avec querySelector (slide 76)
    const table = document.querySelector("#table_container table");

    // on sélectionne toutes les checkbox cochées avec querySelectorAll (slides 76 et 92)
    const checkedBoxes = document.querySelectorAll("#table_container tbody .col_chkbox input[type='checkbox']:checked");

    // Étape 3 : Vérifier si aucune checkbox n'est cochée
    // on vérifie la propriété length de la liste des cases cochées (slides 38 et 42)
    if (checkedBoxes.length === 0) {
        // on affiche une boîte de dialogue d'alerte avec window.alert (slides 34 et 116)
        window.alert("Sélectionnez au moins une ligne !");
        return; 
    }

    // Étape 4 : Demander une confirmation à l'utilisateur avant suppression
    // on demande confirmation avec la méthode confirm de window (slides 34 et 117)
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer la sélection ?");
    // Si l'utilisateur clique sur Annuler, on quitte la fonction
    if (!confirmation) {
        return;
    }

    // Étape 5 : Récupérer toutes les lignes du tableau
    // on sélectionne le corps du tableau tbody ou la table (slide 76)
    const tbody = table.querySelector("tbody") || table;
    // on récupère la liste de toutes les lignes tr avec querySelectorAll (slide 76)
    const rows = tbody.querySelectorAll("tr");

    // Étape 6 : Parcourir les lignes et supprimer les cochées
    for (const row of rows) {
        // on sélectionne la case à cocher de la ligne avec querySelector (slide 76)
        const chk = row.querySelector(".col_chkbox input[type='checkbox']");

        // on vérifie si la checkbox existe et si sa propriété checked est true (slides 42 et 92)
        if (chk && chk.checked) {
            // Récupérer la valeur des points dans la 4e cellule (index 3)
            const cellPoints = row.cells[3];
            const pts = parseInt(cellPoints.innerText);
            total_points -= pts;
            lignes--;

            // Récupérer le nom et prénom de la ligne (colonnes index 1 et 2)
            const nomLigne = row.cells[1].innerText;
            const prenomLigne = row.cells[2].innerText;

            // Supprimer aussi l'entrée correspondante dans le tableau persons avec splice (38 et 39)
            for (let i = 0; i < persons.length; i++) {
                if (persons[i].nom === nomLigne && persons[i].prenom === prenomLigne) {
                    persons.splice(i, 1);
                    break;
                }
            }

            // Supprimer l'élément ligne tr du DOM avec la méthode remove (100 et 101)
            row.remove();
        }
    }

    // Réindexer les numéros N° des lignes restantes dans la 1ère colonne
    const remainingRows = tbody.querySelectorAll("tr");
    let nouveauNumero = 1;
    for (const r of remainingRows) {
        // on met à jour le numéro affiché avec innerText (slides 90 et 91)
        r.cells[0].innerText = nouveauNumero;
        nouveauNumero++; 
    }

    // Étape 7 : Afficher un message de succès et mettre à jour le résumé 
    // on affiche un message de succès avec window.alert (slides 34 et 116)
    window.alert("Ligne(s) supprimée(s) avec succès !");

    update_summary();
}

function init() {
    for (const p of persons) {
        doInsert(p.nom, p.prenom, p.points);
    }
}

function consoleTableau() {
    // on affiche le contenu du tableau dans la console avec console.log (slide 33)
    console.log(persons);
}

const ConsoleTableau = consoleTableau;

init();
