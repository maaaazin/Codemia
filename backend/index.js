import express from 'express';
import { setupMiddleware } from './src/middleware/index.js';
import authRoutes from './src/routes/auth.routes.js';
import executionRoutes from './src/routes/execution.routes.js';
import assignmentsRoutes from './src/routes/assignments.routes.js';
import testCasesRoutes from './src/routes/testcases.routes.js';
import submissionsRoutes from './src/routes/submissions.routes.js';
import statsRoutes from './src/routes/stats.routes.js';
import batchesRoutes from './src/routes/batches.routes.js';
import { checkSupabaseConnection } from './src/services/database.service.js';

const app = express();
const port = 3000;

// Setup middleware
setupMiddleware(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/execute', executionRoutes);
app.use('/api/assignments', assignmentsRoutes);
app.use('/api/testcases', testCasesRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/batches', batchesRoutes);

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
