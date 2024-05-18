<template>
    <div>
      <h1>Track Recommendations</h1>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <h2>Upper Tracks</h2>
        <ul>
          <li v-for="track in upperTracks" :key="track.id">
            {{ track.name }} by {{ track.artists.map(artist => artist.name).join(', ') }}
          </li>
        </ul>
        <h2>Downer Tracks</h2>
        <ul>
          <li v-for="track in downerTracks" :key="track.id">
            {{ track.name }} by {{ track.artists.map(artist => artist.name).join(', ') }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    data() {
      return {
        loading: true,
        upperTracks: [],
        downerTracks: [],
        accessToken: 'your_access_token_here',
        audioFeature: {
          // Replace with your audio feature data
          danceability: 0.5,
          energy: 0.6,
          id: 'track_id',
          instrumentalness: 0.1,
          key: 0,
          liveness: 0.2,
          loudness: -5,
          mode: 1,
          tempo: 120,
          valence: 0.7,
          track_href: 'https://api.spotify.com/v1/tracks/track_id'
        }
      }
    },
    async mounted() {
      try {
        const [upperTracks, downerTracks] = await Promise.all([
          getRecommendTracks(this.audioFeature, this.accessToken, 'upper'),
          getRecommendTracks(this.audioFeature, this.accessToken, 'downer')
        ]);
        this.upperTracks = upperTracks;
        this.downerTracks = downerTracks;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    methods: {
      getRecommendTracks(audioFeature, accessToken, type) {
        // Define types inside the component
        type RecommendType = 'upper' | 'downer';
  
        type AudioFeature = {
          danceability: number,
          energy: number,
          id: string,
          instrumentalness: number,
          key: number,
          liveness: number,
          loudness: number,
          mode: number,
          tempo: number,
          valence: number,
          track_href: string
        };
  
        type SpotifyRecommendApiResponse = {
          tracks: TrackItem[]
        };
  
        type TrackItem = {
          album: { href: string, name: string, images: { url: string, height: number }[] },
          artists: { href: string, name: string }[],
          href: string,
          id: string,
          name: string,
          uri: string,
          duration_ms: number,
        };
  
        type SpotifyFeaturesApiResponse = {
          audio_features: AudioFeature[]
        };
  
        // ... (rest of the code remains the same)
      }
    }
  });
  </script>