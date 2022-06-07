<template>
    <canvas ref="canvas" width="960" height="500"/>
</template>

<script>

import DendrogramGraph from '../clusterization/dendrogram_graph.js';
import HierarchicalClusterization from '../clusterization/hierarchicalAglomerative.js';

export default {
inject:['hierarchicalSet'],
data(){
    return  {
        hierarchicalDataSet:this.hierarchicalSet,
        rootNode:null
    }
},
created(){
    let hierarchicalClusterizer = new HierarchicalClusterization(this.hierarchicalDataSet);
    this.rootNode = hierarchicalClusterizer.performHierarchicalClusterization();
    console.log(this.rootNode);
},
mounted(){
    let dendrogramDrawer = new DendrogramGraph(this.$refs.canvas);
    console.log(this.$refs.canvas);
    dendrogramDrawer.drawClusterDendrogram(this.rootNode);
}

}

</script>