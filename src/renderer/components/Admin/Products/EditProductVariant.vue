<template>
    <transition name="modal">
        <div class="modal" style="display: block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="editPV-wrapper">
                        <button @click.prevent="close" id="hideEditPV"><i class="fa fa-times"/></button>
                        <div class="loading" v-if="!dataLoaded">
                            <img src="../../../assets/images/load.gif"/>
                        </div>

                        <div id="editPV-subwrapper" v-if="dataLoaded">
                            <h4> Edit Product Variant </h4>

                            <div class="editPV-dropdown editPV-Igroup">

                                <label>Product</label>
                                <h6 v-model="productName">{{productName}}</h6>
                            </div>


                            <div v-if="formLoaded">
                                <div v-for="field in fields">

                                    <div class="editPV-f-group">

                                        <label>{{ field }}</label>
                                        <br/>
                                        <input type="text" v-bind:id="field"  v-bind:name="field" class="editPV-f-control" required v-model="valuefields[field]" v-on:input="watchAndSuggest(field)"/>
                                        <div class="editPV-suggestions" v-if="field == sFieldSuggest">
                                            <button v-for="suggestion in suggestions"  @click.prevent="editField(suggestion, field)">{{suggestion}}</button>
                                        </div>
                                    </div>

                                </div>


                                <div class="editPV-Bgroup">
                                    <button class="editPV-button" @click.prevent="save"><i class="fa fa-save"/>SAVE</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

    import dbUtils from "../../../db"

    export default {
        name: "EditProductVariant",

        props: ['pV'],

        data: function () {
            return {
                dataLoaded: false,
                formLoaded: false,
                productName: '',
                fields: {},
                valuefields: {},
                productSpecifications: [],
                products: {},
                clonevaluefields: {},
                showSuggestion: {},
                sFieldSuggest: '',
                suggestions: ["Hello", "Bye"]
            }
        },

        methods: {

            close: function () {
                this.$emit('closeEditPV');
            },

            closeandrefresh: function () {
                this.$emit('reloadEditPV')
            },

            fetchPS: function () {
                this.dataLoaded = false
                dbUtils.getAllProductSpecifications().then((productSpecifications, err) => {
                    if (err) throw err

                    this.productSpecifications = productSpecifications

                    for(var i=0; i<productSpecifications.length; i++){
                        this.products[i] = productSpecifications[i].productName
                    }

                    this.loadForm()
                    this.dataLoaded = true
                })
            },

            loadForm: function () {
                var productName = this.$props.pV.productName
                this.productName = productName
                if(this.productSpecifications != undefined && productName!=""){
                    this.fields=this.productSpecifications.find(o => o.productName == productName).fields
                    this.valuefields = {}
                    for(var field in this.fields){
                        this.valuefields[this.fields[field]] = this.$props.pV.valuefields[this.fields[field]]
                        this.showSuggestion[this.fields[field]] = false
                    }
                    this.sFieldSuggest = ''
                    this.valuefields["Product Name"] = productName
                    this.clonevaluefields = this.valuefields
                    this.formLoaded = true
                } else {
                    this.formLoaded = false
                }
            },


            hideForm: function () {
                this.formLoaded = false
            },

            save: function () {

            },

            getKey: function (obj, val) {
                return Object.keys(obj).find(key => obj[key] === val)
            },

            watchAndSuggest: function (field) {
                var productName = document.getElementById("editPV-select").value
                var value = document.getElementById(field).value
                var re = new RegExp("" + value.toLowerCase() + ".*");

                for(var ss in this.showSuggestion){
                    ss = false
                }
                if(this.valuefields[field] != ''){

                    dbUtils.getAllProductsByProductName(productName).then((products, err) => {
                        if (err) throw err

                        if(products != undefined && products.length != 0){
                            this.suggestions = []
                            for(var i = 0; i< products.length; i++){
                                if(!this.suggestions.includes(products[i].fields['0'][field]) && products[i].fields['0'][field].toLowerCase().match(re)){
                                    this.suggestions.push(products[i].fields['0'][field])
                                }
                            }
                            this.showSuggestion[field] = true
                            this.sFieldSuggest = field
                        } else {
                            this.suggestions = []
                            this.showSuggestion[field] = false
                            this.sFieldSuggest = ''
                        }
                    })
                } else {
                    this.suggestions = []
                    this.showSuggestion[field] = false
                    this.sFieldSuggest = ''
                }
            },

            editField: function (suggestion, field) {
                this.valuefields[field] = suggestion
                this.sFieldSuggest = ''
            }

        },

        created: function () {
            this.fetchPS()
        },

    }
