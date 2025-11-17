<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { loadData, saveData, type Bookmark} from '../utils/storage';
    
    // Check to see if there is a user logged in
    const role = localStorage.getItem('role');
    
    // prop for: title, subtitle, text, icon, color, @click
    const props = defineProps({
    // Optional String props
    modalValue: Boolean,
    resourceId: Number,
    title: String,
    local: String,
    text: String,
    hours: String,

    // Optional Function prop for a custom click handler
    // The type is typically Function or null/undefined
    onActionClick: Function 
    });
    const emit = defineEmits(['update:modelValue']);
    
    // Get localStorage data
    const data = loadData();
    let bookmarks = ref<Bookmark[]>([]);  
    
    // Set type user later
    // Find student account
    const studentData = data.users.find((user: any)=> user.role === 'student');
    // Get bookmarks of found student account
    let savedBookmarks = studentData.bookmarks;
    bookmarks.value = savedBookmarks;
    // Using ref to have it update in realtime and to check if bookmark is clicked for each card 
    const isBookmarked = ref(false);

    // Check to see if card bookmark is true to set correct icon
    const bookmarkIcon = computed(()=>{
        return isBookmarked.value ? 'mdi-bookmark' : 'mdi-bookmark-outline';
    })

    // Check to see if card bookmark is true to set correct icon color
    const bookmarkColor = computed(()=>{
        return isBookmarked.value ? 'uni-gold' : 'black';
    })

    // Every time the card mounts for how many they are (will re-mount from looping on parent component)
    // will change bookmark to correct value
    if (role && role==='student'){
        if(savedBookmarks.find((mark: Bookmark)=>mark.resourceId == props.resourceId)) {
            isBookmarked.value = !isBookmarked.value;
        }
    }

    // Run when clicking on bookmark, Save or delete depending on bookmark status
    const toggleBookmark = () => {
        if (!role && role!='admin') {
            // If not signed in open login modal
            emit('update:modelValue', true); 
        }
        else if (role==='student') {
            // If bookmark is already saved then delete it since user if trying to unbookmark
            if (savedBookmarks.find((mark: Bookmark)=>mark.resourceId == props.resourceId)) {
                const newBookmarks = savedBookmarks.filter((mark: any)=> mark.resourceId !== props.resourceId);
                // later make currentUser in localStorage and pass in id to do this
                //   data.users.findIndex()
                // Reset bookmarks in data then save it
                data.users[1].bookmarks = newBookmarks;
                isBookmarked.value = !isBookmarked.value;
                saveData(data)
            } else {

                let oldData = loadData()
                oldData.users[1].bookmarks.push({
                    "id": savedBookmarks.length + 1,
                    "userId": 2,
                    "resourceId": props.resourceId || 0
                })
                // save data with new pushed bookmark added to it
                saveData(oldData)
                isBookmarked.value = !isBookmarked.value;
            }
        }
    }
</script>

<template>
    <v-card 
    class="w-100 pb-2"
    :title='props.title' 
    :subtitle="props.local"    
    :text='props.text' 
    elevation="4">
      <v-icon
        :icon="bookmarkIcon"
        :color="bookmarkColor"
        end
        class="position-absolute"
        style="cursor: pointer; top: 15px; right: 15px;"
        @click="toggleBookmark"
      ></v-icon>        
      <h5 class="ml-4 mb-1">{{ props.hours }}</h5>
    </v-card>
</template>

<style lang="scss" scoped>

</style>