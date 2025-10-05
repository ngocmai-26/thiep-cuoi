// Wedding Invitation JavaScript Functions

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Gallery Filter and Lightbox
function initGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    let currentImageIndex = 0;
    let filteredImages = [];

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter images
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox functionality
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            currentImageIndex = index;
            filteredImages = Array.from(galleryItems).filter(item => 
                item.style.display !== 'none'
            );
            currentImageIndex = filteredImages.indexOf(this);
            
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigation in lightbox
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        updateLightboxImage();
    });

    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
        updateLightboxImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
                updateLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
                updateLightboxImage();
            }
        }
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function updateLightboxImage() {
        const img = filteredImages[currentImageIndex].querySelector('img');
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
    }
}

// Countdown Timer - Enhanced Version
function updateCountdown() {
    // Ngày cưới: 14/11/2025 lúc 7:00
    const weddingDate = new Date('2025-11-14T07:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Cập nhật DOM với animation
        updateCountdownElement('days', days);
        updateCountdownElement('hours', hours);
        updateCountdownElement('minutes', minutes);
        updateCountdownElement('seconds', seconds);
    } else {
        // Đã đến ngày cưới hoặc đã qua
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Thêm class để hiển thị thông báo đặc biệt
        const countdownContainer = document.querySelector('.countdown-container');
        countdownContainer.classList.add('wedding-day');
    }
}

// Hàm cập nhật từng element với animation
function updateCountdownElement(elementId, value) {
    const element = document.getElementById(elementId);
    const currentValue = element.textContent;
    const newValue = value.toString().padStart(2, '0');
    
    if (currentValue !== newValue) {
        // Thêm animation khi giá trị thay đổi
        element.style.transform = 'scale(1.1)';
        element.style.color = '#ff6b6b';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
            element.style.color = '#8b5a3c';
        }, 150);
    }
}

