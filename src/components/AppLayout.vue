<!-- required: если этот параметр имеет значение true, 
то для данного свойства обязательно надо ввести значение -->
<script setup>
import { Back } from "@element-plus/icons-vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ROUTES_PATHS } from "@/constants";
const props = defineProps({
  imgUrl: {
    type: String,
    required: true,
  },
  backFunc: {
    type: Function,
  },
  isBackBtnVisible: {
    type: Boolean,
    default: true,
  },
});

// весь путь страницы
const route = useRoute();
// для перехода на нужную страницу
const router = useRouter();

//путь текущей станицы
const routeName = computed(() => route.path);

// функция, благодаря которой осуществляется переход на страницу рандомного коктейля
function goForCocktailRandom() {
  router.push(ROUTES_PATHS.RANDOM_COCKTAIL);

  //если находимся уже на странице рандомного коктейля, то перезагрузить страницу
  if (routeName.value == ROUTES_PATHS.RANDOM_COCKTAIL) {
    router.go();
  }
}

function goBack() {
  props.backFunc ? props.backFunc() : router.go(-1);
}
</script>

<template>
  <div class="root">
    <div :style="`background-image: url(${imgUrl})`" class="img"></div>
    <div class="main">
      <div class="btns">
        <el-button
          class="btn-back"
          type="primary"
          :icon="Back"
          circle
          @click="goBack"
          v-if="isBackBtnVisible"
        />
        <el-button class="btn" @click="goForCocktailRandom"
          >Get random cocktail</el-button
        >
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import "/src/assets/styles/main.sass"

.root
    display: flex
    min-height: 100vh

.img
    width: 50%
    background-repeat: no-repeat
    background-position: center center
    background-size: cover

.main
    width: 50%
    // position: relative

.btn
    // position: absolute
    // right: 40px
    // top: 32px
    color: $text
    padding: 8px 16px
    border: none
    background-color: $accent
    font-size: 16px
    font-family: 'Raleway'
    font-weight: 400
    &:hover
        background-color: darken($accent, 20%)
        color: darken($text, 20%)

.btns
  margin: 32px 40px 0 35px
  display: flex
  justify-content: space-between
  // align-items: center
</style>
