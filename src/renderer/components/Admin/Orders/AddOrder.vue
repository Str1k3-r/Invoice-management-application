<template>
    <transition name="modal">
        <div class="modal" style="display: block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="addO-wrapper">

                        <div id="addO-subwrapper">
                            <button @click.prevent="close" id="hideAddO"><i class="fa fa-times"/></button>

                            <div class="loading" v-if="!dataLoaded">
                                <img src="../../../assets/images/load.gif"/>
                            </div>

                            <div class="loaded" v-if="dataLoaded">

                                <div id="addO-subwrapper-client" v-if="clientOrOrder">
                                    <h4> CLIENT INFORMATION </h4>

                                    <div class="addC-Igroup">
                                        <label for="Client Name">Client Name</label>
                                        <br/>
                                        <input type="text" id="Client Name" name="Client Name" required
                                               v-on:input="suggestAndFill(clientName)"
                                               class="f-control" v-model="clientName"/>

                                        <div class="addO-suggestions" v-if="showClientSuggestions">
                                            <button v-for="suggestion in clientSuggestions"
                                                    class="clientName"
                                                    @click.prevent="editClientFields(suggestion)">
                                                {{suggestion}}
                                            </button>
                                        </div>

                                    </div>

                                    <div class="addC-Igroup" v-for="clientField in clientFields">
                                        <label for="clientField">{{clientField}}</label>
                                        <br/>
                                        <input type="text" v-bind:id="clientField" v-bind:name="clientField" required
                                               class="f-control" v-model="clientFieldValues[clientField]"/>
                                    </div>

                                    <div class="addC-Bgroup">
                                        <button class="addC-button" @click.prevent="next"><i class="fa fa-caret-right"/>NEXT
                                        </button>
                                    </div>

                                </div>

                                <div id="addO-subwrapper-orderDetails" v-if="!clientOrOrder">
                                    <h4> ORDER DETAILS </h4>
                                    <div class="addC-Igroup">
                                        <label for="orderNumber">Order Number</label>
                                        <br/>
                                        <input type="text" id="orderNumber" name="orderNumber" class="f-control"
                                               v-model="orderNumber"/>
                                    </div>

                                    <div class="addC-Igroup">
                                        <label for="orderPlacedBy">Order Placed By</label>
                                        <br/>
                                        <input type="text" id="orderPlacedBy" name="orderPlacedBy" class="f-control"
                                               v-model="orderPlacedBy"/>
                                    </div>

                                    <div class="addC-Igroup">
                                        <label for="orderPlacedBy">Order Placed Date</label>
                                        <br/>
                                        <div class="datepicker">
                                            <datepicker v-model="orderPlacedDate" name="orderPlacedDate"></datepicker>
                                        </div>
                                    </div>

                                    <div class="addC-Igroup1">
                                        <label for="orderStatus">Order Status</label>
                                        <button id="changeOrderStatus" @click.prevent="changeOrderStatus">CHANGE ORDER
                                            STATUS
                                        </button>
                                        <br/>
                                        <input readonly type="text" id="orderStatus" name="orderStatus"
                                               class="f-control" v-model="orderStatus"/>
                                    </div>

                                </div>

                                <div id="addO-subwrapper-order" v-if="!clientOrOrder">
                                    <h4> ORDER ITEMS </h4>

                                    <button id="addOrderItem" @click.prevent="addOrderItem">ADD ORDER ITEM</button>


                                    <div class="orderItems" v-bind:id="formulateID(i-1)"
                                         v-for="i in numberOfItems">

                                        <h5> Order Item {{i}}</h5>

                                        <div class="orderItemButtons">

                                            <button class="showOrderItem" @click.prevent="toggleShowOrderItem(i-1)">
                                                <i
                                                        class="fa fa-minus-square"></i></button>

                                            <button class="deleteOrderItem" @click.prevent="deleteOrderItem(i-1)"><i
                                                    class="fa fa-trash-alt"></i></button>
                                        </div>


                                        <div v-if="showOrderItem[i-1] == true">

                                            <div class="addC-Igroup">
                                                <label>Product Description</label>
                                                <br/>
                                                <input type="text" class="productDescription f-control" required
                                                       v-on:input="watchAndSuggestDesc(orderItems[i-1].productDescription)"
                                                       v-model="orderItems[i-1].productDescription"/>

                                                <div class="addO-suggestions" v-if="showProductSuggestions">
                                                    <button v-for="suggestion in productSuggestions"
                                                            class="productDescription"
                                                            @click.prevent="editDescField(suggestion, i)">
                                                        {{suggestion}}
                                                    </button>
                                                </div>
                                            </div>

                                            <div class="addC-Igroup">
                                                <label>Size</label>
                                                <br/>
                                                <input type="text" class="size f-control" required
                                                       v-model="orderItems[i-1].size"/>
                                            </div>

                                            <div class="addC-Igroup">
                                                <label>HSN Code</label>
                                                <br/>
                                                <input type="number" class="hsn f-control" required
                                                       v-on:input="setTax(orderItems[i-1].hsnCode, i-1)"
                                                       v-model="orderItems[i-1].hsnCode"/>

                                            </div>


                                            <div class="addC-Igroup">
                                                <label>Quantity</label>
                                                <br/>
                                                <input type="number" class="qty f-control" required
                                                       v-on:input="setTaxableAmount(orderItems[i-1].amount, i-1)"
                                                       v-model="orderItems[i-1].quantity"/>
                                            </div>


                                            <div class="addC-Igroup">
                                                <label>Amount</label>
                                                <br/>
                                                <input type="number" class="amount f-control" required
                                                       v-on:input="setTaxableAmount(orderItems[i-1].amount, i-1)"
                                                       v-model="orderItems[i-1].amount"/>
                                            </div>


                                            <div class="addC-Igroup">
                                                <label>Discount %</label>
                                                <br/>
                                                <input type="number" class="discount f-control" required
                                                       v-on:input="setTaxableAmount(orderItems[i-1].amount, i-1)"
                                                       v-model="orderItems[i-1].discount"/>
                                            </div>

                                            <div class="addC-Igroup">
                                                <label>Taxable Amount</label>
                                                <br/>
                                                <input type="number" class="discount f-control" required
                                                       v-on:input="setTaxableAmount(orderItems[i-1].amount, i-1)"
                                                       v-model="orderItems[i-1].taxableAmount"/>
                                            </div>

                                            <div class="addC-Igroup">
                                                <label>CGST %</label>
                                                <br/>
                                                <input type="number" class="qty f-control" required
                                                       v-on:input="setTaxableAmount(orderItems[i-1].amount, i-1)"
                                                       v-model="orderItems[i-1].cgstRate"/>
                                            </div>

                                            <div class="addC-Igroup">
                                                <label>CGST Amount</label>
                                                <br/>
                                                <input type="number" class="qty f-control" required
                                                       v-on:input="setTaxableAmount(orderItems[i-1].amount, i-1)"
                                                       v-model="orderItems[i-1].cgstAmount"/>
                                            </div>

                                            <div class="addC-Igroup">
                                                <label>SGST %</label>
                                                <br/>
                                                <input type="number" class="qty f-control" required
                                                       v-on:input="setTaxableAmount(orderItems[i-1].amount, i-1)"
                                                       v-model="orderItems[i-1].sgstRate"/>
                                            </div>

                                            <div class="addC-Igroup">
                                                <label>SGST Amount</label>
                                                <br/>
                                                <input type="number" class="qty f-control" required
                                                       v-on:input="setTaxableAmount(orderItems[i-1].amount, i-1)"
                                                       v-model="orderItems[i-1].sgstAmount"/>
                                            </div>

                                            <div class="addC-Igroup">
                                                <label>IGST %</label>
                                                <br/>
                                                <input type="number" class="qty f-control" required
                                                       v-on:input="setTaxableAmount(orderItems[i-1].amount, i-1)"
                                                       v-model="orderItems[i-1].igstRate"/>
                                            </div>

                                            <div class="addC-Igroup">
                                                <label>IGST Amount</label>
                                                <br/>
                                                <input type="number" class="qty f-control" required
                                                       v-on:input="setTaxableAmount(orderItems[i-1].amount, i-1)"
                                                       v-model="orderItems[i-1].igstAmount"/>
                                            </div>

                                            <div class="addC-Igroup">
                                                <label>Total Amount</label>
                                                <br/>
                                                <input type="number" class="qty f-control" required
                                                       v-model="orderItems[i-1].totalAmount"/>
                                            </div>

                                        </div>
                                    </div>


                                </div>

                            </div>

                            <div id="addO-subwrapper-final" v-if="!clientOrOrder">
                                <h4> ORDER SUMMARY </h4>

                                <div class="addC-Igroup">
                                    <label for="totalBeforeTaxAmount">Total Before Tax </label>
                                    <br/>
                                    <input type="number" id="totalBeforeTaxAmount" name="totalBeforeTaxAmount"
                                           class="f-control"
                                           v-model="totalBeforeTaxAmount"/>
                                </div>

                                <div class="addC-Igroup">
                                    <label for="totalCGST">Total CGST </label>
                                    <br/>
                                    <input type="number" id="totalCGST" name="totalCGST" class="f-control"
                                           v-model="totalCGST"/>
                                </div>

                                <div class="addC-Igroup">
                                    <label for="totalSGST">Total SGST</label>
                                    <br/>
                                    <input type="number" id="totalSGST" name="totalSGST" class="f-control"
                                           v-model="totalSGST"/>
                                </div>

                                <div class="addC-Igroup">
                                    <label for="totalIGST">Total IGST</label>
                                    <br/>
                                    <input type="number" id="totalIGST" name="totalIGST" class="f-control"
                                           v-model="totalIGST"/>
                                </div>

                                <div class="addC-Igroup">
                                    <label for="totalGST">Total GST</label>
                                    <br/>
                                    <input type="number" id="totalGST" name="totalGST" class="f-control"
                                           v-model="totalGST"/>
                                </div>

                                <div class="addC-Igroup">
                                    <label for="roundOff">Round Off</label>
                                    <br/>
                                    <input type="number" id="roundOff" name="roundOff" class="f-control"
                                           v-model="roundOff"/>
                                </div>

                                <div class="addC-Igroup">
                                    <label for="totalAfterTaxAmount"><b>Total After Tax</b></label>
                                    <br/>
                                    <input type="number" id="totalAfterTaxAmount" name="totalAfterTaxAmount"
                                           class="f-control"
                                           v-model="totalAfterTaxAmount"/>
                                </div>

                                <div class="addC-Bgroup1">
                                    <button class="addC-button" @click.prevent="prev"><i
                                            class="fa fa-caret-left"/>PREV
                                    </button>

                                    <button class="addC-button" @click.prevent="save"><i class="fa fa-save"/>SAVE
                                    </button>
                                </div>

                            </div>


                        </div>


                    </div>

                </div>

            </div>
        </div>
    </transition>
