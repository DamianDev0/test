export function Dashboard(){
    const $content = /*html*/`
    <div id="container-reservas">
        <h2>hola visitante</h2>
        <h3>tus reservas</h3>
    `
    const logic  = async () =>{

        const $containerReservas = document.getElementById("container-reservas")
        const fetchBooking = await fetch('http://localhost:3000/booking')
        const booking = await fetchBooking.json()

        booking.forEach(booking =>{
            $containerReservas.innerHTML += /*html*/`
                <div>
                    <h4> ${booking.fligthId} </h4>
                    <p> ${booking.bookingDate} </p>
                </div>
            `
        })
    }

    return{
        $content,
        logic
    }
}