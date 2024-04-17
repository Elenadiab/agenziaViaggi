let elListaRiep = document.querySelector("#listaRiep");
let grandTotal = document.querySelector("#grandTotal");

console.log(localStorage);

let destinazioneNelCarrello = [];

function recuperaDestinazioniScelte(){
    let totale = 0

    for (const key in localStorage) {
        
        if (Object.hasOwnProperty.call(localStorage, key)) {
            fetch("http://localhost:3000/destinazioni/" + key)
                .then(data => { return data.json() })
                .then(response => {
                    destinazioneNelCarrello.push(response);
                    
                    totale += Number(response.prezzo);
                    grandTotal.innerHTML += "Totale: " + totale + " €"
                });

            elListaRiep.innerHTML += `<li class='list-group-item'> ${localStorage[key]} € </li>`;    
               
        }
    }
}

window.addEventListener("DOMContentLoaded", recuperaDestinazioniScelte)