const { DatabaseService } = require("../services/DatabaseService");

const Link = DatabaseService.sequelize.define("link", {
    original: {
        type: DatabaseService.Sequelize.STRING
    },
    hash: {
        type: DatabaseService.Sequelize.STRING
    },
    visits: {
        type: DatabaseService.Sequelize.BIGINT,
        defaultValue: 0
    },
})

module.exports = Link