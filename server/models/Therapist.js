module.exports = (sequelize, DataTypes) => {

    const Therapist = sequelize.define('Therapist', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        birthDate: DataTypes.DATE,
        gender: DataTypes.STRING,
        address: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    Therapist.associate = (models) => {
      Therapist.belongsToMany(models.Patient, { through: models.PatientTherapist });
    }
    return Therapist;    
}