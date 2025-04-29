<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.<br><br>
      For <a href="https://www.dropbox.com/scl/fi/4vkk87ybcyq3co296d1ht/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5.paper?dl=0&rlkey=ll8zagkqphw0lamrcu68dddri&st=94gglnpg" target="_blank" rel="noopener">this</a>
      task.<br><br>
      What next? Nobody knows ...
    </h3>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings {
  & h1,
  & h3 {
    text-align: center;
  }
}

@media (min-width: 1024px) {
  .greetings {
    & h1,
    & h3 {
      text-align: left;
    }
  }
}
</style>
