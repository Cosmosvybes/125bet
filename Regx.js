// var submit = function () {


//     var regX = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-zA-Z]{2,8})(.[a-zA-Z]+)$/;
//     var inputValue = document.getElementById('input_').value;
//     if (regX.test(inputValue)) {
//         labell.innerHTML = "valid";
//         labell.style.visibility = "visible";
//         return true;

//     }
//     else {
//         labell.innerHTML = "invalid";
//         labell.style.visibility = "visible";
//         return false;
//     }
// }

let id = 0
function changeText() {
    someText.innerHTML = "Time is up";
}
function change() {
    id = setTimeout(changeText, 5000);
};

function reset() {
    clearTimeout(id)
};


let countNum = 0;

function counting() {
    seconds.innerHTML = countNum + " seconds";
    countNum++;
};

let ID = 0;
function count() {
    ID = setInterval(counting, 1000);
 
};
function stopSec() {
    clearInterval(ID);
}


