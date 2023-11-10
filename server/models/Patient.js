
module.exports = (sequelize, DataTypes) => {

    const Patient = sequelize.define('Patient', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        birthDate: DataTypes.DATE,
        gender: DataTypes.STRING,
        address: DataTypes.STRING,
    })

    Patient.associate = (models) => {
        Patient.belongsToMany(models.Therapist, { through: models.PatientTherapist });
        Patient.hasOne(models.Credential);
    }

    return Patient;    
}