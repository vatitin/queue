module.exports = (sequelize, DataTypes) => {

    const TherapistUser = sequelize.define('TherapistUser', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    TherapistUser.associate = (models) => {
        TherapistUser.hasOne(models.Therapist);
    }
    
    return TherapistUser;    
}