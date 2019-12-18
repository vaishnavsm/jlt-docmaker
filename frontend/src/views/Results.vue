<template>
    <div class="home-page">
        <div class="banner">
            <div class="container">
                <p>Best matching templates</p>
            </div>
        </div>
        <div class="container">
            <div>
                <b-table-lite striped hover :items="items">
                    <template v-slot:cell(template)="data">
                        <b-button variant="success" @click="handleClick(data.item.template)">{{data.item.template}}</b-button>
                    </template>
                    <template v-slot:cell(filled)="data">
                        <b-button variant="success" @click="handleClick(data.item.filled)">{{data.item.filled}}</b-button>
                    </template>
                </b-table-lite>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        items: [
          { sno: 1, template: 'res1.docx', filled: 'res1-filled.docx' },
          { sno: 2, template: 'res2.docx', filled: 'res2-filled.docx' },
        ]
      }
    },
    methods: {
      handleClick: function (msg) {
        axios.get('http://127.0.0.1:8000/media/'+msg, { responseType: 'blob' })
          .then(({ data }) => {
            const blob = new Blob([data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = msg;
            link.click();
          });
      }
    }
  }
</script>
