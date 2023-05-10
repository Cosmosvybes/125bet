
login.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!fullname.value || !pass_.value) {
        alert('enter your login details');
        return;
    }
    else {
        var response = fetch('http://localhost:1990/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({ "fullname": fullname.value, "password": pass_.value }),

        })
        response.then((data) => {
            if (data.ok) {
                window.location.href = ('125.html')
            }
            else {
                window.location.href = ('login.html')
            }
        })
    }
    pass_.value = "";
    fullname.value = "";
})


