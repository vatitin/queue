module.exports = (sequelize, DataTypes) => {
    const PatientTherapist = sequelize.define('PatientTherapist', {
        subscriptionInWaitingList: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      });
      
    return PatientTherapist;
  };
  