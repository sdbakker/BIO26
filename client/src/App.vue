<template>
  <div id="app">
    <!-- <bg :color="tweenedCSSColor"/> -->
    <div
      class="bg"
      :style="{ 'background-color': tweenedCSSColor }"
    >
      <img src="/library.jpg" :style="{ 'transform': 'scale(' + message / 254 + 1 + ')'}"/>
    </div>

    <div class="gui">
      <input
        v-model="colorQuery"
        v-on:keyup.enter="updateColor"
        placeholder="Enter a color"
      >
      <button v-on:click="updateColor">Update</button>
      <p>{{ message }}</p>
    </div>

  </div>
</template>

<script>
/* components */
// import bg from './components/background-color.vue'
/* plugins */
import io from 'socket.io-client'
import Color from 'color-js'
import TWEEN from '@tweenjs/tween.js'

export default {
  name: 'app',
  // components: {
  //   bg,
  // },
  data() {
    return {
      colorQuery: '',
      color: {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1,
      },
      tweenedColor: {},
      background: '#ff0000',
      message: 150,
      socket: io('localhost:3001'),
    }
  },
  created() {
    this.tweenedColor = Object.assign({}, this.color)
  },
  mounted() {
    this.socket.on('MESSAGE', (data) => {
	   this.message = data
    })
  },
  watch: {
    color: function () {
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween(this.tweenedColor)
        .to(this.color, 750)
        .start()

      animate()
    }
  },
  computed: {
    tweenedCSSColor() {
      return new Color({
        red: this.tweenedColor.red,
        green: this.tweenedColor.green,
        blue: this.tweenedColor.blue,
        alpha: this.message / 255.0,
      }).toCSS()
    }
  },
  methods: {
    updateColor: function() {
      this.color = Color(this.colorQuery).toRGB()
      this.colorQuery = ''
    }
  }
}
</script>

<style>
html,
body,
#app {
  margin: 0;
  height: 100%;
}

#app {
  font-family: sans-serif;
}

p {
  margin: 0;
}

input,
button {
  border: 1px solid black;
  padding: .25em;
}

input {
  margin: .75em .75em .75em 0;
}

button {
  background: white;
}

.bg {
  display: flex;
  height: 100%;
  min-height: 100%;
}

.bg > img {
  align-self: center;
  mix-blend-mode: multiply;
}

.gui {
  display: block;
  position: fixed;
  padding: 1em;
  z-index: 99;
  top: 0;
  right: 0;
  z-index: 2;
  background: white;
  /* shadow */
  -webkit-box-shadow: -1px 5px 15px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: -1px 5px 15px 0px rgba(0,0,0,0.5);
  box-shadow: -1px 5px 15px 0px rgba(0,0,0,0.5);
}
</style>
