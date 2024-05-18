<template>
  <div class="home-container">
    <h1>ホーム画面</h1>
    <div class="grid-container">
      <div class="grid-item" v-for="item in items" :key="item.id">
        <img :src="item.image_path" alt="Memory Image" />
        <p>{{ item.diary }}</p>
      </div>
    </div>
    <button @click="goToSavePage">保存するボタン</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  async mounted() {
    this.items = await this.$axios.$get("/api/item"); // APIリクエストをモックエンドポイントに変更
  },
  methods: {
    goToSavePage() {
      this.$router.push("/save");
    },
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  max-width: 1000px; /* 最大幅を設定して中央に寄せる */
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.grid-item img {
  max-width: 100%;
  height: auto;
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 1023px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
