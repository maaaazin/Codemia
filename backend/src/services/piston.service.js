import axios from 'axios';
import { PISTON_URL, LANGUAGE_MAP, FILE_NAMES } from '../config/constants.js';

export async function executeCode(code, language, stdin = '') {
  const langConfig = LANGUAGE_MAP[language.toLowerCase()];
  
  if (!langConfig) {
    throw new Error(`Unsupported language: ${language}`);
  }

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

  return {
    output: response.data.run.stdout,
    error: response.data.run.stderr,
    exitCode: response.data.run.code
  };
}
