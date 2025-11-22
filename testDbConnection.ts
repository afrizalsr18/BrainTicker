// Load environment variables FIRST before any other imports
import dotenv from 'dotenv';
import { resolve } from 'path';

// Try to load .env.local first, fallback to .env
dotenv.config({ path: resolve(process.cwd(), '.env.local') });
dotenv.config({ path: resolve(process.cwd(), '.env') });

const testDatabaseConnection = async () => {
    // Dynamically import after env vars are loaded
    const { connectToDatabase } = await import('./database/mongoose');
    const mongoose = await import('mongoose');
    
    console.log('Testing database connection...');
    console.log('MongoDB URI:', process.env.MONGODB_URI ? '✓ Set' : '✗ Not set');
    
    try {
        const conn = await connectToDatabase();
        
        if (conn) {
            console.log('\n✓ Database connection successful!');
            console.log('Connection state:', mongoose.default.connection.readyState === 1 ? 'Connected' : 'Not connected');
            console.log('Database name:', mongoose.default.connection.db?.databaseName || 'N/A');
            console.log('Host:', mongoose.default.connection.host || 'N/A');
            console.log('Port:', mongoose.default.connection.port || 'N/A');
            
            // Close the connection after testing
            await mongoose.default.connection.close();
            console.log('\n✓ Connection closed successfully');
            process.exit(0);
        } else {
            console.error('\n✗ Connection returned null');
            process.exit(1);
        }
    } catch (error) {
        console.error('\n✗ Database connection failed:');
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
        } else {
            console.error('Unknown error:', error);
        }
        process.exit(1);
    }
};

testDatabaseConnection();