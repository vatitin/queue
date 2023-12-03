module.exports = (sequelize, DataTypes) => {
    const PatientTherapist = sequelize.define('PatientTherapist', {
        sequence: {
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

      PatientTherapist.associate = (models) => {
        PatientTherapist.belongsTo(models.Therapist);
        PatientTherapist.belongsTo(models.Patient);
    };
      
    return PatientTherapist;
  };
  