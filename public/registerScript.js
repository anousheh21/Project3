const regForm = document.getElementById('registrationForm')
const errmsg = document.querySelector('.errmsg')
const loginUrl = 'http://localhost:5000/login.html';

regForm.addEventListener('submit', registerUser)

async function registerUser(event) {
    event.preventDefault()
    const email = document.getElementById('email').value
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const result = await fetch('/api/register', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            username,
            password
        })
    }).then((res) => res.json())

    if (result.status !== 200) {
        errmsg.textContent = result.error

    } else {
        window.location.assign(loginUrl)
    }
    
}