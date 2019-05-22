<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItem" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Event Manager</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="item in menuItem" :key="item.title" :to="item.link" flat>
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld'

export default {
  name: "App",
  // components: {
  //   HelloWorld
  // },
  data() {
    return {
      sideNav: false,
      menuItem: [
        { icon: "event", title: "View Events", link: "/meetups" },
        { icon: "room", title: "Organize Event", link: "/meetup/new" },
        { icon: "person", title: "Profile", link: "/profile" },
        { icon: "face", title: "Sign Up", link: "/signup" },
        { icon: "lock_open", title: "Log In", link: "/login" }
      ]
    };
  }
};
</script>
