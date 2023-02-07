const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    await mongoose.set({ strictQuery: false });
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Connecting to mongodb: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDatabase;
