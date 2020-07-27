<template>
  <div class="my-input">
    <input v-bind="$attrs" v-on="myListeners" ref="input" @focus="focused = true" @blur="focused = false" />
    <button type="button" @click="clear">&times;</button>
  </div>
</template>

<script>
  export default {
    name: 'MyInput',
    inheritAttrs: false,
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data: () => ({
      focused: false
    }),
    computed: {
      myListeners() {
        return {
          ...this.$listeners,
          input: evt => {
            this.$emit('input', evt.target.value)
          }
        }
      }
    },
    methods: {
      clear() {
        this.$refs.input.value = ''
        this.$emit('input', '')
        this.$refs.input.focus()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-input {
    position: relative;
  }
</style>
