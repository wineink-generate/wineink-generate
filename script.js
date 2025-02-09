// Function to generate and download the image
function generateImage() {
    const container = document.getElementById("capture");

    // Use html2canvas to capture the container div
    html2canvas(container, {
        width: 1200,
        height: 1200,
    }).then((canvas) => {
        // Convert the canvas into a downloadable image
        const link = document.createElement("a");
        link.download = "wine.png";
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

// Update wine image dynamically
document.getElementById("wine-image-input").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            // Update the `src` of the <img> element
            document.getElementById("wine-image").src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});