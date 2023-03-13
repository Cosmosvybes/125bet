let queue = []; // declare of pages 

let page = function (name) {
    this.name = name;
    this.R;


}
let page1 = new page("pg1");
let page2 = new page("pg2");
let page3 = new page("Pg3");
let page4 = new page("Pg4");
let page6 = new page("pg6");
let page7 = new page("pg7")

//create instances of pages
let refBit = new Array();

// put them into the pages queue


queue.push(page1, page2, page3, page4);

for (let i = 0; i < queue.length; i++) {
    refBit.push({
        R: 0
    });
}


//create a function that check the R bit if it is in use of not, any page in use in denoted by ! and the unused R-bit is denoted by 0

let checkRef = (memory, newpage) => {
    pointer = 0;
    while (pointer <= memory.length) {
        let pageMemory = memory[pointer];
        if (pageMemory.R == 0) {
            memory[pointer] = newpage;
            memory[pointer].R = 1;
            break;

        }

        else {
            pageMemory.R = 0;
            pointer++;

        }
    }


}


// checkRef(refBit, page1);


checkRef(refBit, page6);
checkRef(refBit, page7);
checkRef(refBit, page2);
checkRef(refBit, page4);




function showPages() {
    for (let i = 0; i < refBit.length; i++) {
        let pages = refBit[i];
        console.log(pages);
    }
}
showPages();
