function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!navToggle || !navMenu) return;
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

function initGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    if (!lightbox || !lightboxImage || !lightboxClose || !lightboxPrev || !lightboxNext) return;
    let currentImageIndex = 0;
    let filteredImages = [];
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
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
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            currentImageIndex = index;
            filteredImages = Array.from(galleryItems).filter(item => item.style.display !== 'none');
            currentImageIndex = filteredImages.indexOf(this);
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
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
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
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
}

function updateCountdown() {
    const weddingDate = new Date('2025-11-14T07:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        updateCountdownElement('days', days);
        updateCountdownElement('hours', hours);
        updateCountdownElement('minutes', minutes);
        updateCountdownElement('seconds', seconds);
    } else {
        const d = document.getElementById('days');
        const h = document.getElementById('hours');
        const m = document.getElementById('minutes');
        const s = document.getElementById('seconds');
        if (d) d.textContent = '00';
        if (h) h.textContent = '00';
        if (m) m.textContent = '00';
        if (s) s.textContent = '00';
        const countdownContainer = document.querySelector('.countdown-container');
        if (countdownContainer) countdownContainer.classList.add('wedding-day');
    }
}

function updateCountdownElement(elementId, value) {
    const element = document.getElementById(elementId);
    if (!element) return;
    const currentValue = element.textContent;
    const newValue = value.toString().padStart(2, '0');
    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#ff6b6b';
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
            element.style.color = '#8b5a3c';
        }, 150);
    }
}

function checkWeddingDay() {
    const weddingDate = new Date('2025-11-14T07:00:00');
    const now = new Date();
    if (now.toDateString() === weddingDate.toDateString()) {
        const countdownContainer = document.querySelector('.countdown-container');
        if (!countdownContainer) return;
        countdownContainer.innerHTML = `
            <div class="wedding-day-message">
                <h3>🎉 Hôm nay là ngày cưới! 🎉</h3>
                <p>Chúc mừng Mai Duyên & Văn Toàn!</p>
            </div>
        `;
        const style = document.createElement('style');
        style.textContent = `
            .wedding-day-message { text-align: center; background: linear-gradient(135deg, #ff9a9e, #fecfef); padding: 30px; border-radius: 20px; color: white; animation: pulse 2s infinite; }
            .wedding-day-message h3 { font-size: 2rem; margin-bottom: 10px; font-family: 'Dancing Script', cursive; }
            @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        `;
        document.head.appendChild(style);
    }
}

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

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function openGiftBox(type) {
    const giftModal = document.getElementById('giftModal');
    const giftBox = document.querySelector('.gift-box');
    if (!giftModal || !giftBox) return;
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
    if (!giftModal) return;
    giftModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('click', function(e) {
    const giftModal = document.getElementById('giftModal');
    if (giftModal && e.target === giftModal) closeGiftBox();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeGiftBox();
});

function createFloatingHeart() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;
    const heart = document.createElement('div');
    heart.innerHTML = '♥';
    heart.style.position = 'absolute';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.color = 'rgba(255, 182, 193, 0.6)';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.animation = 'float 6s ease-in-out infinite';
    heart.style.pointerEvents = 'none';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}

function initParallaxEffect() {
    const header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        header.style.transform = `translateY(${rate}px)`;
    });
}

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

function initTypingEffect() {
    setTimeout(() => {
        const coupleNames = document.querySelector('.couple-names');
        if (!coupleNames) return;
        const originalText = coupleNames.textContent;
        typeWriter(coupleNames, originalText, 150);
    }, 1000);
}

const musicList = [
    'styles/mp3/Mình Cưới Nhau Đi.mp3',
    'styles/mp3/Chăm Em Một Đời.mp3'
];

let currentMusicIndex = 0;
let isMusicPlaying = false;
let musicPlayer;
let hasTriedAutoplay = false;

function initBackgroundMusic() {
    musicPlayer = document.getElementById('backgroundMusic');
    if (!musicPlayer) return;
    createMusicControls();
    musicPlayer.addEventListener('ended', () => {
        if (isMusicPlaying) playRandomMusic();
    });
    tryAutoplayMuted();
    setupFirstGestureUnlock();
}

function tryAutoplayMuted() {
    if (hasTriedAutoplay) return;
    hasTriedAutoplay = true;
    if (musicList.length === 0) return;
    currentMusicIndex = Math.floor(Math.random() * musicList.length);
    const selectedMusic = musicList[currentMusicIndex];
    musicPlayer.src = selectedMusic;
    musicPlayer.volume = 0.5;
    musicPlayer.loop = false;
    musicPlayer.muted = true;
    const p = musicPlayer.play();
    if (p && typeof p.then === 'function') {
        p.then(() => {
            isMusicPlaying = true;
            updatePlayButtonIcon();
            updateMusicInfo(selectedMusic);
        }).catch(() => {});
    }
}

