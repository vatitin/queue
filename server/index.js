const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = require('./models')

//Routers
const patientsRouter = require('./routes/Patients')
app.use('/patients', patientsRouter)

const therapistsRouter = require('./routes/Therapists')
app.use('/therapists', therapistsRouter)

const therapistUserRouter = require('./routes/TherapistUsers')
app.use('/therapistAuth', therapistUserRouter)

db.sequelize.sync().then(() => {
    seedRoles();
    app.listen(3001, () => {  
        console.log('Server is running on port 3001');      
    });
});


const seedRoles = async () => {
    const Role = require('./models').Role;

    const roleNames = ['Therapist', 'Patient', 'Admin'];

    for (const roleName of roleNames) {
        if(! (await Role.findOne({where: {name: roleName}}))) {
            await Role.create({ name: roleName });
            console.log(`Role ${roleName} seeded successfully.`);
        } 
    }

    console.log('Roles seeded successfully.');
};



