<template>
  <v-content>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
          <v-card color="blue">
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 sm4 md3>
                  <v-img
                    src="https://europeanbusinessmagazine.com/wp-content/uploads/2017/07/paris.jpg"
                    height="130px"
                  ></v-img>
                </v-flex>
                <v-flex xs7 sm8 md9>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">Unlimited music now</div>
                      <span>Listen to your favorite artists and albums whenever and wherever, online and offline.</span>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat to="/meetups/1">
                      <v-icon left>arrow_forward</v-icon>View Event
                    </v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>