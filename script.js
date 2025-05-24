document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.product-image');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    images.forEach(image => {
        observer.observe(image);
    });
});