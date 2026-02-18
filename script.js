document.addEventListener('DOMContentLoaded', () => {
    const personImageInput = document.getElementById('person-image-input');
    const personPreview = document.getElementById('person-preview');
    const garmentGrid = document.getElementById('garment-grid');
    const resultImage = document.getElementById('result-image');
    const loadingOverlay = document.getElementById('loading-overlay');
    const generateButton = document.getElementById('generate-button');
    const downloadButton = document.getElementById('download-button');
    const favoriteButton = document.getElementById('favorite-button');
    const favoriteIcon = document.getElementById('favorite-icon');

    let selectedPersonImage = null;
    let selectedGarmentImage = null;
    let isFavorited = false;

    // 1. Image Upload Preview for Person Photo
    personImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                personPreview.src = e.target.result;
                selectedPersonImage = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // 2. Garment Selection
    garmentGrid.addEventListener('click', (event) => {
        const garmentItem = event.target.closest('.garment-item');
        if (garmentItem) {
            // Remove 'selected' class from all items
            document.querySelectorAll('.garment-item').forEach(item => {
                item.classList.remove('selected');
            });
            // Add 'selected' class to the clicked item
            garmentItem.classList.add('selected');
            selectedGarmentImage = garmentItem.querySelector('img').src;
        }
    });

    // Initialize selected garment
    const initialSelectedGarment = garmentGrid.querySelector('.garment-item.selected img');
    if (initialSelectedGarment) {
        selectedGarmentImage = initialSelectedGarment.src;
    }

    // 3. Generate Try-on (Mock)
    generateButton.addEventListener('click', () => {
        if (!selectedPersonImage) {
            alert('请先上传人物照片！');
            return;
        }
        if (!selectedGarmentImage) {
            alert('请选择一件服装！');
            return;
        }

        loadingOverlay.style.display = 'flex'; // Show loading
        resultImage.style.opacity = '0.5'; // Dim result image

        // Simulate AI processing time
        setTimeout(() => {
            loadingOverlay.style.display = 'none'; // Hide loading
            resultImage.style.opacity = '1'; // Restore opacity
            // Mock result image - in a real app, this would come from the AI backend
            resultImage.src = 'mock-result.png'; // Placeholder for the generated image
            alert('试穿结果已生成！');
        }, 3000); // 3 seconds delay
    });

    // 4. Download Button (Mock)
    downloadButton.addEventListener('click', () => {
        if (resultImage.src.includes('placeholder-result.png') || resultImage.src.includes('mock-result.png')) {
            alert('请先生成试穿结果！');
            return;
        }
        // In a real application, you would trigger a file download here
        alert('下载功能待实现！');
    });

    // 5. Favorite Button (Mock)
    favoriteButton.addEventListener('click', () => {
        isFavorited = !isFavorited;
        if (isFavorited) {
            favoriteIcon.textContent = '❤️'; // Filled heart
            alert('已收藏！');
        } else {
            favoriteIcon.textContent = '♡'; // Empty heart
            alert('已取消收藏！');
        }
    });

    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
});
