<template>
    <transition name="modal">
        <div class="modal" style="display: block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="tsI-wrapper">
                        <button @click.prevent="close" id="hidetsI"><i class="fa fa-times"/></button>
                        <h4> Add Transport Slip Details </h4>

                        <div class="tsI-Igroup">
                            <label for="transport">Transport</label>
                            <br/>
                            <input type="text" id="transport" name="transport" class="f-control" v-model="transport"/>
                        </div>

                        <div class="tsI-Igroup">
                            <label for="privateMarka">Private Marka</label>
                            <br/>
                            <input type="text" id="privateMarka" name="privateMarka" class="f-control"
                                   v-model="privateMarka"/>
                        </div>

                        <div class="tsI-Igroup">
                            <label for="goods">Goods</label>
                            <br/>
                            <input type="text" id="goods" name="goods" class="f-control" v-model="goods"/>
                        </div>

                        <div class="tsI-Igroup">
                            <label for="value">Value</label>
                            <br/>
                            <input type="text" id="value" name="value" class="f-control" v-model="value"/>
                        </div>

                        <div class="tsI-Igroup">
                            <label for="destination">Destination</label>
                            <br/>
                            <input type="text" id="destination" name="destination" class="f-control"
                                   v-model="destination"/>
                        </div>

                        <div class="tsI-Igroup">
                            <label for="quantity">Quantity</label>
                            <br/>
                            <input type="text" id="quantity" name="quantity" class="f-control" v-model="quantity"/>
                        </div>

                        <div class="tsI-Igroup">
                            <label for="freight">Freight</label>
                            <br/>
                            <input type="text" id="freight" name="freight" class="f-control" v-model="freight"/>
                        </div>


                        <div class="tsI-Bgroup-secondarybutton">
                            <button @click="toggleFreight">TOGGLE FREIGHT</button>
                        </div>

                        <div class="tsI-Igroup">
                            <label for="cartrage">Cartrage</label>
                            <br/>
                            <input type="text" id="cartrage" name="cartrage" class="f-control" v-model="cartrage"/>
                        </div>

                        <div class="tsI-Bgroup">
                            <button class="tsI-button" @click.prevent="save"><i class="fa fa-save"/>SAVE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "TransportSlipInput",
        data: function () {
            return {
                transport: '',
                cartrage: '',
                freight: 'TO PAY',
                quantity: '',
                destination: '',
                value: '',
                goods: '',
                privateMarka: ''
            }
        },

        methods: {
            close: function () {

                var data = {
                    transport: this.transport,
                    cartrage: this.cartrage,
                    freight: this.freight,
                    quantity: this.quantity,
                    destination: this.destination,
                    value: this.value,
                    goods: this.goods,
                    privateMarka: this.privateMarka
                }
                this.$emit("closetsI", data)
            },

            save: function () {
                this.close()
            },

            toggleFreight: function () {
                if (this.freight == "TO PAY") {
                    this.freight = "PAY"
                } else {
                    this.freight = "TO PAY"
                }
            }

        }
    }
</script>

<style>

    .modal-dialog {
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
        width: 700px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .tsI-wrapper {
        border: none;
        outline: none;
        background: white;
        padding: 20px;
        max-height: 600px;
        overflow-y: scroll;
    }

    #tsI-subwrapper h4 {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 40px;
        margin-top: 10px;
        margin-left: 10px;
    }

    #hidetsI {
        float: right;
        background: white;
        outline: none;
        border: none;
        margin-top: -7px;
        margin-right: -3px;
    }

    .tsI-Bgroup {
        margin: 0 auto;
        width: 180px;
    }

    .tsI-Igroup label {
        width: 100%;
        display: block;
        float: left;
        font-size: 0.8em;
        color: darkslategrey;
        margin-left: 20px;
    }

    .tsI-Igroup {
        padding-right: 50px;
        padding-left: 10px;
    }

    .tsI-Igroup input {
        width: 100%;
        border: none;
        margin-bottom: 30px;
        margin-left: 20px;
    }

    .tsI-Igroup input[type="text"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    .tsI-Igroup input[type="text"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid rgba(2, 170, 176, 0.8);
        outline: none;
        transition: 0.5s;
    }

    .tsI-Bgroup button {
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

    .tsI-Bgroup button:focus {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .tsI-Bgroup button:hover {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .tsI-Bgroup i {
        color: white;
        margin-right: 10px;
    }

    .tsI-Bgroup-secondarybutton button {
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

    .tsI-Bgroup-secondarybutton button:focus {
        outline: none;
        transition: 0.5s;
        border-radius: 25px;
    }

    .tsI-Bgroup-secondarybutton button:hover {
        outline: none;
        transition: 0.5s;
        border-radius: 25px;
    }


</style>