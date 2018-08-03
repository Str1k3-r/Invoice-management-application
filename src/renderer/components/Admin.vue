<template>

    <div class="admin-wrapper">

        <nav class="navbar navbar-expand-md fixed-top" id="navbar-base">

            <router-link class="navbar-brand" id="logo" to="/admin/home">
                <img src="/src/renderer/assets/images/xyphr.png"/>
            </router-link>


            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-buttons" aria-controls="navbar-buttons" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"><i class="fa fa-hashtag" aria-hidden="true"/></span>
            </button>

            <div class="collapse navbar-collapse" id="navbar-buttons">
                <div class="form-inline mt-2 mt-md-0 ml-auto">
                    <input class="form-control mr-sm-2" type="text" placeholder="Search" id="search" v-model="searchQuery"/>

                    <button @click.prevent="search" type="button" id="search-submit">
                        <i class="fa fa-search" aria-hidden="true"/></button>
                </div>

                <button id="logout" @click.prevent="logout" type="button">LOGOUT</button>
            </div>

        </nav>

        <nav class="nav sidebar-nav" id="sidebar-wrapper">

            <div class="sidebar-subwrapper">

                <!--<router-link tag="li" class="row sidebar-elements" to="/admin/home"><i class="fa fa-home"
                                                                                            aria-hidden="true"/><span
                        class="sidebar-element-title">Home</span></router-link>!-->


                <router-link tag="li" class="row sidebar-elements" to="/admin/orders"><i class="fa fa-table"
                                                                                         aria-hidden="true"/><span
                        class="sidebar-element-title">Orders</span></router-link>


                <router-link tag="li" class="row sidebar-elements" to="/admin/clients"><i class="fa fa-address-book"
                                                                                          aria-hidden="true"/><span
                        class="sidebar-element-title">Clients</span></router-link>

                <router-link tag="li" class="row sidebar-elements" to="/admin/products"><i class="fa fa-cubes"
                                                                                           aria-hidden="true"/><span
                        class="sidebar-element-title">Products</span></router-link>


                <!--<router-link tag="li" class="row sidebar-elements" to="/admin/reports"><i class="fa fa-object-ungroup"
                                                                                          aria-hidden="true"/><span
                        class="sidebar-element-title">Reports</span></router-link>!-->


                <router-link tag="li" class="row sidebar-elements" to="/admin/settings"><i class="fa fa-cogs"
                                                                                           aria-hidden="true"/><span
                        class="sidebar-element-title">Settings</span></router-link>

            </div>

        </nav>

        <router-view class="content"></router-view>

    </div>

</template>

<script>

    import lUtils from "../database/loginUtils";

    export default {
        name: "Admin",
        methods: {
            logout: function () {
                lUtils.logOut()
                this.$router.push('/login')
            },

            search: function () {
                console.log(this.searchQuery)
                this.searchQuery = ''
            }
        },
        data: function () {
            return {
                searchQuery: ''
            }
        }
    }
</script>

<style>

    body {
        width: 100%;
        height: 100%;
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
        padding-top: 90px;
    }

    * {
        margin: 0;
        padding: 0;
        font-family: 'Montserrat', sans-serif;
        box-sizing: border-box;

    }

    .admin-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgb(244, 245, 249);
        display: flex;
        align-items: stretch;

    }

    #navbar-base {
        border-bottom: 1px solid #F8F8F8;
        background-color: white;
        height: 90px;
    }

    #navbar-buttons {
        border-left: 2px solid #F8F8F8;
        display: contents;
        text-align: center;
        height: 60px;
        margin-top: 10px;
    }

    #search {
        font-weight: normal;
        width: 250px;
        height: 40px;
        font-size: 12px;
        color: darkslategrey;
        outline: none;
        border-radius: 50px;
        border: 2px solid #F8F8F8;
    }

    #search::placeholder {
        color: darkgrey;
        opacity: 1;
    }

    #search:focus {
        box-shadow: none;
    }

    #search:hover {
        box-shadow: none;
    }

    #logo {
        width: 135px;
        margin-left: 30px;
        margin-top: 5px;
        text-decoration: none;
        outline: none;
    }

    #logo img {
        height: 40px;
        width: 40px;
    }

    #sidebar-wrapper {
        min-width: 200px;
        max-width: 200px;
        min-height: 100vh;
        transition: all 0.3s;
        color: darkslategrey;
        background: white;
        border-right: 1px solid #F8F8F8;
    }

    #sidebar-wrapper.active {
        margin-left: -250px;

    }

    .sidebar-elements {
        text-align: center;
        width: 180px;
        padding-top: 30px;
        padding-left: 30px;
        color: darkslategray;
        font-size: 13px;
        cursor: pointer;
    }

    .sidebar-subwrapper .router-link-active,
    .sidebar-subwrapper .router-link-exact-active {
        text-decoration: none;
        color: rgba(2,170,176,1);
        text-align: center;
        font-size: 13px;
    }

    .sidebar-subwrapper .router-link-active .fa,
    .sidebar-subwrapper .router-link-exact-active .fa {
        color: rgba(2,170,176,1);
    }

    .fa {
        padding-top: 3px;
        color: darkslategray;
    }

    .sidebar-element-title {
        margin-bottom: 5px;
        font-weight: normal;
    }

    li {
        margin-left: 20px;
        margin-right: 20px;
        margin-bottom: 20px;
    }

    li router-link {
        text-decoration: none;
        color: darkslategrey;
        font-size: 13px;
        text-align: center;
    }

    li router-link:hover {
        text-decoration: none;
        color: rgba(2,170,176,1);
        font-size: 13px;
        text-align: center;
    }

    li router-link:focus {
        text-decoration: none;
        color: rgba(2,170,176,1);
        font-size: 12px;
        text-align: center;
    }

    li.active router-link {
        text-decoration: none;
        color: rgba(2,170,176,1);
        font-size: 13px;
        text-align: center;
    }

    li i {
        color: darkslategrey;
        background: transparent;
        width: 50px;
        border: 0;
        box-shadow: none;
        outline: none;
    }

    li.active i {
        background: transparent;
        color: rgba(2,170,176,1);
        border: 0;
        box-shadow: none;
        outline: none;
    }


    #logout {
        cursor: pointer;
        height: 42px;
        width: 150px;
        outline: none;
        font-weight: bold;
        background: linear-gradient(to bottom right, rgba(2,170,176,0.8), rgba(0,205,172, 0.8));  /*#e96868;*/
        color: white;
        border-radius: 25px;
        border: none;
        font-size: 12px;
    }

    #logout:focus {
        height: 42px;
        width: 150px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1));  /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    #logout:hover {
        height: 42px;
        width: 150px;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1));  /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    .content{
        width: 100%;
        padding: 2px;
    }

    #search-submit{
        cursor: pointer;
        height: 30px;
        width: 30px;
        margin-right: 30px;
        border: 3px rgb(2,170,176);
        background: white;
        text-decoration: none;
        outline: none;
    }

    #search-submit:hover {
        border: 3px rgb(2,170,176);
    }

    #search-submit:focus {
        border: 3px rgb(2,170,176);
    }


    #search-submit .fa {
        color: rgba(2,170,176,1);
        border: 3px rgb(2,170,176);
    }

</style>