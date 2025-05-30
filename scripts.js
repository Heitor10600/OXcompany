document.addEventListener('DOMContentLoaded', function() {
    // Inicialização do carrossel
    initCarousel();
    
    // Configuração do formulário de contato
    setupContactForm();
    
    // Configuração do botão de WhatsApp
    setupWhatsAppButton();
    
    // Animações adicionais
    enhanceAnimations();
});

/**
 * Inicializa o carrossel com efeito de zoom ao centralizar
 */
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    // Configuração inicial
    updateCarousel();
    
    // Evento para botão anterior
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });
    
    // Evento para botão próximo
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });
    
    // Atualiza a posição e aparência do carrossel
    function updateCarousel() {
        // Remove classe active de todos os itens
        items.forEach(item => item.classList.remove('active'));
        
        // Adiciona classe active ao item atual
        items[currentIndex].classList.add('active');
        
        // Calcula a posição de deslocamento
        const offset = -currentIndex * 100;
        carousel.style.transform = `translateX(${offset}%)`;
        
        // Efeito de zoom para o item ativo
        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.style.transform = 'scale(1)';
                item.style.opacity = '1';
            } else {
                item.style.transform = 'scale(0.8)';
                item.style.opacity = '0.7';
            }
        });
    }
    
    // Auto-rotação do carrossel
    let autoRotate = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }, 5000);
    
    // Pausa a rotação automática quando o mouse está sobre o carrossel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });
    
    // Retoma a rotação automática quando o mouse sai do carrossel
    carousel.addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 5000);
    });
}

/**
 * Configura o formulário de contato para envio por email
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Verifica se o EmailJS está carregado
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS não está carregado! Verifique se o script foi incluído corretamente.');
            return;
        }

        // Inicializa o EmailJS com seu User ID
        try {
            emailjs.init("O_3_k5go5e-zTR_PF");
            console.log('EmailJS inicializado com sucesso!');
        } catch (error) {
            console.error('Erro ao inicializar EmailJS:', error);
            return;
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação dos campos
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação básica de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Mostra indicador de carregamento
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Prepara os parâmetros do email
            const templateParams = {
                from_name: name,
                from_email: email,
                phone: document.getElementById('phone').value.trim(),
                message: message
            };
            
            console.log('Enviando email com os parâmetros:', templateParams);
            
            // Envia o email
            emailjs.send('service_jos17dc', 'template_2dm4l4o', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    contactForm.reset();
                }, function(error) {
                    console.error('Erro detalhado:', error);
                    alert('Erro ao enviar mensagem: ' + error.text);
                })
                .finally(function() {
                    // Restaura o botão
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    } else {
        console.error('Formulário de contato não encontrado!');
    }
}

/**
 * Configura o botão de WhatsApp para redirecionar para conversa
 */
function setupWhatsAppButton() {
    const whatsappButton = document.getElementById('whatsapp-button');
    
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function(e) {
            // O link já está configurado no HTML, mas podemos adicionar
            // parâmetros adicionais aqui se necessário
            
            // Exemplo: Adicionar mensagem pré-definida
            const currentHref = whatsappButton.getAttribute('href');
            const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da OX Company.');
            
            if (!currentHref.includes('?text=')) {
                whatsappButton.setAttribute('href', `${currentHref}?text=${message}`);
            }
        });
    }
}

/**
 * Aprimora as animações e efeitos visuais do site
 */
function enhanceAnimations() {
    // Efeito de sublinhado nos links do menu
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Reforça o efeito de sublinhado da direita para a esquerda
        link.addEventListener('mouseenter', function() {
            const underline = document.createElement('span');
            underline.classList.add('nav-underline');
            underline.style.position = 'absolute';
            underline.style.bottom = '0';
            underline.style.right = '0';
            underline.style.width = '0';
            underline.style.height = '2px';
            underline.style.backgroundColor = 'var(--primary)';
            underline.style.transition = 'width 0.3s ease';
            
            this.appendChild(underline);
            
            // Força o reflow para garantir a animação
            underline.offsetWidth;
            
            underline.style.width = '100%';
        });
        
        link.addEventListener('mouseleave', function() {
            const underline = this.querySelector('.nav-underline');
            if (underline) {
                underline.style.width = '0';
                setTimeout(() => {
                    underline.remove();
                }, 300);
            }
        });
    });
    
    // Efeito de flutuação aprimorado para o celular
    const floatingPhone = document.querySelector('.floating-phone');
    if (floatingPhone) {
        // Adiciona movimento suave em X além do Y já configurado no CSS
        let startTime = Date.now();
        
        function updatePhonePosition() {
            const elapsed = Date.now() - startTime;
            const yOffset = Math.sin(elapsed / 1000) * 10;
            const xOffset = Math.sin(elapsed / 1500) * 5;
            
            floatingPhone.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            
            requestAnimationFrame(updatePhonePosition);
        }
        
        requestAnimationFrame(updatePhonePosition);
    }
    
    // Efeito de aparecimento ao scroll
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.classList.add('fade-in');
        sectionObserver.observe(section);
    });
    
    // Adiciona classe para estilização CSS
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .fade-in {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .section-title::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 0;
                height: 3px;
                background-color: var(--primary);
                transition: width 0.5s ease;
            }
            
            .visible .section-title::after {
                width: 100%;
                transition-delay: 0.3s;
            }
        </style>
    `);
}
