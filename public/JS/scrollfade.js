let fadeElements = document.getElementsByClassName('scrollfade');

function scrollFade() {
    let viewportBottom = window.scrollY + window.innerHeight;

    for (let index = 0; index < fadeElements.length; index++) {
        let element = fadeElements[index];
        let rect = element.getBoundingClientRect();

        let elementFourth = rect.height/4;
        let fadeInPoint = window.innerHeight - elementFourth;
        let fadeOutPoint = -(rect.height/2);

        if (rect.top <= fadeInPoint) {
            element.classList.add('--visible');
            element.classList.add('--animate');
            element.classList.remove('--hidden');
        } else {
            element.classList.remove('--visible');
            element.classList.add('--hidden');
        }

        if (rect.top <= fadeOutPoint) {
            element.classList.remove('--visible');
            element.classList.add('--hidden');
        }
    }
}

document.addEventListener('scroll', scrollFade);
window.addEventListener('resize', scrollFade);
document.addEventListener('DOMContentLoaded', function() {
    scrollFade();
});

