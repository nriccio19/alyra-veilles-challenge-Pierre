"use strict"

// FUNCTIONS

// DATE DU JOUR

const dateNow = moment()
dateNow.locale("fr")

const h1 = document.getElementById("h1")

let introP = `<p class="bg-primary text-center text-light py-3">Nous sommes le ${dateNow.format("dddd D MMMM YYYY")}</p>`
h1.insertAdjacentHTML("afterend", introP)

// AJOUT DE TOUTES LES VEILLES + VEILLES PAR CATEGORIE

let category = "toutes"
// let za = "de Z à A"

function insertVeilles() {
    const listeVeilles = document.getElementById('liste-veilles')
    const ulEl = document.createElement('ul')
    ulEl.classList.add('row', 'list-unstyled')
    const filteredByCategory = entries.filter((el) => {
        if (category === "toutes") {
            return true
        } else {
            return el.category.includes(category)
        }
    })
    for (let el of filteredByCategory) {
        const li = document.createElement('li')
        // li.classList.add('')
        li.innerHTML = `<div class="card p-3 my-1">
        <h2>${el.subject}</h2>
        <div><p class="card d-inline p-1 bg-primary text-white">${el.category}</p></div>
        <p>${el.date}</p>
        </div>`
        ulEl.append(li)
    }
    listeVeilles.innerHTML = ""
    listeVeilles.prepend(ulEl)
}

insertVeilles()

// Veilles futur

// Tri de Z à A

function sortZtoA () {
    const selectElSort = document.getElementById('sort')
    const optionZa = document.createElement('option')
    optionZa.value = 'za'
    optionZa.textContent = 'de Z à A'
    selectElSort.append(optionZa)
    console.log(selectElSort)
    // élément select est localisé
    // élément option avec valeur za est créé et localisé
}
// selectElSort.addEventListener('change', () => {
// sort = selectElSort.value
// insertVeilles(//créer la callback qui met les veilles de Z à A ?)
// })

sortZtoA()

// Tri par catégories

function sortByCategory() {
const selectElCat = document.getElementById('category')
uniqueCategories.sort()
for (let el of uniqueCategories) {
    const optionCat = document.createElement('option')
    optionCat.textContent = el.toLowerCase()
    optionCat.value = el
    selectElCat.append(optionCat)
}
selectElCat.addEventListener('change', () => {
category = selectElCat.value
// C'est le choix fait par l'user dans le menu déroulant
insertVeilles()
})
}

sortByCategory()