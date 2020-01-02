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
            <b-button pill letiant="success" @click="onFileSubmit" :disabled="!disabled">Submit</b-button>
        </div>
    </div>
</template>

<script>
import router from "../router";

const csv = require('csvtojson');
const fileReaderStream = require('filereader-stream');

export default {
    data() {
        return {
            file: null,
            disabled: false,
        }
    },
    methods: {
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.file = files;
            this.disabled = !this.disabled;
        },
        onFileSubmit() {
            csv().fromStream(fileReaderStream(this.file))
                .then((jsonArray)=>{
                    window.console.log(jsonArray);
                    router.replace({name: 'review', params: {jsonArray}});
                });
        },
    }
}
</script>
