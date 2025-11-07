import express from 'express';
import { setupMiddleware } from './src/middleware/index.js';
import executionRoutes from './src/routes/execution.routes.js';
import { checkSupabaseConnection } from './src/services/database.service.js';

const app = express();
const port = 3000;

// Setup middleware
setupMiddleware(app);

// Routes
app.use('/api', executionRoutes);

// Check Supabase connection before starting
checkSupabaseConnection().then((isConnected) => {
  if (!isConnected) {
    console.error('\n⚠️  Warning: Supabase connection check failed.');
    console.error('Server will still start, but database operations may fail.');
    console.error('Please check your .env file.\n');
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
