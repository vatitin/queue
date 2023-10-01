module.exports = (sequelize, DataTypes) => {
    const Therapist = sequelize.define('Therapist', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        birthDate: DataTypes.DATEONLY,
        gender: DataTypes.STRING,
        address: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    
    return Therapists;    
}