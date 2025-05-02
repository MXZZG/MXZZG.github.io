<script setup>
/**
 * 成员介绍组件
 * 展示服务器的管理团队成员信息
 */
import { ref, onMounted } from 'vue';

// 控制元素可见性的状态
const isVisible = ref(false);

// 成员数据
const staffMembers = [
  {
    id: 1,
    name: 'lao_v',
    role: '服主',
    image: '/src/assets/img/lao_v.png',
    description: '服主 lao_v 是冒险者之歌的创建者，负责服务器的整体管理与维护。'
  },
  {
    id: 2,
    name: 'GUN0105',
    role: '建筑师 管理员',
    image: '/src/assets/img/GUN0105.png',
    description: 'GUN0105 是服务器的主要建筑师，设计并搭建了许多精美的建筑，同时还与服主共同管理服务器。'
  }
];

// 组件挂载时添加可见性效果
onMounted(() => {
  // 延迟添加可见性类，以便触发动画效果
  setTimeout(() => {
    isVisible.value = true;
  }, 300);
});
</script>

<template>
  <section id="staff" :class="{ 'visible': isVisible }">
    <h2>成员介绍</h2>
    <div class="staff-container">
      <div v-for="(member, index) in staffMembers" :key="member.id"
           class="staff-member"
           :style="{ animationDelay: `${index * 0.2}s` }">
        <img :src="member.image" :alt="`${member.name} 皮肤`">
        <div class="staff-member-context">
          <h3>{{ member.name }}</h3>
          <h4>{{ member.role }}</h4>
        </div>
        <p>{{ member.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
#staff {
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
}

#staff.visible {
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

.staff-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
}

.staff-member {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 350px;
  text-align: center;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s forwards;
  animation-play-state: paused;
}

#staff.visible .staff-member {
  animation-play-state: running;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.staff-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.staff-member:hover img {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(66, 184, 131, 0.3);
  filter: brightness(1.05);
}

.staff-member img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 0%;
  margin-bottom: 1.5rem;
  border: 6px solid #42b883;
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.2);
  transition: all 0.4s ease;
  filter: brightness(1);
  transform: scale(1);
  transition: all 0.3s ease;
}

.staff-member:hover img {
  transform: scale(1.1);
  border-color: #42b883;
}

.staff-member h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.staff-member h4 {
  font-size: 1rem;
  color: #42b883;
  margin-bottom: 1rem;
}

.staff-member p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #666;
}

@media (max-width: 768px) {
  #staff {
    padding: 3rem 1rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  .staff-member {
    padding: 1.5rem;
  }
}
</style>