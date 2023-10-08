module.exports = (sequelize, DataTypes) => {
    const Therapist = sequelize.define('Therapist', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        //todo change birthdate to this
        /*
        birthDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,  
            validate: {
                isDate: {
                    msg: 'Ungültiges Gebrutsdatum!'
                }
            }
        },
        */
        gender: DataTypes.STRING,
        address: DataTypes.STRING,
    })

    Therapist.associate = (models) => {
        Therapist.belongsToMany(models.Patient, { through: models.PatientTherapist });
        Therapist.hasOne(models.Credential);
        Therapist.hasMany(models.Role);
    }
    
    return Therapist;    
}