export function CreateFligth(){
    const $content = /*html*/`
    <form id="form">
        <input type="number" placeholder="ingrese el numero de vuelo" id="flight-number">
        <input type="text" placeholder="ingrese el origen" id="origin">
        <input type="text" placeholder="ingrese el destino" id="destination">
        <label for="">fecha y hora de salida</label>
        <input type="datetime-local"  id="departure">
        <label for="">fecha y hora de llegada</label>
        <input type="datetime-local" id="arrival">
        <input type="number" placeholder="ingrese la capacidad" id="capacity">
        <button id="create-flight">Crear Vuelo</button>
    </form>
        
    `

    const logic = async () =>{

        const $form = document.getElementById("form")
        const $flightNumber = document.getElementById("flight-number")
        const $flightDestination = document.getElementById("destination")
        const $flightOrigin = document.getElementById("origin")
        const $departureDate = document.getElementById("departure")
        const $arrivalTime = document.getElementById("arrival")
        const $capacity = document.getElementById("capacity")


        $form.addEventListener('submit',async(e) =>{
            e.preventDefault()

            const number = $flightNumber.value
            const destination = $flightDestination.value
            const origin = $flightOrigin.value
            const departure = $departureDate.value
            const arrival = $arrivalTime.value
            const capacity = $capacity.value
            

            const newFlight = {
                number,
                origin,
                destination,
                departure,
                arrival,
                capacity

            }

            try{
                const response = await fetch('http://localhost:3000/flights',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                    ,body: JSON.stringify(newFlight)
                })

                if(response.ok){
                    alert("fligth created")
                    window.location.reload()
                }

            }
            catch(error){
                console.log(error)
            }
            
        })
        
    }

    return{
        $content,
        logic
    }

}