</script>

<style scoped>

    .modal-dialog{
        margin-top: 150px;
        border: none;
        border-radius: 5px;
        outline: none;
        height: auto;
    }

    .modal{
        border-radius: 5px;
        border: none;
        outline: none;
    }

    .modal-content{
        border-radius: 5px;
        border: none;
        outline: none;
        width: 700px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .editPV-wrapper{
        border: none;
        outline: none;
        background: white;
        padding: 20px;
        max-height: 500px;
        overflow-y: scroll;
    }

    #editPV-subwrapper h4 {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 40px;
        margin-top: 10px;
        margin-left: 10px;
    }

    .editPV-f-group {
        width: 100%;
        display: block;
        float: left;
        padding-right: 40px;
        padding-left: 10px;
    }

    .editPV-suggestions {
        width: 100%;
        margin-left: 20px;
        margin-top: -30px;
        max-height: 200px;
        font-size: 13px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        background: white;
        border-radius: 5px;
    }

    .editPV-suggestions button {
        width: 100%;
        padding: 10px;
        background: white;
        cursor: pointer;
        outline: none;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: none;
        border-radius: 3px;
        text-align: left;
    }

    .editPV-f-group label {
        width: 100%;
        display: block;
        float: left;
        font-size: 13px;
        color: darkslategrey;
        margin-left: 20px;
    }


    .editPV-dropdown h6 {
        width: 100%;
        display: block;
        float: left;
        font-size: 13px;
        color: darkslategrey;
        margin-left: 20px;
        margin-bottom: 40px;
    }



    .editPV-f-group input {
        width: 100%;
        border: none;
        margin-bottom: 30px;
        margin-left: 20px;
    }

    .editPV-f-group input[type="text"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    .editPV-f-group input[type="text"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid rgba(2,170,176,0.8);
        outline: none;
        transition: 0.5s;
    }


    #hideEditPV{
        float: right;
        background: white;
        outline: none;
        border: none;
        margin-top: -7px;
        margin-right: -3px;
    }


    .editPV-Igroup label {
        width: 100%;
        font-size: 13px;
        color: darkslategrey;
        margin-left: 20px;
    }


    .editPV-dropdown select{
        border-radius: 5px;
        border: 2px solid rgb(244, 245, 249);
        background: white;
        outline: none;
        padding: 8px;
        font-size: 13px;
        margin-left: 20px;
        margin-bottom: 50px;
    }

    .editPV-dropdown option {
        border-radius: 5px;
        border: 2px solid rgb(244, 245, 249);
        background: white;
        outline: none;
        font-size: 13px;
    }


    .editPV-Bgroup{
        margin: 0 auto;
        width: 180px;
    }

    .editPV-Bgroup button {
        margin-top: 10px;
        width: 100%;
        border: none;
        height: 45px;
        outline: none;
        font-weight: bold;
        background: linear-gradient(to bottom right, rgba(2,170,176,0.8), rgba(0,205,172, 0.8)); /*#e96868;*/
        color: white;
        border-radius: 25px;
        box-shadow: none;
        font-size: 12px;
        transition: 0.5s;
        margin-bottom: 20px;
    }

    .editPV-Bgroup button:focus {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .editPV-Bgroup button:hover {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .editPV-Bgroup i{
        color: white;
        margin-right: 10px;
    }

</style>