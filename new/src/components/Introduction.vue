<script setup>
/**
 * 服务器介绍组件
 * 展示服务器的基本介绍信息
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
  <section id="introduction" :class="{ 'visible': isVisible }">
    <h2>服务器介绍</h2>
    <p class="welcome-text">欢迎加入"冒险者之歌生存服务器"</p>
    <p class="intro-text">在这个神秘的方块世界里，冒险正在召唤您！这里不仅有精彩纷呈的探索之旅，还有热血刺激的生存挑战，以及一个温馨和睦的社区。</p>
    <p class="intro-text">作为一款生存服务器，无论您是渴望成为顶尖生存高手的玩家，还是热爱探索未知世界的冒险家，我们都将为您敞开大门。</p>
    <p class="intro-text">在这里，您将与志同道合的伙伴一起，共同面对挑战、克服困难，书写属于我们的生存传奇！</p>
  </section>
</template>

<style scoped>
#introduction {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
}

#introduction.visible {
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
  margin: 0 auto;
  margin-bottom: 1rem;
}

.welcome-text {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #42b883;
}

.intro-text {
  margin-bottom: 1.2rem;
}

@media (max-width: 768px) {
  #introduction {
    padding: 3rem 1rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  p {
    font-size: 1rem;
  }
}
</style>