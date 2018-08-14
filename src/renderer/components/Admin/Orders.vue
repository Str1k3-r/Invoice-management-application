<template>

    <div class="orders-wrapper">

        <div class="loading" v-if="!dataLoaded">
            <img src="../../assets/images/load.gif"/>
        </div>

        <div v-if="dataLoaded" class="orders-subwrapper">
            <button id="orders-add-order" @click.prevent="showAddO"><i class="fa fa-plus"/> ADD ORDER</button>
            <add-order v-if="addO" @closeAddO="hideAddO" @reloadAddO="reloadAddO"></add-order>


            <div id="orders-pendingOrders">
                <h4> PENDING ORDERS </h4>
                <section>
                    <b-table class="pendingOrders-table"
                             :data="pendingOrders"
                             :paginated="isPaginated"
                             :pagination-simple="isPaginationSimple"
                             :per-page="itemsPerPage"
                             current-page.sync="currentPendingOrdersPage"
                             :default-sort-direction="defaultSortDirection"
                             default-sort="orderPlacedOn"
                             detailed
                             detail-key="_id"
                             @click="callViewOrder"
                    >

                        <template slot-scope="props">
                            <b-table-column field="orderNumber" label="Order Number" width="40">
                                {{ props.row.orderNumber }}
                            </b-table-column>

                            <b-table-column field="clientDesc" label="Client" sortable>
                                {{ props.row.clientDesc }}
                            </b-table-column>

                            <b-table-column field="orderPlacedDate" label="Order Placed On" sortable>
                                {{ props.row.orderPlacedDate.getDate() + "/" +
                                props.row.orderPlacedDate.getMonth() + "/" +
                                props.row.orderPlacedDate.getFullYear() }}
                            </b-table-column>
                            <b-table-column field="totalAfterTaxAmount" label="Total Amount" sortable>
                                {{ "Rs. " + props.row.totalAfterTaxAmount }}
                            </b-table-column>

                            <b-table-column field="orderStatus" label="Order Status" width="150">
                                {{ props.row.orderStatus }}
                            </b-table-column>
                        </template>


                        <template slot="detail" slot-scope="props">
                            <div class="row hula1" v-for="orderItem in props.row.orderItems">
                                <div class="column hulu2">
                                    <h5>Product</h5>
                                    <span>{{orderItem.productDescription}}</span>
                                </div>
                                <div class="column hulu2">
                                    <h5>Size</h5>
                                    <span>{{orderItem.size}}</span>
                                </div>
                                <div class="column hulu2">
                                    <h5>Quantity</h5>
                                    <span>{{orderItem.quantity}}</span>
                                </div>
                                <div class="column hulu2">
                                    <h5>Total Amount</h5>
                                    <span>Rs. {{orderItem.totalAmount}}</span>
                                </div>
                                <div class="column hulu2">
                                    <h5>Item Status</h5>
                                    <span>{{orderItem.itemStatus}}</span>
                                </div>
                            </div>

                            <div class="row hula1">
                                <div class="column hulu1">
                                    <div class="options">
                                        <button @click.prevent="deleteOrder(props.row._id)">DELETE</button>
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

            </div>


            <div id="orders-allOrders">
                <h4> ALL ORDERS</h4>
                <section>
                    <b-table class="pendingOrders-table"
                             :data="allOrders"
                             :paginated="isPaginated"
                             :pagination-simple="isPaginationSimple"
                             :per-page="itemsPerPage"
                             current-page.sync="currentAllOrdersPage"
                             :default-sort-direction="defaultSortDirection"
                             default-sort="orderPlacedOn"
                             detailed
                             detail-key="_id"
                             @click="callViewOrder"
                    >

                        <template slot-scope="props">
                            <b-table-column field="orderNumber" label="Order Number" width="40">
                                {{ props.row.orderNumber }}
                            </b-table-column>

                            <b-table-column field="clientDesc" label="Client" sortable>
                                {{ props.row.clientDesc }}
                            </b-table-column>

                            <b-table-column field="orderPlacedDate" label="Order Placed On" sortable>
                                {{ props.row.orderPlacedDate.getDate() + "/" +
                                props.row.orderPlacedDate.getMonth() + "/" +
                                props.row.orderPlacedDate.getFullYear() }}
                            </b-table-column>
                            <b-table-column field="totalAfterTaxAmount" label="Total Amount" sortable>
                                {{ "Rs. " + props.row.totalAfterTaxAmount }}
                            </b-table-column>

                            <b-table-column field="orderStatus" label="Order Status" width="150">
                                {{ props.row.orderStatus }}
                            </b-table-column>

                        </template>

                        <template slot="detail" slot-scope="props">
                            <div class="row hula1" v-for="orderItem in props.row.orderItems">
                                <div class="column hulu2">
                                    <h5>Product</h5>
                                    <span>{{orderItem.productDescription}}</span>
                                </div>
                                <div class="column hulu2">
                                    <h5>Size</h5>
                                    <span>{{orderItem.size}}</span>
                                </div>
                                <div class="column hulu2">
                                    <h5>Quantity</h5>
                                    <span>{{orderItem.quantity}}</span>
                                </div>
                                <div class="column hulu2">
                                    <h5>Total Amount</h5>
                                    <span>Rs. {{orderItem.totalAmount}}</span>
                                </div>
                                <div class="column hulu2">
                                    <h5>Item Status</h5>
                                    <span>{{orderItem.itemStatus}}</span>
                                </div>
                            </div>

                            <div class="row hula1">
                                <div class="column hulu1">
                                    <div class="options">
                                        <button @click.prevent="deleteOrder(props.row._id)">DELETE</button>
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
            </div>

        </div>


    </div>

