<template>
    <div class="bill-wrapper">

        <div class="bill-back-button no-print">
            <button @click="back" class="row sidebar-elements" to="/admin/orders"><i class="fa fa-arrow-left fa-lg"
                                                                                     aria-hidden="true"/></button>
        </div>

        <div class="loading" v-if="!dataLoaded">
            <img src="../../assets/images/load.gif"/>
        </div>

        <div style="margin-left: 30px; margin-right: 30px" v-if="dataLoaded" class="bill-subwrapper">
            <div class="layer-one" style="margin-bottom: 20px">
                <div class="left-title" style="text-align: center; float: left">
                    <h6 id="bill-copy-type">{{copy}}</h6>
                    <img id="slu-logo" src="../../assets/images/slu.png"/>
                </div>
                <div class="middle-title"
                     style="text-align: center; position: absolute; left: 50%; transform: translateX(-50%)">
                    <h3 style="font-weight: bold; font-size: 36px">SAGAR LOH UDYOG</h3>
                    <h6 style="font-weight: bold; font-size: 14px">OFF/FAC: F-72, HIRAWALA INDUSTRIAL AREA, NAYLA ROAD,
                        KANOTA, JAIPUR - 303012</h6>
                    <h6 style="font-weight: bold; font-size: 14px">POSTAL ADDRESS: 6 KA 2, JAWAHAR NAGAR, JAIPUR -
                        302004</h6>
                    <h6 style="font-weight: bold; font-size: 14px">EMAIL ID: sagarlohudyog@yahoo.com | <span
                            style="text-decoration: underline">GST IN: 08AANFS0378Q1ZB</span></h6>
                </div>
                <div class="right-title" style="text-align: center; margin-top: 5px; float: right">
                    <h6 style="font-weight: bold; font-size: 14px">MOB</h6>
                    <h6 style="font-weight: bold; font-size: 14px">09414074042</h6>
                    <h6 style="font-weight: bold; font-size: 14px">09829034424</h6>
                    <h6 style="font-weight: bold; font-size: 14px">09587900005</h6>
                </div>
            </div>
            <div class="layer-two">
                <div class="row bill-hula1">
                    <div class="column bill-hulu1" style="margin-top: 50px">
                        <h6 style="font-weight: bold; font-size: 13px">REVERSE CHARGE -
                            {{billInputData.reverseCharge}}</h6>
                    </div>
                    <div class="column bill-hulu1" style="margin-top: 50px">
                        <h6 style="font-weight: bold; font-size: 13px">TRANSPORT MODE -
                            {{billInputData.transportMode}}</h6>
                    </div>
                </div>

                <div class="row bill-hula1">
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 13px">INVOICE NO. - {{billInputData.invoiceNo}}</h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 13px">ORDER PLACED BY - {{order.orderPlacedBy}}</h6>
                    </div>
                </div>

                <div class="row bill-hula1">
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 13px">INVOICE DATE - {{invoiceDate}}</h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 13px">DATE OF SUPPLY -
                            {{billInputData.dateOfSupply.toLocaleDateString('en-GB', {
                            day : 'numeric',
                            month : 'short',
                            year : 'numeric'
                            }).split(' ').join(' ')}}</h6>
                    </div>
                </div>

                <div class="row bill-hula1">
                    <div class="column bill-hulu3">
                        <h6 style="font-weight: bold; font-size: 13px">STATE - {{order.client.state}}</h6>
                    </div>
                    <div class="column bill-hulu3">
                        <h6 style="font-weight: bold; font-size: 13px">STATE CODE -
                            {{stateCode(order.client.state)}}</h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 13px">PLACE OF SUPPLY -
                            {{billInputData.placeOfSupply}}</h6>
                    </div>
                </div>
            </div>
            <div class="layer-three">
                <div class="row bill-hula1">
                    <div class="column bill-hulu1" style="margin-top: 50px">
                        <h6 style="font-weight: bold; font-size: 15px; text-decoration: underline">BILLED TO</h6>
                    </div>

                    <div class="column bill-hulu1" style="margin-top: 50px">
                        <h6 style="font-weight: bold; font-size: 15px; text-decoration: underline">SHIPPED TO</h6>
                    </div>
                </div>

                <div class="row bill-hula1">
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 13px">NAME - {{order.client.clientName}}</h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 13px">NAME -
                            {{billInputData.shippedToClient.clientName}}</h6>
                    </div>
                </div>

                <div class="row bill-hula1">
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 13px">ADDRESS -
                            <div style="margin-left: 80px; margin-top: -16px" class="row hula1">
                                <div class="column bill-hulu2" style="margin-bottom: 5px">
                                    {{order.client.address1}}
                                </div>
                                <div class="column bill-hulu3">
                                    {{order.client.city}}
                                </div>

                                <div class="column bill-hulu3">
                                    PINCODE - {{order.client.pincode}}
                                </div>
                            </div>
                        </h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 13px">ADDRESS -
                            <div style="margin-left: 80px; margin-top: -16px" class="row hula1">
                                <div class="column bill-hulu2" style="margin-bottom: 5px">
                                    {{billInputData.shippedToClient.address1}}
                                </div>
                                <div class="column bill-hulu3">
                                    {{billInputData.shippedToClient.city}}
                                </div>

                                <div class="column bill-hulu3">
                                    PINCODE - {{billInputData.shippedToClient.pincode}}
                                </div>
                            </div>
                        </h6>
                    </div>
                </div>

                <div class="row bill-hula1" style="margin-left: -30px; margin-top: -15px">
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 13px">
                            <div class="row hula1">
                                <div v-if="order.client.phoneNo != 0" class="column bill-hulu1">
                                    PHONE NO - {{order.client.phoneNo}}
                                </div>
                                <div v-if="order.client.mobileNo != 0" class="column bill-hulu1">
                                    MOBILE NO - {{order.client.mobileNo}}
                                </div>
                            </div>
                        </h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 13px; ">
                            <div class="row hula1">
                                <div v-if="billInputData.shippedToClient.phoneNo != 0" class="column bill-hulu1">
                                    PHONE NO - {{billInputData.shippedToClient.phoneNo}}
                                </div>
                                <div v-if="billInputData.shippedToClient.mobileNo != 0" class="column bill-hulu1">
                                    MOBILE NO - {{billInputData.shippedToClient.mobileNo}}
                                </div>
                            </div>
                        </h6>
                    </div>
                </div>

                <div class="row bill-hula1" style="margin-left: -30px; margin-top: -15px">
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 13px">
                            <div class="row hula1">
                                <div class="column bill-hulu1">
                                    STATE - {{order.client.state}}
                                </div>
                                <div class="column bill-hulu1">
                                    STATE CODE - {{stateCode(order.client.state)}}
                                </div>
                            </div>
                        </h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 13px;">
                            <div class="row hula1">
                                <div class="column bill-hulu1">
                                    STATE - {{billInputData.shippedToClient.state}}
                                </div>
                                <div class="column bill-hulu1">
                                    STATE CODE - {{stateCode(billInputData.shippedToClient.state)}}
                                </div>
                            </div>
                        </h6>
                    </div>
                </div>

                <div class="row bill-hula1">
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 13px; background: black; color: white">GSTIN -
                            {{order.client.gstUIN}}</h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 13px; background: black; color: white">GSTIN -
                            {{billInputData.shippedToClient.gstUIN}}</h6>
                    </div>
                </div>
            </div>
            <div class="layer-four">

            </div>
        </div>

        <bill-input v-if="openBillInput" :order="order" @closebillI="closeBillInput"></bill-input>
    </div>
