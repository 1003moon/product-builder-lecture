const URL = "https://teachablemachine.withgoogle.com/models/4JTXcvpER/";

let model, labelContainer, maxPredictions;

// Load the image model
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement("div"));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    init();

    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const imageUpload = document.getElementById('image-upload');
    const imagePreview = document.getElementById('face-image');
    const previewContainer = document.getElementById('image-preview-container');
    const loading = document.getElementById('loading');

    // Theme toggle
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleBtn.textContent = '☀️';
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggleBtn.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggleBtn.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });

    // Image upload handler
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            imagePreview.src = event.target.result;
            previewContainer.style.display = 'block';
            
            // Show loading and clear old results
            loading.style.display = 'block';
            labelContainer.innerHTML = '';
            
            // Wait for image to load to predict
            imagePreview.onload = async () => {
                await predict();
                loading.style.display = 'none';
            };
        };
        reader.readAsDataURL(file);
    });

    async function predict() {
        const prediction = await model.predict(imagePreview);
        
        // Clear container and add results
        labelContainer.innerHTML = '';
        
        // Sort prediction by probability (optional, but good for UX)
        // prediction.sort((a, b) => b.probability - a.probability);

        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction = prediction[i].className;
            const probability = (prediction[i].probability * 100).toFixed(0);
            
            const resultDiv = document.createElement("div");
            resultDiv.className = "result-bar-container";
            
            // Determine class for styling (Dog/Cat)
            let barClass = "other-bar";
            if (classPrediction === "강아지" || classPrediction === "dog") barClass = "dog-bar";
            else if (classPrediction === "고양이" || classPrediction === "cat") barClass = "cat-bar";

            resultDiv.innerHTML = `
                <span class="label-text">${classPrediction}: ${probability}%</span>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill ${barClass}" style="width: ${probability}%"></div>
                </div>
            `;
            labelContainer.appendChild(resultDiv);
        }
    }
});