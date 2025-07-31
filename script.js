document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.classList.remove('active');
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Custom meal builder functionality
    const proteinSelect = document.getElementById('protein-select');
    const carbSelect = document.getElementById('carb-select');
    const sideSelect = document.getElementById('side-select');
    const mealSummary = document.getElementById('meal-summary');
    const mealPrice = document.getElementById('meal-price');
    const addToCartBtn = document.getElementById('add-to-cart');
    
    // Prices for each item
    const prices = {
        'frango-thai': 28.90,
        'salmao': 34.90,
        'ragu': 29.90,
        'pure': 9.90,
        'arroz-negro': 9.90,
        'quinoa': 12.90,
        'legumes-assados': 7.90,
        'vagem': 7.90,
        'couve': 6.90
    };
    
    // Descriptions for each item
    const descriptions = {
        'frango-thai': 'Frango Thai',
        'salmao': 'Salmão em Crosta de Gergelim',
        'ragu': 'Ragu de Carne de Panela',
        'pure': 'Purê de Mandioquinha com Gengibre',
        'arroz-negro': 'Arroz Negro com Amêndoas',
        'quinoa': 'Quinoa Real Tricolor',
        'legumes-assados': 'Mix de Legumes Assados',
        'vagem': 'Vagem Francesa Salteada',
        'couve': 'Couve Refogada com Alho Crocante'
    };
    
    // Update meal summary and price
    function updateMealSummary() {
        const protein = proteinSelect.value;
        const carb = carbSelect.value;
        const side = sideSelect.value;
        
        let summaryHTML = '';
        let total = 0;
        
        if (protein) {
            summaryHTML += `<p><strong>Proteína:</strong> ${descriptions[protein]}</p>`;
            total += prices[protein];
        }
        
        if (carb) {
            summaryHTML += `<p><strong>Carboidrato:</strong> ${descriptions[carb]}</p>`;
            total += prices[carb];
        }
        
        if (side) {
            summaryHTML += `<p><strong>Guarnição:</strong> ${descriptions[side]}</p>`;
            total += prices[side];
        }
        
        if (!protein && !carb && !side) {
            summaryHTML = '<p>Selecione os itens para ver seu pedido</p>';
        }
        
        mealSummary.innerHTML = summaryHTML;
        mealPrice.textContent = `Total: R$ ${total.toFixed(2)}`;
        
        // Enable/disable add to cart button
        addToCartBtn.disabled = !(protein && carb && side);
    }
    
    // Event listeners for select changes
    proteinSelect.addEventListener('change', updateMealSummary);
    carbSelect.addEventListener('change', updateMealSummary);
    sideSelect.addEventListener('change', updateMealSummary);
    
    // Add to cart functionality
    addToCartBtn.addEventListener('click', function() {
        const protein = proteinSelect.value;
        const carb = carbSelect.value;
        const side = sideSelect.value;
        const total = prices[protein] + prices[carb] + prices[side];
        
        alert(`Sua marmita personalizada foi adicionada ao carrinho!\n\nTotal: R$ ${total.toFixed(2)}`);
        
        // Reset form
        proteinSelect.value = '';
        carbSelect.value = '';
        sideSelect.value = '';
        updateMealSummary();
    });
    
    // Form submission
    const orderForm = document.getElementById('order-form');
    
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const package = document.getElementById('package').value;
        
        if (package === 'custom') {
            alert('Por favor, monte sua marmita personalizada na seção "Monte Sua Marmita" antes de enviar o pedido.');
            return;
        }
        
        alert(`Obrigado, ${name}!\n\nSeu pedido foi recebido e entraremos em contato para confirmar os detalhes.`);
        orderForm.reset();
    });
    
    // Auto-scroll testimonials
    const testimonialContainer = document.querySelector('.testimonial-container');
    let scrollPosition = 0;
    const scrollWidth = testimonialContainer.scrollWidth;
    
    function autoScrollTestimonials() {
        scrollPosition += 1;
        
        if (scrollPosition > scrollWidth) {
            scrollPosition = 0;
        }
        
        testimonialContainer.scrollLeft = scrollPosition;
        
        requestAnimationFrame(autoScrollTestimonials);
    }
    
    // Start auto-scroll only if not hovering
    let isHovering = false;
    let scrollInterval;
    
    testimonialContainer.addEventListener('mouseenter', function() {
        isHovering = true;
    });
    
    testimonialContainer.addEventListener('mouseleave', function() {
        isHovering = false;
    });
    
    function startAutoScroll() {
        if (!isHovering) {
            scrollPosition += 1;
            
            if (scrollPosition > scrollWidth) {
                scrollPosition = 0;
            }
            
            testimonialContainer.scrollLeft = scrollPosition;
        }
        
        scrollInterval = requestAnimationFrame(startAutoScroll);
    }
    
    startAutoScroll();
});