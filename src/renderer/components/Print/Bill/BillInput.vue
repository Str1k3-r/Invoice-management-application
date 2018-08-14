<template>
    <transition name="modal">
        <div class="modal" style="display: block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="billI-wrapper">
                        <button @click.prevent="close" id="hidebillI"><i class="fa fa-times"/></button>
                        <h4> Add Bill Details </h4>
                        <div class="billI-Igroup">
                            <label for="invoiceNo">Invoice NO.</label>
                            <br/>
                            <input type="text" id="invoiceNo" name="invoiceNo" class="f-control" v-model="invoiceNo"/>
                        </div>
                        <div class="billI-Igroup">
                            <label for="reverseCharge">Reverse Charge</label>
                            <br/>
                            <select class="billI-dropdown" id="reverseCharge" v-model="reverseCharge" v-on:focus="">
                                <option value="NO">NO</option>
                                <option value="YES">YES</option>
                            </select>
                        </div>
                        <div class="billI-Igroup">
                            <label for="transportMode">Transport Mode</label>
                            <br/>
                            <select class="billI-dropdown" id="transportMode" v-model="transportMode" v-on:focus="">
                                <option value="ROAD">ROAD</option>
                                <option value="AIR">AIR</option>
                                <option value="SHIP">SHIP</option>
                            </select>
                        </div>
                        <div class="billI-Igroup">
                            <label for="transport">Transport</label>
                            <br/>
                            <input type="text" id="transport" name="transport" class="f-control" v-model="transport"/>
                        </div>
                        <div class="billI-Igroup">
                            <label for="numberOfPacking">Number of Packing</label>
                            <br/>
                            <input type="text" id="numberOfPacking" name="numberOfPacking" class="f-control"
                                   v-model="numberOfPacking"/>
                        </div>
                        <div class="billI-Igroup">
                            <label for="privateMarka">Private Marka</label>
                            <br/>
                            <input type="text" id="privateMarka" name="privateMarka" class="f-control"
                                   v-model="privateMarka"/>
                        </div>
                        <div class="billI-Igroup">
                            <label for="dateOfSupply">Date of Supply</label>
                            <br/>
                            <div class="datepicker" id="dateOfSupply">
                                <datepicker v-model="dateOfSupply" name="dateOfSupply" id=""></datepicker>
                            </div>
                        </div>
                        <div class="billI-Igroup">
                            <label for="placeOfSupply">Place of Supply</label>
                            <br/>
                            <input type="text" id="placeOfSupply" name="placeOfSupply" class="f-control"
                                   v-model="placeOfSupply"/>
                        </div>
                        <div class="billI-Igroup">
                            <label for="shippedToSameAsBilledTo">Is Billed To same as Shipped To?</label>
                            <br/>
                            <select class="billI-dropdown" id="shippedToSameAsBilledTo" v-on:change="loadClientFields"
                                    v-on:focus="">
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select>
                        </div>

                        <div v-if="!shippedToSameAsBilledTo">
                            <h4> Shipped To</h4>
                            <div class="billI-Igroup">
                                <label for="clientName">Name</label>
                                <br/>
                                <input type="text" id="clientName" name="clientName" class="f-control"
                                       v-model="shippedToClient.clientName"/>
                            </div>

                            <div class="billI-Igroup">
                                <label for="address">Address</label>
                                <br/>
                                <input type="text" id="address" name="address" class="f-control"
                                       v-model="shippedToClient.address1"/>
                            </div>

                            <div class="billI-Igroup">
                                <label for="city">City</label>
                                <br/>
                                <input type="text" id="city" name="city" class="f-control"
                                       v-model="shippedToClient.city"/>
                            </div>

                            <div class="billI-Igroup">
                                <label for="state">State</label>
                                <br/>
                                <input type="text" id="state" name="state" class="f-control"
                                       v-model="shippedToClient.state"/>
                            </div>

                            <div class="billI-Igroup">
                                <label for="pincode">Pincode</label>
                                <br/>
                                <input type="number" id="pincode" name="pincode" class="f-control"
                                       v-model="shippedToClient.pincode"/>
                            </div>

                            <div class="billI-Igroup">
                                <label for="phoneNo">Phone No.</label>
                                <br/>
                                <input type="number" id="phoneNo" name="phoneNo" class="f-control"
                                       v-model="shippedToClient.phoneNo"/>
                            </div>

                            <div class="billI-Igroup">
                                <label for="mobileNo">Mobile No.</label>
                                <br/>
                                <input type="number" id="mobileNo" name="mobileNo" class="f-control"
                                       v-model="shippedToClient.mobileNo"/>
                            </div>

                            <div class="billI-Igroup">
                                <label for="gstUIN">GST IN</label>
                                <br/>
                                <input type="text" id="gstUIN" name="gstUIN" class="f-control"
                                       v-model="shippedToClient.gstUIN"/>
                            </div>
                        </div>

                        <div class="billI-Bgroup">
                            <button class="billI-button" @click.prevent="save"><i class="fa fa-save"/>SAVE</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </transition>

