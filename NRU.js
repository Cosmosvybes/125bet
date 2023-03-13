let pagesMemory = [];

let page = function (id, trueOrfalse) {
    this.id = id;
    this.isReferenced = false;
    this.dirty = Boolean(trueOrfalse);
};

let page1 = new page("coding", false);
let page2 = new page("browsing", false);
let page3 = new page("Gaming", true);
let page5 = new page("Document", true);

pagesMemory.push(page1, page2, page3, page5);




let NRU = function (memory, page) {
    class_one = new Array();
    class_two = new Array();
    class_three = new Array();
    class_four = new Array();


    for (let i = 0; i < pagesMemory.length; i++) {
        let eachPage = pagesMemory[i];

        if (!eachPage.isReferenced && !eachPage.dirty) {
            class_one.push(eachPage);
        }
        if (!eachPage.isReferenced && eachPage.dirty) {
            class_two.push(eachPage);
        }
        if (eachPage.isReferenced && !eachPage.dirty) {
            class_three.push(eachPage);
        }
        if (eachPage.isReferenced && eachPage.dirty) {
            class_four.push(eachPage);
        }
    }


    let pageToReplaced;
    if (class_one.length > 0) {
        pageToReplaced = class_one[0];
    }
    if (class_two.length > 0) {
        pageToReplaced = class_two[0];
    }
    if (class_three.length > 0) {
        pageToReplaced = class_three[0];
    }
    if (class_four.length > 0) {
        pageToReplaced = class_four[0];
    }

    let pageIndex = pagesMemory.indexOf(pageToReplaced);
    pagesMemory[pageIndex] = page;



    for (let i = 0; i < pagesMemory.length; i++) {
        pagesMemory[i].isReferenced = false;
    }





}

let page6 = new page("Drawing", false);
NRU(pagesMemory, page6);


function showPages() {
    for (let i = 0; i < pagesMemory.length; i++) {
        let pages = pagesMemory[i];
        console.log(pages);
    }
}
showPages();