<template>
    <transition name="modal">
        <div class="modal" style="display: block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="addC-wrapper">
                        <div id="addC-subwrapper">
                            <button @click.prevent="close" id="hideAddC"><i class="fa fa-times"/></button>
                            <h4> Add Client </h4>

                            <div class="addC-Igroup" v-for="clientField in clientFields">
                                <label for="clientField">{{clientField}}</label>
                                <br/>
                                <input type="text" v-bind:id="clientField"  v-bind:name="clientField" class="f-control" v-model="clientFieldValues[clientField]"/>
                            </div>

                            <div class="addC-Bgroup">
                                <button class="addC-button" @click.prevent="save"><i class="fa fa-save"/>SAVE</button>
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
        name: "AddClient",
        data: function () {
            return {
                clientFields: ["Client Name", "Address", "City", "State", "Pincode", "Phone No", "Mobile No", "GST UIN"],
                dbClientFields: ["clientName", "address1", "city", "state", "pincode", "phoneNo", "mobileNo", "gstUIN"],
                clientFieldValues: []
            }
        },

        methods: {
            close: function () {
                this.$emit('closeAddC');
            },

            closeandrefresh: function () {
                this.$emit('reloadC')
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

                dbUtils.addClient(this.clientFieldValues["Client Name"], this.clientFieldValues["Address"], this.clientFieldValues["City"], this.clientFieldValues["State"], this.clientFieldValues["Pincode"], this.clientFieldValues["Phone No"], this.clientFieldValues["Mobile No"], this.clientFieldValues["GST UIN"], callback)

            },

            initialize: function () {
                this.clientFieldValues["Client Name"] = ''
                this.clientFieldValues["Address"] = ''
                this.clientFieldValues["City"] = ''
                this.clientFieldValues["State"] = ''
                this.clientFieldValues["Pincode"] = 0
                this.clientFieldValues["Phone No"] = 0
                this.clientFieldValues["Mobile No"] = 0
                this.clientFieldValues["GST UIN"] = ''
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
            this.initialize()
        }
    }
</script>

<style scoped>

    .modal-dialog{
        margin-top: 150px;
        border: none;
        border-radius: 5px;
        outline: none;
        height: auto;
    }

    .modal{
        border-radius: 5px;
        border: none;
        outline: none;
    }

    .modal-content{
        border-radius: 5px;
        border: none;
        outline: none;
        width: 700px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .addC-wrapper{
        border: none;
        outline: none;
        background: white;
        padding: 20px;
        max-height: 600px;
        overflow-y: scroll;
    }

    #addC-subwrapper h4 {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 40px;
        margin-top: 10px;
        margin-left: 10px;
    }

    #hideAddC{
        float: right;
        background: white;
        outline: none;
        border: none;
        margin-top: -7px;
        margin-right: -3px;
    }


    .addC-Bgroup{
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

    .addC-Igroup input[type="text"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    .addC-Igroup input[type="text"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid rgba(2,170,176,0.8);
        outline: none;
        transition: 0.5s;
    }


    .addC-Bgroup button {
        margin-top: 10px;
        width: 100%;
        border: none;
        height: 45px;
        outline: none;
        font-weight: bold;
        background: linear-gradient(to bottom right, rgba(2,170,176,0.8), rgba(0,205,172, 0.8)); /*#e96868;*/
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
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .addC-Bgroup button:hover {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .addC-Bgroup i{
        color: white;
        margin-right: 10px;
    }

</style>