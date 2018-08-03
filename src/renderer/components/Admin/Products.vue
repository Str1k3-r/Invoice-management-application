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
                            <div class="options">
                                <button @click.prevent="">DELETE</button>
                                <button @click.prevent="">EDIT</button>
                            </div>
                        </template>
                    </b-table>
                </section>
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
            }
        },

        created: function () {
            this.fetchAll()
        }
    }
</script>

<style scoped>

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

    .products-table {
        width: 90%;
        padding: 15px;
        margin-bottom: 30px;
    }

    .products-table th {
        background: rgb(244, 245, 249);
        font-weight: bold;
        font-size: 13px;
        padding: 15px;
    }

    .products-table td {
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

    .products-delete, .products-edit {
        color: rgba(2, 170, 176, 1);
        background: white;
        outline: none;
        text-decoration: none;
        margin-left: 30px;
        margin-right: 60px;
        margin-top: 10px;
        margin-bottom: 10px;
        border: none;
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


</style>