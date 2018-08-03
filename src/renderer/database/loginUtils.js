var fs = require('fs');
var config = __dirname + '/config.json'


 function getConfig() {
    var configRaw = fs.readFileSync(config, "utf8")
    var configParsed = JSON.parse(configRaw)
    return configParsed
}

 function updateConfig(configString) {
    console.log("Config file has been updated.")
    fs.writeFileSync(config, JSON.stringify(configString))
}

 function logIn() {
    var updatedConfig = getConfig()
     updatedConfig.isLoggedIn = true
     console.log(updatedConfig, updatedConfig.isLoggedIn)
    updateConfig(updatedConfig)
}

var lUtils = {



    getLoginConfig: function () {
        var updatedConfig = getConfig()
        return updatedConfig
    },

    logOut: function () {
        var updatedConfig = getConfig()
        updatedConfig.isLoggedIn = false
        updateConfig(updatedConfig)
    },

    verifyCredentials: function (username, password) {
        var updatedConfig = getConfig()
        if ((username == updatedConfig.adminUsername) && (password == updatedConfig.adminPassword)) {
            logIn()
            return true
        } else {
            return false
        }
    },

    checkCredentials: function (username, password) {
        var updatedConfig = getConfig()
        if ((username == updatedConfig.adminUsername) && (password == updatedConfig.adminPassword)) {
            return true
        } else {
            return false
        }
    },

    changePassword: function (newPassword) {
        var updatedConfig = getConfig()
        updatedConfig.adminPassword = newPassword
        console.log(updatedConfig)
        updateConfig(updatedConfig)
    }
}

export default lUtils