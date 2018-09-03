<template>
    <div class="bill-wrapper" id="pt">

        <div class="bill-back-button no-print">
            <button @click="back" class="row sidebar-elements" to="/admin/orders"><i class="fa fa-arrow-left fa-lg"
                                                                                     aria-hidden="true"/></button>
        </div>

        <div class="loading" v-if="!dataLoaded">
            <img src="../../assets/images/load.gif"/>
        </div>

        <div v-if="dataLoaded" class="bill-subwrapper">
            <div class="layer-one" style="margin-top: -20px;">
                <div class="left-title" style="text-align: center; float: left; margin-left: 15px">
                    <h6 id="bill-copy-type">{{copy}}</h6>
                    <img id="slu-logo" src="../../assets/images/slu.png"/>
                </div>
                <div class="middle-title"
                     style="text-align: center; position: absolute; left: 50%; transform: translateX(-50%)">
                    <h3 style="font-weight: bold; font-size: 30px">SAGAR LOH UDYOG</h3>
                    <h6 style="font-weight: bold; font-size: 14px">OFF/FAC: F-72, HIRAWALA INDUSTRIAL AREA, NAYLA ROAD,
                        KANOTA, JAIPUR - 303012</h6>
                    <h6 style="font-weight: bold; font-size: 14px">POSTAL ADDRESS: 6 KA 2, JAWAHAR NAGAR, JAIPUR -
                        302004</h6>
                    <h6 style="font-weight: bold; font-size: 14px">EMAIL ID: sagarlohudyog@yahoo.com | <span
                            style="text-decoration: underline">GST IN: 08AANFS0378Q1ZB</span></h6>
                </div>
                <div class="right-title" style="text-align: center; margin-top: 5px; float: right; margin-right: 15px">
                    <h6 style="font-weight: bold; font-size: 14px">MOB</h6>
                    <h6 style="font-weight: bold; font-size: 14px">09414074042</h6>
                    <h6 style="font-weight: bold; font-size: 14px">09829034424</h6>
                    <h6 style="font-weight: bold; font-size: 14px">09587900005</h6>
                </div>
            </div>
            <div class="layer-two" style="margin-left: 30px">
                <div class="row bill-hula1">
                    <div class="column bill-hulu1" style="margin-top: 10px">
                        <h6 style="font-weight: bold; font-size: 12px">REVERSE CHARGE -
                            {{invoice.reverseCharge}}</h6>
                    </div>
                    <div class="column bill-hulu1" style="margin-top: 10px">
                        <h6 style="font-weight: bold; font-size: 12px">TRANSPORT MODE -
                            {{invoice.transportMode}}</h6>
                    </div>
                </div>

                <div class="row bill-hula1" style="margin-top: -5px">
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 12px">INVOICE NO. - {{invoice.invoiceNo}}</h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 12px">ORDER PLACED BY - {{invoice.orderPlacedBy}}</h6>
                    </div>
                </div>

                <div class="row bill-hula1" style="margin-top: -5px">
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 12px">INVOICE DATE -
                            {{invoiceDate.toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                            }).split(' ').join(' ')}}</h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 12px">DATE OF SUPPLY -
                            {{invoice.dateOfSupply.toLocaleDateString('en-GB', {
                            day : 'numeric',
                            month : 'short',
                            year : 'numeric'
                            }).split(' ').join(' ')}}</h6>
                    </div>
                </div>

                <div class="row bill-hula1" style="margin-top: -5px">
                    <div class="column bill-hulu3">
                        <h6 style="font-weight: bold; font-size: 12px">STATE - {{invoice.billedTo.state}}</h6>
                    </div>
                    <div class="column bill-hulu3">
                        <h6 style="font-weight: bold; font-size: 12px">STATE CODE -
                            {{stateCode(invoice.billedTo.state)}}</h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 12px">PLACE OF SUPPLY -
                            {{invoice.placeOfSupply}}</h6>
                    </div>
                </div>
            </div>
            <div class="layer-three" style="margin-left: 30px">
                <div class="row bill-hula1">
                    <div class="column bill-hulu1" style="margin-top: 10px">
                        <h6 style="font-weight: bold; font-size: 14px; text-decoration: underline">BILLED TO</h6>
                    </div>

                    <div class="column bill-hulu1" style="margin-top: 10px">
                        <h6 style="font-weight: bold; font-size: 14px; text-decoration: underline">SHIPPED TO</h6>
                    </div>
                </div>

                <div class="row bill-hula1" style="margin-top: -5px">
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 12px">NAME - {{invoice.billedTo.clientName}}</h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 12px">NAME -
                            {{invoice.shippedTo.clientName}}</h6>
                    </div>
                </div>

                <div class="row bill-hula1" style="margin-top: -5px">
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 12px">ADDRESS -
                            <div style="margin-left: 80px; margin-top: -16px" class="row hula1">
                                <div class="column bill-hulu2" style="margin-bottom: 5px">
                                    {{invoice.billedTo.address1}}
                                </div>
                                <div class="column bill-hulu1">
                                    {{invoice.billedTo.city}}
                                </div>

                                <div class="column bill-hulu1">
                                    PINCODE - {{invoice.billedTo.pincode}}
                                </div>
                            </div>
                        </h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 12px">ADDRESS -
                            <div style="margin-left: 80px; margin-top: -16px" class="row hula1">
                                <div class="column bill-hulu2" style="margin-bottom: 5px">
                                    {{invoice.shippedTo.address1}}
                                </div>
                                <div class="column bill-hulu1">
                                    {{invoice.shippedTo.city}}
                                </div>

                                <div class="column bill-hulu1">
                                    PINCODE - {{invoice.shippedTo.pincode}}
                                </div>
                            </div>
                        </h6>
                    </div>
                </div>

                <div class="row bill-hula1">
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 12px; margin-left: -15px">
                            <div class="row hula1">
                                <div v-if="invoice.billedTo.phoneNo != 0" class="column bill-hulu1">
                                    PHONE NO - {{invoice.billedTo.phoneNo}}
                                </div>
                                <div v-if="invoice.billedTo.mobileNo != 0" class="column bill-hulu1">
                                    MOBILE NO - {{invoice.billedTo.mobileNo}}
                                </div>
                            </div>
                        </h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 12px; margin-left: -15px">
                            <div class="row hula1">
                                <div v-if="invoice.shippedTo.phoneNo != 0" class="column bill-hulu1">
                                    PHONE NO - {{invoice.shippedTo.phoneNo}}
                                </div>
                                <div v-if="invoice.shippedTo.mobileNo != 0" class="column bill-hulu1">
                                    MOBILE NO - {{invoice.shippedTo.mobileNo}}
                                </div>
                            </div>
                        </h6>
                    </div>
                </div>

                <div class="row bill-hula1" style="margin-top: -5px">
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 12px; margin-left: -15px">
                            <div class="row hula1">
                                <div class="column bill-hulu1">
                                    STATE - {{invoice.billedTo.state}}
                                </div>
                                <div class="column bill-hulu1">
                                    STATE CODE - {{stateCode(invoice.billedTo.state)}}
                                </div>
                            </div>
                        </h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 12px; margin-left: -15px">
                            <div class="row hula1">
                                <div class="column bill-hulu1">
                                    STATE - {{invoice.shippedTo.state}}
                                </div>
                                <div class="column bill-hulu1">
                                    STATE CODE - {{stateCode(invoice.shippedTo.state)}}
                                </div>
                            </div>
                        </h6>
                    </div>
                </div>

                <div class="row bill-hula1" style="margin-top: -5px">
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 12px; background: black; color: white">
                            GSTIN -
                            {{invoice.billedTo.gstUIN}}</h6>
                    </div>
                    <div class="column bill-hulu1">
                        <h6 style="font-weight: bold; font-size: 12px; background: black; color: white">
                            GSTIN -
                            {{invoice.shippedTo.gstUIN}}</h6>
                    </div>
                </div>
            </div>
            <div class="layer-four" style="page-break-after: auto; page-break-inside: auto; page-break-before: auto">
                <section class="view-order-details">
                    <b-table class="bill-table"
                             style="font-size: 8px"
                             :data="invoice.orderItems">
                        <template slot-scope="props">

                            <b-table-column field="productDescription" label="Product">
                                {{ props.row.productDescription }}
                            </b-table-column>

                            <b-table-column field="size" label="Size">
                                {{ props.row.size }}
                            </b-table-column>

                            <b-table-column field="hsnCode" label="HSN">
                                {{ props.row.hsnCode }}
                            </b-table-column>

                            <b-table-column field="quantity" label="Qty">
                                {{ props.row.quantity }}
                            </b-table-column>

                            <b-table-column field="rate" label="Rate">
                                ₹{{ props.row.amount }}
                            </b-table-column>

                            <b-table-column field="amount" label="Amt.">
                                ₹{{ props.row.taxableAmount }}
                            </b-table-column>

                            <b-table-column field="discount" label="Disc.">
                                {{ props.row.discount }}%
                            </b-table-column>

                            <b-table-column field="amount" label="Taxable Amt.">
                                ₹{{ (props.row.taxableAmount * (1-props.row.discount/ 100) ).toFixed(2) }}
                            </b-table-column>

                            <b-table-column field="cgstRate" label="CGST %">
                                {{ props.row.cgstRate }}%
                            </b-table-column>

                            <b-table-column field="cgstAmount" label="CGST Amt.">
                                ₹{{ props.row.cgstAmount }}
                            </b-table-column>

                            <b-table-column field="sgstRate" label="SGST %">
                                {{ props.row.sgstRate }}%
                            </b-table-column>

                            <b-table-column field="sgstAmount" label="SGST Amt.">
                                ₹{{ props.row.sgstAmount }}
                            </b-table-column>

                            <b-table-column field="igstRate" label="IGST %">
                                {{ props.row.igstRate }}%
                            </b-table-column>

                            <b-table-column field="igstAmount" label="IGST Amt.">
                                ₹{{ props.row.igstAmount }}
                            </b-table-column>

                            <b-table-column field="totalAmount" label="Total Amt.">
                                ₹{{ props.row.totalAmount }}
                            </b-table-column>

                        </template>

                    </b-table>
                </section>
            </div>

            <div class="layer-five" style="margin-left: 50px">
                <div class="row bill-hula1">
                    <div class="column bill-hulu4">
                        <div class="row bill-hula1">
                            <div class="column bill-hulu2">
                                <span style="margin-right: 15px"><strong>NET AMOUNT IN WORDS:</strong></span>
                                <span>₹{{numberToWords(invoice.totalAfterTaxAmount)}}</span>
                            </div>

                            <div class="column bill-hulu1">
                                <div class="column bill-hulu1">
                                    <span style="margin-right: 15px"><strong>OUR BANKERS: </strong> </span>
                                    <span>Bank of Baroda</span>
                                </div>

                                <div class="column bill-hulu1">
                                    <span style="margin-right: 15px"><strong>RTGS/NEFT/IFSC Code: </strong> </span>
                                    <span>BARB0ADARSH</span>
                                </div>
                            </div>

                            <div class="column bill-hulu1">
                                <span style="margin-right: 15px"><strong>ACCOUNT NO.: </strong> </span>
                                <span><strong>18900400000254</strong></span>
                            </div>


                            <div class="column bill-hulu1">
                                <span style="margin-right: 15px"><strong>ORDER NUMBER: </strong> </span>
                                <span>{{invoice.orderNumber}}</span>
                            </div>
                            <div class="column bill-hulu1">
                                <span style="margin-right: 15px"><strong>ORDER DATE: </strong> </span>
                                <span>{{invoice.orderPlacedDate.toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                            }).split(' ').join(' ')}}</span>
                            </div>

                            <div class="column bill-hulu2">
                                <span style="margin-right: 15px"><strong>TRANSPORT:</strong></span>
                                <span>{{invoice.transport}}</span>
                            </div>

                            <div class="column bill-hulu2">
                                <span style="margin-right: 15px"><strong>NO. OF PACKING:</strong></span>
                                <span>{{invoice.numberOfPacking}}</span>
                            </div>

                            <div class="column bill-hulu2">
                                <span style="margin-right: 15px"><strong>PRIVATE MARKA:</strong></span>
                                <span>{{invoice.privateMarka}}</span>
                            </div>

                            <div class="column bill-hulu2" v-if="showEwayBill">
                                <span style="margin-right: 15px"><strong>E-WAY BILL NO.:</strong></span>
                                <span>{{invoice.ewayBillNo}}</span>
                            </div>


                        </div>
                    </div>
                    <div class="column bill-hulu5">
                        <table>
                            <tbody style="font-size: 12px; margin-top: 5px">
                            <tr>
                                <td><strong>GRAND TOTAL</strong></td>
                                <td>₹{{invoice.totalBeforeTaxAmount}}</td>
                            </tr>
                            <tr>
                                <td><strong>TOTAL DISCOUNT</strong></td>
                                <td>₹{{invoice.totalDiscount}}</td>
                            </tr>
                            <tr>
                                <td><strong>ADD CGST</strong></td>
                                <td>₹{{invoice.totalCGST}}</td>
                            </tr>
                            <tr>
                                <td><strong>ADD SGST</strong></td>
                                <td>₹{{invoice.totalSGST}}</td>
                            </tr>
                            <tr>
                                <td><strong>ADD IGST</strong></td>
                                <td>₹{{invoice.totalIGST}}</td>
                            </tr>
                            <tr>
                                <td><strong>NET AMOUNT</strong></td>
                                <td>₹{{invoice.totalAfterTaxAmount}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row bill-hula1"
                     style="border: 1px solid darkslategrey; padding-left: 15px; margin-left: -30px; margin-top: 10px">
                    <div class="column bill-hulu4">
                        <span><strong>TERMS AND CONDITIONS:</strong></span>
                        <br>
                        <span><strong>E. & OE.</strong></span>
                        <li><span>All disputes are subject to Jaipur jurisdiction only.</span></li>
                        <li style="margin-top: -15px"><span>Interest @ 24% shall be chargeable for amount not paid within 30 days of notice.</span>
                        </li>
                        <li style="margin-top: -15px"><span>Objection, if any, must be raised within 7 days of receipt of this bill, otherwise it will be presumed that the bill is correct.</span>
                        </li>
                    </div>
                    <div class="column bill-hulu5">
                        <h6 style="font-weight: bold; font-size: 18px; margin-top: 10px">FOR SAGAR LOH UDYOG</h6>
                        <h6 style="font-weight: bold; font-size: 14px; margin-top: 80px">AUTHORISED SIGNATORY</h6>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import dbUtils from "../../db"
    import {ipcRenderer} from 'electron'
    import BillInput from './Bill/BillInput'

    export default {
        name: "Bill",
        data: function () {
            return {
                invoiceDate: null,
                copy: "TRANSPORT COPY",
                id: this.$route.params.id,
                dataLoaded: false,
                invoice: {},
                orderItems: [],
            }
        },

        methods: {
            loadInvoiceData: function () {
                this.invoiceDate = new Date()
                this.invoice.shippedTo = {}
                dbUtils.getInvoiceById(this.id).then((invoice) => {
                    this.invoice = invoice['0']
                    var totbt = 0
                    var totcgst = 0
                    var totigst = 0
                    var totsgst = 0
                    var totgst = 0
                    var totat = 0
                    var totdiscount = 0
                    for (var j = 0; j < this.invoice.orderItems.length; j++) {
                        this.invoice.orderItems[j].number = j + 1
                        totdiscount += this.invoice.orderItems[j].taxableAmount * this.invoice.orderItems[j].discount / 100
                        totbt += this.invoice.orderItems[j].taxableAmount
                        totcgst += this.invoice.orderItems[j].cgstAmount
                        totsgst += this.invoice.orderItems[j].sgstAmount
                        totigst += this.invoice.orderItems[j].igstAmount
                        totgst += this.invoice.orderItems[j].cgstAmount + this.invoice.orderItems[j].sgstAmount + this.invoice.orderItems[j].igstAmount
                        totat += this.invoice.orderItems[j].totalAmount
                        //this.order.orderDesc.push((this.order.orderItems[j].productDescription + '  Size: ' + this.order.orderItems[j].size + '  Qty: ' + this.order.orderItems[j].quantity + ' Total Amount: Rs ' + this.order.orderItems[j].totalAmount + '  Status: ' + this.order.orderItems[j].itemStatus))
                    }

                    this.invoice.totalDiscount = totdiscount.toFixed(2)
                    this.invoice.totalBeforeTaxAmount = totbt.toFixed(2)
                    this.invoice.totalCGST = totcgst.toFixed(2)
                    this.invoice.totalSGST = totsgst.toFixed(2)
                    this.invoice.totalIGST = totigst.toFixed(2)
                    this.invoice.totalGST = totgst.toFixed(2)
                    this.invoice.totalAfterTaxAmount = Math.round(totat, 2)
                    console.log(this.invoice, this.invoice.shippedTo)
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
                ipcRenderer.send('print-bill', 'yolo')
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
            },

        },

        mounted: function () {
            this.loadInvoiceData()
            ipcRenderer.on('bill-printed', (event, data) => {
                this.back()
            })
        },

        watch: {
            dataLoaded: function (val, oldVal) {
                //setTimeout(function() { this.print() }, 600);
            }
        },
    }
</script>

<style>

    @media print {
        .no-print, .no-print * {
            display: none !important;
        }

        html, body {
            border: 1px solid white;
            height: 99%;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
        }

        @page {
            margin: 0cm 0.2cm 0cm 0.2cm;
        }
    }

    ::-webkit-scrollbar {
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
        height: 100%;
    }

    .bill-subwrapper span {
        margin-top: 30px;
        font-size: 12px;
    }

    .bill-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
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
        -webkit-print-color-adjust: exact;
    }

    #bill-copy-type {
        font-size: 14px;
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

    .bill-hulu4 {
        width: 80%;
    }

    .bill-hulu5 {
        width: 20%;
    }

    .bill-table {
        margin-top: 20px;
        width: 100%;
        page-break-inside: auto;
    }

    .bill-table th, .table thead {
        -webkit-print-color-adjust: exact;
        background: rgb(244, 245, 249);
        font-weight: bold;
        font-size: 12px;
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
        font-size: 8px;
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

    .bill-table td {
        border-radius: 5px;
        font-size: 8px;
        font-weight: lighter;
        border: solid 1px darkslategrey;
        page-break-after: auto;

    }

    .layer-four {
        padding-left: 10px;
        padding-right: 10px;
        margin-bottom: 1px;
        display: flex;
        height: auto;
    }

    .bank-details {
        width: 80%;
    }

    .bill-hulu5 td {
        padding-left: 5px;
        padding-top: 5px;
        padding-right: 5px;
    }


</style>