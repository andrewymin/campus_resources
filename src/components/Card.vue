<script setup lang="ts">
    import { ref, computed } from 'vue';
    import { loadData, saveData} from '../utils/storage';
    
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

    const data = loadData();
    // Set type user later
    const studentData = data.users.find((user: any)=> user.role === 'student');
    let bookmarks = studentData.bookmarks;
    const isBookmarked = ref(false);

    const bookmarkIcon = computed(()=>{
        return isBookmarked.value ? 'mdi-bookmark' : 'mdi-bookmark-outline';
    })

    const bookmarkColor = computed(()=>{
        return isBookmarked.value ? 'uni-gold' : 'black';
    })

    // every time the card mounts for how many they are, will change bookmark
    if (role && role==='student'){
        if(bookmarks.find((mark: any)=>mark.resourceId == props.resourceId)) {
            isBookmarked.value = !isBookmarked.value;
        }
    }

    const toggleBookmark = () => {
        if (!role && role!='admin') {
            emit('update:modelValue', true); 
        }
        else if (role==='student') {
            // check if bookmark is already saved then delete it
            if (bookmarks.find((mark: any)=>mark.resourceId == props.resourceId)) {
                const newBookmarks = bookmarks.filter((mark: any)=> mark.resourceId !== props.resourceId);
                // later make currentUser in localStorage and pass in id to do this
                // data.users.findIndex()
                data.users[1].bookmarks = newBookmarks;
                isBookmarked.value = !isBookmarked.value;
                saveData(data)
            } else {
                // save bookmark
                bookmarks.push({
                    "id": bookmarks.length + 1,
                    "userId": 2,
                    "resourceId": props.resourceId
                })
                // save data with new pushed bookmark added to it
                saveData(data)
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