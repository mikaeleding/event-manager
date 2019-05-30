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
              <div v-if="adminAccount">
                <h3 style="margin-top: 10px">Registered Users({{numberRegistered}})</h3>
                <span v-for="user in listOfUsers" :key="user">{{user}} &nbsp;</span>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <app-meetup-register :meetupId="meetup.id"></app-meetup-register> -->
              <v-btn @click="registerEvent">Register</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { setTimeout } from "timers";
export default {
  props: ["id"],
  data() {
    return {
      listOfUsers: [],
      adminAccount: false,
      numberRegistered: 0
    };
  },
  created() {
    setTimeout(() => {
      this.listOfUsers = this.$store.getters.loadedMeetup(this.id).listOfUsers;
      this.numberRegistered = this.listOfUsers.length;
      console.log(this.listOfUsers);
      this.$store.getters.user.email === "admin@test.com"
        ? (this.adminAccount = true)
        : (this.adminAccount = false);
    }, 2500);
  },
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    meetups() {
      return this.$store.getters.loadedMeetups;
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
    },
    userAccount() {
      return this.$store.getters.user.email === "admin@test.com"
        ? console.log("hi admin")
        : console.log("not admin");
    }
  },
  methods: {
    registerEvent() {
      let uniqueRegister = new Set([...this.listOfUsers]);
      uniqueRegister.add(this.$store.getters.user.email);
      this.listOfUsers = [...uniqueRegister];
      console.log(this.listOfUsers);
      let updateObj = {
        meetup: this.$store.getters.loadedMeetup(this.id)
      };
      updateObj.meetup.listOfUsers = this.listOfUsers;
      this.$store.dispatch("registerEvent", updateObj);

      // this.listOfUsers.push(this.$store.getters.user.email);
      // console.log(this.listOfUsers);
      //console.log(this.listOfUsers);
      //console.log(this.$store.getters.loadedMeetup(this.id).listOfUsers);
      //console.log(this.meetup.listOfUsers);
      // for (let i = 0; i < this.listOfUsers.length; i++) {
      //   if (this.listOfUsers[i] === this.$store.getters.user.email) {
      //     alert("User already registered");
      //   } else {
      //     this.listOfUsers.push(this.$store.getters.user.email);
      //   }
      //   console.log(this.listOfUsers);
      // }
      // let updateObj = {
      //   email: this.$store.getters.user.email,
      //   meetup: this.$store.getters.loadedMeetup(this.id)
      // };
      //console.log(updateObj.meetup.listOfUsers);
      // this.$store.dispatch("registerEvent", updateObj);
      //this.listOfUsers.push(this.$store.getters.user.email);
      // let tempEmail = this.$store.getters.user.email
      // this.$store.dispatch('registerEvent', tempEmail)
    }
  }
};
</script>