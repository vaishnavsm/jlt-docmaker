<template>
    <div class="home-page">
        <div class="banner">
            <div class="container">
                <p>Fill data in table below.</p>
            </div>
        </div>
        <div id="chartpanel" class="row" data-equalizer>
            <div class="column small-12 left_panel">
                <header data-equalizer-watch>
                    <p>Enter data as key-value pairs</p>
                </header>

                <div id="chart_table">
                    <form id="chart_datas">
                        <div class="grid-container">
                            <div class="grid-x grid-padding-x input_wrp">
                                <div class="small-6 cell column">
                                    <label>
                                        <input type="text" placeholder="key" v-model="key" id="key" name="key">
                                    </label>
                                </div>
                                <div class="small-6 cell column">
                                    <label>
                                        <input type="text" placeholder="value" v-model="value" id="value" name="value">
                                    </label>
                                </div>
                            </div>

                            <div class="addRowBtn" v-on:click.prevent="addRow" value=""><i class="fa fa-plus"
                                                                                           aria-hidden="true"></i></div>
                        </div>

                    </form>

                    <ChartTable v-bind:proplabels="labels"></ChartTable>
                </div>
            </div> <!-- end left panel -->
        </div>
        <div class="container text-xs-center">
            <p></p>
            <b-button pill variant="success" @click="handleClick">Submit</b-button>
        </div>
        <!--        <b-spinner class="float-center" variant="primary" style="width: 6rem; height: 6rem;" :display="disabled"></b-spinner>-->
    </div>
</template>

