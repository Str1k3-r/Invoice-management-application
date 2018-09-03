<template>
    <div class="OPerforma-wrapper">

        <div class="OPerforma-back-button no-print">
            <button @click="back" class="row sidebar-elements" to="/admin/orders"><i class="fa fa-arrow-left fa-lg"
                                                                                     aria-hidden="true"/></button>
        </div>

        <div class="loading" v-if="!dataLoaded">
            <img src="../../assets/images/load.gif"/>
        </div>

        <div v-if="dataLoaded" class="OPerforma-subwrapper" id="printthis">
            <h4>ORDER</h4>

            <div class="OPerforma-clientInfo">
                <table class="order-table">
                    <tbody>
                    <tr>
                        <td style="font-size: 16px">{{order.client.clientName}}</td>
                        <td style="font-size: 16px"><strong style="margin-right: 15px">Date:</strong>
                            {{formatDate(order.orderPlacedDate)}}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px"><strong style="margin-right: 15px">City:</strong>{{order.client.city}}
                        </td>
                        <td style="font-size: 16px"><strong style="margin-right: 15px">Order Placed By:</strong>{{order.orderPlacedBy}}
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>

            <div class="OPerforma-orderInfo">
                <section class="view-order-details">
                    <b-table class="pendingOrders-table"
                             :data="order.orderItems"
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

                            <b-table-column field="rate" label="Rate">
                                ₹ {{ props.row.amount }}
                            </b-table-column>

                            <b-table-column field="amount" label="Amount">
                                ₹ {{ props.row.taxableAmount }}
                            </b-table-column>

                        </template>

                    </b-table>
                </section>

                <div class="order-details-section">
                    <div class="bank-details">
                        <div class="row OPerforma-hula1">
                            <div class="column OPerforma-hulu2">
                                <span style="margin-right: 15px"><strong>Net Amount in Words:</strong></span>
                                <span>₹ {{numberToWords(order.totalAfterTaxAmount)}}</span>
                            </div>

                            <div class="column OPerforma-hulu1">
                                <span style="margin-right: 15px"><strong>Our Bankers: </strong> </span>
                                <span>Bank of Baroda</span>
                            </div>
                            <div class="column OPerforma-hulu1">
                                <span style="margin-right: 15px"><strong>RTGS/NEFT/IFSC Code: </strong> </span>
                                <span>BARB0ADARSH</span>
                            </div>

                        </div>
                    </div>
                    <table class="order-details-table">
                        <tbody>
                        <tr>
                            <td><strong>Grand Total</strong></td>
                            <td>₹ {{order.totalBeforeTaxAmount}}</td>
                        </tr>
                        <tr>
                            <td><strong>Total Discount</strong></td>
                            <td>₹ {{order.totalDiscount}}</td>
                        </tr>
                        <tr>
                            <td><strong>Add CGST</strong></td>
                            <td>₹ {{order.totalCGST}}</td>
                        </tr>
                        <tr>
                            <td><strong>Add SGST</strong></td>
                            <td>₹ {{order.totalSGST}}</td>
                        </tr>
                        <tr>
                            <td><strong>Add IGST</strong></td>
                            <td>₹ {{order.totalIGST}}</td>
                        </tr>
                        <tr>
                            <td><strong>Net Amount</strong></td>
                            <td>₹ {{order.totalAfterTaxAmount}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import dbUtils from "../../db"
    import {ipcRenderer} from 'electron'


    export default {
        name: "OrderPerforma",

        data: function () {
            return {
                id: this.$route.params.id,
                dataLoaded: false,
                order: null,
            }
        },

        methods: {
            initializeAndClose: function () {
                this.loadOrderData()
            },

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

                }).then(() => {
                    this.dataLoaded = true
                })
            },

            back: function () {
                this.$router.push('/admin/vieworder/' + this.order._id)
            },

            formatDate: function (date) {
                return moment(date).format('DD/MM/YYYY');
            },

            print: function () {
                ipcRenderer.send('print-data', 'yolo')
                //printJS({printable: 'printthis', type: 'html', font:'Montserrat', targetStyles:['*'], css: '/src/renderer/assets/css/print.css'})

            },


            numberToWords: function (amount) {
                var words = new Array();
                words[0] = '';
                words[1] = 'One';
                words[2] = 'Two';
                words[3] = 'Three';
                words[4] = 'Four';
                words[5] = 'Five';
                words[6] = 'Six';
                words[7] = 'Seven';
                words[8] = 'Eight';
                words[9] = 'Nine';
                words[10] = 'Ten';
                words[11] = 'Eleven';
                words[12] = 'Twelve';
                words[13] = 'Thirteen';
                words[14] = 'Fourteen';
                words[15] = 'Fifteen';
                words[16] = 'Sixteen';
                words[17] = 'Seventeen';
                words[18] = 'Eighteen';
                words[19] = 'Nineteen';
                words[20] = 'Twenty';
                words[30] = 'Thirty';
                words[40] = 'Forty';
                words[50] = 'Fifty';
                words[60] = 'Sixty';
                words[70] = 'Seventy';
                words[80] = 'Eighty';
                words[90] = 'Ninety';
                amount = amount.toString();
                var atemp = amount.split(".");
                var number = atemp[0].split(",").join("");
                var n_length = number.length;
                var words_string = "";
                if (n_length <= 9) {
                    var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
                    var received_n_array = new Array();
                    for (var i = 0; i < n_length; i++) {
                        received_n_array[i] = number.substr(i, 1);
                    }
                    for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
                        n_array[i] = received_n_array[j];
                    }
                    for (var i = 0, j = 1; i < 9; i++, j++) {
                        if (i == 0 || i == 2 || i == 4 || i == 7) {
                            if (n_array[i] == 1) {
                                n_array[j] = 10 + parseInt(n_array[j]);
                                n_array[i] = 0;
                            }
                        }
                    }
                    var value = "";
                    for (var i = 0; i < 9; i++) {
                        if (i == 0 || i == 2 || i == 4 || i == 7) {
                            value = n_array[i] * 10;
                        } else {
                            value = n_array[i];
                        }
                        if (value != 0) {
                            words_string += words[value] + " ";
                        }
                        if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                            words_string += "Crores ";
                        }
                        if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                            words_string += "Lakhs ";
                        }
                        if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                            words_string += "Thousand ";
                        }
                        if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                            words_string += "Hundred and ";
                        } else if (i == 6 && value != 0) {
                            words_string += "Hundred ";
                        }
                    }
                    words_string = words_string.split("  ").join(" ");
                    if (words_string == "" || words_string == " ") {
                        words_string = "Zero"
                    }
                }
                return words_string + " Only";
            }


        },

        mounted: function () {
            this.initializeAndClose()
            ipcRenderer.on('data-printed', (event, data) => {
                this.back()
            })
        },

        watch: {
            dataLoaded: function (val, oldVal) {
                this.print()
            }
        },


        updated: function () {

        }

    }
