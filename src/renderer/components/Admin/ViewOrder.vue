<template>

    <div class="vieworder-wrapper">

        <div class="back-button">
            <button @click="back" class="row sidebar-elements" to="/admin/orders"><i class="fa fa-arrow-left fa-lg"
                                                                                     aria-hidden="true"/></button>
        </div>


        <div class="loading" v-if="!dataLoaded">
            <img src="../../assets/images/load.gif"/>
        </div>

        <div v-if="dataLoaded" class="vieworder-subwrapper">
            <h4> ORDER - {{id}}</h4>
            <button class="vieworder-mainbutton"><i class="fa fa-edit"></i>EDIT</button>
            <button class="vieworder-mainbutton" @click="printOrderPerforma"><i class="fa fa-print"></i>ORDER PERFORMA
            </button>
            <h4> CLIENT INFORMATION</h4>
            <div class="client-info">
                <h5 style="margin-left: 42px">ID</h5>
                <span style="margin-left: 42px">{{order.client._id}}</span>
                <div class="row hula1">
                    <div class="column hulu1">
                        <h5>Client Name</h5>
                        <span style="margin-left: 30px">{{order.client.clientName}}</span>
                    </div>

                    <div class="column hulu1">
                        <h5>Address</h5>
                        <span style="margin-left: 30px">{{order.client.address1}}</span><br>
                        <span style="margin-left: 30px">{{order.client.city}}, {{order.client.state}} - {{order.client.pincode}}</span>
                    </div>
                </div>

                <div class="row hula1">
                    <div class="column hulu1">
                        <h5>Contact Numbers</h5>
                        <span style="margin-left: 30px">Phone No - {{order.client.phoneNo}}</span><br>
                        <span style="margin-left: 30px">Mobile No - {{order.client.mobileNo}}</span>
                    </div>

                    <div class="column hulu1">
                        <h5>GST IN</h5>
                        <span style="margin-left: 30px">{{order.client.gstUIN}}</span>
                    </div>

                </div>
            </div>

            <div class="order-info">
                <h4>ORDER INFORMATION</h4>
                <h5 style="margin-left: 42px">Order Number</h5>
                <span style="margin-left: 42px">{{order.orderNumber}}</span>
                <div class="row hula1">
                    <div class="column hulu1">
                        <h5>Order Placed On</h5>
                        <span style="margin-left: 30px">{{formatDate(order.orderPlacedDate)}}</span>
                    </div>

                    <div class="column hulu1">
                        <h5>Order Placed By</h5>
                        <span style="margin-left: 30px">{{order.orderPlacedBy}}</span>
                    </div>
                </div>

                <div class="row hula1">
                    <div class="column hulu1">
                        <h5>Order Status</h5>
                        <span style="margin-left: 30px">{{order.orderStatus}}</span>
                    </div>

                    <div class="column hulu1">
                        <h5>Order Completed On</h5>
                        <span style="margin-left: 30px">{{formatDate(order.orderCompletedDate)}}</span>
                    </div>
                </div>

                <div class="row hula1">
                    <div class="column hulu1">
                        <h5>Total Items</h5>
                        <span style="margin-left: 30px">{{order.orderItems.length}}</span>
                    </div>

                    <div class="column hulu1">
                        <h5>Total Amount</h5>
                        <span style="margin-left: 30px">Rs. {{order.totalAfterTaxAmount}}</span>
                    </div>
                </div>

                <div class="row hula1">
                    <div class="column hulu1">
                        <h5>Total Taxable Amount</h5>
                        <span style="margin-left: 30px">Rs. {{order.totalBeforeTaxAmount}}</span>
                    </div>

                    <div class="column hulu1">
                        <h5>Total Tax</h5>
                        <span style="margin-left: 30px">Rs. {{order.totalAfterTaxAmount - order.totalBeforeTaxAmount}}</span>
                    </div>

                    <div class="column1">
                        <h5>Total IGST</h5>
                        <span style="margin-left: 30px">Rs. {{order.totalIGST}}</span>
                    </div>

                    <div class="column1">
                        <h5>Total CGST</h5>
                        <span style="margin-left: 30px">Rs. {{order.totalCGST}}</span>
                    </div>

                    <div class="column1">
                        <h5>Total SGST</h5>
                        <span style="margin-left: 30px">Rs. {{order.totalSGST}}</span>
                    </div>
                </div>
            </div>

            <div class="order-details">
                <h4>ORDER ITEMS</h4>
                <div class="vieworder-secondarybutton">
                    <button @click="toggleItemStatus">TOGGLE ITEM STATUS</button>
                    <button @click="print">PRINT T3</button>
                </div>
                <section class="view-order-details">
                    <b-table
                            class="pendingOrders-table"
                            :data="order.orderItems"
                            default-sort="productDescription"
                            checkable
                            :checked-rows.sync="checkedRows"
                            detailed
                            detail-key="_id"
                    >

                        <template slot-scope="props">
                            <b-table-column field="productDescription" label="Product">
                                {{ props.row.productDescription }}
                            </b-table-column>

                            <b-table-column field="size" label="Size">
                                {{ props.row.size }}
                            </b-table-column>

                            <b-table-column field="quantity" label="Qty">
                                {{ props.row.quantity }}
                            </b-table-column>

                            <b-table-column field="hsn" label="HSN Code">
                                {{ props.row.hsnCode }}
                            </b-table-column>

                            <b-table-column field="amount" label="Amount">
                                Rs. {{ props.row.amount }}
                            </b-table-column>

                            <b-table-column field="taxableAmount" label="Taxable Amount">
                                Rs. {{ props.row.taxableAmount }}
                            </b-table-column>

                            <b-table-column field="totalAmount" label="Total Amount">
                                Rs. {{ props.row.totalAmount }}
                            </b-table-column>

                            <b-table-column field="itemStatus" label="Item Status">
                                {{ props.row.itemStatus }}
                            </b-table-column>

                        </template>

                        <template slot="detail" slot-scope="props">
                            <div class="row hula1">
                                <div class="column hulu1">
                                    <h5>After Discount Rate</h5>
                                    <span style="margin-left: 30px">Rs. {{ roundToTwo(props.row.taxableAmount/props.row.quantity) }}</span>
                                </div>

                                <div class="column hulu1">
                                    <h5>Discount</h5>
                                    <span style="margin-left: 30px">{{ props.row.discount }}%</span>
                                </div>

                                <div class="column hulu1">
                                    <h5>IGST Rate</h5>
                                    <span style="margin-left: 30px">{{ props.row.igstRate }}%</span>
                                </div>
                                <div class="column hulu1">
                                    <h5>IGST Amount</h5>
                                    <span style="margin-left: 30px">Rs. {{ props.row.igstAmount }}</span>
                                </div>
                                <div class="column hulu1">
                                    <h5>CGST Rate</h5>
                                    <span style="margin-left: 30px">{{ props.row.cgstRate }}%</span>
                                </div>
                                <div class="column hulu1">
                                    <h5>CGST Amount</h5>
                                    <span style="margin-left: 30px">Rs. {{ props.row.cgstAmount }}</span>
                                </div>
                                <div class="column hulu1">
                                    <h5>SGST Rate</h5>
                                    <span style="margin-left: 30px">{{ props.row.sgstRate }}%</span>
                                </div>
                                <div class="column hulu1">
                                    <h5>SGST Amount</h5>
                                    <span style="margin-left: 30px">Rs. {{ props.row.sgstAmount }}</span>
                                </div>

                                <div class="column hulu1">
                                    <div class="options">
                                        <button @click.prevent="">DELETE</button>
                                    </div>
                                </div>

                                <div class="column">
                                    <div class="options">
                                        <button @click.prevent="">EDIT</button>
                                    </div>
                                </div>

                            </div>

                        </template>

                    </b-table>
                </section>

                <h4 v-if="order.savedInvoices!=null">SAVED INVOICES</h4>
                <section class="view-order-details">
                    <b-table
                            class="pendingOrders-table"
                            :data="order.savedInvoices"
                            default-sort="invoiceNumber"
                            checkable
                            :checked-rows.sync="checkedRows"
                            detailed
                            detail-key="_id"
                            @click="viewInvoice"
                    >

                        <template slot-scope="props">
                            <b-table-column field="invoiceNumber" label="Invoice No.">
                                {{ props.row.invoiceNumber }}
                            </b-table-column>

                            <b-table-column field="invoiceDate" label="Invoice Date">
                                {{ formatDate(props.row.invoiceDate) }}
                            </b-table-column>

                            <b-table-column field="billedTo" label="Billed To">
                                {{ props.row.billedTo.clientName }}
                            </b-table-column>

                        </template>

                    </b-table>
                </section>
            </div>
        </div>
        <order-performa v-if="orderPerforma" @closeOrderPerforma="hideOrderPerforma" :order="order"></order-performa>
    </div>

