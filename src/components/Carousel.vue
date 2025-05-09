<script setup>
/**
 * 轮播图组件
 * 负责展示网站首页的轮播图，包括自动播放、手动切换和触摸滑动功能
 */
import { ref, onMounted, onUnmounted } from 'vue';
import slide1 from '@/assets/img/slides/1.png';
import slide2 from '@/assets/img/slides/2.png';
import slide3 from '@/assets/img/slides/3.png';
import slide4 from '@/assets/img/slides/4.png';
import slide5 from '@/assets/img/slides/5.png';

// 当前显示的幻灯片索引
const currentSlide = ref(0);
// 轮播图定时器
let slideInterval = null;

// 轮播图图片数据
const slides = [
  {
    id: 1,
    image: slide1,
    title: '',
    subtitle: ''
  },
  {
    id: 2,
    image: slide2,
    title: '',
    subtitle: ''
  },
  {
    id: 3,
    image: slide3,
    title: '',
    subtitle: ''
  },
  {
    id: 4,
    image: slide4,
    title: '',
    subtitle: ''
  },
  {
    id: 5,
    image: slide5,
    title: '',
    subtitle: ''
  }
];

// 切换到指定幻灯片
const goToSlide = (index) => {
  clearInterval(slideInterval); // 暂停自动播放
  currentSlide.value = index;
  if (currentSlide.value < 0) currentSlide.value = slides.length - 1;
  if (currentSlide.value >= slides.length) currentSlide.value = 0;
  resetSlideInterval();
};

// 上一张幻灯片
const prevSlide = () => {
  goToSlide(currentSlide.value - 1);
};

// 下一张幻灯片
const nextSlide = () => {
  goToSlide(currentSlide.value + 1);
};

// 自动播放控制
const startSlideShow = () => {
  slideInterval = setInterval(() => {
    goToSlide(currentSlide.value + 1);
  }, 5000);
};

// 重置轮播图定时器
const resetSlideInterval = () => {
  clearInterval(slideInterval);
  startSlideShow();
};

// 触摸滑动相关变量
let touchStartX = 0;
let touchEndX = 0;

// 触摸开始事件处理
const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
};

// 触摸移动事件处理
const handleTouchMove = (e) => {
  touchEndX = e.touches[0].clientX;
};

// 触摸结束事件处理
const handleTouchEnd = () => {
  const swipeDistance = touchEndX - touchStartX;
  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  }
};

// 页面可见性变化处理
const handleVisibilityChange = () => {
  if (document.hidden) {
    clearInterval(slideInterval);
  } else {
    startSlideShow();
  }
};

// 组件挂载时初始化
onMounted(() => {
  startSlideShow();
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

// 组件卸载时清理
onUnmounted(() => {
  clearInterval(slideInterval);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>

<template>
  <section id="home" class="carousel"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd">
    <div class="slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
      <div v-for="(slide, index) in slides" :key="slide.id"
        class="slide" :class="{ 'active': index === currentSlide }">
        <img :src="slide.image" :alt="`服务器场景 ${index + 1}`">
        <div class="slide-texts" v-if="slide.title || slide.subtitle">
          <h1>{{ slide.title }}</h1>
          <p>{{ slide.subtitle }}</p>
        </div>
      </div>
    </div>
    
    <div class="carousel-nav">
      <button class="prev" aria-label="上一张" @click="prevSlide">&lt;</button>
      <button class="next" aria-label="下一张" @click="nextSlide">&gt;</button>
    </div>
    
    <div class="carousel-indicators">
      <div v-for="(slide, index) in slides" :key="`indicator-${slide.id}`"
        class="indicator" :class="{ 'active': index === currentSlide }"
        @click="goToSlide(index)">
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel {
  margin-top: 70px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 0 0 8px 8px;
}

.slides {
  display: flex;
  transition: transform 0.5s ease;
}

.slide {
  min-width: 100%;
  position: relative;
  opacity: 0.7;
  transition: opacity 0.5s ease;
}

.slide.active {
  opacity: 1;
}

.slide img {
  width: 100%;
  height: 70vh;
  object-fit: cover;
  filter: brightness(0.7);
  display: block; /* 移除图片下方的空隙 */
}

.slide-texts {
  position: absolute;
  bottom: 15%; /* 调整文字位置，使其更靠下一些 */
  left: 5%; /* 从左侧开始，而不是居中 */
  transform: translateY(0); /* 移除垂直居中 */
  text-align: left; /* 文字左对齐 */
  color: white;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
  padding: 20px;
  max-width: 60%; /* 限制文本最大宽度 */
}

.slide-texts h1 {
  font-size: 2.8rem; /* 略微调整字体大小 */
  margin-bottom: 0.8rem;
  font-weight: 700; /* 加粗标题 */
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards 0.3s;
}

.slide-texts p {
  font-size: 1.3rem; /* 略微调整字体大小 */
  font-weight: 400;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards 0.6s;
  line-height: 1.6; /* 增加行高 */
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.carousel-nav {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.carousel:hover .carousel-nav {
  opacity: 1;
}

.carousel-nav button {
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: none; /* 移除边框 */
  width: 48px; /* 增大按钮尺寸 */
  height: 48px;
  border-radius: 50%;
  font-size: 1.8rem; /* 增大图标尺寸 */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  padding: 0;
  line-height: 1;
}

.carousel-nav button:hover {
  background-color: rgba(0, 0, 0, 0.5);
  transform: scale(1.05); /* 调整悬停缩放效果 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.indicator {
  width: 10px; /* 调整指示器大小 */
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin: 0 6px; /* 调整指示器间距 */
}

.indicator.active {
  background-color: white;
  transform: scale(1.3); /* 调整激活状态缩放 */
}

@media (max-width: 768px) {
  .slide img {
    height: 60vh; /* 移动端增加图片高度 */
  }
  
  .slide-texts {
    bottom: 10%;
    left: 5%;
    padding: 15px;
    max-width: 80%;
  }

  .slide-texts h1 {
    font-size: 1.8rem;
  }
  
  .slide-texts p {
    font-size: 1rem;
    line-height: 1.5;
  }
  
  .carousel-nav button {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
  
  .carousel-nav {
    padding: 0 15px;
  }

  .indicator {
    width: 8px;
    height: 8px;
    margin: 0 4px;
  }
}
</style>