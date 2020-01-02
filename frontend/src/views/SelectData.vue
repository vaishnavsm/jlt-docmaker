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
        <div class="container" id="review">
        </div>
    </div>
</template>

<script>
const csv = require('csvtojson');
const fileReaderStream = require('filereader-stream');

/*--------------  copied from core.js -------------------------*/
let base = "http://127.0.0.1:8000/media/templates/";
async function get_template_element(template_name){
    let response = await fetch(base+template_name+".html");
    let html = await response.text();
    let elem = document.createElement("object");
    elem.innerHTML = html;
    let compositions = elem.getElementsByClassName("data-compose");
    for(let i=0; i<compositions.length; ++i){
        let composition_name = compositions[i].getAttribute("x-template-name");
        let composition_element = await get_template_element(composition_name);
        compositions[i].innerHTML = composition_element.innerHTML
    }
    return elem;
}

async function fill_template_with_data(data, url){
    if(!(data instanceof Array)) data = [data];
    let orig_doc = await get_template_element(url);
    if(orig_doc == undefined) return undefined;
    let result = [];
    for(let i=0; i<data.length; ++i){
        let current_elem = orig_doc.cloneNode(true);
        fill_with_data(data[i], current_elem)
        result.push(current_elem);
    }
    return result;
}

function fill_with_data(data, doc){
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            Array.from(doc.getElementsByClassName("data-box")).filter((e)=>{return e.getAttribute('x-name') == key;}).forEach((e)=>{
                e.innerText = data[key];
            })
            Array.from(doc.getElementsByClassName("data-table")).filter((e)=>{return e.getAttribute('x-name') == key;}).forEach((e)=>{
                let num_elements = 0;
                let num_rows = 0;
                let columns = Array.from(e.getElementsByTagName('th')).map((e)=>{return e.getAttribute('x-name')})
                for (let iii = 0; iii<columns.length; ++iii) {
                    let table_item = columns[iii];
                    if (data[key].hasOwnProperty(table_item)) {
                        while(data[key][table_item].length > num_rows){
                            let row = document.createElement("tr");
                            for(let i=0;i<num_elements;++i) row.appendChild(document.createElement('td'));
                            e.appendChild(row);
                            ++num_rows;
                        }
                        let rows = Array.from(e.getElementsByTagName('tr')).splice(1);
                        for(let i=0; i<rows.length; ++i){
                            let row = document.createElement('td');
                            row.innerText = data[key][table_item][i] || '';
                            rows[i].appendChild(row);
                        }
                        num_elements++;
                    }
                    else {
                        let rows = Array.from(e.getElementsByTagName('tr')).splice(1);
                        for(let i=0; i<rows.length; ++i){
                            let row = document.createElement('td');
                            rows[i].appendChild(row);
                        }
                        num_elements++;
                    }
                }
            })
        }
    }
}
/*--------------  copied from core.js -------------------------*/


export default {
    data() {
        return {
            file: null,
            disabled: false,
            jsonArray: null,
            review: null
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
                    this.jsonArray = jsonArray;
                    window.console.log(jsonArray);

                    window.console.log(Object.keys(jsonArray[0]));

                    // fill_template_with_data(Object.keys(jsonArray[0]),'outer').then(response => {
                    fill_template_with_data(jsonArray,'outer').then(response => {
                        // for(let r in response)
                        //     window.console.log(r);
                        document.getElementById('review').appendChild(response[0]);
                    });
                });
        },
    }
}
</script>
