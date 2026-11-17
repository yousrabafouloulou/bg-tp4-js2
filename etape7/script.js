"use strict"; // slide 51

/**
 * ==========================================================================
 * TP 4 (Partie 2) - Etape 7 : 3 Nouvelles Fonctionnalités
 * 1. Téléchargement direct en fichier PDF (jsPDF)
 * 2. Mise à jour / Édition du Nom, Prénom et Points d'une personne (Update du CRUD)
 * 3. Tirage au sort aléatoire d'un gagnant avec animation (Math.random + BOM setTimeout)
 * ==========================================================================
 */

// Ici on déclare le tableau d'objets initial (slides 40 et 51)
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

let lignes = 0;             // Compteur du nombre de lignes insérées
let total_points = 0;       // Somme totale des points

/**
 * Fonction doInsertRowTable : Insère une ligne dans l'élément <table>
 */
function doInsertRowTable(num, nom, prenom, points) {

    // Sélection de la table avec querySelector (slide 76)
    const table = document.querySelector("#table_container table");

    // Création de l'élément tr (slide 104)
    const row = document.createElement("tr");
    row.setAttribute("class", "row"); // (slides 106 et 107)

    // Création des 5 cellules td (slide 104)
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // Modification du texte avec innerText (slides 90 et 91)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    // Création de la case à cocher
    const chkbox = document.createElement("input");
    chkbox.setAttribute("type", "checkbox");
    col5.appendChild(chkbox);

    // Attribution des classes CSS aux cellules
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // Ajout des colonnes à la ligne (slides 97 et 98)
    row.append(col1, col2, col3, col4, col5);

    // [FONCTIONNALITÉ 2 - Update] Double-clic sur la ligne pour modifier toutes les infos (Nom, Prénom, Points)
    row.setAttribute("title", "Double-cliquez pour modifier les informations de " + prenom + " " + nom);
    row.ondblclick = function() {
        modifierPersonne(row);
    };

    const tbody = table.querySelector("tbody") || table;
    tbody.appendChild(row);
}

/**
 * Fonction update_summary : Met à jour l'espace résumé
 */
function update_summary() {
    // Sélection par identifiant avec getElementById (slides 61 à 63)
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");

    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Total point(s)= " + total_points;
}

/**
 * Fonction doInsert : Gère l'insertion et les compteurs
 */
function doInsert(nom, prenom, points) {
    lignes++;
    const num = lignes;
    total_points += Number(points);
    doInsertRowTable(num, nom, prenom, points);
    update_summary();
}

/**
 * Fonction doNewData : Récupère les données du formulaire et vérifie la validité
 */
function doNewData() {
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    const nom = elt_nom.value.trim();
    const prenom = elt_prenom.value.trim();
    const points = parseInt(elt_points.value);

    // Structure if..else avec l'opérateur logique OU (||) (slides 41 et 42)
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        window.alert("Formulaire incomplet !"); // (slides 34 et 116)
    } else {
        doInsert(nom, prenom, points);
        persons.push({ nom: nom, prenom: prenom, points: points }); // (slides 38 et 40)

        // Réinitialisation des champs de saisie (slides 92 et 93)
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}

/**
 * Fonction deleteRow : Supprime les lignes sélectionnées
 */
