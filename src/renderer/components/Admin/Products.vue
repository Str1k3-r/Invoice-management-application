<template>
    <div class="products-wrapper">

        <div class="loading" v-if="!dataLoaded">
            <img src="../../assets/images/load.gif"/>
        </div>

        <div v-if="dataLoaded" class="products-subwrapper">

            <button id="products-add-product" @click.prevent="showAddPV"><i class="fa fa-plus"/> ADD PRODUCT VARIANT </button>
            <add-product-variant v-if="addPV" @closeAddPV="hideAddPV" @reloadPV="reloadAddPV"></add-product-variant>
            <div class="products-productItem" v-for="product in products">
                <h4>{{product.productName}}</h4>

                <section>
                    <b-table class="pendingOrders-table"
                             :data="product.productVariants"
                             :default-sort-direction="defaultSortDirection"
                             default-sort="fields['0'][productName]"
                             detailed
                             detail-key="_id">

                        <template slot-scope="props">
                            <b-table-column v-for="field in product.fields" :label="field" >
                                {{ props.row.fields['0'][field] }}
                            </b-table-column>

                        </template>

                        <template slot="detail" slot-scope="props">
                            <div class="row hula1">
                                <div class="column hulu1">
                                    <div class="options">
                                        <button @click.prevent="deleteProductVariant(props.row._id, product.productName)">
                                            DELETE
                                        </button>
                                    </div>
                                </div>
                                <div class="column hulu1">
                                    <div class="options">
                                        <button @click.prevent="showEditPV(props.row)">EDIT</button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </b-table>
                </section>

                <edit-product-variant v-if="editPV" @closeEditPV="hideEditPV" @reloadEditPV="reloadEditPV"
                                      :pV="selectedItem"></edit-product-variant>
            </div>
        </div>

    </div>
</template>

<script>

    import dbUtils from "../../db"
    import AddProductVariant from "./Products/AddProductVariant"
    import EditProductVariant from './Products/EditProductVariant'

    export default {
        name: "Products",

        components: {
            addProductVariant: AddProductVariant,
            editProductVariant: EditProductVariant
        },

        data: function () {
            return {
                dataLoaded: false,
                addPV: false,
                editPV: false,
                productSpecifications: [],
                products: [],
                selectedItem: {}
            }
        },

        methods: {
            fetchAll: function () {
                this.dataLoaded = false
                dbUtils.getAllProductSpecifications().then((productSpecifications, err) => {
                    if (err) throw err

                    this.productSpecifications = productSpecifications
                    var req = []

                    for(var i=0; i< productSpecifications.length; i++){
                        req.push(dbUtils.getAllProductsByProductName(productSpecifications[i].productName))
                    }


                    return Promise.all(req).then((values, err) => {

                        if (err) throw err
                        var data = []

                        for(var i=0; i< values.length; i++){

                            if(values[i].length != 0){

                                data.push({
                                    productName: values[i][0].productName,
                                    productVariants: values[i],
                                    fields:  Object.keys(values[i][0].fields['0'])//productSpecifications.find(o => o.productName == values[i][0].productName).fields
                                })

                            }
                        }
                        this.products = data
                        this.dataLoaded = true
                    })
                })
            },

            hideAddPV: function () {
                this.addPV = false
            },

            hideEditPV: function () {
                this.selectedItem = {}
                this.editPV = false
            },

            showAddPV: function () {
                this.addPV = true
            },

            showEditPV: function (productVariant) {
                this.selectedItem['_id'] = productVariant._id
                this.selectedItem['productName'] = productVariant.productName
                this.selectedItem['valuefields'] = productVariant.fields['0']
                this.editPV = true
            },

            reloadAddPV: function () {
                this.fetchAll()
                this.hideAddPV()
            },

            reloadEditPV: function () {
                this.fetchAll()
                this.hideEditPV()
            },

            deleteProductVariant: function (id, productName) {
                var instance = this

                function callback(msg) {
                    if (msg == "Found") {
                        instance.reloadEditPV()
                    } else {
                        this.$snackbar.open("Product not found!")
                    }
                }

                dbUtils.deleteProduct(id, callback)
            }
        },

        created: function () {
            this.fetchAll()
        }
    }
