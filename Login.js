
login.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!fullname.value || !pass_.value) {
        alert('enter your login details');
        return;
    }
    else {
        fetch('http://localhost:1990/login', {
            method: 'POST',
            headers: {
                "Content-Type": "Application/json",
                "Access-Control-Allow-Origin": "http://localhost:1990/login"
            },
            body: JSON.stringify({ "fullname": fullname.value, "password": pass_.value }),
            credentials: 'include'
        }).then((data) => data.ok)
            .then((res) => {
                if (res) {
                    location.href = ('/125.html');
                }
                else {
                    locationbar.href = ('/login.html')
                }
            })

    }
    pass_.value = "";
    fullname.value = "";
});



