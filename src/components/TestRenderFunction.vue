<script>
  export default {
    functional: true,
    props: {
      level: {
        type: Number,
        default: 1
      }
    },
    render: function(h, ctx) {
      const { props, slots } = ctx
      // console.log('context -', ctx)
      return h(`h${props.level}`, slots().default)
    }
  }
</script>
