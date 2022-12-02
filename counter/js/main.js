let text = document.querySelector("textarea");


text.addEventListener('input', function () {

    let letterCount = 0;
    let wordCount = 0;
    let sentenceCount = 0;
    
    let textValue = text.value.replace(/\s+/g, ' ').trim();
    let newListTextValue = textValue.split(" ");

    for (let i = 0; i < newListTextValue.length; i++) {
        letterCount += newListTextValue[i].length;
        wordCount++;

        if (newListTextValue[i].includes(".")) {
            sentenceCount++;
        }

        if (newListTextValue[i].length == 0) {
            wordCount = 0;
        }
    }


    document.querySelector('.letter-count').innerText = letterCount;
    document.querySelector('.word-count').innerText = wordCount;
    document.querySelector('.sentence-count').innerText = sentenceCount;
})


