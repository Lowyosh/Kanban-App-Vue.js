<script setup>
import { ref, defineEmits } from 'vue';
const text = ref('');
const emits = defineEmits(['onNewItem']);

function handleSubmit(){
    if (text !== ''){
        // llama al emit
        emits('onNewItem', text);
        text.value = '';
    }
}

</script>



<template>
    <form action="" @submit.prevent="handleSubmit">
      <input type="text" v-model="text" placeholder="Type a new task">  
    </form> 
</template>



<style scoped>
input{
    margin:.4rem 0;
    padding: .3rem;
    border: hidden;
    border-radius: .2rem;
    width: 100%;
    cursor: pointer;
    box-sizing: border-box;
}
input::placeholder{
    font-size: .8rem;
    box-sizing: border-box;
}
input:hover{
    border-bottom: 1.5px solid hsla(160, 100%, 37%, 1);
}

</style>
