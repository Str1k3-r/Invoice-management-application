<template>
    <div class="clients-wrapper">

        <div class="loading" v-if="!dataLoaded">
            <img src="../../assets/images/load.gif"/>
        </div>

        <div v-if="dataLoaded" class="clients-subwrapper">

            <button id="clients-add-client" @click.prevent="showAddC"><i class="fa fa-plus"/> ADD CLIENT </button>
            <add-client v-if="addC" @closeAddC="hideAddC" @reloadC="reloadAddC"></add-client>
            <div class="clients-clientItem">
                <h4> Clients </h4>
                <section>
                    <b-table class="pendingOrders-table"
                             :data="clients"
                             :paginated="isPaginated"
                             :pagination-simple="isPaginationSimple"
                             :per-page="itemsPerPage"
                             current-page.sync="currentClientsPage"
                             :default-sort-direction="defaultSortDirection"
                             default-sort="orderPlacedOn"
                             detailed
                             detail-key="_id"
                             @click="showViewC"
                    >

                        <template slot-scope="props">

                            <b-table-column field="clientName" label="Client Name" sortable>
                                {{ props.row.clientName }}
                            </b-table-column>

                            <b-table-column field="address" label="Address">
                                {{ props.row.address1 }}
                            </b-table-column>

                            <b-table-column field="phoneNo" label="Phone No">
                                {{ props.row.phoneNo }}
                            </b-table-column>

                            <b-table-column field="mobileNo" label="Mobile No">
                                {{ props.row.mobileNo }}
                            </b-table-column>

                            <b-table-column field="city" label="City">
                                {{ props.row.city }}
                            </b-table-column>

                            <b-table-column field="state" label="State">
                                {{ props.row.state }}
                            </b-table-column>

                            <b-table-column field="gstUIN" label="GST IN">
                                {{ props.row.gstUIN }}
                            </b-table-column>

                        </template>

                        <template slot="detail" slot-scope="props">
                            <div class="row hula1">
                                <div class="column hulu1">
                                    <div class="options">
                                        <button @click="deleteClient(props.row._id, props.row.orders, props.row.invoices)">
                                            DELETE
                                        </button>
                                    </div>
                                </div>
                                <div class="column hulu1">
                                    <div class="options">
                                        <button @click.prevent="showEditC(props.row)">EDIT</button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </b-table>
                </section>
                <edit-client v-if="editC" @closeEditC="hideEditC" @reloadEditC="reloadEditC"
                             :C="selectedItem"></edit-client>
            </div>
        </div>

    </div>
</template>

<script>

    import dbUtils from "../../db"
    import AddClient from "./Clients/AddClient"
    import EditClient from './Clients/EditClient'

    export default {
        name: "Products",

        components: {
            addClient: AddClient,
            editClient: EditClient,
        },

        data: function () {
            return {
                dataLoaded: false,
                addC: false,
                editC: false,
                viewC: false,
                itemsPerPage: 15,
                isPaginated: true,
                currentClientsPage: 1,
                isPaginationSimple: true,
                defaultSortDirection: 'desc',
                clients: [],
                selectedItem: {},
                fields: ["Client Name", "Address", "City", "State", "PhoneNo", "MobileNo"],
                vfields: ["clientName", "address1", "city", "state", "phoneNo", "mobileNo"],
                vfieldsAll: ["clientName", "address1", "city", "state", "phoneNo", "mobileNo", "gstUIN", "id"]

            }
        },

        methods: {
            fetchAll: function () {
                this.dataLoaded = false
                dbUtils.getAllClients().then((clients, err) => {
                    if (err) throw err
                    this.clients = clients
                    this.dataLoaded = true

                })
            },

            hideAddC: function () {
                this.addC = false
            },

            hideEditC: function () {
                this.selectedItem = {}
                this.editC = false
            },


            showAddC: function () {
                this.addC = true
            },


            showEditC: function (client) {
                this.selectedItem = client
                this.editC = true
            },

            reloadAddC: function () {
                this.fetchAll()
                this.hideAddC()
            },

            reloadEditC: function () {
                this.fetchAll()
                this.hideEditC()
            },

            deleteClient: function (id) {
                var instance = this

                function callback(msg) {
                    if (msg == "Found") {
                        instance.clients = instance.clients.filter((client) => {
                            return client._id != id
                        })
                    } else {
                        this.$snackbar.open("HSN Code not found!")
                    }
                }

                dbUtils.deleteClient(id, callback)
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
        margin-top: 30%;
    }

    .loading img {
        width: 100px;
        height: 100px;
    }

    .clients-wrapper {
        padding: 30px;
        width: 100%;
        height: 100vh;
        overflow-y: scroll;
        overflow-x: scroll;
        transition: all .3s ease;
    }

    .clients-subwrapper {
        background: transparent;
    }

    .clients-clientItem{
        padding: 30px;
        width: 100%;
        height: auto;
        background: white;
        border-radius: 3px;
        margin-bottom: 50px;
    }

    .clients-clientItem h4 {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 20px;
    }

    .clients-table {
        width: 90%;
        padding: 15px;
        margin-bottom: 30px;
    }

    .clients-table th {
        background: rgb(244, 245, 249);
        font-weight: bold;
        font-size: 13px;
        padding: 15px;
    }

    .clients-table td {
        border-radius: 5px;
        color: darkslategray;
        font-size: 12px;
        padding: 15px;
        font-weight: lighter;
        border-right: solid 1px rgb(244, 245, 249);
        border-left: solid 1px rgb(244, 245, 249);
        border-bottom: solid 1px rgb(244, 245, 249);
        cursor: pointer;
    }

    .table-striped > tbody > tr:nth-child(odd) > td,
    .table-striped > tbody > tr:nth-child(odd) > th {
        background-color: white;
    }

    .table-striped > tbody > tr:nth-child(even) > td,
    .table-striped > tbody > tr:nth-child(even) > th {
        background-color: rgba(244, 245, 249, 0.5);
    }

    .clients-delete, .clients-edit {
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


    #clients-add-client  {
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

    #clients-add-client:focus  {
        margin-top: 5px;
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    #clients-add-client:hover  {
        margin-top: 5px;
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    #clients-add-client i{
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