module.exports = (sequelize, DataTypes) => {
    const PatientTherapist = sequelize.define('PatientTherapist', {
        subscriptionInWaitingList: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [['WAITING', 'ACTIVE', 'FORMER']],
          },
        },
      });
      
      
    return PatientTherapist;
  };
  