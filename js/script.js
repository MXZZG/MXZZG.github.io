// 导航栏滚动效果
const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // 添加滚动时的元素显示动画
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
});

// 移动端菜单切换
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// 轮播图功能
const carousel = document.querySelector('.carousel');
const slides = document.querySelector('.slides');
const slideElements = document.querySelectorAll('.slide');
let currentSlide = 0;
let slideInterval;

// 创建轮播图导航按钮
const carouselNav = document.createElement('div');
carouselNav.className = 'carousel-nav';
carouselNav.innerHTML = `
    <button class="prev" aria-label="上一张">&lt;</button>
    <button class="next" aria-label="下一张">&gt;</button>
`;
carousel.appendChild(carouselNav);

// 创建轮播图指示器
const indicators = document.createElement('div');
indicators.className = 'carousel-indicators';
slideElements.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
    indicator.addEventListener('click', () => goToSlide(index));
    indicators.appendChild(indicator);
});
carousel.appendChild(indicators);

// 确保指示器显示在轮播图底部
setTimeout(() => {
    const carouselHeight = carousel.offsetHeight;
    indicators.style.bottom = '20px';
}, 100);

// 更新轮播图状态
function updateSlides() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    slideElements.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

// 切换到指定幻灯片
function goToSlide(index) {
    currentSlide = index;
    if (currentSlide < 0) currentSlide = slideElements.length - 1;
    if (currentSlide >= slideElements.length) currentSlide = 0;
    updateSlides();
    resetSlideInterval();
}

// 自动播放控制
function startSlideShow() {
    slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideShow();
}

// 添加页面加载时的动画效果
window.addEventListener('DOMContentLoaded', () => {
    // 初始化所有section为可见
    setTimeout(() => {
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('visible');
        });
    }, 300);
    
    // 为staff-member添加交错动画
    const staffMembers = document.querySelectorAll('.staff-member');
    staffMembers.forEach((member, index) => {
        setTimeout(() => {
            member.style.opacity = '0';
            member.style.transform = 'translateY(20px)';
            member.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                member.style.opacity = '1';
                member.style.transform = 'translateY(0)';
            }, 100 * index);
        }, 500);
    });
})

// 绑定导航按钮事件
carouselNav.querySelector('.prev').addEventListener('click', () => goToSlide(currentSlide - 1));
carouselNav.querySelector('.next').addEventListener('click', () => goToSlide(currentSlide + 1));

// 触摸滑动支持
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
}, false);

carousel.addEventListener('touchmove', e => {
    touchEndX = e.touches[0].clientX;
}, false);

carousel.addEventListener('touchend', () => {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
            goToSlide(currentSlide - 1);
        } else {
            goToSlide(currentSlide + 1);
        }
    }
}, false);

// 初始化轮播图
updateSlides();
startSlideShow();

// 页面可见性变化时控制自动播放
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(slideInterval);
    } else {
        startSlideShow();
    }
});