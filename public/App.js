
var switchPopButton = false;
var users;
var outcome;
var showColor = false;
var gameDetails = { choice: '', gemeType: '', user_balance: '', stake: '' }
var color = [
    'red', 'blue', 'black', 'green', 'yellow'
]
var picked = document.getElementById('gametype');



(() => {
    fetch(`http://localhost:1990/player`)
        .then((data) => data.json())
        .then((res) => {
            gameDetails['user_balance'] = `${res['balance']}`
            username_.innerHTML = `${'Welcome, '} ${res['fullname']}`
            balance.innerHTML = `${'Balance - '} ${res['balance']}`
        })
}
)();


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
    var gameType = picked.options[picked.selectedIndex].value;
    if (switchPopButton) {
        await fetch("http://localhost:1990/popcolors", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': "Application/json" },
            body: JSON.stringify({ gameType: gameType, playerChoice: gameDetails['choice'], stake: stakeValue.value })
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data)
                setTimeout(() => {
                    cl_1.style.backgroundColor = data.game.resultingColors.color1
                }, 2000)
                setTimeout(() => {
                    cl_2.style.backgroundColor = data.game.resultingColors.color2
                }, 4000)
                setTimeout(() => {
                    cl_3.style.backgroundColor = data.game.resultingColors.color3
                }, 6000)
                setTimeout(() => {
                    cl_4.style.backgroundColor = data.game.resultingColors.color4
                }, 8000)
                setTimeout(() => {
                    cl_5.style.backgroundColor = data.game.resultingColors.color5
                }, 10000)

                setTimeout(() => {
                    if (data.game.status == "won ticket") {
                        status_.style.color = "green";
                        function updateBal() {
                            fetch(`http://localhost:1990/player`)
                                .then((data) => data.json())
                                .then(response => balance.innerHTML = `Balance ${response['balance']}`)
                        }
                        updateBal();
                    }
                    else { status_.style.color = "red" }
                    status_.innerHTML = data.game.status
                }, 12000)

            })
        switchPopButton = false;
    }

    stakeValue.value = ''

});




placebet_.addEventListener('click', async (e) => {
    e.preventDefault();
    var gameType = picked.options[picked.selectedIndex].value;

    if (!stakeValue.value) {
        alert('no value');
        return;
    }

    else {
        fetch("http://localhost:1990/placebet", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ gameType: gameType, colorChoice: gameDetails['choice'], stake: stakeValue.value })
        })
            .then((data) => data.json())
            .then((response) => {
                gametype_.innerHTML = gameType;
                gametype_.style.color = "green"
                console.log(response);
                balance.innerHTML = `Balance - ${response['balance']}`;
            });
        switchPopButton = true;

    }
});





red.addEventListener('click', () => {
    userColor.style.backgroundColor = red.value;

})
blue.addEventListener('click', () => {
    userColor.style.backgroundColor = blue.value;

})
green.addEventListener('click', () => {
    userColor.style.backgroundColor = green.value;

})
black.addEventListener('click', () => {
    userColor.style.backgroundColor = black.value;

})
yellow.addEventListener('click', () => {
    userColor.style.backgroundColor = yellow.value;

});

var switch_ = false;


