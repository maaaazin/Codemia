import { executeCode } from '../services/piston.service.js';
import { validateExecutionRequest } from '../utils/validation.js';

export async function handleExecution(req, res) {
  try {
    // Validate request
    const validation = validateExecutionRequest(req);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }

    const { code, language, stdin = '' } = req.body;

    // Execute code
    const result = await executeCode(code, language, stdin);

    res.json(result);

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      error: 'Execution failed',
      message: error.message
    });
  }
}