<script>
    import Vue from 'vue';
    import router from '../router';
    import ChartTable from "../components/ChartTable";
    import axios from 'axios';

    Vue.loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");
    Vue.loadScript("https://cdnjs.cloudflare.com/ajax/libs/foundation/6.4.1/js/foundation.min.js");
    Vue.loadScript("https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.4/vue.min.js");
    Vue.loadScript("https://use.fontawesome.com/24fc242ce0.js");
    Vue.loadScript("https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.3.5/Tween.min.js");

    export default {
        name: 'chartpanel',
        data() {
            return {
                disabled: 'none',
                key: '',
                value: '',
                labels: [],
                data: {}
            }
        },
        methods: {
            addRow: function () {
                let newRow;
                if (this.labels.length === 0)
                    newRow = {
                        id: 0,
                        key: this.key,
                        value: this.value
                    };
                else
                    newRow = {
                        id: this.labels.length,
                        key: this.key,
                        value: this.value
                    };
                this.data[this.key] = this.value;
                this.labels.push(newRow);

                // clear top input box
                // remember bindings work both ways in vue. model can update view too
                this.key = '';
                this.value = '';
            },
            handleClick: function () {
                this.disable = 'visible';

                axios.post('http://127.0.0.1:8000/recommend_templates/',
                    {
                        data: this.data
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(function (response) {
                        window.console.log(response.data);
                        const data = response.data;
                        router.replace({name: 'results', params: {data}});
                    })
                    .catch(function (error) {
                        window.console.log(error);
                    });
            }
        },
        components: {
            ChartTable
        }
    }
</script>

<style scoped>
    @import url("https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.0/css/foundation.min.css");

    * {
        /* Colors*/
        --h2o: #5cb85c;
        --honey: #4ba76b;
        --army: #7b895b;
        --green: #037367;
        --sangria: #00281f;
        --white: #fff;
        /* Transition */
        --transition-short: all .5s ease-in-out;

        /* padding */
        --padding-standard: 1rem;
    }

    button {
        cursor: pointer;
    }

    body {
        background-image: -ms-linear-gradient(bottom, #7BD4CC 0%, #037367 100%);

        /* Mozilla Firefox */
        background-image: -moz-linear-gradient(bottom, #7BD4CC 0%, #037367 100%);

        /* Opera */
        background-image: -o-linear-gradient(bottom, #7BD4CC 0%, #037367 100%);

        /* Webkit (Safari/Chrome 10) */
        background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0, #7BD4CC), color-stop(100, #037367));

        /* Webkit (Chrome 11+) */
        background-image: -webkit-linear-gradient(bottom, #7BD4CC 0%, #037367 100%);

        /* W3C Markup */
        background-image: linear-gradient(to top, #7BD4CC 0%, #037367 100%);
        display: flex;
        align-items: center;
        align-content: center;
    }

    .left_panel {
        padding-left: 0px;
        padding-right: 0px;
    }

    .left_panel header {
        background-color: var(--h2o);
        padding: var(--padding-standard);
    }

    #chart_datas {
        position: relative;
    }

    #chartpanel {
        background-color: #fafafa;
        max-width: 50rem;
        max-width: 50rem;
        height: auto;
        border-radius: 7px;
    }


    .hideshow {
        color: var(--white);
        font-size: .8rem;
    }

    .inputHide {
        oapcity: 1;
        -webkit-transition: var(--transition-short);
        -moz-transition: var(--transition-short);
        -o-transition: var(--transition-short);
        transition: var(--transition-short);
    }

    .is-collapsed {
        opacity: 0;
    }

    .addRowBtn {
        width: auto;
        position: absolute;
        left: 2rem;
        font-size: 2rem;
        background-color: var(--honey);
        padding: .1rem .9rem;
        border-radius: 2rem;
        margin-top: -4rem;
        z-index: 999999999999999;
        -webkit-box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.45);
        -moz-box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.45);
        box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.45);
        cursor: pointer;
        opacity: 1;
        -webkit-transition: var(--transition-short);
        -moz-transition: var(--transition-short);
        -o-transition: var(--transition-short);
        transition: var(--transition-short);
    }

    .addRowBtn:hover {
        opacity: .8;
    }

    .addRowBtn .fa {
        color: var(--white);
        margin-top: 7px;
    }

    .single-cel {
        overflow: hidden;
        display: block;
        position: relative;
    }

    .edit_mode {
        cursor: pointer;
        color: var(--h2o);
        position: absolute;
        right: 1.3rem;
        -webkit-transition: var(--transition-short);
        -moz-transition: var(--transition-short);
        -o-transition: var(--transition-short);
        transition: var(--transition-short);
        margin-right: 2%
    }

    .edit_mode:hover {
        color: #666;
    }

    .edit_panel {
        padding-left: 1rem !important;
        padding-right: 1rem;
        padding-top: .5rem !important;
    }

    .edit_panel button {
        color: var(--sangria);
    }

    .edit_panel button:hover {
        opacity: .5;
    }

    .left_panel {
        overflow: hidden;
        position: relative;
        border-radius: 7px;
        -webkit-box-shadow: 0px 0px 20px 0px rgba(50, 50, 50, 0.57);
        -moz-box-shadow: 0px 0px 20px 0px rgba(50, 50, 50, 0.57);
        box-shadow: 0px 0px 20px 0px rgba(50, 50, 50, 0.57);
    }

    .left_panel header {
        overflow: hidden;
        position: relative;
        color: var(--white);
    }

    .menu_top_icon, .right_nav .fa-heart, .right_nav .fa-link {
        font-size: 1.3rem;
        color: var(--sangria);
    }

    .right_nav .fa-user-circle {
        font-size: 1.3rem;
        margin-left: 1rem;
    }

    .right_nav .fa-link {
        margin-left: 1rem;
    }

    .right_nav {
        float: right;
    }

    #chart_datas {
        padding-top: 1rem;
        margin-top: 1.5rem;
    }

    .input_wrp .cell {
        padding: 0px;
    }

    #chart_datas input {
        border-top: 0px;
        border-left: 0px;
        border-right: 0px;
        box-shadow: none;
        background-color: rgba(255, 255, 255, .30);
        border-color: var(--h2o);
    }

    #cart_table, #chart_datas {
        padding-left: 1rem;
        padding-right: 1rem
    }

    #chart_table {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    #chart_table .column {
        padding: 3px;
    }

    #chart_table .row {
        margin-left: 0px;
        margin-right: 0px;
    }

    #chart_table .top_titles div {
        text-align: center;
        color: var(--green);
        text-transform: uppercase;
        font-size: 75%;
    }

    #chart_table div.table_cell input {
        border: 0px;
        background-color: rgba(0, 0, 0, .05);
        text-align: center;
        color: var(--army);
        font-weight: 500;
    }

    #chart_table div.table_cell input[type="text"]:disabled {
        background: rgba(0, 0, 0, .02);
    }

    .right_panel {
        padding-left: 0px;
        padding-right: 0px;
        min-height: 10.8rem;
        border-radius: 3px;
    }

    .right_panel header {
        background-color: var(--green);
        min-height: 3rem;
        display: block;
        width: 100%;
        border-left: 2px solid rgba(0, 0, 0, .2);
    }
</style>
