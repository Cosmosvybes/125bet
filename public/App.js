

var users;
var outcome;
var showColor = false;
var gameDetails = { choice: '', betid: '', gemeType: '', user_balance: '' }
var color = [
    'red', 'blue', 'black', 'green', 'yellow'
]
var picked = document.getElementById('gametype');
var gameType = picked.options[picked.selectedIndex].value;

function players() {
    fetch(`http://localhost:1990/user/profile`)
        .then((data) => data.json())
        .then((res) => {
            gameDetails['user_balance'] = `${res['balance']}`
            username_.innerHTML = `${'Welcome, '} ${res['name']}`
            balance.innerHTML = `${'Balance - '} ${res['balance']}`
        })
}


var start = true
const pushStart = () => {
    return new Promise((resolve, reject) => {
        if (start) {
            resolve("ready to play");
        }
        else {
            reject("not playing game ")

        }

    })
}



var winning;

pushStart()
    .then(() => {
        setTimeout(() => {
            return (play_query.style.visibility = "visible", ready_.innerHTML = 'Ready to play game ? ')
        }, 1000)
    })
    .catch((rej) => { console.log(rej) })




yes.addEventListener('click', () => {
    showColor = !showColor;
    if (showColor) {
        colorShow.style.visibility = "visible";
        ready_.style.display = "none";
        stake_.style.display = "block"
        play_query.style.visibility = "hidden";
        colorsContainer.style.visibility = "visible"
    }

});

no.addEventListener('click', (e) => {
    e.preventDefault();
    play_query.style.visibility = "hidden"
    ready_.style.display = "none";
});





var availableColor = [red, blue, green, black, yellow]
for (let i = 0; i < availableColor.length; i++) {
    availableColor[i].onclick = () => {
        gameDetails['choice'] = availableColor[i].value;
    }
}


popper.addEventListener('click', async (e) => {
    e.preventDefault();
});





placebet_.addEventListener('click', async (e) => {
    e.preventDefault();

    if (!stakeValue.value) {
        alert('no value');
        return;
    }

    fetch("http://localhost:1990/placebet", {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({ gameType: gameType, colorChoice: gameDetails['choice'], stake: stakeValue.value })
    })
        .then((data) => data.json())
        .then((response) => {
            gametype_.innerHTML = gameType;
            stakeValue.value = ''
            console.log(response);
            balance.innerHTML = response['balance']
            // fetch(`http://localhost:1990/balance/update/${newBal}`, {
            //     method: 'POST',
            //     headers: { "Content-Type": "Application/json" },
            // }).then((response) => response.text())
            //     .then((response_) => console.log(response_))
        });
});




red.addEventListener('click', () => {
    userColor.style.backgroundColor = red.value;
    popper.disabled = false;
})
blue.addEventListener('click', () => {
    userColor.style.backgroundColor = blue.value;
    popper.disabled = false;
})
green.addEventListener('click', () => {
    userColor.style.backgroundColor = green.value;
    popper.disabled = false;
})
black.addEventListener('click', () => {
    userColor.style.backgroundColor = black.value;
    popper.disabled = false;
})
yellow.addEventListener('click', () => {
    userColor.style.backgroundColor = yellow.value;
    popper.disabled = false;
});

var switch_ = false;

