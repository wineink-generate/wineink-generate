// Function to generate and download the image
function generateImage() {
    const container = document.getElementById("capture");

    // Use html2canvas to capture the container div
    html2canvas(container, {
        width: 1200,
        height: 1200,
        scale: 2,
        useCORS: true,
    }).then((canvas) => {
        // Convert the canvas into a downloadable image
        const link = document.createElement("a");
        const name = document.getElementById("wine-name").innerHTML;
        link.download = name + ".png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
}

// Update text details dynamically
document.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", (e) => {
        const id = e.target.id.replace("-input", "");
        const target = document.getElementById(id);
        if (target) target.textContent = e.target.value;
    });
});

// Dynamically resize the wine image based on the uploaded file
document.getElementById("wine-image-input").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const wineImage = document.getElementById("wine-image");
            wineImage.src = event.target.result;

            // Wait for the image to load before resizing
            wineImage.onload = () => {
                const maxWidth = 300; // Max width of the wine image container
                const maxHeight = 800; // Max height of the wine image container
                const aspectRatio = wineImage.naturalWidth / wineImage.naturalHeight;

                // Dynamically adjust the image dimensions while maintaining aspect ratio
                if (aspectRatio > 1) {
                    // Landscape image
                    wineImage.style.width = `${Math.min(wineImage.naturalWidth, maxWidth)}px`;
                    wineImage.style.height = "auto";
                } else {
                    // Portrait image
                    wineImage.style.height = `${Math.min(wineImage.naturalHeight, maxHeight)}px`;
                    wineImage.style.width = "auto";
                }
            };
        };
        reader.readAsDataURL(file);
    }
});