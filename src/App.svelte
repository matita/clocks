<script>
  import SearchForm from './components/SearchForm.svelte';
  import Footer from './components/Footer.svelte';
  import Clocks from './components/Clocks.svelte'
</script>

<div class="main">
  <SearchForm />

  <input type="radio" id="no-clock" name="clock-actions">
  <Clocks />
</div>

<Footer />



<!-- <script id="clock-tmpl" type="text/html">
  <div class="clock {{cls}}">
    <label for="{{id}}">
      <div class="clock-time"></div>
      <div class="clock-name">{{name}}</div>
      <div class="clock-city">{{city}}</div>
    </label>

    <input type="radio" id="{{id}}" name="clock-actions">
    <div class="clock-actions">
      <div class="clock-action clock-action-rename">Rename</div>
      <div class="clock-action clock-action-delete">Delete</div>
      <div class="clock-action clock-action-changeTime">Test specific time</div>
      <div class="clock-action-close"><label for="no-clock">&times;</label></div>
    </div>
  </div>
</script> -->
