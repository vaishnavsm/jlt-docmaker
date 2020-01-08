<template>
    <div class="home-page">
        <div class="banner">
            <div class="container">
                <p>Batch filled data with template</p>
            </div>
        </div>
        <div class="container">
            <div>
                <b-table-lite striped hover :items="appendPDF">
                    <template v-slot:cell(doc)="data">
                        <b-button variant="success" @click="handleClick(data.item.doc)">Download PDF</b-button>
                    </template>
                </b-table-lite>
            </div>
        </div>
    </div>
</template>

<script>
import * as jsPDF from 'jspdf'
var idx = 0;
export default {
    props: ['jsonArray', 'filledDocuments'],
    computed: {
        appendPDF: function() {
            // need to slice to maintain data mutation
            let cpy = this.jsonArray.slice();
            for(let i=0;i<cpy.length; ++i)
                cpy[i]['doc'] = this.filledDocuments[i];
            return cpy;
        }
    },
    methods: {
        handleClick: function (msg) {
            window.console.log(this.jsonArray, this.filledDocuments);
            window.console.log(msg);
            var doc = new jsPDF('p', 'pt', 'letter');
            idx = Math.min(idx, this.filledDocuments.length-1)
            doc.fromHTML(this.filledDocuments[idx]);
            idx += 1;
            idx = Math.min(idx, this.filledDocuments.length-1)
            doc.output("dataurlnewwindow");
        }
    }
}
</script>
