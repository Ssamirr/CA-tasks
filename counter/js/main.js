let text = document.querySelector("textarea");


text.addEventListener('input', function () {

    let letter_count = 0;
    let word_count = 0;
    let sentence_count = 0;
    
    let text_value = text.value.replace(/\s+/g, ' ').trim();
    let new_list_text_value = text_value.split(" ");

    for (let i = 0; i < new_list_text_value.length; i++) {
        letter_count += new_list_text_value[i].length;
        word_count++;

        if (new_list_text_value[i].includes(".")) {
            sentence_count++;
        }

        if (new_list_text_value[i].length == 0) {
            word_count = 0;
        }
    }


    document.querySelector('.letter-count').innerText = letter_count;
    document.querySelector('.word-count').innerText = word_count;
    document.querySelector('.sentence-count').innerText = sentence_count;
})


