<script setup>
import AppLayout from "../components/AppLayout.vue";
import Cocktail from "../components/Cocktail.vue";
import { useRootStore } from "@/stores/root";
import { storeToRefs } from "pinia";

// получаем список ингредиентов с сервера
const rootIngredient = useRootStore();
rootIngredient.getIngredients();

// забираем массив ингредиентов и делаем его реактивным, чтобы он не был пустым
const { ingredients, ingredient, cocktails } = storeToRefs(rootIngredient);

function getCocktails() {
  rootIngredient.getCocktails(rootIngredient.ingredient);
}

function removeIngredients() {
  rootIngredient.setIngredient(null);
}
</script>

<template>
  <AppLayout
    imgUrl="/src/assets/img/cocktail_home.jpg"
    :backFunc="removeIngredients"
    :isBackBtnVisible="ingredient"
  >
    <div class="wrapper">
      <div class="info" v-if="!ingredient || !cocktails">
        <h1 class="title t1">CHOOSE YOUR DRINK</h1>
        <div class="line"></div>
        <!-- @change - событие на изменение значения события, для работы с коктейлями  -->
        <!-- filterable - возможность писать вручную ингредиенты -->
        <!-- allow-create - создавать ингредиенты вручную -->
        <el-select
          v-model="rootIngredient.ingredient"
          class="select"
          placeholder="Choose main ingredient"
          size="large"
          filterable
          allow-create
          @change="getCocktails"
        >
          <el-option
            v-for="item in ingredients"
            :key="item.strIngredient1"
            :label="item.strIngredient1"
            :value="item.strIngredient1"
          />
        </el-select>
        <p class="text">
          Try our delicious cocktail recipes for every occasion. Find delicious
          cocktail recipes by ingredient through our cocktail generator.
        </p>
        <img src="/src/assets/img/cocktails_home.jpg" alt="Cocktails" />
      </div>
      <div class="info" v-else>
        <h1 class="title">COCKTAILS WITH {{ ingredient }}</h1>
        <div class="line"></div>
        <div class="cocktails">
          <!-- перебираем все наши коктейли в массиве, 
          ключом для каждого из них будет id, 
          передаем в дочерний элемент сам коктейль -->
          <Cocktail
            v-for="cocktail in cocktails"
            :key="cocktail.idDrink"
            :cocktail="cocktail"
          />
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<!-- Если <style> имеет scoped, его CSS будет применяться только к элементам текущего компонента -->
<style lang="sass" scoped>
@import "/src/assets/styles/main.sass"

.t1
  margin-top: 20px

.select
    margin-top: 82px
    width: 220px
.text
    color: $textMuted
    max-width: 516px
    font-weight: 400
    letter-spacing: 0.1em
    line-height: 36px
    margin: 50px auto 60px
    cursor: default

.cocktails
  display: flex
  flex-wrap: wrap
  align-items: center
  margin-top: 60px
  max-height: 400px
  overflow-y: auto
  gap: 38px
</style>
