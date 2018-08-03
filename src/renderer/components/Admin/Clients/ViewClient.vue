<template>
    <transition name="modal">
        <div class="modal" style="display: block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="viewC-wrapper">
                        <div id="viewC-subwrapper">

                            <button @click.prevent="close" id="hideViewC"><i class="fa fa-times"/></button>
                            <h4>Client Details </h4>

                            <div class="loading" v-if="!dataLoaded">
                                <img src="../../../assets/images/load.gif"/>
                            </div>

                            <div id="viewC-subwrapper1" v-if="dataLoaded">
                                <div class="viewC-Igroup" v-for="clientField in clientFields">
                                    <label for="clientField">{{clientField}}</label>
                                    <br/>
                                    <p v-bind:id="clientField" class="f-control">{{clientFieldValues[clientField]}}</p>
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
    export default {
        name: "ViewClient",

        props: ['C'],

        data: function () {
            return {
                clientFields: ["Client Name", "Address", "City", "State", "Pincode", "Phone No", "Mobile No", "GST UIN"],
                dbClientFields: ["clientName", "address1", "city", "state", "pincode", "phoneNo", "mobileNo", "gstUIN"],
                clientFieldValues: [],
                dataLoaded: false
            }
        },

        methods: {
            close: function () {
                this.$emit('closeViewC');
            },

            loadClient: function () {
                for (var i = 0; i < this.clientFields.length; i++) {
                    this.clientFieldValues[this.clientFields[i]] = this.$props.C[this.dbClientFields[i]]
                }

                this.dataLoaded = true
            }
        },

        mounted: function () {
            document.addEventListener("keyup", (e) => {
                if (this.show && e.which === KEYCODE_ESC) {
                    this.close()
                }
            });
        },

        created: function () {
            this.loadClient()
        }
    }
</script>

<style scoped>

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

    .viewC-wrapper {
        border: none;
        outline: none;
        background: white;
        padding: 20px;
        max-height: 600px;
        overflow-y: scroll;
    }

    #viewC-subwrapper h4 {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 40px;
        margin-top: 10px;
        margin-left: 10px;
    }

    #viewC-subwrapper button {
        cursor: pointer;
    }

    #hideViewC {
        float: right;
        background: white;
        outline: none;
        border: none;
        margin-top: -7px;
        margin-right: -3px;
    }

    .viewC-Bgroup {
        margin: 0 auto;
        width: 180px;
    }

    .viewC-Igroup label {
        width: 100%;
        display: block;
        float: left;
        font-size: 13px;
        color: darkslategrey;
        margin-left: 20px;
    }

    .viewC-Igroup {
        padding-right: 50px;
        padding-left: 10px;
    }

    .viewC-Igroup p {
        width: 100%;
        border: none;
        margin-bottom: 30px;
        margin-left: 20px;
        font-size: 12px;
    }

    .viewC-Igroup input[type="text"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    .viewC-Igroup input[type="text"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid rgba(2, 170, 176, 0.8);
        outline: none;
        transition: 0.5s;
    }

    .viewC-Bgroup button {
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

    .viewC-Bgroup button:focus {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .viewC-Bgroup button:hover {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .viewC-Bgroup i {
        color: white;
        margin-right: 10px;
    }

</style>