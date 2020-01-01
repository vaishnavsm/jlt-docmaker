<template>
    <div class="home-page">
        <div class="banner">
            <div class="container">
                <p>Best matching templates</p>
            </div>
        </div>
        <div class="container">
            <div>
                <b-table-lite striped hover :items="sorted">
                    <template v-slot:cell(score)="data">
                        <span>{{data.item.score}}</span>
                    </template>
                    <template v-slot:cell(template_file)="data">
                        <b-button variant="success" @click="handleClick(data.item.template_file)">{{data.item.template_file}}
                        </b-button>
                    </template>
                    <template v-slot:cell(filled)="data">
                        <b-button variant="success" @click="handleClick(data.item.template_file)">{{data.item.filled}}
                        </b-button>
                    </template>
                </b-table-lite>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        props: ['data'],
        computed: {
            sorted: function() {
                // need to slice to maintain data mutation
                let cpy = this.data.slice();

                for(var i=0; i<cpy.length; ++i) {
                    delete cpy[i]['mapping'];
                    cpy[i]['filled'] = cpy[i]['template_file'];
                    cpy[i]['score'] = cpy[i]['score'].toFixed(2);
                }
                window.console.log(cpy);
                return cpy.sort((t1,t2) => t1.score > t2.score ? -1 : 1);
            }
        },
        methods: {
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
