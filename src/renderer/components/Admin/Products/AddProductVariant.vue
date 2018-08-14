<template>
    <transition name="modal">
        <div class="modal" style="display: block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="addPV-wrapper">
                        <button @click.prevent="close" id="hideAddPV"><i class="fa fa-times"/></button>
                        <div class="loading" v-if="!dataLoaded">
                            <img src="../../../assets/images/load.gif"/>
                        </div>

                        <div id="addPV-subwrapper" v-if="dataLoaded">
                            <h4> Add Product Variant </h4>

                            <div class="addPV-dropdown addPV-Igroup">

                                <label>Product</label>
                                <select class="addPV-dropdown" id="addPV-select" v-on:change="loadForm()" v-on:focus="">
                                    <option value="">Select Product</option>
                                    <option v-for="product in products" v-bind:value="product">{{product}}</option>
                                </select>
                            </div>


                            <div v-if="formLoaded">
                                <div v-for="field in fields">

                                    <div class="addPV-f-group">

                                        <label>{{ field }}</label>
                                        <br/>
                                        <input type="text" v-bind:id="field" v-bind:name="field" class="addPV-f-control"
                                               required v-model="valuefields[field]"
                                               v-on:input="watchAndSuggest(field)"/>
                                        <div class="addPV-suggestions" v-if="field == sFieldSuggest">
                                            <button v-for="suggestion in suggestions"
                                                    @click.prevent="editField(suggestion, field)">{{suggestion}}
                                            </button>
                                        </div>
                                    </div>

                                </div>


                                <div class="addPV-Bgroup">
                                    <button class="addPV-button" @click.prevent="save"><i class="fa fa-save"/>SAVE
                                    </button>
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
        name: "AddProductVariant",

        data: function () {
            return {
                dataLoaded: false,
                formLoaded: false,
                productName: '',
                fields: [],
                valuefields: [],
                productSpecifications: [],
                products: [],
                clonevaluefields: [],
                showSuggestion: [],
                sFieldSuggest: '',
                suggestions: []
            }
        },

        methods: {

            close: function () {
                this.$emit('closeAddPV');
            },

            closeandrefresh: function () {
                this.$emit('reloadPV')
            },

            fetchPS: function () {
                this.dataLoaded = false
                dbUtils.getAllProductSpecifications().then((productSpecifications, err) => {
                    if (err) throw err

                    this.productSpecifications = productSpecifications

                    for (var i = 0; i < productSpecifications.length; i++) {
                        this.products[i] = productSpecifications[i].productName
                    }

                    this.dataLoaded = true
                })
            },

            loadForm: function () {
                var productName = document.getElementById("addPV-select").value
                if (this.productSpecifications != undefined && productName != "") {
                    this.fields = this.productSpecifications.find(o => o.productName == productName).fields
                    this.valuefields = []
                    for (var field in this.fields) {
                        this.valuefields[this.fields[field]] = ''
                        this.showSuggestion[this.fields[field]] = false
                    }
                    this.sFieldSuggest = ''
                    this.valuefields["Product Name"] = productName
                    this.productName = productName
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
                var instance = this

                function callback(msg) {
                    if (msg == 'Not Added') {
                        instance.$snackbar.open("Product could not be added")
                    } else {
                        instance.$toast.open(msg)
                        instance.closeandrefresh()
                    }
                }

                console.log("Add Product Variant", this.productName, this.valuefields["Product Name"])
                dbUtils.addProduct(this.productName, this.fields, this.valuefields, callback)

            },

            getKey: function (obj, val) {
                return Object.keys(obj).find(key => obj[key] === val)
            },

            watchAndSuggest: function (field) {
                var productName = document.getElementById("addPV-select").value
                var value = document.getElementById(field).value
                var re = new RegExp("" + value.toLowerCase() + ".*");

                for (var ss in this.showSuggestion) {
                    ss = false
                }
                if (this.valuefields[field] != '') {

                    dbUtils.getAllProductsByProductName(productName).then((products, err) => {
                        if (err) throw err

                        if (products != undefined && products.length != 0) {
                            this.suggestions = []
                            for (var i = 0; i < products.length; i++) {
                                if (!this.suggestions.includes(products[i].fields['0'][field]) && products[i].fields['0'][field].toLowerCase().match(re)) {
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

    .modal-dialog {
        margin-top: 150px;
        border: none;
        border-radius: 5px;
        outline: none;
        height: auto;
    }

    .modal {
        border-radius: 5px;
        border: none;
        outline: none;
    }

    .modal-content {
        border-radius: 5px;
        border: none;
        outline: none;
        width: 700px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .addPV-wrapper {
        border: none;
        outline: none;
        background: white;
        padding: 20px;
        max-height: 500px;
        overflow-y: scroll;
    }

    #addPV-subwrapper h4 {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 40px;
        margin-top: 10px;
        margin-left: 10px;
    }

    .addPV-f-group {
        width: 100%;
        display: block;
        float: left;
        padding-right: 40px;
        padding-left: 10px;
    }

    .addPV-suggestions {
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

    .addPV-suggestions button {
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

    .addPV-f-group label {
        width: 100%;
        display: block;
        float: left;
        font-size: 0.8em;
        color: darkslategrey;
        margin-left: 20px;
    }

    .addPV-f-group input {
        width: 100%;
        border: none;
        margin-bottom: 30px;
        margin-left: 20px;
    }

    .addPV-f-group input[type="text"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    .addPV-f-group input[type="text"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid rgba(2, 170, 176, 0.8);
        outline: none;
        transition: 0.5s;
    }

    #hideAddPV {
        float: right;
        background: white;
        outline: none;
        border: none;
        margin-top: -7px;
        margin-right: -3px;
    }

    .addPV-Igroup label {
        width: 100%;
        font-size: 0.8em;
        color: darkslategrey;
        margin-left: 20px;
    }

    .addPV-dropdown select {
        border-radius: 5px;
        border: 2px solid rgb(244, 245, 249);
        background: white;
        outline: none;
        padding: 8px;
        font-size: 13px;
        margin-left: 20px;
        margin-bottom: 50px;
    }

    .addPV-dropdown option {
        border-radius: 5px;
        border: 2px solid rgb(244, 245, 249);
        background: white;
        outline: none;
        font-size: 13px;
    }

    .addPV-Bgroup {
        margin: 0 auto;
        width: 180px;
    }

    .addPV-Bgroup button {
        margin-top: 10px;
        width: 100%;
        border: none;
        height: 45px;
        outline: none;
        font-weight: bold;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 0.8), rgba(0, 205, 172, 0.8)); /*#e96868;*/
        color: white;
        border-radius: 25px;
        box-shadow: none;
        font-size: 12px;
        transition: 0.5s;
        margin-bottom: 20px;
    }

    .addPV-Bgroup button:focus {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .addPV-Bgroup button:hover {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .addPV-Bgroup i {
        color: white;
        margin-right: 10px;
    }

</style>