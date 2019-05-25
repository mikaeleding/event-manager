<template>
  <v-content>
    <v-container>
      <v-layout row>
        <v-flex x12 sm6 offset-sm3>
          <h1>Create a new Event</h1>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <form @submit.prevent="onCreateMeetup">
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field name="title" label="Title" id="title" v-model="title" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                  name="location"
                  label="Location"
                  id="location"
                  v-model="location"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-btn raised @click="onPickFile">Upload Image</v-btn>
                <input
                  type="file"
                  style="display: none"
                  ref="fileInput"
                  accept="image/*"
                  @change="onFilePicked"
                >
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <img :src="imageUrl" height="150">
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                  name="description"
                  label="Description"
                  id="description"
                  v-model="description"
                  multi-line
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <h4>Choose a Date & Time</h4>
              </v-flex>
            </v-layout>
            <v-layout align-center justify-center row fill-height wrap>
              <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                <v-date-picker v-model="date"></v-date-picker>
              </v-flex>

              <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-time-picker v-model="time"></v-time-picker>
              </v-flex>
            </v-layout>
            <v-layout align-center justify-center row fill-height>
              <v-flex xs12 sm6 offset-sm3>
                <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Event</v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      listOfUsers: [],
      date: null,
      time: new Date(),
      image: null
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
    },
    submittableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        const hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }

      return date;
    }
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime,
        listOfUsers: this.listOfUsers
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>