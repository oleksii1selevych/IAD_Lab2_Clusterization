<template>
  <TheHeader />
  <div class="container">
    <router-view></router-view>
  </div>
</template>


<script>
import TheHeader from './components/TheHeader.vue'
import DataManager from './clusterization/data_genarator.js'
import { computed } from '@vue/runtime-core'

export default {
  components:{TheHeader},
  data(){
    return{
      hierarchicalNodeSet:null,
      kMeansPointSet:null,
    }
  },
  created(){
    this.dataManager = new DataManager();
    this.hierarchicalNodeSet = this.dataManager.generateNodes(300);
    this.kMeansPointSet = this.dataManager.convertNodesToPoints(this.hierarchicalNodeSet);
  },
  provide(){
    return {
      hierarchicalSet: computed(() => this.hierarchicalNodeSet),
      kMeansSet:computed(() => this.kMeansPointSet),
    }
  }
}

</script>


<style>

*{
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body{ 
  margin: 0;
  padding: 0;
}

.container{
  margin-top: 7rem;
  max-width: 60rem;
  margin: 0 auto;
}

</style>