function deleteRow() {
    // Étape 1 : Vérifier si le tableau est vide
    if (lignes === 0) {
        window.alert("Le tableau est déjà vide !");
        return;
    }

    // Étape 2 : Récupérer le tableau et la liste des cases cochées
    const table = document.querySelector("#table_container table");
    const checkedBoxes = document.querySelectorAll("#table_container tbody .col_chkbox input[type='checkbox']:checked");

    // Étape 3 : Vérifier si aucune case n'est cochée
    if (checkedBoxes.length === 0) {
        window.alert("Sélectionnez au moins une ligne !");
        return;
    }

    // Étape 4 : Confirmation avant suppression
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer la sélection ?");
    if (!confirmation) {
        return;
    }

    // Étape 5 & 6 : Parcourir les lignes et supprimer les sélectionnées
    const tbody = table.querySelector("tbody") || table;
    const rows = tbody.querySelectorAll("tr");

    for (const row of rows) {
        const chk = row.querySelector(".col_chkbox input[type='checkbox']");
        if (chk && chk.checked) {
            const cellPoints = row.cells[3];
            const pts = parseInt(cellPoints.innerText);
            total_points -= pts;
            lignes--;

            const nomLigne = row.cells[1].innerText;
            const prenomLigne = row.cells[2].innerText;

            for (let i = 0; i < persons.length; i++) {
                if (persons[i].nom === nomLigne && persons[i].prenom === prenomLigne) {
                    persons.splice(i, 1);
                    break;
                }
            }
            row.remove();
        }
    }

    // Réindexer les numéros N° des lignes restantes
    const remainingRows = tbody.querySelectorAll("tr");
    let nouveauNumero = 1;
    for (const r of remainingRows) {
        r.cells[0].innerText = nouveauNumero;
        nouveauNumero++;
    }

    // Étape 7 : Message de succès et résumé
    window.alert("Ligne(s) supprimée(s) avec succès !");
    update_summary();
}


/* ==========================================================================
   LES 3 NOUVELLES FONCTIONNALITÉS
   ========================================================================= */

/**
 * [FONCTIONNALITÉ 1] telechargerPDF : Génère et télécharge directement un fichier PDF
 * contenant toutes les données du tableau avec mise en forme professionnelle
 */
function telechargerPDF() {
    if (persons.length === 0) {
        window.alert("Le tableau est vide, aucun document PDF à générer !");
        return;
    }

    // Vérification de la disponibilité de la bibliothèque jsPDF
    if (window.jspdf && window.jspdf.jsPDF) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // 1. Préparation des données du tableau
        const entetes = [["N°", "Nom", "Prénom", "Points"]];
        const donnees = [];
        for (let i = 0; i < persons.length; i++) {
            donnees.push([i + 1, persons[i].nom, persons[i].prenom, persons[i].points]);
        }

        // 2. Génération automatique du tableau PDF avec style zébré
        if (doc.autoTable) {
            doc.autoTable({
                head: entetes,
                body: donnees,
                startY: 15,
                theme: 'striped',
                headStyles: { fillColor: [0, 120, 184], textColor: 255 },
                styles: { fontSize: 11, cellPadding: 4 }
            });

            // 3. Ajout du récapitulatif sous le tableau
            const finalY = doc.lastAutoTable.finalY + 10;
            doc.setFontSize(11);
            doc.setTextColor(40, 40, 40);
            doc.text("Total Lignes : " + lignes + "   |   Total Points : " + total_points, 14, finalY);
        }

        // 5. Déclenchement automatique du téléchargement du fichier PDF
        doc.save("tableau_personnes.pdf");
    } else {
        window.alert("Chargement de la bibliothèque PDF en cours. Vérifiez votre connexion Internet !");
    }
}


/**
 * [FONCTIONNALITÉ 2] updatePersonne & modifierPersonne : Modification complète (Update du CRUD)
 * Permet de modifier le Nom, le Prénom et les Points d'une personne
 */
function updatePersonne() {
    // Vérifier les lignes cochées
    const checkedBoxes = document.querySelectorAll("#table_container tbody .col_chkbox input[type='checkbox']:checked");

    if (checkedBoxes.length === 0) {
        window.alert("Sélectionnez la ligne que vous souhaitez modifier (ou double-cliquez directement sur la ligne) !");
        return;
    }
    if (checkedBoxes.length > 1) {
        window.alert("Veuillez sélectionner une seule ligne à la fois pour la modification !");
        return;
    }

    const chk = checkedBoxes[0];
    const row = chk.closest("tr");
    modifierPersonne(row);
}

