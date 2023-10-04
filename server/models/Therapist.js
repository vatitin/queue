module.exports = (sequelize, DataTypes) => {

    const Therapist = sequelize.define('Therapist', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        birthDate: DataTypes.DATE,
        gender: DataTypes.STRING,
        address: DataTypes.STRING,
    })

    Therapist.associate = (models) => {
      Therapist.belongsToMany(models.Patient, { through: models.PatientTherapist });
    }
    Therapist.associate = (models) => {
        Therapist.belongsTo(models.TherapistUser);
    };
    return Therapist;    
}