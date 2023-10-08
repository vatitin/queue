module.exports = (sequelize, DataTypes) => {
    const PatientsCredential = sequelize.define('PatientsCredential', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    });

    PatientsCredential.associate = (models) => {
        PatientsCredential.hasOne(models.Patient);
    }
      
    return PatientsCredential;
}
