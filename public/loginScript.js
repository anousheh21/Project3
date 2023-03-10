const loginForm = document.getElementById('loginForm')
const errmsg = document.querySelector('.errmsg')
const welcomeUrl = 'http://localhost:5000/userHome.html'

loginForm.addEventListener('submit', loginUser)

async function loginUser(event) {
    event.preventDefault()
    const email = document.getElementById('email').value 
    const password = document.getElementById('password').value 

    const result = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then((res) => res.json())
    
    if (result.status === 200) {
        console.log(`Token: ${result.data}`)
        localStorage.setItem('token', result.data)
        window.location.assign(welcomeUrl)
    } else {
        errmsg.textContent = result.error
    }
}

