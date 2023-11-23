
module.exports = (sequelize, DataTypes) => {

    const Patient = sequelize.define('Patient', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        birthDate: DataTypes.DATE,
        gender: DataTypes.STRING,
    })

    Patient.associate = (models) => {
        Patient.belongsToMany(models.Therapist, { through: models.PatientTherapist });
    }

    return Patient;    
}