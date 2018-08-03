<template>

    <div class="settings-wrapper">

        <div class="loading" v-if="!dataLoaded">
            <img src="../../assets/images/load.gif"/>
        </div>

        <div v-if="dataLoaded" class="settings-subwrapper">

            <div id="settings-productspecifications">
                <h4> PRODUCT SPECIFICATIONS</h4>
                <section>
                    <b-table class="pendingOrders-table"
                             :data="productSpecifications"
                             :paginated="isPaginated"
                             :pagination-simple="isPaginationSimple"
                             :per-page="itemsPerPage"
                             current-page.sync="currentPSPage"
                             :default-sort-direction="defaultSortDirection"
                             default-sort="productName"
                             detailed
                             detail-key="_id">

                        <template slot-scope="props">
                            <b-table-column field="productName" label="Product Name" sortable>
                                {{ props.row.productName }}
                            </b-table-column>

                            <b-table-column field="fields" label="Fields">
                                {{ props.row.fields }}
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

                <button id="addProductSpecification" @click.prevent="showAddPS"><i class="fa fa-plus"/>ADD PRODUCT
                    SPECIFICATION
                </button>
                <add-product-specification v-if="showPS" @closePS="hideAddPS"
                                           @reloadPS="refreshPS"></add-product-specification>
            </div>

            <div id="settings-hsnCodes">
                <h4>HSN CODES</h4>
                <section>
                    <b-table class="pendingOrders-table"
                             :data="hsnCodes"
                             :paginated="isPaginated"
                             :pagination-simple="isPaginationSimple"
                             :per-page="itemsPerPage"
                             current-page.sync="currentPSPage"
                             :default-sort-direction="defaultSortDirection"
                             default-sort="hsnCode"
                             detailed
                             detail-key="_id">

                        <template slot-scope="props">
                            <b-table-column field="hsnCode" label="HSN Code" sortable>
                                {{ props.row.hsnCode }}
                            </b-table-column>

                            <b-table-column field="sgst" label="SGST">
                                {{ props.row.sgst }}%
                            </b-table-column>

                            <b-table-column field="cgst" label="CGST">
                                {{ props.row.cgst }}%
                            </b-table-column>

                            <b-table-column field="igst" label="IGST">
                                {{ props.row.igst }}%
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


                <button id="addHSNCode" @click.prevent="showAddHSNC"><i class="fa fa-plus"/>ADD HSN CODE</button>
                <add-hsn-code v-if="showHSNC" @closeHSNC="hideAddHSNC" @reloadHSNC="refreshHSNC"></add-hsn-code>

            </div>

            <div id="settings-changepassword">
                <h4>CHANGE PASSWORD</h4>
                <div id="settings-form-title">
                    <p class="message" v-model="msg">{{ msg }}</p>
                </div>

                <div class="settings-f-group">
                    <label for="Username">Username</label>
                    <br/>
                    <input type="text" id="username" name="username" class="f-control" required v-model="username"/>
                </div>

                <div class="settings-f-group">
                    <label for="Current-Password">Current Password</label>
                    <br/>
                    <input type="text" id="current-password" name="current-password" class="f-control" required
                           v-model="currentpassword"/>
                </div>

                <div class="settings-f-group">
                    <label for="New-Password">New Password</label>
                    <br/>
                    <input type="text" id="new-password" name="new-password" class="f-control" required
                           v-model="newpassword"/>
                </div>

                <div class="settings-f-group">
                    <button class="settings-f-button" @click.prevent="changePassword">CHANGE PASSWORD</button>
                </div>

                <div class="footer">

                </div>
            </div>

        </div>

    </div>

</template>