</script>

<style>


    @media print {
        .no-print, .no-print * {
            display: none !important;
        }
    }

    ::-webkit-scrollbar {
        width: 0px; /* remove scrollbar space */
        background: transparent; /* optional: just make scrollbar invisible */
    }

    .OPerforma-back-button {
        margin-top: -40px;
        height: 50px;
        width: 50px;
        margin-left: 20px;
        float: left;
    }

    .OPerforma-back-button button {
        background: transparent;
        border: none;
        height: 50px;
        width: 50px;
        outline: none;
    }

    .OPerforma-back-button i {
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

    .OPerforma-subwrapper {
        background: white;
        padding-left: 30px;
        padding-right: 30px;
    }

    .OPerforma-wrapper {
        width: 100%;
        position: absolute;
        margin-top: -90px;
        margin-bottom: 1px;
        padding-top: 30px;
        background: white;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .OPerforma-orderInfo {
        margin-top: 30px;
    }

    .order-details-section {
        padding-left: 10px;
        padding-right: 10px;
        margin-bottom: 1px;
        display: flex;
        height: auto;
    }

    .OPerforma-subwrapper h4 {
        text-align: center;
        width: 100%;
        font-weight: bold;
        text-decoration: underline;
        font-size: 22px;
        margin-bottom: 50px;
    }

    .bank-details {
        width: 80%;
    }

    .OPerforma-clientInfo {
        display: flex;
        justify-content: center;
    }

    .order-table {
        margin: 0 auto;
    }

    .order-table td {
        font-size: 13px;
        padding: 10px;
    }

    .order-details-table1 {
        width: 100%;
    }

    .order-details-table1 td {
        font-size: 13px;
        padding: 10px;
    }

    .order-details-table {
        margin-left: 5%;
        width: 30%; /* whichever width you want */
    }

    .order-details-table td {
        font-size: 13px;
        padding: 10px;
    }

    .OPerforma-hula1 {
        padding-top: 5px;
        padding-left: 30px;
        padding-right: 30px;
        width: 100%;
    }

    .OPerforma-hulu1 {
        width: 50%;
    }

    .OPerforma-hulu2 {
        margin-bottom: 15px;
        width: 100%;
    }

    .OPerforma-hulu3 {
        width: 25%;
    }

    .OPerforma-subwrapper h5 {
        margin-top: 30px;
        margin-left: 30px;
        font-weight: bold;
        font-size: 14px;
    }

    .OPerforma-subwrapper span {
        margin-top: 30px;
        font-size: 13px;
    }

    .pendingOrders-table {
        margin-top: 20px;
        width: 100%;
        padding: 15px;
    }

    .pendingOrders-table th, .table thead {
        -webkit-print-color-adjust: exact;
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
        font-size: 12px;
        padding: 15px;
        font-weight: lighter;
        border: solid 1px darkslategrey;

    }


</style>