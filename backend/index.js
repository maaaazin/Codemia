import { supabase } from './config/supabase.js';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3000;
const PISTON_URL = 'http://localhost:2000';

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Supabase connection
async function checkSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Try a simple query to test the connection
    const { data, error } = await supabase.from('users').select('*').limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:');
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      return false;
    }
    
    console.log('✅ Supabase connection successful!');
    console.log('Connection test passed - can query the database.');
    return true;
  } catch (err) {
    console.error('❌ Supabase connection error:', err.message);
    return false;
  }
}

// Check connection before starting server
checkSupabaseConnection().then((isConnected) => {
  if (!isConnected) {
    console.error('\n⚠️  Warning: Supabase connection check failed. Server will still start, but database operations may fail.');
    console.error('Please check your .env file and ensure SUPABASE_URL and SUPABASE_ANON_KEY are set correctly.\n');
  }
});

// Language version mapping
const LANGUAGE_MAP = {
  'python': { language: 'python', version: '3.12.0' },
  'javascript': { language: 'javascript', version: '20.11.1' },
  'cpp': { language: 'c++', version: '10.2.0' },
  'java': { language: 'java', version: '15.0.2' },
  'c': { language: 'c', version: '10.2.0' }
};

// File name mapping
const FILE_NAMES = {
  'python': 'main.py',
  'javascript': 'main.js',
  'cpp': 'main.cpp',
  'java': 'Main.java'
};

// Execute code endpoint
app.post('/api/execute', async (req, res) => {
  try {
    const { code, language, stdin = '' } = req.body;

    // Validation
    if (!code || !language) {
      return res.status(400).json({ 
        error: 'Missing code or language' 
      });
    }

    // Get language config
    const langConfig = LANGUAGE_MAP[language.toLowerCase()];
    if (!langConfig) {
      return res.status(400).json({ 
        error: `Unsupported language: ${language}` 
      });
    }

    // Call Piston API
    const response = await axios.post(
      `${PISTON_URL}/api/v2/execute`,
      {
        language: langConfig.language,
        version: langConfig.version,
        files: [{
          name: FILE_NAMES[language.toLowerCase()],
          content: code
        }],
        stdin: stdin
      }
    );

    // Return result
    res.json({
      output: response.data.run.stdout,
      error: response.data.run.stderr,
      exitCode: response.data.run.code
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      error: 'Execution failed',
      message: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});