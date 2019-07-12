
<template>
  <div id="app">
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'app',
  data() {
    return {
      socket : io('localhost:3001')
    }
  }
}
</script>

<style>

</style>
