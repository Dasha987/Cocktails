<script setup>
import AppLayout from "../components/AppLayout.vue";
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
import { COCKTAILS_BY_ID } from "../constants/index";
import axios from "axios";

// useRoute() - метод помогает получить всю ту строку, что идет после доменного имени
// в данном случае "/single-cocktail/17840"
const rout = useRoute();
const cocktailId = computed(() => rout.path.split("/").pop());
const cocktail = ref(null);

const ingredients = computed(() => {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    if (!cocktail.value[`strIngredient${i}`]) break;
    const ingredient = {};
    ingredient.id = i;
    ingredient.name = cocktail.value[`strIngredient${i}`];
    ingredient.measure = cocktail.value[`strMeasure${i}`];

    ingredients.push(ingredient);
  }
  return ingredients;
});

async function getInfoCocktail() {
  const responce = await axios.get(`${COCKTAILS_BY_ID}${cocktailId.value}`);
  cocktail.value = responce?.data?.drinks[0];
}

getInfoCocktail();
</script>

<template>
  <div class="info" v-if="cocktail">
    <AppLayout :imgUrl="cocktail.strDrinkThumb">
      <div class="wrapper-single-random">
        <h1 class="title">{{ cocktail.strDrink }}</h1>
        <div class="line"></div>
        <div class="list-ingredients">
          <div class="ingredient" v-for="item in ingredients" :key="item.id">
            <img src="/src/assets/img/item-heart.svg" alt="Heart" />
            {{ item.name }}
            <template v-if="item.measure"> | {{ item.measure }}</template>
          </div>
        </div>
        <div class="instructions-cocktail">{{ cocktail.strInstructions }}</div>
      </div>
    </AppLayout>
  </div>
</template>

<style lang="sass" scoped>
@import "/src/assets/styles/main.sass"

.list-ingredients
    margin: 50px 40px 80px
    display: flex
    flex-direction: column
    gap: 20px
    max-width: 560px
    text-align: left

.ingredient
    display: flex
    align-items: center
    gap: 20px
    font-weight: 400
    font-size: 18px

.instructions-cocktail
    max-width: 516px
    text-align: center
    margin: 0 auto
    font-size: 20px
    line-height: 30px
    letter-spacing: 0.1em
    color: $textMuted
    font-weight: 400
</style>
