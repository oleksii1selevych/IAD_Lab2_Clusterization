<template>
    <TabMenu :model="items" />
</template>


<script>
import TabMenu from 'primevue/tabmenu';

export default {
    components: { TabMenu },
    data() {
        return {
            kMeansPointSet: this.kMeansSet,
            items: [
                { label: 'Clusterization Graph', to: '/clusters' },
                { label: 'Dendrogram Graph', to: '/dendrogram' }
            ]
        }
    },
}
</script>