/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projects', {
    Date: {
      type: DataTypes.TEXT,
    },
    Client: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Project: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Project_Code: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Hours: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    Billable: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    First_Name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Last_Name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Billable_Rate: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'projects'
  });
};
