async function get_template_element(url){
    let response = await fetch(url);
    let html = await response.text();
    var elem = document.createElement("object");
    elem.innerHTML = html;
    return elem;
}

async function fill_template_with_data(data, url){
    if(!(data instanceof Array)) data = [data];
    let orig_doc = await get_template_element(url);
    if(orig_doc == undefined) return undefined;
    var result = [];
    for(let i=0; i<data.length; ++i){
        let current_elem = orig_doc.cloneNode(true);
        fill_with_data(data[i], current_elem)
        result.push(current_elem);
    }
    return result;
}

function fill_with_data(data, doc){
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            Array.from(doc.getElementsByClassName("data-box")).filter((e)=>{return e.getAttribute('x-name') == key;}).forEach((e)=>{
                e.innerText = data[key];
            })
            Array.from(doc.getElementsByClassName("data-table")).filter((e)=>{return e.getAttribute('x-name') == key;}).forEach((e)=>{
                var num_elements = 0;
                var num_rows = 0;
                var columns = Array.from(e.getElementsByTagName('th')).map((e)=>{return e.getAttribute('x-name')})
                for (var iii = 0; iii<columns.length; ++iii) {
                    let table_item = columns[iii];
                    if (data[key].hasOwnProperty(table_item)) {
                        while(data[key][table_item].length > num_rows){
                            let row = document.createElement("tr");
                            for(let i=0;i<num_elements;++i) row.appendChild(document.createElement('td'));
                            e.appendChild(row);
                            ++num_rows;
                        }
                        var rows = Array.from(e.getElementsByTagName('tr')).splice(1);
                        for(let i=0; i<rows.length; ++i){
                            let row = document.createElement('td');
                            row.innerText = data[key][table_item][i] || '';
                            rows[i].appendChild(row);
                        }
                        num_elements++;
                    }
                    else {
                        var rows = Array.from(e.getElementsByTagName('tr')).splice(1);
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
async function main(){
    var final_result = await fill_template_with_data([
        // {
        //     "client-name": "Ajay S Dinesh", 
        //     "creation-date": "21st Feb, 2029", 
        //     "broker1name": "Ramesh", 
        //     "broker1title": "Ad Agent", 
        //     "broker1dirdial": "04662212099", 
        //     "broker1mobile": "9876543210", 
        //     "broker1email": "ramesh@cadboory.com", 
        //     "broker2name": "Suresh", 
        //     "broker2title": "Another", 
        //     "broker2dirdial": "0666224466774", 
        //     "broker2mobile": "9087564312", 
        //     "broker2email": "suresh@cedburi.com", 
        // },
        {
            "name": "This is Name", 
            "age": 20, 
            "phone_num":"9845666432", 
            "marks":32.333, 
            'key-value-pair':{
                'key':['k1','k2','jb','k3'],
                'value':['value 1','value 2','test3']
            }
        },
        {
            "name": "Name 2", 
            "age": 27, 
            "phone_num":"2223335321", 
            "marks":0.2
        },
        {
            "name": "Another Name", 
            "age": 20, 
            'key-value-pair':{
                'value':['hey look', "it's a key!"]
            }
        },
    ],'http://127.0.0.1:8000/media/templates/TestTemp_0.html');
    for(var i=0; i<final_result.length; ++i){
        // Image/Canvas Output
        document.getElementById('body').appendChild(final_result[i]);
        var doc_fixed = await html2canvas(final_result[i], {logging: false});
        document.getElementById("body").removeChild(final_result[i]);

        document.getElementById('body').appendChild(doc_fixed);
        document.getElementById('body').appendChild(document.createElement("hr"));

        var img=doc_fixed.toDataURL("image/jpeg", 0.8);
        var doc = new jsPDF('p', 'pt', 'letter');
        doc.addImage(img,'JPEG',20,20);
        // doc.save('test.pdf');
        doc.output("dataurlnewwindow");

        // Text Output:
        // var doc = new jsPDF('p', 'pt', 'letter');
        // doc.fromHTML(final_result[i]);
        // doc.output("dataurlnewwindow");
        
    }
}
(()=>{main()})();