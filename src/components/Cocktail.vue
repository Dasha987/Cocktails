<script setup>
// пропс для полученного коктейля от родителя
const props = defineProps({
  cocktail: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="cocktail">
    <!-- переход на страницу определенного коктейля -->
    <RouterLink :to="`/single-cocktail/${cocktail.idDrink}`">
      <div
        :style="`background-image: url(${cocktail.strDrinkThumb})`"
        class="cocktail__img"
      ></div>
    </RouterLink>
    <div class="cocktail__name">{{ cocktail.strDrink }}</div>
  </div>
</template>

<style lang="sass" scoped>
@import "/src/assets/styles/main.sass"
.cocktail
    width: calc( (100% - 76px) / 3 )
    height: 180px

.cocktail__img
     width: 120px
     height: 120px
     margin: 0 auto 15px
     background-repeat: no-repeat
     background-position: center center
     background-size: 100%

.cocktail__name
    max-width: 160px
    font-weight: 400
    letter-spacing: 0.1em
    margin: 0 auto
    cursor: default
</style>
