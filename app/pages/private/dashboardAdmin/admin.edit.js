export function EditFligth(){
    const $content = /*html*/`
    <form id="form">
    <input type="number" placeholder="ingrese el numero de vuelo" id="flight-number" disabled>
    <input type="text" placeholder="ingrese el origen" id="origin" disabled>
    <input type="text" placeholder="ingrese el destino" id="destination" disabled>
    <label for="">fecha y hora de salida</label>
    <input type="datetime-local"  id="departure">
    <label for="">fecha y hora de llegada</label>
    <input type="datetime-local" id="arrival">
    <input type="number" placeholder="ingrese la capacidad" id="capacity">
    <button id="update">update</button>
</form>
    `
    const logic = async () =>{
        const searchParams = window.location.search;
        const paramsTransformed = new URLSearchParams(searchParams);
        const idFligth = paramsTransformed.get('idFligth');

        // Fetch task data
        const fetchTaskId = await fetch(`http://localhost:3000/flights/${idFligth}`);
        const responseJson = await fetchTaskId.json();

        // Set values in the form
        const $flightNumber = document.getElementById('flight-number');
        const $origin = document.getElementById('origin');
        const $destination = document.getElementById('destination');
        const $departure = document.getElementById('departure');
        const $arrival = document.getElementById('arrival');
        const $capacity = document.getElementById('capacity');

        $flightNumber.value = responseJson.number;
        $origin.value = responseJson.origin;
        $destination.value = responseJson.destination;
        $departure.value = responseJson.departure;
        $arrival.value = responseJson.arrival;
        $capacity.value = responseJson.capacity;

        // Handle form submission
        const $form = document.getElementById('form');
        $form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const updatedFly = {
                number: $flightNumber.value,
                origin: $origin.value,
                destination: $destination.value,
                departure: $departure.value,
                arrival: $arrival.value,
                capacity: $capacity.value,
               
            };

            const response = await fetch(`http://localhost:3000/flights/${idFligth}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFly)
            });

            if (response.ok) {
                // Redirect or refresh the page after successful update
                alert('update succesful')
                window.location.href = '/tasks';
            } else {
                console.error('Failed to update task');
            }
        });
    };

    return {
        $content,
        logic
    };
}











