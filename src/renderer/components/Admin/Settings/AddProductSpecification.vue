<template>
    <transition name="modal">
        <div class="modal" style="display: block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="addPS-wrapper">
                        <div id="addPS-subwrapper">
                            <button @click.prevent="close" id="hideAddPS"><i class="fa fa-times"/></button>
                            <h4> Add Product Specification </h4>

                            <div class="addPS-Igroup">
                                <label for="productName">Product Name</label>
                                <br/>
                                <input type="text" id="productName" name="productName" class="f-control" required v-model="productName"/>
                            </div>

                            <div class="addPS-Igroup">
                                <label for="fields">Fields</label>
                                <br/>
                                <input type="text" id="fields" name="fields" class="f-control" required v-model="fields"/>
                            </div>

                            <div class="addPS-Bgroup">
                                <button class="addPS-button" @click.prevent="save"><i class="fa fa-save"/>SAVE</button>
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
        name: "AddProductSpecification",
        data: function () {
            return {
                productName: '',
                fields: ''
            }
        },

        methods: {
            close: function () {
                this.$emit('closePS');
            },

            closeandrefresh: function () {
              this.$emit('reloadPS')
            },

            save: function () {
                if(this.productName != '' && this.fields != ''){
                    var fieldsData = this.parseFields()
                    if(fieldsData.indexOf('Product Name') > -1){
                        this.closeandrefresh()
                    } else {
                        document.getElementById('fields').focus()
                    }

                    //call save
                } else {
                    if(this.productName == ''){
                        document.getElementById('productName').focus()
                    } else {
                        document.getElementById('fields').focus()
                    }
                }
            },

            parseFields: function () {
                var temp = this.fields
                return temp.split(',')
            }
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

    .addPS-wrapper{
        border: none;
        outline: none;
        background: white;
        padding: 20px;
    }

    #addPS-subwrapper h4 {
        font-weight: bold;
        font-size: 14px;
        margin-bottom: 40px;
        margin-top: 10px;
        margin-left: 10px;
    }

    #hideAddPS{
        float: right;
        background: white;
        outline: none;
        border: none;
        margin-top: -7px;
        margin-right: -3px;
    }


    .addPS-Bgroup{
        margin: 0 auto;
        width: 180px;
    }


    .addPS-Igroup label {
        width: 100%;
        display: block;
        float: left;
        font-size: 0.8em;
        color: darkslategrey;
        margin-left: 20px;
    }


    .addPS-Igroup {
        padding-right: 50px;
        padding-left: 10px;
    }

    .addPS-Igroup input {
        width: 100%;
        border: none;
        margin-bottom: 30px;
        margin-left: 20px;
    }

    .addPS-Igroup input[type="text"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    .addPS-Igroup input[type="text"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid rgba(2,170,176,0.8);
        outline: none;
        transition: 0.5s;
    }


    .addPS-Bgroup button {
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

    .addPS-Bgroup button:focus {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .addPS-Bgroup button:hover {
        height: 45px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .addPS-Bgroup i{
        color: white;
        margin-right: 10px;
    }

</style>