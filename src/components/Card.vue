<script setup lang="ts">
// prop for: title, subtitle, text, icon, color, @click
const props = defineProps({
  // Optional String props
  title: String,
  subtitle: String,
  text: String,

  // Optional Boolean prop (defaults to false if not provided)
  hasActionButton: Boolean, 

  // Optional Function prop for a custom click handler
  // The type is typically Function or null/undefined
  onActionClick: Function 
});
</script>

<template>
    <!-- <v-card title={{  }} text={{  }} elevation="4">
    <v-icon
        :icon="bookmarkIcon"
        :color="bookmarkColor"
        end
        class="position-absolute"
        style="cursor: pointer; top: 15px; right: 15px;"
        @click="toggleBookmark"
    ></v-icon>
    </v-card> -->
</template>

<style lang="scss" scoped>

</style>