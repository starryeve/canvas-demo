<template>
  <clock />
  <next />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Clock from './components/Clock.vue';
import Next from './components/Next.vue';


export default defineComponent({
  name: 'App',
  components: {
    Clock,
    Next
  },
 
});
</script>

<style lang="scss" scoped>
  #qpp {
    width: 100%;
    height: 100%;
  }
</style>>
