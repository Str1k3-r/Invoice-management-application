<template>
</template>

<script>

    import lUtils from "../database/loginUtils";

    export default {
        name: 'landing-page',
        components: {},
        methods: {
            checkLogin: function () {
                if (lUtils.getLoginConfig().isLoggedIn) {
                    this.$router.push('/admin/clients')
                } else {
                    this.$router.push('/login')
                }
            }

        },

        created: function () {
            this.checkLogin()
        }
    }

</script>

<style>

</style>
