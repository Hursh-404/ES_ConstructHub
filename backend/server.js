const app = require('./src/app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/constructhub';

// Connect to MongoDB
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✓ Connected to MongoDB');
})
.catch((err) => {
    console.error('✗ MongoDB connection error:', err);
    process.exit(1);
});

// Start server
app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n✗ Shutting down...');
    await mongoose.connection.close();
    process.exit(0);
});
