import connectDB from './config/db.js'
import app from './app.js';

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 500, () => {
            console.log(`Server is running on port ${process.env.PORT || 500}`);
            console.log(`Database connected successfully`);
        } )
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });