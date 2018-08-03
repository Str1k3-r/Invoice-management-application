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
                             detail-key="_id">

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
                            <div class="options">
                                <button @click.prevent="">DELETE</button>
                                <button @click.prevent="">EDIT</button>
                            </div>
                        </template>
                    </b-table>
                </section>

                <view-client v-if="viewC" @closeViewC="hideViewC" :C="selectedItem"></view-client>
            </div>
        </div>

    </div>
</template>

<script>

    import dbUtils from "../../db"
    import AddClient from "./Clients/AddClient"
    import EditClient from './Clients/EditClient'
    import ViewClient from './Clients/ViewClient'

    export default {
        name: "Products",

        components: {
            addClient: AddClient,
            editClient: EditClient,
            viewClient: ViewClient
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

            hideViewC: function () {
                this.selectedItem = {}
                this.viewC = false
            },

            showAddC: function () {
                this.addC = true
            },

            showViewC: function (client) {
                this.selectedItem = client
                this.viewC = true
            },

            showEditC: function (client) {
                this.selectedItem = client
                this.editC = true
            },

            reloadAddC: function () {
                this.fetchAll()
                this.hideAddPV()
            },

            reloadEditC: function () {
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


</style>