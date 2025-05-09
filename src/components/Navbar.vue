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
        <img src="../assets/img/logo.png" alt="服务器Logo" class="logo-img">
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
  background-color: rgba(20, 20, 20, 0.7); /* 更深的背景色，增加对比度 */
  backdrop-filter: blur(12px); /* 增强模糊效果 */
  transition: background-color 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease; /* 分离过渡效果 */
}

.navbar.scrolled {
  padding: 0.75rem 0; /* 调整滚动后的内边距 */
  background-color: rgba(10, 10, 10, 0.85); /* 更深的滚动后背景 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.35); /* 增强阴影效果 */
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
  height: 45px; /* 略微增大Logo尺寸 */
  margin-right: 12px;
  transition: transform 0.3s ease, filter 0.3s ease; /* 添加滤镜过渡 */
}

.logo-img:hover {
  transform: scale(1.1) rotate(3deg); /* 调整悬停旋转角度 */
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3)); /* 添加悬停发光效果 */
}

.logo {
  font-size: 1.6rem; /* 略微增大Logo文字大小 */
  margin: 0;
  font-weight: 700; /* 加粗Logo文字 */
  text-shadow: 0 2px 5px rgba(0,0,0,0.3);
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #e0e0e0; /* 调整链接颜色为浅灰色 */
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 0.6rem 1rem; /* 调整内边距 */
  border-radius: 6px; /* 增加圆角 */
  transition: color 0.3s ease, background-color 0.3s ease; /* 分离过渡 */
}

.nav-links a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px; /* 调整下划线位置 */
  left: 0;
  transform: translateX(0);
  background-color: #42b883;
  transition: width 0.3s ease;
}

.nav-links a:hover {
  color: white; /* 悬停时文字变白 */
  background-color: rgba(255, 255, 255, 0.08); /* 调整悬停背景色透明度 */
}

.nav-links a:hover::after {
  width: 100%; /* 悬停时下划线充满整个链接 */
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
  background-color: #f0f0f0; /* 调整汉堡菜单颜色 */
  border-radius: 3px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); /* 添加更活泼的过渡效果 */
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
    z-index: 1001; /* 确保汉堡菜单在导航链接之上 */
  }
  
  .nav-links {
    position: fixed;
    top: 0; /* 从顶部开始 */
    left: 0;
    width: 100%;
    height: 100vh; /* 占据整个视口高度 */
    flex-direction: column;
    justify-content: center; /* 垂直居中链接 */
    align-items: center; /* 水平居中链接 */
    background-color: rgba(10, 10, 10, 0.98); /* 更深的背景，接近不透明 */
    padding: 2rem 0;
    gap: 1.5rem; /* 调整链接间距 */
    transform: translateX(100%); /* 从右侧滑入 */
    opacity: 0;
    pointer-events: none;
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s ease; /* 调整过渡效果和时长 */
  }
  
  .nav-links.active {
    transform: translateX(0); /* 滑入到视图 */
    opacity: 1;
    pointer-events: all;
  }
  
  .nav-links li {
    width: auto; /* 移除宽度100% */
    text-align: center;
  }
  
  .nav-links a {
    display: inline-block; /* 改为inline-block以适应内容 */
    padding: 1rem 1.5rem; /* 调整内边距 */
    font-size: 1.2rem; /* 增大移动端链接字体 */
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