</template>

<script>

    import dbUtils from "../../db"
    import printJS from 'print-js'

    export default {
        name: "ViewOrder",

        data: function () {
            return {
                orderPerforma: false,
                id: this.$route.params.id,
                dataLoaded: false,
                order: null,
                clientfields: ["Client Name", "Address", "City", "State", "PhoneNo", "MobileNo", "GST IN"],
                clientvfields: ["clientName", "address1", "city", "state", "phoneNo", "mobileNo", "gstUIN"],
                checkedRows: [],

            }
        },

        methods: {

            loadOrderData: function () {
                dbUtils.getOrderById(this.id).then((order) => {
                    this.order = order['0']
                    var totbt = 0
                    var totcgst = 0
                    var totigst = 0
                    var totsgst = 0
                    var totgst = 0
                    var totat = 0
                    var totdiscount = 0
                    for (var j = 0; j < this.order.orderItems.length; j++) {
                        totdiscount += this.order.orderItems[j].taxableAmount * this.order.orderItems[j].discount / 100
                        totbt += this.order.orderItems[j].taxableAmount
                        totcgst += this.order.orderItems[j].cgstAmount
                        totsgst += this.order.orderItems[j].sgstAmount
                        totigst += this.order.orderItems[j].igstAmount
                        totgst += this.order.orderItems[j].cgstAmount + this.order.orderItems[j].sgstAmount + this.order.orderItems[j].igstAmount
                        totat += this.order.orderItems[j].totalAmount
                        //this.order.orderDesc.push((this.order.orderItems[j].productDescription + '  Size: ' + this.order.orderItems[j].size + '  Qty: ' + this.order.orderItems[j].quantity + ' Total Amount: Rs ' + this.order.orderItems[j].totalAmount + '  Status: ' + this.order.orderItems[j].itemStatus))
                    }

                    this.order.totalDiscount = totdiscount.toFixed(2)
                    this.order.totalBeforeTaxAmount = totbt.toFixed(2)
                    this.order.totalCGST = totcgst.toFixed(2)
                    this.order.totalSGST = totsgst.toFixed(2)
                    this.order.totalIGST = totigst.toFixed(2)
                    this.order.totalGST = totgst.toFixed(2)
                    this.order.totalAfterTaxAmount = Math.round(totat, 2)
                    this.order.roundOff = (this.totalAfterTaxAmount - totat).toFixed(2)
                    this.dataLoaded = true
                })
            },

            back: function () {
                this.$router.push("/admin/orders")
            },

            formatDate: function (date) {
                return moment(date).format('DD/MM/YYYY');
            },

            print: function () {
                var orderItems = []
                var promises = []
                //var d = new Date()
                for (var i = 0; i < this.checkedRows.length; i++) {
                    if (this.checkedRows[i].itemStatus != "Completed") {
                        this.checkedRows[i].itemStatus = "Completed"
                        this.checkedRows[i].fulfilledDate = new Date()
                        promises.push(dbUtils.updateOrderItem(this.checkedRows[i]))
                    }
                    orderItems.push(this.checkedRows[i].id)

                }


                console.log(orderItems)
                if (orderItems.length == 0) {

                } else {

                    this.$router.push({path: "/bill/" + this.order._id, query: {orderItems: orderItems}})
                    Promise.all(promises).then(() => {

                        console.log("triggered")
                        this.checkAndUpdateOrderStatus()
                    })
                }

            },

            printOrderPerforma: function () {
                this.$router.push("/orderPerforma/" + this.order._id)
            },

            hideOrderPerforma: function () {
                this.orderPerforma = false
            },

            roundToTwo: function (num) {
                return +(Math.round(num + "e+2") + "e-2");
            },

            toggleItemStatus: function () {
                var promises = []
                for (var i = 0; i < this.checkedRows.length; i++) {
                    if (this.checkedRows[i].itemStatus == "Pending") {
                        this.checkedRows[i].itemStatus = "Completed"
                        this.checkedRows[i].fulfilledDate = new Date()
                        var id = this.checkedRows[i].id
                        var date = this.checkedRows[i].fulfilledDate
                        $.each(this.order.orderItems, function () {
                            if (this.id == id) {
                                this.itemStatus = "Completed"
                                this.fulfilledDate = date
                            }
                        });

                    } else {
                        this.checkedRows[i].itemStatus = "Pending"
                        this.checkedRows[i].fulfilledDate = null
                        var id = this.checkedRows[i].id
                        $.each(this.order.orderItems, function () {
                            if (this.id == id) {
                                this.itemStatus = "Pending"
                                this.fulfilledDate = null
                            }
                        });
                    }

                    promises.push(dbUtils.updateOrderItem(this.checkedRows[i]))
                }

                Promise.all(promises).then(() => {
                    this.checkAndUpdateOrderStatus()
                    console.log(this.order)
                })
            },

            checkAndUpdateOrderStatus: function () {
                var flag = false
                for (var i = 0; i < this.order.orderItems.length; i++) {
                    if (this.order.orderItems[i].itemStatus == "Pending") {
                        flag = false
                        break;
                    } else {
                        flag = true
                    }
                }
                console.log(flag)
                if (flag) {
                    if (this.order.orderStatus == "Pending") {
                        this.order.orderStatus = "Completed"
                        this.order.orderCompletedDate = new Date()
                        dbUtils.updateOrderStatus(this.order._id, "Completed", this.order.orderCompletedDate)
                    }
                } else {
                    this.order.orderStatus = "Pending"
                    this.order.orderCompletedDate = null
                    dbUtils.updateOrderStatus(this.order._id, "Pending", null)
                }

                this.order.__ob__.dep.notify()
            },


            viewInvoice: function (model) {
                this.$router.push("/vbill/" + model._id)
            }

        },

        created: function () {
            this.loadOrderData()
        }
    }
