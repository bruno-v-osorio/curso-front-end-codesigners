var overlay = document.querySelector('.jl-overlay');
var frameImage = document. querySelector ('.jl-gallery-frame-image');
var frameContainer = document. querySelector ('.jl-gallery-frame-container');
var galleryImages = document.querySelectorAll ('.jl-thumb-img');
var closeGallery = document.querySelectorAll ('.jl-toggle-gallery');
var btnNext = document.querySelector('.jl-item-next');
var btnPrev = document.querySelector('.jl-item-prev');
var currCounter = document.querySelector('.jl-current-slide');
var totalCounter = document.querySelector('.jl-total-slide');
var skeletonLoading = document.querySelector ('.jl-skeleton-loading');

//Counter Formater
var counterFormater = function(n){
    if(n < 10) {
        return '0' + n;
    }else {
        return n;
    }
}

totalCounter.innerHTML = counterFormater(galleryImages.length);

//Skeleton Loading
const skeletonAnim = function (imagem) {
    var myImage = new Image();
    myImage.src = imagem;
    myImage.addEventListener('load',function () {
        skeletonLoading.classList.add('jl-fade-out');
        console.log('iniciou fadeOut');
        setTimeout( function () {
            skeletonLoading.style.display = 'none'
            console.log('iniciou display none');
        }, 2000);
    });
}


//Open Gallery Modal
const getImageSrc = function () {
    for(var i = 0; i < galleryImages.length; i++)  {
        galleryImages[i].addEventListener('click', function () {
            var imageSrc = this.getAttribute('data-src');
            var itemNum = this.getAttribute('data-item');

            skeletonLoading.style.display = 'flex';

            frameImage.setAttribute('src', imageSrc);
            frameImage.setAttribute('data-index', itemNum);
            overlay.classList.add('jl-is-open');
            frameContainer.classList.add('jl-is-open');
            currCounter.innerHTML = counterFormater(itemNum);

            skeletonAnim(imageSrc);

        });
    }
}
getImageSrc();



for (var c = 0; c < closeGallery.length; c++){
    closeGallery [c].addEventListener('click', function () {
        overlay.classList.remove('jl-is-open');
        frameContainer.classList.remove('jl-is-open');
    });
}


const nextItem = function () {

    //Identificamos o item atual no frame
    var currItemNum = frameImage.getAttribute('data-index');

    //Definimos o número do próximo item = atual + 1
    var nextItemNum = parseInt(currItemNum) + 1;

    //Fazemos o Loop e identificamos qual item faz match com o número do próximo item
    for (var n = 0; n < galleryImages.length; n++) {
        var item = galleryImages[n];
        var itemNum = parseInt(item.getAttribute('data-item'));

        if(itemNum === nextItemNum){
            //Capturamos o data-src
            var nextSrc = item.getAttribute('data-src');
            var nextIndex = item.getAttribute('data-item');

            skeletonLoading.style.display = 'flex';

            //Passamos o data-src para a tag de img no frame
            frameImage.setAttribute('src', nextSrc);
            frameImage.setAttribute('data-index', nextIndex);

            currCounter.innerHTML = counterFormater(nextIndex);

            skeletonAnim(nextSrc);

        }
    }
}

const prevItem = function () {

    //Identificamos o item atual no frame
    var currItemNum = frameImage.getAttribute('data-index');

    //Definimos o número do próximo item = atual - 1
    var prevItemNum = parseInt(currItemNum) - 1;

    //Fazemos o Loop e identificamos qual item faz match com o número do próximo item
    for (var p = 0; p < galleryImages.length; p++) {
        var item = galleryImages[p];
        var itemNum = parseInt(item.getAttribute('data-item'));

        if(itemNum === prevItemNum){
        //Capturamos o data-src
            var prevSrc = item.getAttribute('data-src');
            var prevIndex = item.getAttribute('data-item');

            skeletonLoading.style.display = 'flex';

            //Passamos o data-src para a tag de img no frame
            frameImage.setAttribute('src', prevSrc);
            frameImage.setAttribute('data-index', prevIndex);

            currCounter.innerHTML = counterFormater(prevIndex);

            skeletonAnim(prevSrc);


        }
    }
}

btnNext.addEventListener('click', function () {
    nextItem ();
});

btnPrev.addEventListener('click', function () {
    prevItem ();
});