function setupFirstGestureUnlock() {
    const unlock = () => {
        if (musicPlayer.src === '' && musicList.length > 0) {
            console.log('Playing music 222', playRandomMusic());
            playRandomMusic();
        } else {
            if (musicPlayer.paused) musicPlayer.play().catch(() => {});
        }
        if (musicPlayer.muted) musicPlayer.muted = false;
        isMusicPlaying = true;
        updatePlayButtonIcon();
        window.removeEventListener('pointerdown', unlock, { capture: true });
        window.removeEventListener('touchstart', unlock, { capture: true });
        window.removeEventListener('click', unlock, { capture: true });
        window.removeEventListener('keydown', unlock, { capture: true });
        window.removeEventListener('scroll', unlock, { capture: true });
    };
    window.addEventListener('pointerdown', unlock, { capture: true, once: true });
    window.addEventListener('touchstart', unlock, { capture: true, once: true });
    window.addEventListener('click', unlock, { capture: true, once: true });
    window.addEventListener('keydown', unlock, { capture: true, once: true });
    window.addEventListener('scroll', unlock, { capture: true, once: true });
}

function playRandomMusic() {
    if (musicList.length === 0) return;
    currentMusicIndex = Math.floor(Math.random() * musicList.length);
    const selectedMusic = musicList[currentMusicIndex];
    musicPlayer.src = selectedMusic;
    musicPlayer.loop = false;
    const playPromise = musicPlayer.play();
    if (playPromise && typeof playPromise.then === 'function') {
        playPromise.then(() => {
            isMusicPlaying = true;
            updatePlayButtonIcon();
            updateMusicInfo(selectedMusic);
        }).catch(() => {});
    }
}

function toggleMusic() {
    if (!musicPlayer) return;
    if (musicPlayer.paused) {
        if (!isMusicPlaying) {
            playRandomMusic();
        } else {
            musicPlayer.play().catch(() => {});
        }
        isMusicPlaying = true;
    } else {
        musicPlayer.pause();
        isMusicPlaying = false;
    }
    updatePlayButtonIcon();
}

function updatePlayButtonIcon() {
    const musicToggle = document.getElementById('musicToggle');
    if (!musicToggle || !musicPlayer) return;
    if (musicPlayer.paused) {
        musicToggle.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

function createMusicControls() {
    const musicControls = document.createElement('div');
    musicControls.id = 'musicControls';
    musicControls.innerHTML = `
        <button id="musicToggle" onclick="toggleMusic()">
            <i class="fas fa-play"></i>
        </button>
    `;
    document.body.appendChild(musicControls);
    setTimeout(() => { showMusicHint(); }, 2000);
}

function showMusicHint() {
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed; bottom: 80px; right: 20px; background: rgba(139, 90, 60, 0.9); color: white; padding: 8px 12px; border-radius: 15px; font-size: 0.8rem; z-index: 1001; backdrop-filter: blur(10px); box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2); animation: fadeInOut 4s ease-in-out;
    `;
    hint.innerHTML = '🎵 Click để phát nhạc';
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut { 0% { opacity: 0; transform: translateY(10px); } 20% { opacity: 1; transform: translateY(0); } 80% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-10px); } }
    `;
    document.head.appendChild(style);
    document.body.appendChild(hint);
    setTimeout(() => { hint.remove(); style.remove(); }, 4000);
}

function updateMusicInfo(musicSrc) {
    const musicInfo = document.getElementById('musicInfo');
    if (musicInfo) {
        const fileName = musicSrc.split('/').pop().split('.')[0];
        musicInfo.textContent = `Đang phát: ${fileName}`;
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 20px; right: 20px; background: ${type === 'success' ? '#4CAF50' : '#f44336'}; color: white; padding: 15px 20px; border-radius: 5px; z-index: 1000; animation: slideInRight 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => { notification.remove(); }, 3000);
}

const notificationCSS = `
    @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
`;

const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    setInterval(updateCountdown, 1000);
    updateCountdown();
    checkWeddingDay();
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    initSmoothScrolling();
    initParallaxEffect();
    initTypingEffect();
    initMobileNavigation();
    initGallery();
    initBackgroundMusic();
    setInterval(createFloatingHeart, 2000);
});
