const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(cookieParser());
app.use(session({
    key: 'credentialId',
    //todo use another secret
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 900000, httpOnly: true, }
}))

const db = require('./models')

//Routers
const patientsRouter = require('./routes/Patients')
app.use('/patients', patientsRouter)

const therapistsRouter = require('./routes/Therapists')
app.use('/therapists', therapistsRouter)

const therapistUserRouter = require('./routes/TherapistUsers')
app.use('/therapistAuth', therapistUserRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {  
        console.log('Server is running on port 3001');      
    });
});



