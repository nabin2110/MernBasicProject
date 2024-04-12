const { default: mongoose } = require("mongoose");

const connectionString = "mongodb+srv://nabinthapaletsgo123:nabin@nodejscluster0.2t5faow.mongodb.net/?retryWrites=true&w=majority&appName=nodejsCluster0";
async function connectToDataBase(){
    await mongoose.connect(connectionString);
    console.log('connected successfully')
}
module.exports = connectToDataBase