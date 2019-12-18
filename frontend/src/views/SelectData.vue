<template>
    <div class="home-page">
        <div class="banner">
            <div class="container">
                <p>Select data from CSV or Excel file.</p>
            </div>
        </div>
        <div class="container">
            <!-- Styled -->
            <b-form-file
                    @change="onFileChange"
                    v-model="file"
                    :state="Boolean(file)"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
            ></b-form-file>
            <p></p>
            <b-button pill variant="success" @click="onFileSubmit" :disabled="!disabled">Submit</b-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        file: null,
        disabled: false
      }
    },
    methods: {
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.file = files;
        this.disabled = !this.disabled;
      },
      onFileSubmit() {
        let formData = new FormData();
        formData.append('file', this.file);
        // TODO Add URL here
        axios.post( 'http://127.0.0.1:8000/template',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function(){
        })
        .catch(function(){
        });
      },
    }
  }
</script>