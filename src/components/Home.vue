<template>
  <v-content>
    <v-container>
      <!-- <v-layout row wrap class="mb-3">
        <v-flex xs12 sm6 class="text-xs-center text-sm-right">
          <v-btn large router="/meetups" class="info">Explore Events</v-btn>
        </v-flex>
        <v-flex xs12 sm6 class="text-xs-center text-sm-left">
          <v-btn large router="/meetup/new" class="info">Organize Events</v-btn>
        </v-flex>
      </v-layout>-->
      <v-layout>
        <v-flex xs12 class="text-xs-center mt-5">
          <v-progress-circular indeterminate :size="70" :width="7" v-if="loading"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="!loading">
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              style="cursor:pointer"
              v-for="meetup in meetups"
              :key="meetup.id"
              :src="meetup.imageUrl"
              @click="onLoadMeetup(meetup.id)"
            >
              <div class="title">{{meetup.title}}</div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetups/" + id);
    }
  }
};
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgb(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
}
</style>