import { navigateTo } from "../../Router"

export function navBar ($content, logic){
    const $navBar = /*html*/`
        <nav>
            <ul>
                <li><a href="#/all-flights">All flights</a></li>
                <li><a href="#/home">Home</a></li>
                <li><a href="#/logout">Log out</a></li>

            </ul>
            
        </nav>
    `
    document.getElementById('root').innerHTML = /*html*/`
        ${$navBar}
        ${$content}
    `

    logic()
    const $logout = document.querySelector("[href ='#/logout']")
    const $allflights = document.querySelector("[href='#/all-flights']")
    const $home = document.querySelector("[href='#/home']");
    const getRol = localStorage.getItem("role_id")
    
    if($logout){
        $logout.addEventListener("click",(e) =>{
            e.preventDefault()
            localStorage.removeItem("token")
            localStorage.removeItem("role_id")
            navigateTo("/login")
        })
    }

    if($allflights){
        $allflights.addEventListener("click", (e) =>{
            e.preventDefault()
            navigateTo("/dashboard/allfligths")
        })
    }

    if($home){
        if(getRol === "1"){
            $home.addEventListener('click', (e) =>{
                e.preventDefault()
                navigateTo("/dashboard")
            })
            return
        }

        if(getRol === "2"){
            $home.addEventListener('click', (e) =>{
                e.preventDefault()
                navigateTo("/dashboard/admin")

            })
            return
        }
    }
}
