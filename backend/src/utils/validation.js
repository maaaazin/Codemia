export function validateExecutionRequest(req) {
    const { code, language } = req.body;
    
    if (!code || !language) {
      return {
        isValid: false,
        error: 'Missing code or language'
      };
    }
    
    return { isValid: true };
  }
  