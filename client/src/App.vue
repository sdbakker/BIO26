<template>
  <div id="app">
    {{ message }}
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'app',
  data() {
    return {
      message: 'hello from client',
      socket : io('localhost:3001'),
    }
  },
  mounted() {
    this.socket.on('MESSAGE', (data) => {
      if (this.message.includes('button')) {
      	this.message = 'hello from client'
      } else {
			this.message = 'hello from button'      
      }
    })
  }
}
</script>

<style>

</style>