</script>

<style>

    @media print {
        body, html, #wrapper {
            width: 100%;
            -webkit-print-color-adjust: exact;
        }
    }

    .back-button {
        height: 50px;
        width: 50px;
        margin-top: -40px;
        margin-left: -30px;
        float: left;
    }

    .back-button button {
        background: transparent;
        border: none;
        height: 50px;
        width: 50px;
        outline: none;
    }

    .back-button i {
        height: 50px;
        width: 50px;
        color: black;
    }

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

    .vieworder-wrapper {
        padding: 30px;
        width: 100vw;
        height: 100vh;
        overflow-y: scroll;
        overflow-x: scroll;
        transition: all .3s ease;
    }

    .vieworder-subwrapper {
        margin-top: 30px;
        padding-top: 10px;
        background: white;
        padding-bottom: 30px;
        margin-bottom: 30px;
    }

    .view-order-details {
        padding-right: 10px;
        padding-left: 10px;
    }

    .vieworder-wrapper h4 {
        margin-top: 50px;
        margin-left: 30px;
        font-weight: bold;
        font-size: 14px;
    }

    .vieworder-wrapper h5 {
        margin-top: 30px;
        margin-left: 30px;
        font-weight: bold;
        color: darkslategray;
        font-size: 13px;
    }

    .vieworder-wrapper span {
        margin-top: 30px;
        color: darkslategray;
        font-size: 13px;
    }

    .vieworder-mainbutton {
        -webkit-print-color-adjust: exact;
        float: right;
        border: none;
        height: 35px;
        outline: none;
        padding-left: 15px;
        padding-right: 15px;
        font-weight: bold;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 0.8), rgba(0, 205, 172, 0.8)); /*#e96868;*/
        color: white;
        border-radius: 25px;
        box-shadow: none;
        font-size: 12px;
        transition: 0.5s;
        margin-bottom: 30px;
        margin-right: 30px;
        margin-top: -30px;
    }

    .vieworder-mainbutton:focus {
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        transition: 0.5s;
    }

    .vieworder-mainbutton:hover {
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        transition: 0.5s;

    }

    .vieworder-secondarybutton button {
        -webkit-print-color-adjust: exact;
        margin-top: -35px;
        float: right;
        border: none;
        height: 35px;
        outline: none;
        width: auto;
        font-weight: bold;
        background: #E0E0E0; /*#e96868;*/
        color: black;
        border-radius: 25px;
        box-shadow: none;
        font-size: 12px;
        transition: 0.5s;
        margin-bottom: 10px;
        margin-right: 30px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .vieworder-secondarybutton button:focus {
        outline: none;
        transition: 0.5s;
        border-radius: 25px;
    }

    .vieworder-secondarybutton button:hover {
        outline: none;
        transition: 0.5s;
        border-radius: 25px;
    }

    .vieworder-secondarybutton button:disabled {
        background: black;
        color: gray;
        outline: none;
        transition: 0.5s;
        border-radius: 25px;
    }

    .vieworder-mainbutton i {
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

    .column1 {
        width: 33%;
    }

    .pendingOrders-table {
        margin-top: 20px;
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
        border: solid 1px darkslategrey;
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
        border: solid 1px darkslategrey;
    }

    .options {
        margin-top: 30px;
        margin-left: 30px;
    }

</style>