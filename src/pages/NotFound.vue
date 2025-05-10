<template>
  <div class="not-found-page">

  </div>
</template>

<script setup>
/**
 * 404 页面组件
 * 当用户访问不存在的路径时显示此页面
 */
</script>

<style scoped>
.not-found-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 使其填充父容器 main 的高度 */
  text-align: center;
  background-image: url('../assets/img/404.png');
  background-size: cover;
  background-position: center;
  color: #fff; /* 根据背景图调整文字颜色以保证可读性 */
  padding: 20px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  /* 可以根据需要添加响应式样式 */
}
</style>