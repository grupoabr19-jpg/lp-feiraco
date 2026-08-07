import { config } from 'dotenv';

// Both `src` and the compiled `dist` directory are three levels below the
// repository root. Render-provided variables keep precedence because dotenv
// does not override values that are already present in process.env.
config({ path: new URL('../../../.env', import.meta.url) });
