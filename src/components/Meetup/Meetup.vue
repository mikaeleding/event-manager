<template>
  <v-content>
    <v-container>
      <v-layout row wrap v-if="!checkMeetupLoad">
        <v-flex xs12 class="text-xs-center mt-5">
          <v-progress-circular indeterminate :size="70" :width="7"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-else>
        <v-flex xs12>
          <v-card>
            <v-card-title>{{meetup.title}}</v-card-title>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-details :meetup="meetup"></app-edit-details>
            </template>
            <v-img :src="meetup.imageUrl" height="400px"></v-img>
            <v-card-text>
              <div class="info--text">{{meetup.date | date}} - {{meetup.location}}</div>
              <div>{{meetup.description}}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    loading() {
      return this.$state.getters.loading;
    },
    checkMeetupLoad() {
      return this.meetup != null ? true : false;
    }
  }
};
</script>