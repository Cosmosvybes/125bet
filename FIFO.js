let queue = [];

let page = function (name, pageSize, pageAdddress) {
    this.name = name;
    this.size = pageSize;
    this.pageAdddress = pageAdddress;
}
let page1 = new page("coding", 1024, "A223JJ");
let page2 = new page("browser", 516, "A378e");
let page3 = new page("Gaming", 256, "WTSYD35");
let page5 = new page("Document", 1024, "28jsd");
let page6 = new page("Drawing", 256, "Weh328");


let pageRplcment = function (newPage) {
    if (queue.length == 4) {
        queue.shift(1);
        queue.push(newPage);
    }
    else {
        queue.push(newPage)
    }
}

pageRplcment(page3);
pageRplcment(page6);
pageRplcment(page5);
pageRplcment(page2);
// pageRplcment(page1);

function showPages() {
    for (let i = 0; i < queue.length; i++) {
        let pages = queue[i];
        console.log(pages);
    }
}
showPages();

// _______________________________________________________________________________________________________________________________________________________________________________________________________________________


