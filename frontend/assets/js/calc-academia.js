document.addEventListener('DOMContentLoaded', () => {
    const calcService = document.getElementById('calc-service');
    const calcQtyLabel = document.getElementById('calc-qty-label');
    const calcQtyInput = document.getElementById('calc-quantity');
    const calcQtyVal = document.getElementById('calc-qty-val');
    const calcComplexity = document.getElementById('calc-complexity');
    const calcUrgency = document.getElementById('calc-urgency');
    const calcPriceText = document.getElementById('calc-price-text');
    const calcWspBtn = document.getElementById('calc-wsp-btn');

    if (!calcService || !calcQtyInput) return;

    // Smart API URL detector
    const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000'
        : 'https://ayuda-escolar-pro-backend.onrender.com'; // Dayron can update this URL during production deployment

    // Config structure
    const prices = {
        diapositivas: { base: 4.5, unit: 'diapositiva(s) Canva/PPT', min: 4, max: 40, defaultQty: 10, offset: 12 },
        ensayos: { base: 16, unit: 'página(s) redactada(s)', min: 1, max: 20, defaultQty: 3, offset: 10 },
        informes: { base: 20, unit: 'página(s) de informe/monografía', min: 2, max: 30, defaultQty: 5, offset: 15 },
        infografias: { base: 25, unit: 'infografía(s)', min: 1, max: 5, defaultQty: 1, offset: 0 },
        matematicas: { base: 6, unit: 'ejercicio(s) resuelto(s)', min: 1, max: 30, defaultQty: 5, offset: 10 },
        afiches: { base: 20, unit: 'afiche(s)/banner(s)', min: 1, max: 5, defaultQty: 1, offset: 0 },
        mapas: { base: 15, unit: 'mapa(s) conceptual(es)', min: 1, max: 5, defaultQty: 1, offset: 5 }
    };

    function updateUI() {
        const selected = calcService.value;
        const config = prices[selected];

        if (config) {
            calcQtyLabel.textContent = `Cantidad de ${config.unit}:`;
            calcQtyInput.min = config.min;
            calcQtyInput.max = config.max;
            
            let curVal = parseInt(calcQtyInput.value);
            if (isNaN(curVal) || curVal < config.min || curVal > config.max) {
                calcQtyInput.value = config.defaultQty;
            }
            
            calcQtyVal.textContent = calcQtyInput.value;
            calculate();
        }
    }

    function calculate() {
        const selected = calcService.value;
        const config = prices[selected];
        if (!config) return;

        const qty = parseInt(calcQtyInput.value) || 1;
        const rawBase = (config.base * qty) + config.offset;

        // Multiplier complexity
        let multComplexity = 1.0;
        if (calcComplexity.value === 'intermedio') multComplexity = 1.3;
        if (calcComplexity.value === 'avanzado') multComplexity = 1.6;

        // Multiplier urgency
        let multUrgency = 1.0;
        if (calcUrgency.value === 'rapido') multUrgency = 1.25;
        if (calcUrgency.value === 'express') multUrgency = 1.5;

        const total = Math.round(rawBase * multComplexity * multUrgency);
        calcPriceText.textContent = `S/. ${total}.00`;
    }

    // Bindings
    calcService.addEventListener('change', updateUI);
    calcQtyInput.addEventListener('input', () => {
        calcQtyVal.textContent = calcQtyInput.value;
        calculate();
    });
    calcComplexity.addEventListener('change', calculate);
    calcUrgency.addEventListener('change', calculate);

    // Initial run
    updateUI();

    // WhatsApp Dispatch + API Log
    if (calcWspBtn) {
        calcWspBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const serviceKey = calcService.value;
            const serviceName = calcService.options[calcService.selectedIndex].text;
            const qty = calcQtyInput.value;
            const unit = prices[serviceKey].unit;
            const complexityText = calcComplexity.options[calcComplexity.selectedIndex].text;
            const urgencyText = calcUrgency.options[calcUrgency.selectedIndex].text;
            const price = calcPriceText.textContent;

            // WhatsApp pre-formatted string
            const message = `¡Hola! Coticé un trabajo en la web de Ayuda Escolar Pro. Aquí está mi pedido escolar:
- *Servicio:* ${serviceName}
- *Cantidad:* ${qty} ${unit}
- *Complejidad:* ${complexityText}
- *Urgencia:* ${urgencyText}
- *Costo Estimado:* ${price}

Por favor, indícame los pasos para realizar el pago y enviarte los detalles del tema.`;

            const whatsappUrl = `https://wa.me/51917584421?text=${encodeURIComponent(message)}`;

            // Log data into backend API safely (don't block the user if the server is offline)
            try {
                await fetch(`${API_URL}/api/cotizar/academia`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        service: serviceName,
                        quantity: qty,
                        complexity: complexityText,
                        urgency: urgencyText,
                        price: price
                    })
                });
            } catch (err) {
                console.warn("Backend server is offline. Quote processed offline.", err);
            }

            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
        });
    }
});
