
module.exports = (sequelize, DataTypes) => {

    const Credential = sequelize.define('Credential', {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
    })

    Credential.associate = (models) => {
        Credential.hasOne(models.Therapist);
        Credential.hasOne(models.Patient);
    }

    Credential.addHook('beforeValidate', (credential, options) => {
      if (credential.TherapistId && credential.PatientId) {
        throw new Error('Ein Credential kann nur mit einem Benutzer verknüpft sein.');
      }
    });

    Credential.associate = (models) => {
      Credential.belongsTo(models.Therapist);
      Credential.belongsTo(models.Patient);
  }

  
    return Credential;
     
}