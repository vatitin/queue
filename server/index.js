const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');

app.use(passport.initialize());
require('./passport-setup');

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());

const db = require('./models')

//Routers
const therapistsRouter = require('./routes/Therapists')
app.use('/therapist', therapistsRouter)

const therapistWaitingPatientsRouter = require('./routes/Patients')
app.use('/therapist/patients', therapistWaitingPatientsRouter)

const therapistUserRouter = require('./routes/TherapistUsers')
app.use('/therapistAuth', therapistUserRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {  
        console.log('Server is running on port 3001');      
    });
});



