let elDestinazioniLastMin = document.querySelector("#elDestinazioniLastMin")

function recuperaDestinazioni(){
    const URLdestinazioni = "http://localhost:3000/destinazioni"

    fetch(URLdestinazioni)
        .then(data => { return data.json() })
        .then(response => {
            let destinazioni = response;
            console.log(destinazioni);

            destinazioni.forEach(destinazione => {
                if (destinazione.disponibilita) {
                    elDestinazioniLastMin.appendChild(creaCardDest(destinazione));

                }
            });
        })
}

window.addEventListener("DOMContentLoaded", recuperaDestinazioni);


/**
 * @param {Object} destinazione
 */


function creaCardDest(destinazione) {
    let card = document.createElement("div");
    card.setAttribute("class", "card col-3 p-2");

    let img = document.createElement("img");
    img.setAttribute("src", destinazione.locandina);
    img.setAttribute("class", "card-img-top")
    img.setAttribute("alt", destinazione.titolo)

    let divCardBody = document.createElement("div");
    divCardBody.setAttribute("class", "card-body");

    card.appendChild(img);
    card.appendChild(divCardBody);

    divCardBody.innerHTML +=  `<h4 class="card-title"> ${destinazione.titolo} </h4>`
    divCardBody.innerHTML += `<p class="card-text"> Prezzo Last Minute: ${destinazione.prezzo} € </p>`

    if (destinazione.disponibilita) {
        divCardBody.innerHTML += `<p class="card-text"> Periodo: ${destinazione.periodo} </p>`

        let buttonAcquista = document.createElement("button");
        buttonAcquista.setAttribute("class", "btn btn-primary mt-3");
        buttonAcquista.textContent = "Acquista"

        buttonAcquista.addEventListener("click", function () {
            localStorage.setItem(destinazione.id, destinazione.titolo + " - " + destinazione.periodo + " - " + destinazione.prezzo);

        })

        divCardBody.appendChild(buttonAcquista);
    }else{
        divCardBody.innerHTML += `<p class="card-text"> Periodo: Non disponibile </p>`
    }
    return card;

}