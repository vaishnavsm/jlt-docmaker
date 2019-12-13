<template>
    <div id="chart_table">
        <div v-bind:key="val.id" v-for="val in proplabels" class="row table_cell">
            <div  class="small-12 medium-6 column single-cel">
                <input type="text" v-model="val.key" />
            </div>
            <div class="small-12 medium-5 column single-cel">
                <input type="text" v-model="val.value" />
            </div>
            <div class="small-12 medium-1 column edit_panel">
                <button @click="deleteEvent(index)">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "chart_table",
  props:['proplabels'],
  methods: {
    deleteEvent: function (index) {
      this.proplabels.splice(index, 1);
    }
  }
}
</script>