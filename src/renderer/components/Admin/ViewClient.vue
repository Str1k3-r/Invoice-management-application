<template>
    <div class="viewclient-wrapper">

        <div class="back-button">
            <button @click="back" class="row sidebar-elements"><i class="fa fa-arrow-left fa-lg"
                                                                  aria-hidden="true"/></button>
        </div>


        <div class="loading" v-if="!dataLoaded">
            <img src="../../assets/images/load.gif"/>
        </div>

        <div v-if="dataLoaded" class="viewclient-subwrapper">
            <h4> CLEINT - {{id}}</h4>

        </div>

    </div>
</template>

<script>

    import dbUtils from "../../db"

    export default {
        name: "ViewClient",
        data: function () {
            return {
                id: this.$route.params.id,
                client: null
            }
        },

        methods: {
            getClient: function () {

            }
        },

        created: function () {
            this.getClient()
        }
    }
</script>

<style scoped>

</style>