<script setup>
/**
 * 加入我们组件
 * 展示加入服务器的方式和链接
 */
import { ref, onMounted } from 'vue';

// 控制元素可见性的状态
const isVisible = ref(false);

// 组件挂载时添加可见性效果
onMounted(() => {
  // 延迟添加可见性类，以便触发动画效果
  setTimeout(() => {
    isVisible.value = true;
  }, 300);
});
</script>

<template>
  <section id="join" :class="{ 'visible': isVisible }">
    <h2>加入我们</h2>
    <p>赶快加入我们吧，一起踏上这段激动人心的旅程。</p>
    <div class="join-button-container">
      <a href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=YlKiPDg3pchYjxKYjTWbXXKnQWKMfaiJ&authKey=glkupLiSqL2LoUFBVfVrPYdHk%2BVE%2FI2Os0Z9u%2FfWOs0MHLwI60gNHly2Rq95RXCr&noverify=0&group_code=246721795" class="join-button" target="_blank" rel="noopener">
        <span class="join-icon">🔗</span>
        <span>加入QQ群: 246721795</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
#join {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
}

#join.visible {
  opacity: 1;
  transform: translateY(0);
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: #42b883;
  border-radius: 3px;
}

p {
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 800px;
  margin: 0 auto 2rem;
}

.join-button-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.join-button {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #42b883;
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(66, 184, 131, 0.3);
}

.join-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(66, 184, 131, 0.4);
  background-color: #3aa876;
}

.join-icon {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  #join {
    padding: 3rem 1rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  p {
    font-size: 1rem;
  }
  
  .join-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>