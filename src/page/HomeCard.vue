<template>
  <div class="home">
    <div class="header">
      <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg" alt="" srcset="">
      <div class="wrapper--input">
        <input type="text" v-model="user_searche_restaurant" placeholder="De quoi avez vous envie ?">
        <div class="search">
          <router-link to="/restaurant">
            <div v-for="(restaurant, i) in search_restaurant" :key="i"        class="container--restaurant--search">
              <div class="wrapper--image">
                <img :src="restaurant.image" alt="" srcset="">
                <p>{{restaurant.name}}</p>
            </div>
            
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="bannier"></div>
    <RestaurantRow v-for="(data, index) in data_restaurant" :key="index" :three_restaurant="data"/>
  </div>
</template>

<script>
  // import
import BDD from '../BDD.js';
import { onMounted, ref, watch } from 'vue';
  // componenets
import RestaurantRow from '../components/RestaurantRow.vue';
export default {
    name: 'HomeCard',
    components:{
    RestaurantRow,
    },
    setup(){
      // constructeur
      class Restaurant{
        constructor(name, note, image, drive_time){
          this.name = name;
          this.note = note;
          this.image = image;
          this.drive_time = drive_time;
        }
      }

      let data_restaurant = ref([]);
      let all_restaurant = [];
      
      // fuction makeDataRestaurant(){.......} 
      // remplire le tableau data restaurant
      const makeDataRestaurant = ()=>{
        
        let three_restaurant = [];
        for(const restaurant of BDD){
          const new_restaurant =  new Restaurant(restaurant.name, restaurant.note, restaurant.image, restaurant.drive_time);
          all_restaurant.push(new_restaurant);
          if(three_restaurant.length === 2){
            three_restaurant.push(new_restaurant);
            data_restaurant.value.push(three_restaurant);
            three_restaurant = [];
          }
          else{
            three_restaurant.push(new_restaurant);
          }
        }
      }
      onMounted(makeDataRestaurant);
      // user seache restaurant 
      let user_searche_restaurant = ref("");
      let search_restaurant = ref([]);
      // lorsque la valeur user_searche_restaurant change lancer une fonction derière
      watch(user_searche_restaurant, (newValue) => {
        let regex = RegExp(newValue.toLocaleLowerCase());

        let new_search_restaurant = all_restaurant.filter(restaurant => regex.test(restaurant.name.toLocaleLowerCase()));
        if(newValue == 0){
          search_restaurant.value = [];
        }else{
          search_restaurant.value = new_search_restaurant;

        }
      })
      // return
      return {
        data_restaurant,
        user_searche_restaurant,
        search_restaurant,
      }
    },
    
}
</script>

<style lang="scss">
  .home{
    .header{
      height: 120px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      img{
        width: 200px;
      }
      .wrapper--input{
        position: relative;
        input{
        background-color: #f6f6f6;
        border: none;
        height: 60px;
        width: 400px;
        outline: none;
        padding-left: 20px ;
        }

        .search{
          position: absolute;
          top: 100%;
          width: 100px;
          background-color: #fff;

          .container--restaurant--search{
            display: flex;
            align-items: center;

            .wrapper--img{
              display: flex;
              justify-content: space-between;
              height: 60px;
              width: 60px;
              margin-right: 20px;
              border-radius: 50%;
              overflow: hidden;

              img{
                height: 100%;
                width: auto;
              }

            }

          }
        }
      }
      
    }
    .bannier{
      height: 200px;
      width: 100%;
      background-image: url("https://www.ubereats.com/restaurant/_static/7b308f7cbbf8e335ceda0447a8bd7c63.png");
      background-size: cover;
      background-position: center center;
    }
  }


</style>