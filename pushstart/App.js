var users;
var outcome;
var showColor = false;
var gameDetails = { choice: '', betid: '', gemeType: '' }
var color = [
    'red', 'blue', 'black', 'green', 'yellow'
]


function players() {
    fetch(`http://localhost:1200/users`)
        .then((data) => data.json())
        .then((res) => {
            users = res;
            console.log(res)
        })
}


var start = true
const pushStart = () => {
    return new Promise((resolve, reject) => {
        if (start) {
            resolve("player found");
        }
        else {
            reject("player not found ")

        }

    })
}



var winning;

pushStart(1)
    .then((data) => {
        setTimeout(() => {
            loading.innerHTML = "125.....";
        }, 1000);
        setTimeout(() => {
            return (play_query.style.visibility = "visible", ready_.innerHTML = 'Ready to play game ? ')
        }, 1000)

    })
    .catch((rej) => { console.log(rej) })
// .finally(() => { setTimeout(() => welcome.innerHTML = "Welcome 🤩 back ", 6000) });





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




function popColor(choice) {
    var randomNum1 = Math.floor(Math.random() * 05);
    var randomNum2 = Math.floor(Math.random() * 05);
    var randomNum3 = Math.floor(Math.random() * 05);
    var randomNum4 = Math.floor(Math.random() * 05);
    var randomNum5 = Math.floor(Math.random() * 05);
    var result = {
        color1: color[randomNum1],
        color2: color[randomNum2],
        color3: color[randomNum3],
        color4: color[randomNum4],
        color5: color[randomNum5],

    }
    return result;


}


var availableColor = [red, blue, green, black, yellow]
for (let i = 0; i < availableColor.length; i++) {
    availableColor[i].onclick = () => {
        gameDetails['choice'] = availableColor[i].value;
    }
}


popper.addEventListener('click', async (e) => {
    var picked = document.getElementById('gametype');
    var gameType = picked.options[picked.selectedIndex].value;

    e.preventDefault();

    fetch()
    const { color1, color2, color3, color4, color5 } = popColor(gameDetails.choice);
    const firstThree = [color1, color2, color3];
    const lastTwo = [color4, color5];


    setTimeout(() => {
        cl_1.style.backgroundColor = color1;
        cl_1.innerHTML = color1;
    }, 2000);
    setTimeout(() => {
        cl_2.style.backgroundColor = color2;
        cl_2.innerHTML = color2;
    }, 4000);
    setTimeout(() => {
        cl_3.style.backgroundColor = color3;
        cl_3.innerHTML = color3;
    }, 6000);
    setTimeout(() => {
        cl_4.style.backgroundColor = color4;
        cl_4.innerHTML = color4;
    }, 8000);
    setTimeout(() => {
        cl_5.style.backgroundColor = color5;
        cl_5.innerHTML = color5;
    }, 10000);

    gametype_.innerHTML = gameType;


    setTimeout(function checkResult() {
        const player = users.find((user) => user.id == 1);

        var firstThreeColor = firstThree.includes(gameDetails['choice']);
        var lastwo = lastTwo.includes(gameDetails['choice']);
        var jackPot = firstThreeColor && lastwo ? true : false;

        if (firstThreeColor && gameType === 'first 3') {
            // player.balance += ()
            console.log('won')
            console.log('first 3 game played');
        }
        else if (lastwo && gameType == 'last 2') {
            console.log('won');
            console.log('last 2 game played');
        }
        else if (jackPot && gameType == 'combo') {
            console.log('you won jackPot');
            console.log('combo game played');
        }
        else {
            console.log('lost ticket')
        }
    }, 5000)
    var allColors = [...firstThree, ...lastTwo]
    console.log(allColors, gameType)

});




async function placeBet(gametype, stake, choice) {
    const player = users.find((user) => user.id == 1);
    if (!player) {
        alert('user not found, you cant place bet');
        return;

    }
    else if (player.balance < 50 || stake > player.balance) {
        return 'Balance too low to stake';
    }
    else if (!stake || stake < 50) {
        return 'minmum stake #100';
    }
    else {
        player.balance -= stake;
        var betID = Math.floor(Math.random() * 10000) + 20230;
        console.log({ gameID: betID, gametype: gametype, stake: stake, choice: choice, bal: player.balance })
        return ({ gameID: betID, gametype: gametype, stake: stake, choice: choice, bal: player.balance })
    }
};



placebet_.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!stakeValue.value) {
        alert('no value');
        return;
    }
    else {
        var picked = document.getElementById('gametype');
        var gameType = picked.options[picked.selectedIndex].value;
        await placeBet(gameType, stakeValue.value, gameDetails['choice'])
        stakeValue.value = "";
    }
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

