<template>
    <transition name="modal">
        <div class="modal" style="display: block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="editC-wrapper">
                        <div id="editC-subwrapper">
                            <button @click.prevent="close" id="hideEditC"><i class="fa fa-times"/></button>
                            <h4> Edit Client </h4>

                            <div class="loading" v-if="!dataLoaded">
                                <img src="../../../assets/images/load.gif"/>
                            </div>
                            <div id="viewC-subwrapper1" v-if="dataLoaded">
                                <div class="editC-Igroup" v-for="clientField in clientFields">
                                    <label for="clientField">{{clientField}}</label>
                                    <br/>
                                    <input type="text" v-bind:id="clientField" v-bind:name="clientField"
                                           class="f-control" v-model="clientFieldValues[clientField]"/>
                                </div>

                                <div class="editC-Bgroup">
                                    <button class="editC-button" @click.prevent="save"><i class="fa fa-save"/>SAVE
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

    import dbUtils from "../../../db"

    export default {
        name: "EditClient",
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
                this.$emit('closeEditC');
            },

            closeandrefresh: function () {
                this.$emit('reloadEditC')
            },

            save: function () {

                var instance = this

                function callback(msg) {
                    if (msg == 'Not Added') {
                        instance.$snackbar.open("Client could not be added")
                    } else {
                        instance.$toast.open(msg)
                        instance.closeandrefresh()
                    }
                }

                dbUtils.updateClient(this.$props.C._id, this.clientFieldValues["Client Name"], this.clientFieldValues["Address"], this.clientFieldValues["City"], this.clientFieldValues["State"], this.clientFieldValues["Pincode"], this.clientFieldValues["Phone No"], this.clientFieldValues["Mobile No"], this.clientFieldValues["GST UIN"], callback)

            },

            loadData: function () {
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
            this.loadData()
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

    .editC-wrapper {
        border: none;
        outline: none;
        background: white;
        padding: 20px;
        max-height: 600px;
        overflow-y: scroll;
    }

    #editC-subwrapper h4 {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 40px;
        margin-top: 10px;
        margin-left: 10px;
    }

    #hideEditC {
        float: right;
        background: white;
        outline: none;
        border: none;
        margin-top: -7px;
        margin-right: -3px;
    }

    .editC-Bgroup {
        margin: 0 auto;
        width: 180px;
    }

    .editC-Igroup label {
        width: 100%;
        display: block;
        float: left;
        font-size: 0.8em;
        color: darkslategrey;
        margin-left: 20px;
    }

    .editC-Igroup {
        padding-right: 50px;
        padding-left: 10px;
    }

    .editC-Igroup input {
        width: 100%;
        border: none;
        margin-bottom: 30px;
        margin-left: 20px;
    }

    .editC-Igroup input[type="text"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    .editC-Igroup input[type="text"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid rgba(2, 170, 176, 0.8);
        outline: none;
        transition: 0.5s;
    }

    .editC-Bgroup button {
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

    .editC-Bgroup button:focus {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .editC-Bgroup button:hover {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2, 170, 176, 1), rgba(0, 205, 172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .editC-Bgroup i {
        color: white;
        margin-right: 10px;
    }

</style>