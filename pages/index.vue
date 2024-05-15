<template>
  <div>
    <h1>ホーム画面</h1>
    <div v-for="item in items" :key="item.id">
      <img :src="item.image_path" alt="Memory Image" />
      <p>{{ item.diary }}</p>
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
