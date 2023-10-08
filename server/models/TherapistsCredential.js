module.exports = (sequelize, DataTypes) => {
    const TherapistsCredential = sequelize.define('TherapistsCredential', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    });

    TherapistsCredential.associate = (models) => {
        TherapistsCredential.hasOne(models.Therapist);
    }
      
    return TherapistsCredential;
}