</template>

<script>

    import Datepicker from 'vuejs-datepicker'
    import dbUtils from "../../../db"

    export default {
        name: "AddOrder",

        components: {
            Datepicker
        },

        data: function () {
            return {
                clientOrOrder: true,
                dataLoaded: true,
                clientName: '',
                clientFields: ["Address", "City", "State", "Pincode", "Phone No", "Mobile No", "GST UIN"],
                dbClientFields: ["address1", "city", "state", "pincode", "phoneNo", "mobileNo", "gstUIN"],
                clientFieldValues: [],
                clientSuggestions: [],
                clients: [],
                fieldSuggestions: [],
                orderNumber: '',
                orderPlacedBy: '',
                orderPlacedDate: null,
                orderStatus: 'Pending',
                orderCompletedDate: null,
                numberOfItems: 0,
                orderItems: [],
                products: {},
                productSpecifications: [],
                productDescriptions: [],
                productSuggestions: [],
                showOrderItem: [],
                showProductSuggestions: false,
                showClientSuggestions: false,
                hsnCodes: [],
                hsnCodeSuggestions: [],
                totalBeforeTaxAmount: 0,
                totalCGST: 0,
                totalSGST: 0,
                totalIGST: 0,
                totalGST: 0,
                totalAfterTaxAmount: 0,
                roundOff: 0,
            }
        },

        methods: {
            close: function () {
                this.$emit('closeAddO');
            },

            closeandrefresh: function () {
                this.$emit('reloadAddO')
            },

            save: function () {
                if (this.orderItems.length == 0) {
                    document.getElementById("addOrderItem").focus()
                    return
                }
                var client = {}
                client['clientName'] = this.clientName
                for (var i = 0; i < this.clientFields.length; i++) {
                    client[this.dbClientFields[i]] = this.clientFieldValues[this.clientFields[i]]
                }


                this.dataLoaded = false

                var instance = this

                function callback(instance) {
                    instance.closeandrefresh()
                }

                dbUtils.addOrder(instance.orderNumber, client, instance.orderPlacedBy, instance.orderPlacedDate, instance.orderCompletedDate, instance.orderStatus, instance.orderItems, callback, instance)
            },

            next: function () {
                if (this.clientFieldValues["State"] != undefined && this.clientFieldValues["State"] != "") {
                    this.clientOrOrder = false
                } else {
                    document.getElementById("State").focus()
                }
            },

            prev: function () {
                this.clientOrOrder = true
            },

            suggestAndFill: function (clientName) {

                var re = new RegExp("^" + clientName.toLowerCase());

                if (clientName != undefined && clientName != '') {
                    this.clientSuggestions = []
                    var suggestions = this.clients.filter((client) => {
                        return client.clientName.toLowerCase().match(re)
                    })

                    for (var i = 0; i < suggestions.length; i++) {
                        this.clientSuggestions.push(suggestions[i].clientName + ", " + suggestions[i].city + ", " + suggestions[i].state)
                    }

                    this.showClientSuggestions = true
                } else {
                    this.clientSuggestions = []
                    this.showClientSuggestions = false
                }


            },

            onLoad() {
                this.dataLoaded = false
                this.orderPlacedDate = new Date()
                var year = this.orderPlacedDate.getFullYear()
                //this.orderNumber = "SLU/" + year.toString() + "-" + (year + 1).toString().substr(-2) + "/"
                this.fetchPS()
            },

            changeOrderStatus: function () {
                if (this.orderStatus == "Pending") {
                    this.orderStatus = "Completed"
                    this.orderCompletedDate = new Date()
                    for (var i = 0; i < this.orderItems.length; i++) {
                        this.orderItems.itemStatus = "Completed"
                    }

                } else {
                    this.orderStatus = "Pending"
                    this.orderCompletedDate = null
                    for (var i = 0; i < this.orderItems.length; i++) {
                        this.orderItems.itemStatus = "Pending"
                    }
                }
            },

            addOrderItem: function () {

                this.showOrderItem[this.numberOfItems - 1] = false
                this.orderItems[this.numberOfItems] = {
                    productDescription: '',
                    size: 0,
                    quantity: 0,
                    hsnCode: 0,
                    amount: 0,
                    discount: 0,
                    taxableAmount: 0,
                    cgstRate: 0,
                    cgstAmount: 0,
                    igstRate: 0,
                    igstAmount: 0,
                    sgstRate: 0,
                    sgstAmount: 0,
                    totalAmount: 0,
                    itemStatus: 'Pending',
                    fulfilledDate: null
                }
                if (this.orderStatus == "Completed") {
                    this.orderItems[this.numberOfItems].itemStatus = "Completed"
                    this.orderItems[this.numberOfItems].fulfilledDate = new Date()
                }
                this.showOrderItem[this.numberOfItems] = true
                this.numberOfItems += 1

            },

            deleteOrderItem: function (index) {
                this.orderItems.splice(index, 1)
                this.showOrderItem.splice(index, 1)
                this.numberOfItems -= 1
            },

            formulateID: function (index) {
                return "OrderItem" + index.toString()
            },

            formulateFieldID: function (index, field) {
                return field.toString() + index.toString()
            },

            formulateHideID: function (index) {
                return "OrderItemDiv" + index.toString()
            },


            fetchPS: function () {

                dbUtils.getAllProductSpecifications().then((productSpecifications, err) => {
                    if (err) throw err

                    this.productSpecifications = productSpecifications

                    for (var i = 0; i < productSpecifications.length; i++) {
                        this.products[i] = productSpecifications[i].productName
                    }

                    dbUtils.getAllProducts().then((products, err) => {
                        if (err) throw err


                        for (var i = 0; i < products.length; i++) {

                            var ps = productSpecifications.find(obj => {
                                return obj.productName == products[i].productName
                            })

                            var fields = ps.fields


                            var s = ''
                            for (var j = 0; j < fields.length; j++) {
                                s = s + products[i].fields['0'][fields[j]] + ' '
                            }

                            this.productDescriptions.push(s)

                        }

                        dbUtils.getAllHSNCodes().then((hsnCodes, err) => {

                            if (err) throw err

                            this.hsnCodes = hsnCodes

                            dbUtils.getAllClients().then((clients, err) => {
                                if (err) throw err

                                this.clients = clients
                                this.dataLoaded = true
                            })
                        })

                    })
                })
            },

            watchAndSuggestDesc: function (desc) {
                var re = new RegExp("^" + desc.toLowerCase());

                this.productSuggestions = this.productDescriptions.filter((str) => {
                    return str.toLowerCase().match(re)
                })
                if (desc == '') {
                    this.productSuggestions = []
                    this.showProductSuggestions = false
                } else {
                    this.showProductSuggestions = true
                }
            },


            setTax: function (hsn, index) {
                if (hsn != 0) {
                    var code = this.hsnCodes.find((code) => {
                        return code.hsnCode == hsn
                    })

                    if (code != undefined) {


                        if (this.clientFieldValues["State"].toLowerCase() == "rajasthan") {

                            this.$set(this.orderItems[index], "sgstRate", code.sgst)
                            this.$set(this.orderItems[index], "cgstRate", code.cgst)

                        } else {

                            this.$set(this.orderItems[index], "igstRate", code.igst)

                        }

                        this.orderItems.__ob__.dep.notify()
                    }
                }
            },

            setTaxableAmount: function (amount, index) {

                if (this.orderItems[index].quantity != 0) {

                    this.$set(this.orderItems[index], "taxableAmount", this.roundToTwo(this.orderItems[index].quantity * this.orderItems[index].amount))
                    this.$set(this.orderItems[index], "cgstAmount", this.roundToTwo(this.orderItems[index].taxableAmount * (1 - this.orderItems[index].discount / 100) * this.orderItems[index].cgstRate / 100))
                    this.$set(this.orderItems[index], "sgstAmount", this.roundToTwo(this.orderItems[index].taxableAmount * (1 - this.orderItems[index].discount / 100) * this.orderItems[index].sgstRate / 100))
                    this.$set(this.orderItems[index], "igstAmount", this.roundToTwo(this.orderItems[index].taxableAmount * (1 - this.orderItems[index].discount / 100) * this.orderItems[index].igstRate / 100))
                    this.$set(this.orderItems[index], "totalAmount", this.roundToTwo(this.orderItems[index].taxableAmount * (1 - this.orderItems[index].discount / 100) + this.orderItems[index].cgstAmount + this.orderItems[index].sgstAmount + this.orderItems[index].igstAmount))
                    this.orderItems.__ob__.dep.notify()

                    var totbt = 0
                    var totcgst = 0
                    var totigst = 0
                    var totsgst = 0
                    var totgst = 0
                    var totat = 0
                    var totdiscount = 0
                    for (var i = 0; i < this.orderItems.length; i++) {
                        totdiscount = this.orderItems[i].taxableAmount * this.orderItems[i].discount / 100
                        totbt += this.orderItems[i].taxableAmount
                        totcgst += this.orderItems[i].cgstAmount
                        totsgst += this.orderItems[i].sgstAmount
                        totigst += this.orderItems[i].igstAmount
                        totgst += this.orderItems[i].cgstAmount + this.orderItems[i].sgstAmount + this.orderItems[i].igstAmount
                        totat += this.orderItems[i].totalAmount
                    }

                    this.totalBeforeTaxAmount = totbt.toFixed(2)
                    this.totalCGST = totcgst.toFixed(2)
                    this.totalSGST = totsgst.toFixed(2)
                    this.totalIGST = totigst.toFixed(2)
                    this.totalGST = totgst.toFixed(2)
                    this.totalAfterTaxAmount = Math.round(totat, 2)
                    this.roundOff = (this.totalAfterTaxAmount - totat).toFixed(2)

                } else {
                    //dialog to set quantity
                }
            },


            editClientFields: function (suggestion) {
                suggestion = suggestion.toString()

                var state = suggestion.substr(suggestion.lastIndexOf(', ') + 2, suggestion.length)
                suggestion = suggestion.substr(0, suggestion.lastIndexOf(', '))
                var city = suggestion.substr(suggestion.indexOf(', ') + 2, suggestion.length)
                suggestion = suggestion.substr(0, suggestion.indexOf(','))
                this.showClientSuggestions = false
                var re = new RegExp("^" + suggestion.toLowerCase());
                var suggestion = this.clients.find((client) => {
                    return client.clientName.toLowerCase().match(re) && client.state == state && client.city == city
                })

                for (var i = 0; i < this.clientFields.length; i++) {
                    this.clientFieldValues[this.clientFields[i]] = suggestion[this.dbClientFields[i]]
                }

                this.clientName = suggestion["clientName"]
            },

            editDescField: function (suggestion, i) {
                this.orderItems[i - 1].productDescription = suggestion
                this.showProductSuggestions = false
            },


            toggleShowOrderItem: function (i) {

                var id = '#' + this.formulateID(i)
                var field = id + " " + "i"

                if (this.showOrderItem[i]) {
                    this.$set(this.showOrderItem, i, false)
                    $(field).removeClass("fa-minus-square").addClass("fa-plus-square")
                } else {
                    this.$set(this.showOrderItem, i, true)
                    $(field).removeClass("fa-plus-square").addClass("fa-minus-square")
                }
            },

            roundToTwo: function (num) {
                return +(Math.round(num + "e+2") + "e-2");
            }


        },

        created: function () {
            this.onLoad()
        }
    }
