document.addEventListener('DOMContentLoaded', () => {
    const webTypeSelect = document.getElementById('web-type');
    const featuresCheckboxes = document.querySelectorAll('.feature-checkbox');
    const calcPriceText = document.getElementById('webdev-price-text');
    const calcTimeText = document.getElementById('webdev-time-text');
    const calcWspBtn = document.getElementById('webdev-wsp-btn');

    if (!webTypeSelect) return;

    // Smart API URL detector
    const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000'
        : 'https://ayuda-escolar-pro-backend.onrender.com';

    // Config structure
    const webTypes = {
        landing: { basePrice: 150, baseDays: 3, name: 'Landing Page' },
        restaurante: { basePrice: 250, baseDays: 5, name: 'Web de Restaurante / Cevichería' },
        hotel: { basePrice: 450, baseDays: 7, name: 'Web de Hotel / Reservaciones' },
        emprendimiento: { basePrice: 200, baseDays: 4, name: 'Web de Emprendimiento / Portafolio' }
    };

    const featuresConfig = {
        responsive: { price: 30, days: 1, name: 'Diseño Adaptativo Móvil' },
        contact: { price: 30, days: 1, name: 'Formulario Avanzado' },
        db: { price: 120, days: 4, name: 'Base de Datos integrada' },
        animations: { price: 40, days: 1, name: 'Efectos y Animaciones Neón' },
        maps: { price: 20, days: 0, name: 'Mapas de Geolocalización' }
    };

    function calculate() {
        const typeKey = webTypeSelect.value;
        const typeConfig = webTypes[typeKey];
        if (!typeConfig) return;

        let totalPrice = typeConfig.basePrice;
        let totalDays = typeConfig.baseDays;

        // Check checkboxes
        featuresCheckboxes.forEach(cb => {
            const labelCard = cb.closest('.checkbox-label-card');
            if (cb.checked) {
                const config = featuresConfig[cb.value];
                if (config) {
                    totalPrice += config.price;
                    totalDays += config.days;
                }
                if (labelCard) {
                    labelCard.classList.add('active-checkbox');
                }
            } else {
                if (labelCard) {
                    labelCard.classList.remove('active-checkbox');
                }
            }
        });

        // Update UI
        calcPriceText.textContent = `S/. ${totalPrice}.00`;
        calcTimeText.textContent = `${totalDays} días hábiles`;
    }

    // Bindings
    webTypeSelect.addEventListener('change', calculate);
    featuresCheckboxes.forEach(cb => {
        cb.addEventListener('change', calculate);
    });

    // Initial run
    calculate();

    // WhatsApp Dispatch
    if (calcWspBtn) {
        calcWspBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const typeText = webTypeSelect.options[webTypeSelect.selectedIndex].text;
            const price = calcPriceText.textContent;
            const time = calcTimeText.textContent;

            // Gather selected features
            let selectedFeatures = [];
            featuresCheckboxes.forEach(cb => {
                if (cb.checked) {
                    const config = featuresConfig[cb.value];
                    if (config) selectedFeatures.push(config.name);
                }
            });

            const featuresStr = selectedFeatures.length > 0 ? selectedFeatures.join(', ') : 'Ninguno';

            const message = `¡Hola! Coticé una página web en tu portafolio. Aquí están los detalles del sitio solicitado:
- *Tipo de Proyecto:* ${typeText}
- *Funcionalidades Elegidas:* ${featuresStr}
- *Tiempo Estimado de Entrega:* ${time}
- *Presupuesto Estimado:* ${price}

Me gustaría ponerme en contacto contigo para detallar el contenido y estructurar el diseño de la página.`;

            const whatsappUrl = `https://wa.me/51917584421?text=${encodeURIComponent(message)}`;

            // API Dispatch
            try {
                await fetch(`${API_URL}/api/cotizar/webdev`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        projectType: typeText,
                        features: selectedFeatures,
                        price: price,
                        time: time
                    })
                });
            } catch (err) {
                console.warn("Backend server is offline. Web quote processed offline.", err);
            }

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    }
});
