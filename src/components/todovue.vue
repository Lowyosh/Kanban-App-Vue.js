<script setup>
import { reactive } from 'vue';
import InputNew from './InputNew.vue';

let boards = reactive([
  {
    id: crypto.randomUUID(),
    name: 'To do',
    items: [
      {
        id: crypto.randomUUID(),
        title: 'Make dishes'
      },
      {
        id: crypto.randomUUID(),
        title: 'Walk the dog'
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    name: 'Doing',
    items: [
      {
        id: crypto.randomUUID(),
        title: 'Send emails'
      },
      {
        id: crypto.randomUUID(),
        title: 'Code review',
      },
    ]
  },
  {
    id: crypto.randomUUID(),
    name: 'Done',
    items: [
      {
        id: crypto.randomUUID(),
        title: 'Make dinner'
      },
      {
        id: crypto.randomUUID(),
        title: 'Collect wood'
      }
    ]
  }
]);
function handleNewItem(text, board){
    console.log(text.value, board.id, board.name);
    board.items.push({
        id: crypto.randomUUID(),
        title: text.value,
    });
}
function handleNewBoard(){
    const name = prompt('Name of the board');
    if(!!name){
        boards.push({
            id: crypto.randomUUID(),
            name: name,
            items: [],
        });
    }
}
function startDrag(evt, board, item){
    evt.dataTransfer.setData(
        "text/plain",
        JSON.stringify({ boardId: board.id, itemId: item.id })
    )
};
function onDrop(evt, dest){
    const {boardId, itemId} = JSON.parse(evt.dataTransfer.getData("text/plain"));
    console.log(boardId, itemId);
    const originBoard = boards.find(item => item.id === boardId);
    const originItem = originBoard.items.find(item => item.id === itemId);

    console.log(originBoard.name, originItem.title);
    dest.items.push({...originItem});
    originBoard.items = originBoard.items.filter((item) => item !== originItem);
};
</script>






<template>
<nav>
    <ul>
        <il><a href="#" @click.prevent="handleNewBoard">Create board</a></il>
    </ul>
</nav>
<div @click="toggleObject" id="btn" class="btn">
    <label class="form-switch">
    <input type="checkbox">
     <i></i>
</label>
</div>
<div class="boards-container">
    <div class="boards">
        <div
        class="board"
        @drop="onDrop($event, board)"
        @dragover.prevent
        @dragenter.prevent
        v-for="board in boards"
        :key="board.id">

        <div class="title">{{ board.name }}</div>
        <InputNew @on-new-item="(text) => handleNewItem(text, board)" />
        <div class="items">
            <div
            class="item"
            draggable="true"
            @dragstart="startDrag($event, board, item)"
            v-for="item in board.items"
            :key="item.id">
            {{ item.title }}
            </div>
        </div>
        </div>
    </div>
</div>
<h6 class="info" >Drag and drop your tasks between the different boards to maintain them in place and ordered.</h6>
<h6 class="footer" >Crafted, developed and styled by me. Jose López // 2023 Vue.js</h6>

</template>







<style scoped>
nav{
    position: fixed;
    top: 2rem;
    left: 1rem;
    padding: 2rem;
    backdrop-filter: blur(2px);
}
.boards{
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 8rem;
}
.board{
    background-color: #ffffffab;
    padding: 1rem;
    border-radius: .8rem;
    transition: .2s ease;
    backdrop-filter: blur(2px);
}
.board:hover{
    transform: scale(1.02);
    background-color: #fffffff2;
}
.title{
    font-size: 1.6rem;
    color: #303030;
}
.items{
    display: flex;
    flex-direction: column;
    gap: .3rem;
    border-radius: .6rem;
    color: white;
}
.item{
    background-color: #000000ab;
    padding: .4rem 1rem;
    box-sizing: border-box;
    border-radius: .2rem;
    font-size: 1.2rem;
    font-family: 'Courier New', Courier, monospace;
    transition: all .2s ease;
    cursor: pointer;
}
.item:hover{
    transform: scale(1.02);
    background-color:  #000000c2;
}
.info{
    font-size: .8rem;
    align-items: center;
    text-align: center;
    margin-top: 1.5rem;
    background-color: #ffffffab;
    color: #242424;
    border-radius: .2rem;
}
.footer{
    position: fixed;
    bottom: 3rem;
    right: 41%;
    left: 41%;
    margin: 0 auto;
    font-size: .8rem;
    align-items: center;
    text-align: center;
    color: rgba(255, 255, 255, 0.891);
}
.btn{
    position: fixed;
    top: 3.5rem;
    right: 3rem;
}

.form-switch {
  display: inline-block;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.form-switch i {
  position: relative;
  display: inline-block;
  margin-right: .5rem;
  width: 46px;
  height: 26px;
  background-color: #e6e6e6;
  border-radius: 23px;
  vertical-align: text-bottom;
  transition: all 0.3s linear;
}
.form-switch i::before {
  content: "";
  position: absolute;
  left: 0;
  width: 42px;
  height: 22px;
  background-color: #fff;
  border-radius: 11px;
  transform: translate3d(2px, 2px, 0) scale3d(1, 1, 1);
  transition: all 0.25s linear;
}
.form-switch i::after {
  content: "";
  position: absolute;
  left: 0;
  width: 22px;
  height: 22px;
  background-color: #fff;
  border-radius: 11px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.24);
  transform: translate3d(2px, 2px, 0);
  transition: all 0.2s ease-in-out;
}
.form-switch:active i::after {
  width: 28px;
  transform: translate3d(2px, 2px, 0);
}
.form-switch:active input:checked + i::after { transform: translate3d(16px, 2px, 0); }
.form-switch input { display: none; }
.form-switch input:checked + i { background-color: #4BD763; }
.form-switch input:checked + i::before { transform: translate3d(18px, 2px, 0) scale3d(0, 0, 0); }
.form-switch input:checked + i::after { transform: translate3d(22px, 2px, 0); }


.imagen-dia {
  background-image: url(../../img/kanban_dia.jpg);
}

.imagen-noche {
  background-image: url(../../img/kanban_noche.jpg);
}

</style>
