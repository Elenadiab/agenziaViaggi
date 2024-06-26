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

                

        });
};

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
    

    

    // Aggiungi gli elementi alla struttura della card
    cardBody.appendChild(cardTitle);
    card.appendChild(imgTop);
    card.appendChild(cardBody);


    if (destinazione.disponibilita) {
        cardBody.innerHTML += `<p class="card-text"> Periodo: ${destinazione.periodo} <br>Prezzo Last Minute:  ${destinazione.prezzo} €</p>`
        
        const button = document.createElement('button');
        button.classList.add('btn')
        button.classList.add('btn-primary')
        button.textContent = "Si parte !"
        cardBody.appendChild(button)

        button.addEventListener("click", function(){
            localStorage.setItem(destinazione.id, destinazione.titolo + " - " + destinazione.periodo + " - " + destinazione.prezzo + " - " + destinazione.locandina)
        })
         

        
    }else{
        cardBody.innerHTML += `<p class="card-text"> Periodo: Non disponibile </p>`
    }

    return card;
  }

    function creaColonna(destinazione){
    const colonna = document.createElement('div');
    colonna.classList.add('col-lg-3');


    // Crea la card
    const card = creaCard(destinazione);

    // Aggiungi la card alla colonna
    colonna.appendChild(card);

    return colonna;

  }



    

