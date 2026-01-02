(function() {
    console.log("%c STOP! %c To jest strefa chroniona.", "color: red; font-size: 40px; font-weight: bold;", "color: white; background: red; font-size: 20px; padding: 5px;");
    console.log("Wklejanie tutaj czegokolwiek może zagrozić Twojemu bezpieczeństwu.");

    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function(type) {
        const context = this.getContext('2d');
        if (context) {
            const shift = {
                'r': Math.floor(Math.random() * 10) - 5,
                'g': Math.floor(Math.random() * 10) - 5,
                'b': Math.floor(Math.random() * 10) - 5
            };
            const imageData = context.getImageData(0, 0, this.width, this.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                imageData.data[i] = imageData.data[i] + shift.r;
                imageData.data[i + 1] = imageData.data[i + 1] + shift.g;
                imageData.data[i + 2] = imageData.data[i + 2] + shift.b;
            }
            context.putImageData(imageData, 0, 0);
        }
        return originalToDataURL.apply(this, arguments);
    };

    document.addEventListener('DOMContentLoaded', () => {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            if (link.hostname !== window.location.hostname) {
                link.setAttribute('rel', 'noopener noreferrer');
                link.setAttribute('target', '_blank');
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'p' || e.key === 'u')) {
            e.preventDefault();
            alert('SYSTEM BEZPIECZEŃSTWA: Kopiowanie treści jest monitorowane.');
        }
    });

    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }
})();
