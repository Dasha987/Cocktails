<script setup>
import AppLayout from "../components/AppLayout.vue";
import { computed, ref } from "vue";
import { COCKTAILS_RANDOM, INGREDIENTS_IMG } from "../constants/index";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const cocktail = ref(null);

const ingredients = computed(() => {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    if (!cocktail.value[`strIngredient${i}`]) break;

    const ingredient = cocktail.value[`strIngredient${i}`];
    ingredients.push(ingredient);
  }
  return ingredients;
});

async function getInfoRandomCocktail() {
  const responce = await axios.get(COCKTAILS_RANDOM);
  cocktail.value = responce?.data?.drinks[0];
}
getInfoRandomCocktail();
</script>

<template>
  <div class="info" v-if="cocktail">
    <AppLayout :imgUrl="cocktail.strDrinkThumb">
      <div class="wrapper-single-random">
        <h1 class="title">{{ cocktail.strDrink }}</h1>
        <div class="line"></div>
        <div class="slider">
          <swiper :slides-per-view="3" :space-between="50" class="swiper">
            <swiper-slide v-for="(ingredient, key) in ingredients" :key="key">
              <img
                class="img-ingredient"
                :src="`${INGREDIENTS_IMG}${ingredient}-Small.png`"
                alt=""
              />
              <div>{{ ingredient }}</div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="instructions-cocktail">{{ cocktail.strInstructions }}</div>
      </div>
    </AppLayout>
  </div>
</template>

<style lang="sass" scoped>
@import "/src/assets/styles/main.sass"

.slider
  margin: 50px 0

.swiper
  max-width: 586px
  cursor: pointer

.img-ingredient
  margin: 0 0 20px

.instructions-cocktail
  margin: 0 60px
</style>
