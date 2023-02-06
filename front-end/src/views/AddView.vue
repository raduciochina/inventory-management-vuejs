<template>

    <AddEditItem :id="id"></AddEditItem>
    <br>
    <p>or</p>
    <br>
    <AddEditCategory :id="id"></AddEditCategory>
    
</template>

<script>
import AddEditItem from '../components/AddEditItem.vue';
import AddEditCategory from '../components/AddEditCategory.vue';
export default {

  name: 'AddView',
  components: {
    AddEditItem,
    AddEditCategory
  },
  setup() {

  },

};


</script>

<style scoped>
p{
    text-align: center;
}
</style>