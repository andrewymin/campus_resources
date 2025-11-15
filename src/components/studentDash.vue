<script lang="ts" setup>
  import { loadData, type Bookmark, type Resource } from '../utils/storage';

  let bookmarks: Resource[] = []  
  const data = loadData();
  // substitute for find('user id') 
  const studentBookmarkIds = data.users[1].bookmarks;

  studentBookmarkIds.forEach((mark: Bookmark)=>{
    bookmarks.push(data.resources.find((item: Resource)=> mark.resourceId == item.id))
  }) 
  

</script>

<template>
        <v-row>
          <v-col cols="12">
            <h1 class="logged-title-font pl-5 pt-4">Your Bookmarks</h1>
          </v-col>
          <v-col 
            v-for="item in bookmarks" 
            :key="item.id" 
            cols="12" 
            sm="6" 
            md="4"
          >
            <v-card class="pa-4 rounded-lg">
              <v-card-title>{{ item.title }}</v-card-title>
              <v-card-text>{{ item.description }}</v-card-text>
              <v-card-actions>
                <v-btn text color="primary">View</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
</template>

