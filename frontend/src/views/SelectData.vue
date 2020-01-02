<template>
    <div class="home-page">
        <div class="banner">
            <div class="container">
                <p>Select data from CSV, Excel or JSON file.</p>
            </div>
        </div>
        <div class="container">
            <b-form-input v-model="template_name" placeholder="Enter template name"></b-form-input>
            <br />
            <!-- Styled -->
            <b-form-file
                    @change="onFileChange"
                    v-model="file"
                    :state="Boolean(file)"
                    placeholder="Choose a file or drop it here..."
                    drop-placeholder="Drop file here..."
            ></b-form-file>
            <p></p>
            <b-button pill variant="success" @click="onFileSubmit" :disabled="!shouldBeDisabled()">Submit</b-button>
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
            template_name: null,
        }
    },
    methods: {
        shouldBeDisabled() {
            return this.file!=null && this.template_name!=null && this.template_name.length > 1;
        },
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.file = files;
        },
        onFileSubmit() {
            const template_name = this.template_name;
            if (this.file.name.endsWith('csv'))
                csv().fromStream(fileReaderStream(this.file))
                    .then((jsonArray)=>{
                        // window.console.log(jsonArray);
                        router.replace({name: 'review', params: {jsonArray, template_name}});
                    });
            else{
                // its a json
                let read = new FileReader();
                read.readAsBinaryString(this.file);
                read.onloadend = function(){
                    // window.console.log(read.result);
                    let jsonArray = read.result;
                    router.replace({name: 'review', params: {jsonArray, template_name}});
                }
            }
        },
    }
}
</script>
