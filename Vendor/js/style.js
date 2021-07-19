const TypeWriter = function (txtElement, words, wait = 500) {
    this.txtElement = txtElement
    this.words = words
    this.txt = ''
    this.wordIndex = 0
    this.wait = parseInt(wait, 10)
    this.type()
    this.isDeleting = false
}

// type metodo

TypeWriter.prototype.type = function () {
    //corrent index of word
    const corrent = this.wordIndex % this.words.length
    //pega o testo completo do word
    const fullTxt = this.words[corrent]

    // ver deliting
    if (this.isDeleting) {
        //remove
        this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
        //add
        this.txt = fullTxt.substring(0, this.txt.length + 1)
    }

    //inserir element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    // velocidade inicial

    let typeSpeed = 100

    if (this.isDeleting) {
        typeSpeed /= 2
    }
    // quando o texto estiver completo
    if (!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait

        this.isDeleting = true
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false

        this.wordIndex++
        typeSpeed = 100
    }

    setTimeout(() => this.type(), typeSpeed)
}

document.addEventListener('DOMContentLoaded', init)

function init() {
    const txtElement = document.querySelector('.txt-type')
    const words = JSON.parse(txtElement.getAttribute('data-words'))
    const wait = txtElement.getAttribute('data-wait')
    // typeWriter
    new TypeWriter(txtElement, words, wait)
}