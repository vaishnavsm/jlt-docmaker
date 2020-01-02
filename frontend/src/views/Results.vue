<template>
    <div class="home-page">
        <div class="banner">
            <div class="container">
                <p>Best matching templates</p>
            </div>
        </div>
        <div class="container">
            <b-button variant="success" @click="handleClick(best.template_file)">{{best.template_file}}
            </b-button>
            <dendogram :mapping="best.mapping"></dendogram>
        </div>
        <div class="container" style="margin-top: 2em">
            <h4>
                Here's a list of top 10 matching templates
            </h4>
            <div>
                <b-table-lite striped hover :items="sorted">
                    <template v-slot:cell(score)="data">
                        <span>{{data.item.score}}</span>
                    </template>
                    <template v-slot:cell(template_file)="data">
                        <b-button variant="success" @click="handleClick(data.item.template_file)">{{data.item.template_file}}
                        </b-button>
                    </template>
                </b-table-lite>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Dendogram from './Dendogram.vue';

    export default {
        props: ['data'],
        components: {
            Dendogram
        },
        computed: {
            best: function() {
                // need to slice to maintain data mutation
                let cpy = this.data.slice();
                let maxid = 0;
                let maxobj;

                cpy.map(function(obj){
                    if (obj.score > maxid)
                        maxobj = obj;
                });
                return maxobj;
            },
            sorted: function() {
                // need to slice to maintain data mutation
                let cpy = this.data.slice();
                for(let i=0; i<cpy.length; ++i) {
                    delete cpy[i]['mapping'];
                    cpy[i]['score'] = cpy[i]['score'].toFixed(2);
                }
                return cpy.sort((t1,t2) => t1.score > t2.score ? -1 : 1);
            }
        },
        methods: {
            // method for downloading template
            handleClick: function (msg) {
                axios.get('http://127.0.0.1:8000/media/templates/' + msg, {responseType: 'blob'})
                    .then(({data}) => {
                        const blob = new Blob([data], {type: 'application/pdf'});
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = msg;
                        link.click();
                    });
            }
        }
    }
</script>
