import { shallowMount } from '@vue/test-utils'
import TestRenderFunction from '../../src/components/TestRenderFunction.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const level = 1
    const wrapper = shallowMount(TestRenderFunction, {
      propsData: { level }
    })
    expect(wrapper.text()).toMatch(`h${level}`)
  })
})