</script>

<style scoped>

    .modal-dialog {
        transform: translate(-40%);
        margin-top: 150px;
        border: none;
        border-radius: 5px;
        outline: none;
        height: auto;
    }

    .modal {
        border-radius: 5px;
        border: none;
        outline: none;
    }

    .modal-content {
        border-radius: 5px;
        border: none;
        outline: none;
        width: 1000px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    button {
        cursor: pointer;
    }

    .orderItems {
        margin-top: 50px;
    }

    .addO-wrapper {
        border: none;
        outline: none;
        background: white;
        padding: 20px;
        max-height: 600px;
        overflow-y: scroll;
    }

    #hideAddO {
        float: right;
        background: white;
        outline: none;
        border: none;
        margin-top: -7px;
        margin-right: -3px;
        cursor: pointer;
    }

    .addO-suggestions {
        margin-top: -30px;
        margin-bottom: 30px;
    }

    .addO-suggestions button {
        font-size: 12px;
        width: 100%;
        padding: 10px;
        background: white;
        cursor: pointer;
        outline: none;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: none;
        border-radius: 3px;
        text-align: left;
        margin-left: 20px;
    }

    #addO-subwrapper h4 {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 40px;
        margin-top: 10px;
        margin-left: 10px;
    }

    #addO-subwrapper h5 {
        font-weight: bold;
        font-size: 13px;
        margin-bottom: 40px;
        margin-top: 10px;
        margin-left: 10px;
    }

    #addO-subwrapper-order {
        margin-top: 30px;
        margin-left: 20px;
        margin-right: 20px;
    }

    #addO-subwrapper-final {
        margin-top: 60px;
    }

    #addO-subwrapper-order h4 {
        margin-left: 0px;
    }

    #addOrderItem {
        margin-top: -58px;
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
        margin-left: 40px;
        margin-right: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }

    #addOrderItem:focus {
        outline: none;
        transition: 0.5s;
        border-radius: 25px;
    }

    #addOrderItem:hover {
        outline: none;
        transition: 0.5s;
        border-radius: 25px;
    }

    #addOrderItem i {
        color: black;
        margin-right: 10px;
    }

    .orderItemButtons {
        margin-top: -62px;
        float: right;
        margin-left: 40px;
        margin-right: 20px;
    }

    .deleteOrderItem {
        border: none;
        height: 35px;
        outline: none;
        width: auto;
        font-weight: bold;
        background: white;
        color: black;
        border-radius: 25px;
        box-shadow: none;
        font-size: 12px;
        transition: 0.5s;
        margin-bottom: 10px;
        margin-left: 20px;
        margin-right: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .deleteOrderItem:focus {
        outline: none;
        transition: 0.5s;
        border-radius: 25px;
    }

    .deleteOrderItem:hover {
        outline: none;
        transition: 0.5s;
        border-radius: 25px;
    }

    .showOrderItem i {
        color: black;
    }

    .showOrderItem {
        border: none;
        height: 35px;
        outline: none;
        width: auto;
        font-weight: bold;
        background: white;
        color: black;
        border-radius: 25px;
        box-shadow: none;
        font-size: 12px;
        transition: 0.5s;
        margin-bottom: 10px;
        margin-left: 20px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .showOrderItem:focus {
        outline: none;
        transition: 0.5s;
        border-radius: 25px;
    }

    .showOrderItem:hover {
        outline: none;
        transition: 0.5s;
        border-radius: 25px;
    }

    .showOrderItem i {
        color: black;
    }

    .addC-Bgroup {
        margin: 0 auto;
        width: 180px;
    }

    .addC-Igroup label {
        width: 100%;
        display: block;
        float: left;
        font-size: 0.8em;
        color: darkslategrey;
        margin-left: 20px;
    }

    .addC-Igroup1 label {
        display: block;
        float: left;
        font-size: 0.8em;
        color: darkslategrey;
        margin-left: 20px;
    }

    .addC-Igroup1 {
        padding-right: 50px;
        padding-left: 10px;
    }

    .addC-Igroup1 input {
        width: 100%;
        border: none;
        margin-bottom: 30px;
        margin-left: 20px;
    }

    .addC-Igroup1 input[type="text"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    .addC-Igroup1 input[type="text"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid rgba(2, 170, 176, 0.8);
        outline: none;
        transition: 0.5s;
    }

    .addC-Igroup1 .datepicker {
        font-size: 13px;
        margin-left: 20px;
        margin-bottom: 30px;
    }

    .addC-Igroup {
        padding-right: 50px;
        padding-left: 10px;
    }

    .addC-Igroup input {
        width: 100%;
        border: none;
        margin-bottom: 30px;
        margin-left: 20px;
    }

    .addC-Igroup input {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    .addC-Igroup input:focus {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid rgba(2, 170, 176, 0.8);
        outline: none;
        transition: 0.5s;
    }

    .addC-Igroup input:hover {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid rgba(2, 170, 176, 0.8);
        outline: none;
        transition: 0.5s;
    }

    .addC-Igroup .datepicker {
        font-size: 13px;
        margin-left: 20px;
        margin-bottom: 30px;
    }

    .addC-Bgroup button {
        margin-top: 10px;
        width: 100%;
        border: none;
        height: 45px;
        outline: none;
        font-weight: bold;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 0.8), rgba(0, 205, 172, 0.8)); /*#e96868;*/
        color: white;
        border-radius: 25px;
        box-shadow: none;
        font-size: 12px;
        transition: 0.5s;
        margin-bottom: 20px;
    }

    .addC-Bgroup button:focus {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .addC-Bgroup button:hover {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .addC-Bgroup i {
        color: white;
        margin-right: 10px;
    }

    .addC-Bgroup1 {
        width: 100%;
        text-align: center;
    }

    .addC-Bgroup1 button {
        margin-top: 10px;
        border: none;
        height: 45px;
        outline: none;
        width: 150px;
        font-weight: bold;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 0.8), rgba(0, 205, 172, 0.8)); /*#e96868;*/
        color: white;
        border-radius: 25px;
        box-shadow: none;
        font-size: 12px;
        transition: 0.5s;
        margin-bottom: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }

    .addC-Bgroup1 button:focus {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .addC-Bgroup1 button:hover {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .addC-Bgroup1 i {
        color: white;
        margin-right: 10px;
    }

    .addC-Igroup1 button {
        margin-top: -5px;
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
        margin-left: 40px;
        padding-left: 20px;
        padding-right: 20px;
    }

    .addC-Igroup1 button:focus {
        outline: none;
        transition: 0.5s;
        border-radius: 25px;
    }

    .addC-Igroup1 button:hover {
        outline: none;
        transition: 0.5s;
        border-radius: 25px;
    }

    .addC-Igroup1 i {
        color: black;
        margin-right: 10px;
    }

    .addPV-suggestions button {
        width: 100%;
        padding: 10px;
        background: white;
        cursor: pointer;
        outline: none;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: none;
        border-radius: 3px;
        text-align: left;
    }

    .addPV-f-group label {
        width: 100%;
        display: block;
        float: left;
        font-size: 0.8em;
        color: darkslategrey;
        margin-left: 20px;
    }

    .addPV-f-group input {
        width: 100%;
        border: none;
        margin-bottom: 30px;
        margin-left: 20px;
    }

    .addPV-f-group input[type="text"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    .addPV-f-group input[type="text"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid rgba(2, 170, 176, 0.8);
        outline: none;
        transition: 0.5s;
    }

    .addPV-Igroup label {
        width: 100%;
        font-size: 0.8em;
        color: darkslategrey;
        margin-left: 20px;
    }

    .addPV-dropdown select {
        border-radius: 5px;
        border: 2px solid rgb(244, 245, 249);
        background: white;
        outline: none;
        padding: 8px;
        font-size: 13px;
        margin-left: 20px;
        margin-bottom: 50px;
    }

    .addPV-dropdown option {
        border-radius: 5px;
        border: 2px solid rgb(244, 245, 249);
        background: white;
        outline: none;
        font-size: 13px;
    }


</style>