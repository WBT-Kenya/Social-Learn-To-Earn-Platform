const mongoose = require('mongoose');

require('dotenv').config();


connectionParams = {
    useNewUrlParser: true,
   // useCreateIndex: true,
    useUnifiedTopology: true,

}

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.64ejlaa.mongodb.net/?retryWrites=true&w=majority`;
const connexion = mongoose.connect(uri, connectionParams).then(()=>console.log('connected to mongo cloud atlas'))
.catch((err) => console.log(err));

module.exports = connexion


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middleware
app.use(express.static("public"));
app.use(express.json());

app.use(authRoutes);
app.use("/videos", videoRoutes);