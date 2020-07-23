<template>
  <div class="user" v-addClass:[style]="`current`">
    <span>Игрок:&nbsp;</span>
    <slot name="firstName" :user="user">firstName</slot>&nbsp;
    <slot name="lastName" :user="user">lastName</slot>
  </div>
</template>

<script>
  import { addClass } from '../directives'
  export default {
    name: 'CurrentPlayer',
    directives: {
      [addClass.name]: addClass
    },
    data: () => ({
      user: {
        firstName: 'Andrey',
        lastName: 'Anikin'
      },
      style: 'red'
    })
  }
</script>
