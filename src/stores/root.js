import { defineStore } from 'pinia'
import axios from 'axios'
import { INGREDIENTS_URL, COCKTAILS_URL } from '../constants/index'

export const useRootStore = defineStore('root', {
    state: () => ({
        ingredients: [],
        ingredient: null,
        cocktails: []
    }),
    actions: {
        async getIngredients() {
            const responce = await axios.get(INGREDIENTS_URL)
            this.ingredients = responce?.data?.drinks
        },
        // получаем массив коктейлей, 
        // у каждого коктейля есть три поля
        // (idDrink - id коктейля; strDrink - название коктейля; strDrinkThumb - картинка коктейля)
        async getCocktails(ingredient) {
            const responce = await axios.get(`${COCKTAILS_URL}${ingredient}`)
            this.cocktails = responce?.data?.drinks
        },
        setIngredient(valIngredient) {
            this.ingredient = valIngredient;
        }
    }
})