let rowContainer = document.querySelector("#elDestinazioniLastMin")

function recuperaDestinazioni(){
    const URLdestinazioni = "http://localhost:3000/destinazioni"

    fetch(URLdestinazioni)
        .then(data => { return data.json() })
        .then(response => {
            let destinazioni = response;
            console.log(destinazioni);

            destinazioni.forEach(destinazione => {
                if (destinazione.disponibilita) {
                    let colonna = creaColonna(destinazione)
                    rowContainer.appendChild(colonna);

                }
            });
        })
}

window.addEventListener("DOMContentLoaded", recuperaDestinazioni);


/**
 * @param {Object} destinazione
 */


function creaCard(destinazione) {
    // Crea gli elementi della card
    const card = document.createElement('div');
    card.classList.add('card');

    const imgTop = document.createElement('img');
    imgTop.classList.add('card-img-top');
    imgTop.src = destinazione.locandina; 
    imgTop.alt = 'Immagine destinazione Last Minute';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = destinazione.titolo;

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    // cardText.textContent = 'Prezzo Last Minute: ' + destinazione.prezzo + " €";

    

    // Aggiungi gli elementi alla struttura della card
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    // cardBody.appendChild(button);
    card.appendChild(imgTop);
    card.appendChild(cardBody);


    if (destinazione.disponibilita) {
        cardBody.innerHTML += `<p class="card-text"> Periodo: ${destinazione.periodo} </p> <p> Prezzo Last Minute:  ${destinazione.prezzo} €`
        
        const button = document.createElement('button');
        button.classList.add('btn')
        button.classList.add('btn-primary')
        button.textContent = "Acquista"
        cardBody.appendChild(button)

        button.addEventListener("click", function(){
            localStorage.setItem(destinazione.id, destinazione.titolo + " - " + destinazione.periodo + " - " + destinazione.prezzo)
        })
         

        
    }else{
        cardBody.innerHTML += `<p class="card-text"> Periodo: Non disponibile </p>`
    }

    return card;
  }

    function creaColonna(destinazione){
    const colonna = document.createElement('div');
    colonna.classList.add('col-3');

    // Crea la card
    const card = creaCard(destinazione);

    // Aggiungi la card alla colonna
    colonna.appendChild(card);

    return colonna;

  }



    destinazioni.forEach(function(destinazione) {
    let colonna = creaColonna(destinazione);
    rowContainer.appendChild(colonna)
  })

