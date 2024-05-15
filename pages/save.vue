<template>
  <div>
    <h1>保存画面</h1>
    <input v-model="query" @input="searchMusic" placeholder="曲を検索" />
    <ul>
      <li v-for="track in tracks" :key="track.id" @click="selectTrack(track)">
        {{ track.name }} - {{ track.artists[0].name }}
      </li>
    </ul>
    <input type="file" @change="uploadImage" />
    <textarea v-model="diary" placeholder="何があったの？"></textarea>
    <button @click="saveMemory">登録する！</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      query: "",
      tracks: [],
      selectedTrack: null,
      image: null,
      diary: "",
    };
  },
  methods: {
    async searchMusic() {
      const tokenResponse = await axios.get("/api/spotify-token");
      const token = tokenResponse.data.access_token;

      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${this.query}&type=track`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      this.tracks = response.data.tracks.items;
    },
    selectTrack(track) {
      this.selectedTrack = track;
      this.query = `${track.name} - ${track.artists[0].name}`;
    },
    uploadImage(event) {
      this.image = event.target.files[0];
    },
    async saveMemory() {
      const formData = new FormData();
      formData.append("music_id", this.selectedTrack.id);
      formData.append("memory_date", new Date().toISOString());
      formData.append("diary", this.diary);
      formData.append("image", this.image);

      await this.$axios.$post("/item", formData);

      this.$router.push("/");
    },
  },
};
</script>
