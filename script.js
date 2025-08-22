document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile menu toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const mobileMenuLinks = mobileMenu.getElementsByTagName('a');
        for (let link of mobileMenuLinks) {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        }
    }

    // --- Scroll reveal animations ---
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            observer.observe(el);
        });
    }

    // --- Dynamic Gallery Generation ---
    const imageGrid = document.getElementById('image-grid');
    // This checks if we are on the gallery page and the imageList exists
    if (imageGrid && typeof imageList !== 'undefined') {
        imageList.forEach(imageFile => {
            // Create the gallery item container
            const itemDiv = document.createElement('div');
            itemDiv.className = 'gallery-item rounded-lg';
            itemDiv.setAttribute('data-src', `media/${imageFile}`);

            // Create the image element
            const img = document.createElement('img');
            img.src = `media/${imageFile}`;
            img.alt = 'Event Decoration';
            img.className = 'w-full h-96 object-cover rounded-lg';
            
            // Add the image to the container, and the container to the grid
            itemDiv.appendChild(img);
            imageGrid.appendChild(itemDiv);
        });
    }


    // --- Lightbox functionality ---
    // We need to re-select galleryItems here because they are now created dynamically
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (lightbox && lightboxImg && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-src');
                if (src) {
                    lightboxImg.setAttribute('src', src);
                    lightbox.style.display = 'flex';
                    setTimeout(() => {
                        lightbox.style.opacity = '1';
                    }, 20);
                }
            });
        });

        const lightboxClose = document.getElementById('lightbox-close');
        
        function closeLightbox() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

});