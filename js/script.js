"use strict";

// FUNCTIONS

// DATE DU JOUR

const dateNow = moment();
dateNow.locale("fr");

const h1 = document.getElementById("h1");

let introP = `<p class="bg-primary text-center text-light py-3">Nous sommes le ${dateNow.format(
  "dddd D MMMM YYYY"
)}</p>`;
h1.insertAdjacentHTML("afterend", introP);

// FONCTION D'AJOUT DE VEILLES PAR CATEGORIES

let category = "toutes";
let sort = "";

function insertVeilles() {
  const listeVeilles = document.getElementById("liste-veilles");
// localise la <div> dans le HTML  
  const ulEl = document.createElement("ul");
  // crée la liste <ul>
  ulEl.classList.add("row", "list-unstyled");
  const filteredByCategory = entries.filter(el => {
    // filtre l'array des veilles par catégorie (?)
    if (category === "toutes") {
      return true;
    } else {
      return el.category.includes(category);
    }
  });
  console.log('filteredByCategory', filteredByCategory)
  for (let el of filteredByCategory) {
    // pour chaque élément filtré crée un <li> qui contiendra le sujet, la catégorie et la date
    const li = document.createElement("li");
    li.innerHTML = `<div class="card p-3 my-1">
        <h2>${el.subject}</h2>
        <div><p class="card d-inline p-1 bg-primary text-white">${
          el.category
        }</p></div>
        <p>${el.date}</p>
        </div>`;
        ulEl.append(li);
  }
  listeVeilles.innerHTML = "";
  // Ajoute en supprimant ce qui est déjà là
  listeVeilles.prepend(ulEl);
  // intègre <ul> dans le HTML
}

insertVeilles();

// TRI PAR CATEGORIES

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

sortByCategory()

// TRI PAR DATE/AZ/ZA

function insertVeillesSort() {
  if (sort === "za") {
    return insertVeilles(sortZtoASubjects(entries))
  } else if (sort === "az") {
    return insertVeilles(sortAtoZSubjects(entries))
  } else if (sort === "date") {
    return insertVeilles(sortByDate(entries))
  }
}

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
  console.log('selectElSort', selectElSort);
  selectElSort.addEventListener('change', () => {
    sort = selectElSort.value
    console.log('sort', sort)
    insertVeillesSort()
  })
}

createSort()

// FONCTIONS DE TRI

// Par dates (par défaut)

function sortByDate(list) {
  return list.sort((a, b) => (moment(a.date, "DD/MM/YYYY") > moment(b.date, "DD/MM/YYYY") ? 1 : -1));
}


// De A à Z

function sortAtoZSubjects(list) {
  return list.sort((a, b) => (a.subject > b.subject ? 1 : -1));
}

const sortAtoZsubjects = sortAtoZSubjects(entries);

console.log("sortAtoZsubjects", sortAtoZsubjects);

// De Z à A

function sortZtoASubjects(list) {
  return list.sort((a, b) => (a.subject > b.subject ? -1 : 1));
}

const sortZtoAsubjects = sortZtoASubjects(entries);

console.log("sortZtoAsubjects", sortZtoAsubjects);