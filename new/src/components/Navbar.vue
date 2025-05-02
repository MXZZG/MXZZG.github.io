<script setup>
/**
 * 导航栏组件
 * 负责显示网站顶部的导航菜单，包括Logo和导航链接
 * 实现了移动端响应式菜单和滚动效果
 */
import { ref, onMounted, onUnmounted } from 'vue';

// 控制导航栏滚动效果的状态
const isScrolled = ref(false);
// 控制移动端菜单显示状态
const isMenuActive = ref(false);

// 处理窗口滚动事件
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// 切换移动端菜单状态
const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
};

// 组件挂载时添加滚动事件监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// 组件卸载时移除滚动事件监听
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <router-link to="/" class="logo-container">
        <img src="/img/logo.png" alt="服务器Logo" class="logo-img">
        <h1 class="logo">冒险者之歌服务器</h1>
      </router-link>
      <div class="menu-toggle" :class="{ 'active': isMenuActive }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul class="nav-links" :class="{ 'active': isMenuActive }">
        <li><router-link to="/#introduction" @click="isMenuActive = false">服务器介绍</router-link></li>
        <li><router-link to="/#staff" @click="isMenuActive = false">成员介绍</router-link></li>
        <li><a href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=YlKiPDg3pchYjxKYjTWbXXKnQWKMfaiJ&authKey=glkupLiSqL2LoUFBVfVrPYdHk%2BVE%2FI2Os0Z9u%2FfWOs0MHLwI60gNHly2Rq95RXCr&noverify=0&group_code=246721795" target="_blank" rel="noopener" @click="isMenuActive = false">加入我们</a></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1rem 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.navbar.scrolled {
  padding: 0.5rem 0;
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.logo-container {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}

.logo-img {
  height: 40px;
  margin-right: 10px;
  transition: transform 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.1) rotate(5deg);
}

.logo {
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #42b883;
  transition: width 0.3s ease;
}

.nav-links a:hover {
  background-color: rgba(255,255,255,0.1);
}

.nav-links a:hover::after {
  width: 80%;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: white;
  border-radius: 3px;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }
  
  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.9);
    padding: 1rem 0;
    gap: 0;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
  }
  
  .nav-links.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }
  
  .nav-links li {
    width: 100%;
    text-align: center;
  }
  
  .nav-links a {
    display: block;
    padding: 1rem 0;
  }
  
  .menu-toggle.active span:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }
  
  .menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }
  
  .menu-toggle.active span:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }
}
</style>