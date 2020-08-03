"use strict";

// Variables

const uniqueCategories = categories(entries);
let category = "toutes";
let sort = "";
let checkbox = document.getElementById("veilles-futur");
console.log("checkbox.checked ?", checkbox.checked);

// Date du jour

const dateNow = moment();
dateNow.locale("fr");

const h1 = document.getElementById("h1");

let introP = `<p class="bg-primary text-center text-light py-3 mb-3">Nous sommes le ${dateNow.format(
  "dddd D MMMM YYYY"
)} &#128526</p>`;
h1.insertAdjacentHTML("afterend", introP);

// FONCTIONS DE TRI

// Par dates

function sortByDate(list) {
  return list.sort((a, b) =>
    moment(a.date, "DD/MM/YYYY") > moment(b.date, "DD/MM/YYYY") ? 1 : -1
  );
}

// De A à Z

function sortAtoZSubjects(list) {
  return list.sort((a, b) => (a.subject > b.subject ? 1 : -1));
}

// De Z à A

function sortZtoASubjects(list) {
  return list.sort((a, b) => (a.subject > b.subject ? -1 : 1));
}

// Afficher uniquement les veilles à venir

function onlyUpcoming(list) {
  return list.filter(
    el => moment(el.date, "DD/MM/YYYY") > moment(dateNow, "DD/MM/YYYY")
  );
}

// Création de l'array avec les catégories uniques (sans doublons)

function categories(list) {
  // array avec toutes les catégories
  let listTotal = [];
  for (let el of list) {
    if ("category" in el) {
      listTotal = listTotal.concat(el.category);
    }
  }
  const uniqueCategories = [];
  listTotal.forEach(el => {
    if (!uniqueCategories.includes(el)) {
      uniqueCategories.push(el);
    }
  });
  return uniqueCategories;
}


// Création des options de tri par catégories

function sortByCategory() {
  const selectElCat = document.getElementById("category");
  // repère l'élément select dédié au choix de la catégorie
  uniqueCategories.sort();
  // trie les catégories uniques par ordre alpha (dans le menu déroulant)
  for (let el of uniqueCategories) {
    // pour chaque catégorie crée une <option>, un choix cliquable par l'user
    const optionCat = document.createElement("option");
    optionCat.textContent = el.toLowerCase();
    optionCat.value = el;
    selectElCat.append(optionCat);
    // insère les options au <select>
  }
  selectElCat.addEventListener("change", () => {
    category = selectElCat.value;
    // Lorsque l'user fait un choix d'une catégorie, donne à la variable category la catégorie correspondant à son choix dans entries
    insertVeilles();
    // insère les veilles
  });
}

sortByCategory();

// Ajout de l'évènement checkbox

function activateCheckbox() {
  checkbox.addEventListener("change", () => {
    insertVeilles();
  });
}

activateCheckbox();

// Tri A-Z, Z-A, date pour insertVeilles

function insertVeillesSort() {
  if (sort === "za") {
    return insertVeilles(sortZtoASubjects(entries));
  } else if (sort === "az") {
    return insertVeilles(sortAtoZSubjects(entries));
  } else if (sort === "date") {
    return insertVeilles(sortByDate(entries));
  }
}

// Création des options de tri A-Z et Z-A (date déjà dans le HTML)

function createSort() {
  const selectElSort = document.getElementById("sort");
  const optionAz = document.createElement("option");
  optionAz.value = "az";
  optionAz.textContent = "de A à Z";
  selectElSort.append(optionAz);
  const optionZa = document.createElement("option");
  optionZa.value = "za";
  optionZa.textContent = "de Z à A";
  selectElSort.append(optionZa);
  console.log("selectElSort", selectElSort);
  selectElSort.addEventListener("change", () => {
    sort = selectElSort.value;
    console.log("sort", sort);
    insertVeillesSort();
  });
}

createSort();

// Tri par catégories de l'élement select

function filterCategories(list) {
  return list.filter(el => {
    if (category === "toutes") {
      return true;
    } else {
      return el.category.includes(category);
    }
  });
}

// Insertion des veilles

function insertVeilles() {
  const listeVeilles = document.getElementById("liste-veilles");
  // localise la <div> qui contiendra les veilles dans le HTML
  const ulEl = document.createElement("ul");
  // crée la liste <ul>
  ulEl.classList.add("row", "list-unstyled");
  let filteredByCategory;
  // Si la checkbox est checkée, utilise l'array des veilles à venir
  if (checkbox.checked == true) {
    filteredByCategory = filterCategories(onlyUpcoming(entries));
  } else {
    filteredByCategory = filterCategories(entries);
  }
  console.log("filteredByCategory", filteredByCategory);
  for (let el of filteredByCategory) {
    // affiche le jour + la date pour chaque veille
    const fullDateFormat = moment(el.date, "DD/MM/YYYY", true);
    fullDateFormat.locale("fr");
    const fullDate = fullDateFormat.format("dddd DD/MM/YYYY");
    // pour chaque élément filtré crée un <li> qui contiendra le sujet, la catégorie et la date de la veille
    const li = document.createElement("li");
    li.innerHTML = `<div class="card p-3 my-1">
        <h2>${el.subject}</h2>
        <div><p class="btn btn-primary btn-sm text-light">${
          el.category
        }</p></div>
        <p>${fullDate}</p>
        </div>`;
    ulEl.append(li);
  }
  listeVeilles.innerHTML = "";
  // Ajoute en supprimant ce qui était là
  listeVeilles.prepend(ulEl);
  // intègre <ul> dans le HTML
}

insertVeilles();

//----------------------------------
