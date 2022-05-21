// Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";
import { removeClasses } from "./functions.js";


const placeholder = `
                        <div class="portfolio__card card-portfolio placeholder">
                            <img src="img/portfolio/no_img.jpeg" alt="screen website" class="card-portfolio__image">
                            <div class="card-portfolio__drawer drawer drawer_blank">
                                <p>in developing</p>
                            </div>
                        </div>`
const containerPage = document.querySelector('.portfolio__container');
const PortfolioCardList = document.querySelector('.portfolio__list-cards');


function getWidthElement(e) {
    const domRect = e.getBoundingClientRect();
    return domRect.width;
}

function togglePlaceholder() {
    const widthContainerPage = getWidthElement(containerPage);
    const placeholders = document.querySelectorAll('.placeholder');
    const allCards = document.querySelectorAll('.card-portfolio')
    const realCardsCount = allCards.length - placeholders.length;

    // Remove all placeholders
    placeholders.forEach(el => el.remove())

    // Add placeholders
    if (widthContainerPage > 767.98 && realCardsCount % 3) {
        addPlaceholderByColumnCount(3)
    }

    if (widthContainerPage <= 767.98 && widthContainerPage > 584.98 && realCardsCount % 2) {
        addPlaceholderByColumnCount(2)
    }

    if (widthContainerPage <= 584.98) {
        placeholders.forEach(el => el.remove())
    }


    function addPlaceholderByColumnCount(columnCount) {
        const placeholderCount = columnCount - (realCardsCount % columnCount)
        for (let i = 0; i < placeholderCount; i++) {
            PortfolioCardList.insertAdjacentHTML('beforeend', placeholder)
        }
    }
}




class SlowPrint {
    line = 0;
    count = 0;
    currentString = '';

    constructor(selector) {
        this.outHtml = document.querySelector(selector);
        this.text = this.outHtml.textContent
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    print() {
        let interval = setTimeout(() => {
            this.currentString += this.text[this.line][this.count];
            this.outHtml.innerHTML = this.currentString + '|';
            this.count++;

            if (this.count >= this.text[this.line].length) {
                this.count = 0;
                this.line++;

                if (this.line == this.text.length) {
                    clearTimeout(interval);
                    this.outHtml.innerHTML = this.currentString;
                    return true;
                }
            }
            this.print();

        }, this.getRandomInt(this.getRandomInt(400 * 2.3)));
    }
}
const printName = new SlowPrint('.start-screen__name');

//Event listener
window.addEventListener('load', () => {
    togglePlaceholder(),
        printName.print()
});
window.addEventListener('resize', () => {
    togglePlaceholder()
});


document.addEventListener('click', e => {
    if(e.target.closest('.drawer__arrow')) {
        e.target.parentNode.classList.toggle('active')
        e.target.classList.toggle('active_arrow')
    } 
});



