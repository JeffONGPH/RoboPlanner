module.exports = function (sequelize, DataTypes) {
    var Account = sequelize.define("Account", {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        phone: DataTypes.STRING
    });

    Account.associate = function (models) {
        Account.hasMany(models.TODO, {
            onDelete: "cascade"
        });
    };
    return Account;
};
