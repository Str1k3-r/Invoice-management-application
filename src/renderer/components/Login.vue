<template>

    <div id="login-wrapper">

        <div id="login-subwrapper">

            <div id="form-title">
                <img src="/src/renderer/assets/images/xyphr.png"/>
                <p class="message" v-model="msg">{{ msg }}</p>
            </div>

            <div class="f-group">
                <label for="Username">Username</label>
                <br/>
                <input type="text" id="username" name="username" class="f-control" required v-model="username"/>
            </div>

            <div class="f-group">
                <label for="Password">Password</label>
                <br/>
                <input type="password" id="password" name="password" class="f-control" required v-model="password"/>
            </div>

            <div class="f-group">
                <button class="f-button" @click.prevent="validateCredentials">LOGIN</button>
            </div>


        </div>

    </div>

</template>

<script>

    import lUtils from "../database/loginUtils";

    export default {
        name: "Login",
        data: function () {
            return {
                username: '',
                password: '',
                msg: 'Login to your account'
            }
        },
        methods: {

            validateCredentials: function () {
                if (lUtils.verifyCredentials(this.username, this.password)) {
                    this.$router.push('/admin/home')

                } else {
                    this.msg = "Invalid credentials!"
                }
            }

        }
    }

</script>

<style scoped>

    #login-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        background: rgb(244, 245, 249);
    }

    #login-subwrapper {
        width: 35%;
        height: 450px;
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 8px;
        transform: translate(-50%, -50%);
        background-color: #FFFFFF;
        padding: 15px;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
    }

    #form-title {

        width: 100%;
        text-align: center;
        padding-bottom: 25px;
    }

    #form-title img {
        margin-top: 25px;
        margin-bottom: 15px;
        height: 40px;
        width: 40px;
    }

    .f-group {
        width: 100%;
        display: block;
        float: left;
    }

    .message {
        font-weight: lighter;
        font-size: 0.6em;
        margin-top: 8px;
        color: darkslategrey;
    }

    .f-group label {
        position: fixed;
        left: 50%;
        padding-left: 50px;
        padding-right: 50px;
        transform: translate(-50%);
        width: 100%;
        display: block;
        float: left;
        font-size: 0.8em;
        color: darkslategrey;
    }

    .f-group .f-control {
        margin-left: 30px;
        margin-right: 30px;
        width: 80%;
    }

    input {
        border: none;
        margin-bottom: 50px;
    }

    input[type="text"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    input[type="text"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        height: 25px;
        border-bottom: 2px solid rgba(2,170,176,0.8);
        outline: none;
        transition: 0.5s;
    }

    input[type="password"] {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid #E0E0E0;
        font-size: 13px;

    }

    input[type="password"]:focus {
        padding-left: 5px;
        padding-right: 5px;
        outline: none;
        height: 25px;
        border-bottom: 2px solid rgba(2,170,176,0.8);
        transition: 0.5s;

    }

    button {
        border: none;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        margin-top: 5px;
        height: 45px;
        width: 40%;
        outline: none;
        font-weight: bold;
        background: linear-gradient(to bottom right, rgba(2,170,176,0.8), rgba(0,205,172, 0.8)); /*#e96868;*/
        color: white;
        border-radius: 25px;
        box-shadow: none;
        font-size: 12px;
        transition: 0.5s;
    }

    button:focus {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        margin-top: 5px;
        height: 45px;
        width: 40%;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

    button:hover {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        margin-top: 5px;
        height: 45px;
        width: 40%;
        outline: none;
        background: linear-gradient(to bottom right, rgba(2,170,176,1), rgba(0,205,172, 1)); /*#e74f4e;*/
        color: white;
        transition: 0.5s;
        border-radius: 25px;
    }

</style>