function modifierPersonne(row) {
    const numLigne = parseInt(row.cells[0].innerText);
    const nomActuel = row.cells[1].innerText;
    const prenomActuel = row.cells[2].innerText;
    const ptsActuels = parseInt(row.cells[3].innerText);

    // 1. Saisie du nouveau Nom via prompt (slide 34)
    const reponseNom = window.prompt("Modifier le Nom :", nomActuel);
    if (reponseNom === null || reponseNom.trim() === "") {
        return; // Annulation si vide ou clic sur Annuler
    }

    // 2. Saisie du nouveau Prénom via prompt (slide 34)
    const reponsePrenom = window.prompt("Modifier le Prénom :", prenomActuel);
    if (reponsePrenom === null || reponsePrenom.trim() === "") {
        return; // Annulation si vide ou clic sur Annuler
    }

    // 3. Saisie des nouveaux Points via prompt (slide 34)
    const reponsePoints = window.prompt("Modifier les Points :", ptsActuels);
    if (reponsePoints === null || reponsePoints.trim() === "") {
        return; // Annulation si vide ou clic sur Annuler
    }

    const nouveauxPoints = parseInt(reponsePoints.trim());

    // Vérification de la validité du nombre (slides 37 et 42)
    if (Number.isNaN(nouveauxPoints) || nouveauxPoints < 0) {
        window.alert("Veuillez entrer un nombre de points valide et positif !");
        return;
    }

    const nouveauNom = reponseNom.trim();
    const nouveauPrenom = reponsePrenom.trim();

    // Mise à jour de total_points (différence arithmétique, slide 41)
    total_points = total_points - ptsActuels + nouveauxPoints;

    // Mise à jour de l'affichage dans les cellules du tableau (DOM, slides 90 et 91)
    row.cells[1].innerText = nouveauNom;
    row.cells[2].innerText = nouveauPrenom;
    row.cells[3].innerText = nouveauxPoints;

    // Mise à jour de l'objet correspondant dans le tableau persons (slides 38 et 40)
    const index = numLigne - 1;
    if (persons[index]) {
        persons[index].nom = nouveauNom;
        persons[index].prenom = nouveauPrenom;
        persons[index].points = nouveauxPoints;
    }

    // Mise à jour du titre d'aide au survol
    row.setAttribute("title", "Double-cliquez pour modifier les informations de " + nouveauPrenom + " " + nouveauNom);

    // Mise à jour de l'espace résumé
    update_summary();

    window.alert("Informations mises à jour avec succès :\n" + nouveauPrenom + " " + nouveauNom + " (" + nouveauxPoints + " pts)");
}


/**
 * [FONCTIONNALITÉ 3] tirerGagnant : Tirage au sort aléatoire d'un gagnant avec animation
 * Utilise Math.random(), manipulation de style DOM et le timing setTimeout du BOM
 */
function tirerGagnant() {
    if (persons.length === 0) {
        window.alert("Aucune personne dans le tableau pour effectuer un tirage au sort !");
        return;
    }

    // Tirage d'un index aléatoire (Math.random et Math.floor)
    const indexGagnant = Math.floor(Math.random() * persons.length);
    const gagnant = persons[indexGagnant];

    // Récupérer toutes les lignes du tableau
    const rows = document.querySelectorAll("#table_container tbody tr");

    // Retirer la surbrillance des tirages précédents
    for (const r of rows) {
        r.classList.remove("winner-row");
    }

    // Appliquer la surbrillance dorée sur la ligne du gagnant
    if (rows[indexGagnant]) {
        rows[indexGagnant].classList.add("winner-row");
    }

    // Effet de suspense avec setTimeout (BOM, slide 116)
    setTimeout(function() {
        window.alert("🎉 FÉLICITATIONS AU GAGNANT ! 🎉\n\nLa personne tirée au sort est :\n👉 " 
            + gagnant.prenom + " " + gagnant.nom + " avec " + gagnant.points + " points !");
    }, 350);
}


/**
 * Initialisation et affichage console
 */
function init() {
    for (const p of persons) {
        doInsert(p.nom, p.prenom, p.points);
    }
}

function consoleTableau() {
    console.log(persons); // (slide 33)
}

const ConsoleTableau = consoleTableau;

init();
