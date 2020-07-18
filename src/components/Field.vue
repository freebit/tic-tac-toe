<template>
  <div class="field" @click="fieldClickHandler">
    <div class="cell cross"></div>
    <div class="cell zero"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Field',
    props: {},
    data: () => ({}),
    methods: {
      fieldClickHandler(evt) {
        if (!evt.target.classList.contains('cell') || evt.target.classList.contains('cross')) return
        evt.target.classList.add('cross')
      }
    }
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .field {
    display: grid;
    position: relative;
    width: 100vh;
    height: 100vh;
    margin: 0 auto;

    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0.2em;
  }

  .cell {
    position: relative;
    background-color: cadetblue;

    &::before,
    &::after {
      opacity: 0;
    }

    &.cross {
      &::before,
      &::after {
        position: absolute;
        display: block;
        content: '';
        width: 10px;
        height: 80%;
        border-radius: 6px;
        background-color: #fff;
        top: 50%;
        left: 50%;
        margin-top: -40%;
        margin-left: -5px;
        opacity: 1;
        transition: opacity ease 0.3s;
      }
      &::before {
        transform: rotate(-45deg);
      }
      &::after {
        transform: rotate(45deg);
      }
    }

    &.zero {
      &::before {
        position: absolute;
        display: block;
        content: '';
        width: 55%;
        height: 55%;
        border-radius: 50%;
        border: 8px solid #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 1;
        transition: opacity ease 0.3s;
      }
    }
  }
</style>
