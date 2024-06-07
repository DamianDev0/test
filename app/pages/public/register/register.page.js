import { navigateTo } from "../../../Router"

export function RegisterPage(){
    const root = document.getElementById('root')

    root.innerHTML = /*html*/`
        <form id="registerForm">
        <input type="text" placeholder="Username" id="username" required> 
        <input type="email" placeholder="Email" id="email" required>
        <input type="date" placeholder="birthday date" id = "dateB">
        <input type="password" placeholder="Password" id="password" required>
        <input type="hidden" id="role_id" name="role_id" value="1">
        <button type="submit" id="btnRegister">Register</button>
</form>
        
    `
    const $fromCreateUser = document.getElementById('registerForm')
    console.log($fromCreateUser)
    $fromCreateUser.addEventListener('submit', async (e) =>{
        e.preventDefault()

        const $userInput = document.getElementById('username')
        const $emailInput = document.getElementById('email')
        const $dateInput = document.getElementById('dateB')
        const $passwordInput = document.getElementById('password')
        const $roleIdInput = document.getElementById('role_id')

        if(!$userInput.value || !$emailInput.value || !$dateInput.value || !$passwordInput.value){
            alert('Please fill all fields')
            return
        }

        try{
          const response = await fetch("http://localhost:3000/visits",{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: $userInput.value,
                email: $emailInput.value,
                birthday_date: $dateInput.value,
                password: $passwordInput.value,
                role_id: $roleIdInput.value
            })
          })

            if(!response.ok){
                throw new Error('error creating user')
            }

            alert('user created successfully')

            setTimeout(() => {
                navigateTo("/login")
            }, 1000);

        }
        catch(error){
            alert(error.message)
        }
    })
}