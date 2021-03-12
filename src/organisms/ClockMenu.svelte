<script>
  import { createEventDispatcher } from 'svelte'
  import Overlay from '../atoms/Overlay.svelte'
  import Menu from '../atoms/Menu.svelte'
  import MenuItem from '../atoms/MenuItem.svelte'
  import clocks from '../stores/clocks'
  import { copy, serializeClocks } from '../utils'

  export let clock

  let copied = false

  const dispatch = createEventDispatcher()
  const close = () => dispatch('close')

  function onRenameClick() {
    close()
    const newName = prompt('Name of the clock:', clock.name || '')
    if (newName === null) {
      return
    }
    clocks.rename(clock, newName)
  }

  function onDeleteClick() {
    if (!confirm('Are you sure you want to delete this clock?')) {
      return
    }
    close()
    clocks.delete(clock)
  }

  function onShareClick() {
    if (copied) {
      return
    }

    const url = `${location.protocol}//${location.host}${location.pathname}?clocks=${serializeClocks([clock])}`
    copy(url)
    copied = true
    setTimeout(() => {
      copied = false
      close()
    }, 1000)
  }
</script>

<Overlay on:click={close}>
  <Menu>
    <MenuItem on:click={onRenameClick}>Rename</MenuItem>
    <MenuItem on:click={onShareClick}>{ copied ? 'Link copied!' : 'Share' }</MenuItem>
    <MenuItem on:click={onDeleteClick}>Delete</MenuItem>
  </Menu>
</Overlay>
