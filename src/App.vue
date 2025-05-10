<script setup>
/**
 * 主应用组件
 * 作为应用的布局容器，包含导航栏和页脚，中间显示路由组件
 */
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="app">
    <Navbar />
    <main>
      <router-view />
    </main>
    <footer>
      <div class="footer-content">
        <p>&copy; {{ new Date().getFullYear() }} 冒险者之歌服务器 - 版权所有</p>
      </div>
    </footer>
  </div>
</template>

<style>
:root {
  --transition-speed: 0.3s;
  --accent-color: #42b883;
  --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

html, body, #app {
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f8f8;
  /* height: 100% 已被整合到 html, body, #app 选择器中 */
}

.app {
  display: flex;
  flex-direction: column;
  height: 100%; /* Changed from min-height: 100vh */
}

main {
  flex: 1;
}

footer {
  background-color: #333;
  color: white;
  padding: 2rem 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 0 1rem;
}

@media (max-width: 768px) {
  footer {
    padding: 1.5rem 0;
  }
}
</style>