</script>

<style>

    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translateY(-70%);
    }

    .loading img {
        width: 100px;
        height: 100px;
    }

    .products-wrapper {
        padding: 30px;
        width: 100%;
        height: 100vh;
        overflow-y: scroll;
        overflow-x: scroll;
        transition: all .3s ease;
    }

    .products-subwrapper {
        background: transparent;
    }

    .products-productItem{
        padding: 30px;
        width: 100%;
        height: auto;
        background: white;
        border-radius: 3px;
        margin-bottom: 50px;
    }

    .products-productItem h4 {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 20px;
    }


    #products-add-product  {
        border: none;
        margin-top: 5px;
        height: 45px;
        width: 250px;
        outline: none;
        font-weight: bold;
        background: linear-gradient(to bottom right, rgba(2,170,176,0.8), rgba(0,205,172, 0.8)); /*#e96868;*/
        color: white;
        border-radius: 25px;
        box-shadow: none;
        font-size: 12px;
        transition: 0.5s;
        margin-bottom: 30px
    }

    #products-add-product:focus  {
        margin-top: 5px;
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    #products-add-product:hover  {
        margin-top: 5px;
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    #products-add-product i{
        color: white;
        margin-right: 10px;
    }

    .hula1 {
        padding-left: 30px;
        padding-right: 30px;
        width: 100%;
    }

    .hulu1 {
        width: 50%;
    }

    .pendingOrders-table {
        width: 100%;
        padding: 15px;
        margin-bottom: 30px;
    }

    .pendingOrders-table th, .table thead {
        background: rgb(244, 245, 249);
        font-weight: bold;
        font-size: 13px;
        padding: 15px;
        cursor: pointer;
        border: none;
    }

    .table thead th, .table thead tr {
        border: none;
    }

    .b-table {
        padding: 0;
        border-radius: 3px;
    }

    .b-table select, p {
        display: none;
    }

    .b-table a {
        font-size: 13px;
        color: black;
        padding: 4px;
    }

    .b-table .icon {
        display: none;
        visibility: hidden;
    }

    .table .icon {
        display: table;
        margin-top: -15px;
        visibility: visible;
    }

    .table thead .icon {
        display: none;
        visibility: hidden;
    }

    .level .icon {
        visibility: visible;
        margin-top: -2px;
        margin-right: 15px;
        display: block;
    }

    .table > tbody > tr:nth-child(odd) > td,
    .table > tbody > tr:nth-child(odd) > th {
        background-color: white;
    }

    .table > tbody > tr:nth-child(even) > td,
    .table > tbody > tr:nth-child(even) > th {
        background-color: rgba(244, 245, 249, 0.5);
    }

    .pendingOrders-table td {
        border-radius: 5px;
        color: darkslategray;
        font-size: 12px;
        padding: 15px;
        font-weight: lighter;
        border-right: solid 1px rgb(244, 245, 249);
        border-left: solid 1px rgb(244, 245, 249);
        border-bottom: solid 1px rgb(244, 245, 249);
    }

    .table-striped > tbody > tr:nth-child(odd) > td,
    .table-striped > tbody > tr:nth-child(odd) > th {
        background-color: white;
    }

    .table-striped > tbody > tr:nth-child(even) > td,
    .table-striped > tbody > tr:nth-child(even) > th {
        background-color: rgba(244, 245, 249, 0.5);
    }

    .options button {
        cursor: pointer;
        border: none;
        height: 35px;
        outline: none;
        font-weight: bold;
        background: #E0E0E0; /*#e96868;*/
        color: black;
        border-radius: 3px;
        box-shadow: none;
        font-size: 12px;
        transition: 0.5s;
        padding-left: 20px;
        padding-right: 20px;
    }

    .options button:focus {
        outline: none;
        transition: 0.5s;
    }

    .options button:hover {
        outline: none;
        transition: 0.5s;
    }

    .options i {
        color: black;
        margin-right: 10px;
    }


</style>