</template>

<script>

    import dbUtils from "../../db"
    import AddOrder from './Orders/AddOrder'

    export default {
        name: "Orders",
        components: {
            addOrder: AddOrder,
        },

        data: function () {
            return {
                dataLoaded: false,
                addO: false,
                numberOfAllOrders: 0,
                allOrders: [],
                allOrdersColumns: ['orderNumber', 'clientDesc', 'orderDesc', 'orderPlacedOn', 'totalAfterTaxAmount', 'orderStatus'],
                allOrdersClients: [],
                allOrdersOptions: [],
                pendingOrders: [],
                numberOfPendingOrders: 0,
                currentPendingOrdersPage: 1,
                itemsPerPage: 10,
                isPaginated: true,
                currentAllOrdersPage: 1,
                isPaginationSimple: true,
                defaultSortDirection: 'desc'
            }
        },

        methods: {
            loadOrders() {
                this.dataLoaded = false
                dbUtils.getAllOrders().then((allOrders, err) => {
                    if (err) throw err
                    for (var i = 0; i < allOrders.length; i++) {
                        allOrders[i].clientDesc = allOrders[i].client['clientName'] + ", " + allOrders[i].client.city + ", " + allOrders[i].client.state
                        allOrders[i].orderDesc = []
                        allOrders[i].orderPlacedOn = this.formatDate(allOrders[i].orderPlacedDate).toString()
                        var totbt = 0
                        var totcgst = 0
                        var totigst = 0
                        var totsgst = 0
                        var totgst = 0
                        var totat = 0
                        for (var j = 0; j < allOrders[i].orderItems.length; j++) {
                            totbt += allOrders[i].orderItems[j].taxableAmount
                            totcgst += allOrders[i].orderItems[j].cgstAmount
                            totsgst += allOrders[i].orderItems[j].sgstAmount
                            totigst += allOrders[i].orderItems[j].igstAmount
                            totgst += allOrders[i].orderItems[j].cgstAmount + allOrders[i].orderItems[j].sgstAmount + allOrders[i].orderItems[j].igstAmount
                            totat += allOrders[i].orderItems[j].totalAmount
                            allOrders[i].orderDesc.push((allOrders[i].orderItems[j].productDescription + '  Size: ' + allOrders[i].orderItems[j].size + '  Qty: ' + allOrders[i].orderItems[j].quantity + ' Total Amount: Rs ' + allOrders[i].orderItems[j].totalAmount + '  Status: ' + allOrders[i].orderItems[j].itemStatus))
                        }

                        allOrders[i].totalBeforeTaxAmount = totbt.toFixed(2)
                        allOrders[i].totalCGST = totcgst.toFixed(2)
                        allOrders[i].totalSGST = totsgst.toFixed(2)
                        allOrders[i].totalIGST = totigst.toFixed(2)
                        allOrders[i].totalGST = totgst.toFixed(2)
                        allOrders[i].totalAfterTaxAmount = Math.round(totat, 2)
                        allOrders[i].roundOff = (this.totalAfterTaxAmount - totat).toFixed(2)
                    }
                    this.allOrders = allOrders
                    this.allOrders.sort((a, b) => {
                        return b.orderPlacedDate - a.orderPlacedDate
                    })
                    this.numberOfAllOrders = this.allOrders.length
                    this.pendingOrders = this.allOrders.filter((order) => {
                        return order.orderStatus == "Pending"
                    })

                    this.numberOfPendingOrders = this.pendingOrders.length

                    for (var i = 0; i < this.pendingOrders.length; i++) {
                        this.pendingOrders[i].clientDesc = this.pendingOrders[i].client.clientName + ", " + this.pendingOrders[i].client.city + ", " + this.pendingOrders[i].client.state
                        this.pendingOrders[i].orderDesc = []
                        for (var j = 0; j < this.pendingOrders[i].orderItems.length; j++) {
                            this.pendingOrders[i].orderDesc.push((this.pendingOrders[i].orderItems[j].productDescription + '  Size: ' + this.pendingOrders[i].orderItems[j].size + '  Qty: ' + this.pendingOrders[i].orderItems[j].quantity + ' Total Amount: Rs ' + this.pendingOrders[i].orderItems[j].totalAmount + '  Status: ' + this.pendingOrders[i].orderItems[j].itemStatus))
                        }
                    }

                    this.dataLoaded = true
                })

            },

            hideAddO: function () {
                this.addO = false
            },

            showAddO: function () {
                this.addO = true
            },

            reloadAddO: function () {
                this.loadOrders()
                this.addO = false
            },

            formatDate: function (date) {
                return moment(date).format('DD/MM/YYYY');
            },


            prev: function () {
                if (this.allOrdersStartRow >= 1) {
                    this.allOrdersStartRow -= 1
                }
            },

            next: function () {
                if (this.itemsPerRow < this.allOrders.length) {
                    var range = Math.floor(this.allOrders.length / this.itemsPerRow)
                } else {
                    var range = 0
                }
                if (this.allOrdersStartRow < range) {
                    this.allOrdersStartRow += 1
                }
            },

            callViewOrder: function (model) {
                this.$router.push('/admin/vieworder/' + model._id)
            },

            deleteOrder: function (id) {
                var instance = this

                function callback(msg) {
                    if (msg == "Found") {
                        instance.allOrders = instance.allOrders.filter((order) => {
                            return order._id != id
                        })

                        instance.pendingOrders = instance.pendingOrders.filter((order) => {
                            return order._id != id
                        })
                    } else {
                        this.$snackbar.open("Order not found!")
                    }
                }

                dbUtils.deleteOrderById(id, callback)
            }

        },


        created: function () {
            this.loadOrders()
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

    .orders-wrapper {
        padding: 30px;
        width: 100vw;
        height: 100vh;
        overflow-y: scroll;
        overflow-x: scroll;
        transition: all .3s ease;
    }


    .orders-subwrapper {
        background: transparent;
    }

    .orders-subwrapper h4 {
        font-weight: bold;
        font-size: 14px;
    }

    .orders-subwrapper h5 {
        margin-top: 30px;
        font-weight: bold;
        color: darkslategray;
        font-size: 13px;
    }

    .orders-subwrapper span {
        margin-top: 30px;
        color: darkslategray;
        font-size: 13px;
    }

    #orders-pendingOrders {
        padding: 30px;
        width: 80vw;
        height: auto;
        background: white;
        border-radius: 3px;
        margin-bottom: 50px;
    }

    #orders-allOrders {
        padding: 30px;
        width: 80vw;
        height: auto;
        background: white;
        border-radius: 3px;
        margin-bottom: 50px;
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

    .table thead .icon{
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

    #orders-add-order {
        border: none;
        margin-top: 5px;
        height: 45px;
        width: 250px;
        outline: none;
        font-weight: bold;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 0.8), rgba(0, 205, 172, 0.8)); /*#e96868;*/
        color: white;
        border-radius: 25px;
        box-shadow: none;
        font-size: 12px;
        transition: 0.5s;
        margin-bottom: 30px
    }

    #orders-add-order:focus {
        margin-top: 5px;
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    #orders-add-order:hover {
        margin-top: 5px;
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    #orders-add-order i {
        color: white;
        margin-right: 10px;
    }

    .options button {
        margin-left: -30px;
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

    .options-buttons {
        padding-left: 10px;
        padding-right: 10px;
        margin-bottom: 30px;
    }

    .options-buttons button {
        width: 100%;
        font-size: 12px;
        padding: 10px;
        background: white;
        cursor: pointer;
        outline: none;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: none;
        border-radius: 3px;
        text-align: left;
    }

    .table-buttons {
        z-index: 1000;
        margin-bottom: 30px;
    }

    .table-buttons button {
        text-align: center;
        width: 80px;
        font-size: 12px;
        padding: 10px;
        background: #E0E0E0; /*#e96868;*/
        color: black;
        font-weight: bold;
        cursor: pointer;
        outline: none;
        border: none;
        box-shadow: none;
        border-radius: 3px;
    }

    .hula1 {
        padding-left: 30px;
        padding-right: 30px;
        margin-bottom: 30px;
        width: 100%;
    }

    .hulu1 {
        width: 50%;
    }

    .hulu2 {
        width: 20%;
    }



</style>