// Hàm kiểm tra ngày cưới đặc biệt
function checkWeddingDay() {
    const weddingDate = new Date('2025-11-14T07:00:00');
    const now = new Date();
    
    // Kiểm tra nếu là ngày cưới
    if (now.toDateString() === weddingDate.toDateString()) {
        const countdownContainer = document.querySelector('.countdown-container');
        countdownContainer.innerHTML = `
            <div class="wedding-day-message">
                <h3>🎉 Hôm nay là ngày cưới! 🎉</h3>
                <p>Chúc mừng Mai Duyên & Văn Toàn!</p>
            </div>
        `;
        
        // Thêm CSS cho thông báo đặc biệt
        const style = document.createElement('style');
        style.textContent = `
            .wedding-day-message {
                text-align: center;
                background: linear-gradient(135deg, #ff9a9e, #fecfef);
                padding: 30px;
                border-radius: 20px;
                color: white;
                animation: pulse 2s infinite;
            }
            .wedding-day-message h3 {
                font-size: 2rem;
                margin-bottom: 10px;
                font-family: 'Dancing Script', cursive;
            }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .timeline-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Gift Box Modal Functions - Updated for separate groom/bride
function openGiftBox(type) {
    const giftModal = document.getElementById('giftModal');
    const giftBox = document.querySelector('.gift-box');
    
    // Update content based on type
    if (type === 'groom') {
        giftBox.innerHTML = `
            <h3>🎁 Hộp Quà Cưới - Văn Toàn</h3>
            <p>Cảm ơn bạn đã gửi lời chúc mừng đến chú rể!</p>
            
            <div class="gift-options">
                <div class="gift-option">
                    <h4>💳 Chuyển khoản</h4>
                    <p>Số tài khoản: 1234567890</p>
                    <p>Ngân hàng: Vietcombank</p>
                    <p>Chủ tài khoản: Văn Toàn</p>
                </div>
                
                
                <div class="gift-option">
                    <h4>🎁 Quà tặng</h4>
                    <p>Liên hệ: 090 123 4567</p>
                    <p>Để được hướng dẫn gửi quà</p>
                </div>
            </div>
            
            <div class="gift-note">
                <p><i class="fas fa-heart"></i> Mọi tình cảm của bạn đều là món quà quý giá nhất!</p>
            </div>
        `;
    } else if (type === 'bride') {
        giftBox.innerHTML = `
            <h3>🎁 Hộp Quà Cưới - Mai Duyên</h3>
            <p>Cảm ơn bạn đã gửi lời chúc mừng đến cô dâu!</p>
            
            <div class="gift-options">
                <div class="gift-option">
                    <h4>💳 Chuyển khoản</h4>
                    <p>Số tài khoản: 0987654321</p>
                    <p>Ngân hàng: Vietcombank</p>
                    <p>Chủ tài khoản: Mai Duyên</p>
                </div>
                
                
                <div class="gift-option">
                    <h4>🎁 Quà tặng</h4>
                    <p>Liên hệ: 090 987 6543</p>
                    <p>Để được hướng dẫn gửi quà</p>
                </div>
            </div>
            
            <div class="gift-note">
                <p><i class="fas fa-heart"></i> Mọi tình cảm của bạn đều là món quà quý giá nhất!</p>
            </div>
        `;
    }
    
    giftModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGiftBox() {
    const giftModal = document.getElementById('giftModal');
    giftModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close gift modal when clicking outside
document.addEventListener('click', function(e) {
    const giftModal = document.getElementById('giftModal');
    if (e.target === giftModal) {
        closeGiftBox();
    }
});

// Close gift modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeGiftBox();
    }
});

// Add floating hearts animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '♥';
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.color = 'rgba(255, 182, 193, 0.6)';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.animation = 'float 6s ease-in-out infinite';
    heart.style.pointerEvents = 'none';
    
    document.querySelector('.floating-hearts').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Add parallax effect to header
function initParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        const rate = scrolled * -0.5;
        
        header.style.transform = `translateY(${rate}px)`;
    });
}

// Add typing effect to couple names
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after page load
function initTypingEffect() {
    setTimeout(() => {
        const coupleNames = document.querySelector('.couple-names');
        const originalText = coupleNames.textContent;
        typeWriter(coupleNames, originalText, 150);
    }, 1000);
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Kiểm tra ngày cưới đặc biệt
    checkWeddingDay();

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial animation check
    animateOnScroll();

    // Initialize other functions
    initSmoothScrolling();
    initParallaxEffect();
    initTypingEffect();
    initMobileNavigation();
    initGallery();
    initBackgroundMusic();

    // Create floating hearts periodically
    setInterval(createFloatingHeart, 2000);
});

// Background Music System
const musicList = [
    // Danh sách nhạc từ file MP3 local
    'styles/mp3/Mình Cưới Nhau Đi.mp3',
    'styles/mp3/Chăm Em Một Đời.mp3',
    // Thêm các file MP3 khác vào đây nếu có
];

let currentMusicIndex = 0;
let isMusicPlaying = false;
let musicPlayer;

function initBackgroundMusic() {
    musicPlayer = document.getElementById('backgroundMusic');
    
    // Phát nhạc random ngay khi trang load
    setTimeout(() => {
        playRandomMusic();
        isMusicPlaying = true;
    }, 1000); // Delay 1 giây để trang load xong
    
    // Khi nhạc kết thúc, chuyển sang bài tiếp theo
    musicPlayer.addEventListener('ended', playNextMusic);
}

function startMusic() {
    if (!isMusicPlaying) {
        playRandomMusic();
        isMusicPlaying = true;
    }
}

function playRandomMusic() {
    if (musicList.length === 0) return;
    
    // Chọn nhạc random
    currentMusicIndex = Math.floor(Math.random() * musicList.length);
    const selectedMusic = musicList[currentMusicIndex];
    
    musicPlayer.src = selectedMusic;
    musicPlayer.volume = 0.3; // Âm lượng nhẹ nhàng
    musicPlayer.play().catch(e => {
        console.log('Cannot play music:', e);
        // Nếu không phát được, thử lại sau 2 giây
        setTimeout(() => {
            musicPlayer.play().catch(() => {
                console.log('Still cannot play music');
            });
        }, 2000);
    });
}

function playNextMusic() {
    if (musicList.length === 0) return;
    
    // Chuyển sang bài tiếp theo
    currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
    const nextMusic = musicList[currentMusicIndex];
    
    musicPlayer.src = nextMusic;
    musicPlayer.volume = 0.3; // Âm lượng nhẹ nhàng
    musicPlayer.play().catch(e => {
        console.log('Cannot play next music:', e);
    });
}

function toggleMusic() {
    if (musicPlayer.paused) {
        musicPlayer.play();
        document.getElementById('musicToggle').innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        musicPlayer.pause();
        document.getElementById('musicToggle').innerHTML = '<i class="fas fa-play"></i>';
    }
}

function createMusicControls() {
    const musicControls = document.createElement('div');
    musicControls.id = 'musicControls';
    musicControls.innerHTML = `
        <button id="musicToggle" onclick="toggleMusic()">
            <i class="fas fa-play"></i>
        </button>
        <button id="nextMusic" onclick="playNextMusic()">
            <i class="fas fa-forward"></i>
        </button>
        <div id="musicInfo">Nhạc nền</div>
    `;
    
    document.body.appendChild(musicControls);
}

function updateMusicInfo(musicSrc) {
    const musicInfo = document.getElementById('musicInfo');
    if (musicInfo) {
        const fileName = musicSrc.split('/').pop().split('.')[0];
        musicInfo.textContent = `Đang phát: ${fileName}`;
    }
}

// Additional utility functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for notification animation
const notificationCSS = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

// Inject notification CSS
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);
