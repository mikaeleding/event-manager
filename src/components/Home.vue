<template>
  <v-content>
    <v-container>
      <v-layout row wrap class="mb-3">
        <v-flex xs12 sm6 class="text-xs-center text-sm-right">
          <v-btn large router="/meetups" class="info">Explore Events</v-btn>
        </v-flex>
        <v-flex xs12 sm6 class="text-xs-center text-sm-left">
          <v-btn large router="/meetup/new" class="info">Organize Events</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
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
  data() {
    return {
      meetups: [
        {
          imageUrl:
            "https://cdn.shopify.com/s/files/1/0882/1686/products/Times_Square_New_York_City_c0761858-c9cf-4d99-9363-446124ed161f_large.jpg?v=1498541105",
          id: "asd",
          title: "Meetup in NY"
        },
        {
          imageUrl:
            "https://europeanbusinessmagazine.com/wp-content/uploads/2017/07/paris.jpg",
          id: "qwe",
          title: "Meetup in Paris"
        }
      ]
    };
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