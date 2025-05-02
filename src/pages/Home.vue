<script setup>
/**
 * 首页组件
 * 展示网站的主要内容，包括轮播图、介绍、团队和加入我们等部分
 */
import Carousel from '../components/Carousel.vue';
import Introduction from '../components/Introduction.vue';
import StaffSection from '../components/StaffSection.vue';
import JoinSection from '../components/JoinSection.vue';
</script>

<template>
  <div class="home">
    <main>
      <Carousel />
      <section id="introduction">
        <Introduction />
      </section>
      <section id="staff">
        <StaffSection />
      </section>
      <section id="join">
        <JoinSection />
      </section>
    </main>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  flex: 1;
}

main {
  flex: 1;
}
</style>