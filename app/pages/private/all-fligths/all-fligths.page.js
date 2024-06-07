import { navigateTo } from "../../../Router";

export function Allfligths() {
  const $content = /*html*/ `
        <h1>vuelos actuales</h1>
        <div id="fligths-container"></div>
        
    `;

  const logic = async () => {
    const getRole = localStorage.getItem("role_id");
    const $fligthsContainer = document.getElementById("fligths-container");
    console.log(getRole)

    try {
      const fetchFligths = await fetch("http://localhost:3000/flights");
      const flights = await fetchFligths.json();

      flights.forEach((fligth) => {
        let buttons = "";
        console.log(getRole);
        if (getRole === "2") {
           
          buttons = /*html*/ `
                        <button class="edit-button" data-id="${fligth.id}">Edit</button>
                        <button class="delete-button" data-id="${fligth.id}">Delete</button>
                        <button class="create">Create</button>

                    `;
        } else {
          buttons = /*html*/ `
                        <button class="reserve-button" data-id="${fligth.id}">reserve</button>
                    `;
        }
        $fligthsContainer.innerHTML += /*html*/ `

                    <div>
                        <h2>Flight origin: ${fligth.origin}</h2>
                        <p>Flight number: ${fligth.number}</p>
                        <p>Flight destination: ${fligth.destination}</p>
                        <p>Flight departure: ${fligth.departure}</p>
                        <p>Flight arrival: ${fligth.arrival}</p>
                        <p>Flight capacity: ${fligth.capacity}</p>
                        ${buttons}
                    </div>
             
                `;
      });

      const $editButtons = document.querySelectorAll(".edit-button");
      const $deleteButtons = document.querySelectorAll(".delete-button");
      const $reserveButtons = document.querySelectorAll(".reserve-button");
      const $createButton = document.querySelectorAll(".create");
     

    $reserveButtons.forEach((button) =>{
        button.addEventListener('click', async ()=>{
        const optionR = confirm("quieres hacer esta reserva")
        if(optionR){

            const id = button.getAttribute("data-id");
            const idUser  = await fetch(`http://localhost:3000/visits/${id}`)
            const res = await idUser.json()
            let now = new Date();
            alert( now)

            const booking = {
                fligthId: id,
                userId: res.id,
                bookingDate: now
            }
        
            
            const response = fetch(`http://localhost:3000/booking`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },body : JSON.stringify(booking)
            })
            if(response.ok){
                alert("Reserva realizada con exito")
                return
            }
            alert("Error al realizar la reserva")

        }
        
          
        })
    })

      $editButtons.forEach((button) => {
        button.addEventListener("click", async () => {
          const idFligth = button.getAttribute("data-id");
          navigateTo(`/dashboard/flights/edit?idFligth=${idFligth}`);
        });
      });

      $deleteButtons.forEach((button) => {
        button.addEventListener("click", async () => {
          let option = confirm("seguro quieres eliminar este producto");
          const idFligth = button.getAttribute("data-id");

          try {
            if (option) {
              await fetch(`http://localhost:3000/flights/${idFligth}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              location.reload();
              return;
            } else {
              alert("the action has been canceled");
            }
          } catch (error) {
            alert(error.message);
          }

        });

        $createButton.forEach((button)=>{
          button.addEventListener("click",async()=>{
            navigateTo('/dashboard/flights/create')
          })
        })

        
      });
    } catch (error) {
     
    }
  };

  return {
    $content,
    logic,
  };
}