</template>

<script>
    import Datepicker from 'vuejs-datepicker'

    export default {
        name: "BillInput",
        props: ['order'],
        components: {
            Datepicker
        },
        data: function () {
            return {
                reverseCharge: 'NO',
                invoiceNo: "",
                transportMode: "ROAD",
                dateOfSupply: null,
                placeOfSupply: "",
                stsbt: "YES",
                shippedToSameAsBilledTo: true,
                billedToClient: {},
                shippedToClient: {},
                transport: "",
                numberOfPacking: "",
                privateMarka: "",
            }
        },

        methods: {
            close: function () {
                var instance = this
                var data = {
                    reverseCharge: instance.reverseCharge,
                    invoiceNo: instance.invoiceNo,
                    transportMode: instance.transportMode,
                    dateOfSupply: instance.dateOfSupply,
                    placeOfSupply: instance.placeOfSupply,
                    shippedToClient: instance.shippedToClient,
                    transport: instance.transport,
                    numberOfPacking: instance.numberOfPacking,
                    privateMarka: instance.privateMarka,
                }
                this.$emit("closebillI", data)
            },

            save: function () {
                this.close()
            },

            initialize: function () {
                var d = new Date()
                this.invoiceNo = "SLU/" + d.getFullYear() + "-" + (d.getFullYear() + 1).toString().substr(-2) + "/"
                this.billedToClient = this.$props.order.client
                this.shippedToClient = this.$props.order.client
            },

            loadClientFields: function () {
                var stsbt = document.getElementById("shippedToSameAsBilledTo").value
                if (stsbt == "YES") {
                    this.shippedToSameAsBilledTo = true
                    this.billedToClient = this.shippedToClient
                } else {
                    this.shippedToClient = {
                        clientName: "",
                        address1: "",
                        city: "",
                        state: "",
                        phoneNo: 0,
                        mobileNo: 0,
                        gstUIN: "",
                        pincode: 0
                    }

                    this.shippedToSameAsBilledTo = false
                }
            }
        },

        mounted: function () {
            this.initialize()
        }
    }
</script>

<style>
    .modal-dialog {
        margin-top: 100px;
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
        width: 700px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .billI-wrapper {
        border: none;
        outline: none;
        background: white;
        padding: 20px;
        max-height: 600px;
        overflow-y: scroll;
    }

    .billI-wrapper h4 {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 40px;
        margin-top: 10px;
        margin-left: 10px;
    }

    #hidebillI {
        float: right;
        background: white;
        outline: none;
        border: none;
        margin-top: -7px;
        margin-right: -3px;
    }

    .billI-Bgroup {
        margin: 0 auto;
        width: 180px;
    }

    .billI-Igroup label {
        width: 100%;
        display: block;
        float: left;
        font-size: 0.8em;
        color: darkslategrey;
        margin-left: 20px;
    }

    .billI-Igroup {
        padding-right: 50px;
        padding-left: 10px;
    }

    .billI-Igroup input {
        width: 100%;
        border: none;
        margin-bottom: 30px;
        margin-left: 20px;
    }

    .billI-Igroup input[type="text"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    .billI-Igroup input[type="text"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid rgba(2, 170, 176, 0.8);
        outline: none;
        transition: 0.5s;
    }

    .billI-Igroup input[type="number"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    .billI-Igroup input[type="number"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid rgba(2, 170, 176, 0.8);
        outline: none;
        transition: 0.5s;
    }

    .billI-Bgroup button {
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

    .billI-Bgroup button:focus {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .billI-Bgroup button:hover {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .billI-Bgroup i {
        color: white;
        margin-right: 10px;
    }

    .billI-Igroup select {
        border-radius: 5px;
        border: 2px solid rgb(244, 245, 249);
        background: white;
        outline: none;
        padding: 8px;
        font-size: 13px;
        margin-left: 20px;
        margin-bottom: 20px;
    }

    .billI-Igroup option {
        border-radius: 5px;
        border: 2px solid rgb(244, 245, 249);
        background: white;
        outline: none;
        font-size: 13px;
    }

    .billI-Igroup .datepicker {
        font-size: 13px;
    }

</style>