<script>

    import dbUtils from "../../db"
    import lUtils from "../../database/loginUtils";
    import AddHSNCode from './Settings/AddHSNCode'
    import AddProductSpecification from './Settings/AddProductSpecification'
    import UpdateHSNCode from './Settings/UpdateHSNCode'
    import UpdateProductSpecification from './Settings/UpdateProductSpecification'

    export default {
        name: "Settings",
        data: function () {
            return {
                dataLoaded: false,
                productSpecifications: [],
                hsnCodes: [],
                msg: 'Enter username, current password and new password.',
                username: '',
                currentpassword: '',
                newpassword: '',
                showPS: false,
                showHSNC: false,
                editPS: false,
                editHSNC: false,
                selectedItem: undefined
            }
        },

        components: {
            addHsnCode: AddHSNCode,
            addProductSpecification: AddProductSpecification,
            updateHsnCode: UpdateHSNCode,
            updateProductSpecification: UpdateProductSpecification
        },

        methods: {
            fetchAll: function () {
                this.dataLoaded = false
                return Promise.all([dbUtils.getAllProductSpecifications(), dbUtils.getAllHSNCodes()]).then((values) => {
                    this.productSpecifications = values[0]
                    this.hsnCodes = values [1]
                    this.dataLoaded = true
                })
            },

            deleteProductSpecification: function (productSpecification) {
                console.log("DELETE", productSpecification)
            },


            deleteHSNCode: function (HSNCode) {
                console.log("DELETE", HSNCode)
            },


            changePassword: function () {
                if (lUtils.checkCredentials(this.username, this.currentpassword)) {
                    lUtils.changePassword(this.newpassword)
                    this.msg = "Your password has been updated."
                    this.username = ''
                    this.currentpassword = ''
                    this.newpassword = ''


                } else {
                    this.msg = "Invalid credentials!"
                }
            },

            showAddPS: function () {
                this.showPS = true
            },

            showAddHSNC: function () {
                this.showHSNC = true
            },

            hideAddPS: function () {
                this.showPS = false
            },

            hideAddHSNC: function () {
                this.showHSNC = false
            },

            refreshPS: function () {
                this.fetchAll()
                this.hideAddPS()
                this.hideEditPS()
            },

            refreshHSNC: function () {
                this.fetchAll()
                this.hideAddHSNC()
                this.hideEditHSNC()
            },

            showEditPS: function (ps) {
                this.editPS = true
                this.selectedItem = ps
            },

            showEditHSNC: function (hc) {
                this.editHSNC = true
                this.selectedItem = hc
            },

            hideEditPS: function () {
                this.editPS = false
                this.selectedItem = undefined
            },

            hideEditHSNC: function () {
                this.editHSNC = false
                this.selectedItem = undefined
            },

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
        margin-top: 30%;
    }

    .loading img {
        width: 100px;
        height: 100px;
    }

    .settings-wrapper {
        padding: 30px;
        width: 100%;
        height: 100vh;
        overflow-y: scroll;
        overflow-x: scroll;
        transition: all .3s ease;
    }

    .settings-subwrapper {
        background: transparent;
    }

    .settings-subwrapper h4 {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 20px;
    }

    #settings-productspecifications {
        padding: 30px;
        width: 100%;
        height: auto;
        background: white;
        border-radius: 3px;
        margin-bottom: 50px;
    }

    .productSpecification-table {
        width: 90%;
        padding: 15px;
        margin-bottom: 30px;
    }

    .productSpecification-table th {
        background: rgb(244, 245, 249);
        font-weight: bold;
        font-size: 13px;
        padding: 15px;
    }

    .productSpecification-table td {
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

    .delete, .edit {
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

    #settings-hsnCodes {
        padding: 30px;
        width: 100%;
        height: auto;
        background: white;
        border-radius: 3px;
        margin-bottom: 50px;
    }

    .hsncode-table {
        width: 90%;
        padding: 15px;
        margin-bottom: 30px;
    }

    .hsncode-table th {
        background: rgb(244, 245, 249);
        font-weight: bold;
        font-size: 13px;
        padding: 15px;
    }

    .hsncode-table td {
        border-radius: 5px;
        color: darkslategray;
        font-size: 12px;
        padding: 15px;
        font-weight: lighter;
        border-right: solid 1px rgb(244, 245, 249);
        border-left: solid 1px rgb(244, 245, 249);
        border-bottom: solid 1px rgb(244, 245, 249);
    }

    #addHSNCode i, #addProductSpecification i {
        color: white;
        margin-right: 10px;
    }

    #settings-changepassword {
        padding: 30px;
        width: 100%;
        height: auto;
        background: white;
        border-radius: 3px;
        margin-bottom: 50px;
    }

    #settings-form-title .message {
        font-weight: lighter;
        font-size: 0.6em;
        color: darkslategrey;
        margin-bottom: 40px;
    }

    #settings-form-title img {
        height: 80px;
        width: 80px;
    }

    .settings-f-group {
        width: 100%;
        display: block;
        float: left;
    }

    .settings-f-group label {
        padding-right: 50px;
        width: 100%;
        display: block;
        float: left;
        font-size: 0.8em;
        color: darkslategrey;
    }

    .settings-f-group .f-control {

        margin-right: 30px;
        width: 300px;
    }

    .settings-f-group input {
        width: 100px;
        border: none;
        margin-bottom: 50px;
    }

    .settings-f-group input[type="text"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    .settings-f-group input[type="text"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid #2196F3;
        outline: none;
        transition: 0.5s;
    }

    .settings-f-group input[type="password"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    .settings-f-group input[type="password"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #2196F3;
        transition: 0.5s;

    }

    .settings-f-button, #addHSNCode, #addProductSpecification {
        border: none;
        margin-top: 5px;
        height: 45px;
        width: 250px;
        margin-left: 25px;
        outline: none;
        font-weight: bold;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 0.8), rgba(0, 205, 172, 0.8)); /*#e96868;*/
        color: white;
        border-radius: 25px;
        box-shadow: none;
        font-size: 12px;
        transition: 0.5s;
    }

    .settings-f-button:focus, #addHSNCode:focus, #addProductSpecification:focus {
        margin-top: 5px;
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .settings-f-button:hover, #addHSNCode:hover, #addProductSpecification:hover {
        margin-top: 5px;
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .footer {
        padding-top: 350px;
        width: 100%;
        margin-bottom: 50px;
    }


</style>