export const addClass = {
  name: 'addClass',
  bind(el: HTMLElement, binding: any) {
    const { name, value, arg } = binding
    el.classList.add(value)
    console.log(`directive ${name} -`, arg)
  }
}
