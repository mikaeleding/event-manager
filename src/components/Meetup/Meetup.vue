<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title>{{meetup.title}}</v-card-title>
            <v-img :src="meetup.imageUrl" height="400px"></v-img>
            <v-card-text>
              <div class="info--text">{{meetup.date}} - Paris</div>
              <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, magnam.</div>
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
    }
  }
};
</script>