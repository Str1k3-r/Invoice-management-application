<template>
    <transition name="modal">
        <div class="modal" style="display: block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="addHSNC-wrapper">
                        <div id="addHSNC-subwrapper">
                            <button @click.prevent="close" id="hideAddHSNC"><i class="fa fa-times"/></button>
                            <h4> Add HSN Code </h4>

                            <div class="addHSNC-Igroup">
                                <label for="hsnCode">HSN Code</label>
                                <br/>
                                <input type="text" id="hsnCode" name="hsnCode" class="f-control" required v-model="hsnCode"/>
                            </div>

                            <div class="addHSNC-Igroup">
                                <label for="sgst">SGST</label>
                                <br/>
                                <input type="text" id="sgst" name="sgst" class="f-control" required v-model="sgst"/>
                            </div>

                            <div class="addHSNC-Igroup">
                                <label for="cgst">CGST</label>
                                <br/>
                                <input type="text" id="cgst" name="cgst" class="f-control" required v-model="cgst"/>
                            </div>

                            <div class="addHSNC-Igroup">
                                <label for="igst">IGST</label>
                                <br/>
                                <input type="text" id="igst" name="igst" class="f-control" required v-model="igst"/>
                            </div>

                            <div class="addHSNC-Bgroup">
                                <button class="addHSNC-button" @click.prevent="save"><i class="fa fa-save"/>SAVE</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import dbUtils from "../../../db";

    export default {
        name: "AddHSNCode",
        data: function () {
            return {
                hsnCode: 0,
                sgst: 0,
                igst: 0,
                cgst: 0
            }
        },

        methods: {
            close: function () {
                this.$emit('closeHSNC');
            },

            closeandrefresh: function () {
                this.$emit('reloadHSNC')
            },

            save: function () {
                if(this.hsnCode != 0){
                    var instance = this

                    function callback(msg) {
                        if (msg == 'Not Added') {
                            instance.$snackbar.open("HSN Code could not be added")
                        } else {
                            instance.$toast.open(msg)
                            instance.closeandrefresh()
                        }
                    }

                    dbUtils.addHSNCode(this.hsnCode, this.cgst, this.sgst, this.igst, callback)
                    //call save
                } else {
                        document.getElementById('hsnCode').focus()
                }


            },

        },

        mounted: function () {
            document.addEventListener("keyup", (e) => {
                if (this.show && e.which === KEYCODE_ESC) {
                    this.close()
                }
            });
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

    .addHSNC-wrapper{
        border: none;
        outline: none;
        background: white;
        padding: 20px;
    }

    #addHSNC-subwrapper h4 {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 40px;
        margin-top: 10px;
        margin-left: 10px;
    }

    #hideAddHSNC{
        float: right;
        background: white;
        outline: none;
        border: none;
        margin-top: -7px;
        margin-right: -3px;
    }


    .addHSNC-Bgroup{
        margin: 0 auto;
        width: 180px;
    }


    .addHSNC-Igroup label {
        width: 100%;
        display: block;
        float: left;
        font-size: 0.8em;
        color: darkslategrey;
        margin-left: 20px;
    }


    .addHSNC-Igroup {
        padding-right: 50px;
        padding-left: 10px;
    }

    .addHSNC-Igroup input {
        width: 100%;
        border: none;
        margin-bottom: 30px;
        margin-left: 20px;
    }

    .addHSNC-Igroup input[type="text"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    .addHSNC-Igroup input[type="text"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid rgba(2,170,176,0.8);
        outline: none;
        transition: 0.5s;
    }


    .addHSNC-Bgroup button {
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

    .addHSNC-Bgroup button:focus {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .addHSNC-Bgroup button:hover {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .addHSNC-Bgroup i{
        color: white;
        margin-right: 10px;
    }

</style>