<template>
    <!-- <h1>{{ id }}</h1> -->

    <h2>Items</h2>
    <ItemsList :id="id"></ItemsList>

</template>

<script>

import ItemsList from '../components/ItemsList.vue';
export default {
  name: 'ItemListView',
  components: {
    ItemsList,
  },
//get the id from the url
  setup() {
    const id = window.location.href.split('/').pop();
    return {
      id,
    };
  },

};


</script>

<style scoped>

</style>