const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());


const db = require('./models')

//Routers
const patientsRouter = require('./routes/Patients')
app.use('/patients', patientsRouter)

const therapistsRouter = require('./routes/Therapists')
app.use('/therapists', therapistsRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {  
        console.log('Server is running on port 3001');      
    });
});


