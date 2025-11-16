<script lang="ts" setup>
  import { ref } from 'vue';
  import { loadData, saveData, type Bookmark, type Resource } from '../utils/storage';

  const bookmarkConfirm = ref(false);
  let bookmarkId: number = 0;
  let bookmarks = ref<Resource[]>([]);  

  const data = loadData();
  // substitute for find('user id') 
  let studentBookmarkIds = data.users[1].bookmarks;

  studentBookmarkIds.forEach((mark: Bookmark)=>{
    let foundItem = data.resources.find((item: Resource)=> mark.resourceId == item.id)
    bookmarks.value.push(foundItem)
  }) 

  const openDialog = (key: number) => {
    bookmarkId = key;
    bookmarkConfirm.value = !bookmarkConfirm.value;
  }
  
  const deleteBookmark = () => {
    bookmarkConfirm.value = !bookmarkConfirm.value;
    const newBookmarks = bookmarks.value.filter((mark: Resource)=> mark.id != bookmarkId);
    bookmarks.value = newBookmarks;
    const newUserBookmarks = studentBookmarkIds.filter((mark: Bookmark)=> mark.resourceId != bookmarkId);
    data.users[1].bookmarks = newUserBookmarks;
    saveData(data)
  }
  

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
        <v-icon
          icon="mdi-bookmark"
          color="uni-gold"
          end
          class="position-absolute"
          style="cursor: pointer; top: 15px; right: 15px;"
          @click="openDialog(item.id)"
      ></v-icon>  
      </v-card>
    </v-col>
  </v-row>
  <v-dialog 
    v-model="bookmarkConfirm"
    persistent
    max-width="400"
  >
    <v-card
        prepend-icon="mdi-bookmark-remove-outline"
        text="Are you sure you want to unbookmark this?"
        title="Unbookmark?"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="bookmarkConfirm = false">
            No
          </v-btn>

          <v-btn @click="deleteBookmark">
            Yes
          </v-btn>
        </template>
      </v-card>
  </v-dialog>
</template>