</template>

<script>

    import dbUtils from "../../db"
    import {ipcRenderer} from 'electron'
    import BillInput from './Bill/BillInput'

    export default {
        name: "Bill",
        components: {
            billInput: BillInput
        },
        data: function () {
            return {
                invoiceDate: null,
                copy: "TRANSPORT COPY",
                id: this.$route.params.id,
                dataLoaded: false,
                order: null,
                orderItems: [],
                openBillInput: false,
                billInputData: null
            }
        },

        methods: {
            loadOrderData: function () {
                this.invoiceDate = new Date().toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                }).split(' ').join(' ');
                this.orderItems = this.$route.query.orderItems
                console.log(this.$route.query.orderItems)
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
                    this.showBillInput()
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
            },

            closeBillInput: function (data) {
                this.openBillInput = false
                this.billInputData = data
                console.log(data)
                this.dataLoaded = true
            },

            showBillInput: function () {
                this.openBillInput = true
            },

            split: function (s) {
                var arr = s.split(',')
                return arr
            },


            stateCode: function (state) {
                state = state.toUpperCase()
                let code
                switch (state) {
                    case "JAMMU AND KASHMIR":
                        code = "01";
                        break;
                    case "HIMACHAL PRADESH":
                        code = "02";
                        break;
                    case "PUNJAB":
                        code = "03";
                        break;
                    case "CHANDIGARH":
                        code = "04";
                        break;
                    case "UTTRAKHAND":
                        code = "05";
                        break;
                    case "HARYANA":
                        code = "06";
                        break;
                    case "DELHI":
                        code = "07";
                        break;
                    case "RAJASTHAN":
                        code = "08";
                        break;
                    case "UTTAR PRADESH":
                        code = "09";
                        break;
                    case "BIHAR":
                        code = "10";
                        break;
                    case "SIKKIM":
                        code = "11";
                        break;
                    case "ARUNACHAL PRADESH":
                        code = "12";
                        break;
                    case "NAGALAND":
                        code = "13";
                        break;
                    case "MANIPUR":
                        code = "14";
                        break;
                    case "MIZORAM":
                        code = "15";
                        break;
                    case "TRIPURA":
                        code = "16";
                        break;
                    case "MEGHALAYA":
                        code = "17";
                        break;
                    case "ASSAM":
                        code = "18";
                        break;
                    case "WEST BENGAL":
                        code = "19";
                        break;
                    case "JHARKHAND":
                        code = "20";
                        break;
                    case "ORISSA":
                        code = "21";
                        break;
                    case "CHATTISGARH":
                        code = "22";
                        break;
                    case "MADHYA PRADESH":
                        code = "23";
                        break;
                    case "GUJRAT":
                        code = "24";
                        break;
                    case "DAMAN AND DIU":
                        code = "25";
                        break;
                    case "DADRA AND NAGAR HAVELI":
                        code = "26";
                        break;
                    case "MAHARASHTRA":
                        code = "27";
                        break;
                    case "ANDHRA PRADESH (N) (O)":
                        code = "28";
                        break;
                    case "KARNATAKA":
                        code = "29";
                        break;
                    case "GOA":
                        code = "30";
                        break;
                    case "LAKSHADWEEP":
                        code = "31";
                        break;
                    case "KERALA":
                        code = "32";
                        break;
                    case "TAMIL NADU":
                        code = "33";
                        break;
                    case "PUDUCHERRY":
                        code = "34";
                        break;
                    case "ANDAMAN AND NICOBAR ISLAND":
                        code = "35";
                        break;
                    case "TELANGANA":
                        code = "36";
                        break;
                    case "ANDHRA PRADESH (N)":
                        code = "37";
                        break;
                    default:
                        code = "00"

                }

                return code
            }

        },

        mounted: function () {
            this.loadOrderData()
            ipcRenderer.on('bill-printed', (event, data) => {
                console.log(data)
                this.back()
            })
        },
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

    .bill-back-button {
        margin-top: -40px;
        height: 50px;
        width: 50px;
        margin-left: 20px;
        float: left;
    }

    .bill-back-button button {
        background: transparent;
        border: none;
        height: 50px;
        width: 50px;
        outline: none;
    }

    .bill-back-button i {
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

    .bill-subwrapper {
        background: white;
        padding-left: 30px;
        padding-right: 30px;
    }

    .bill-wrapper {
        width: 100%;
        position: absolute;
        margin-top: -90px;
        margin-bottom: 1px;
        padding-top: 30px;
        background: white;
        overflow-y: auto;
        overflow-x: hidden;
    }

    #slu-logo {
        width: 90px;
        height: auto;
    }

    #bill-copy-type {
        font-size: 16px;
        font-weight: bold;
    }

    .bill-hula1 {
        padding-top: 5px;
        width: 100%;
    }

    .bill-hulu1 {
        width: 50%;
    }

    .bill-hulu2 {
        width: 100%;
    }

    .bill-hulu3 {
        width: 25%;
    }

</style>