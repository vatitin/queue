module.exports = (sequelize, DataTypes) => {
    const allowedRoles = ['Therapist', 'Patient', 'Admin'];

    const Role = sequelize.define('Role', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [allowedRoles],
                    msg: 'Invalid role. Allowed roles: Therapist, Patient, Admin'
                }
            }
        },
    });

    Role.associate = (models) => {
        Role.hasMany(models.Therapist);
        Role.hasMany(models.Patient);
    };

    return Role;
};
