import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';
import { execSync } from 'child_process';
import { icpBindgen } from '@icp-sdk/bindgen/plugins/vite';

dotenv.config({ path: '../.env' });

const BACKEND_CANISTER_NAME = process.env.BACKEND_CANISTER_NAME;
const BACKEND_CANISTER_CANDID = process.env.BACKEND_CANISTER_CANDID;

const envState = process.env.ICP_ENVIRONMENT || 'local';

export default defineConfig(({ command }) => {
  const plugins = [
    react(),
    icpBindgen({
      didFile: `../${BACKEND_CANISTER_CANDID}`,
      outDir: './backend_api',
    }),
  ];

  // Build mode: asset canister handles ic_env cookie automatically
  if (command !== 'serve') {
    return { plugins };
  }

  // Dev server mode: configure ic_env cookie and proxy
  const networkStatus = JSON.parse(
    execSync(`icp network status -e ${envState} --json`, { encoding: 'utf-8' })
  );
  const rootKey = networkStatus.root_key;

  const proxyTarget = networkStatus.api_url;

  // Backend must be deployed before starting dev server
  let canisterId;
  try {
    canisterId = execSync(`icp canister status ${BACKEND_CANISTER_NAME} -e ${envState} -i`, {
      encoding: 'utf-8',
    }).trim();
  } catch {
    console.error(`
❌ Backend canister '${BACKEND_CANISTER_NAME}' not found in environment '${envState}'

   Before running the dev server, deploy the backend canister:

     icp deploy ${BACKEND_CANISTER_NAME} -e ${envState}
`);
    process.exit(1);
  }

  console.log(`
🌐 ICP Dev Server Configuration

   Environment:         ${envState}
   Backend Canister ID: ${canisterId}
   IC API URL:          ${proxyTarget}
   IC Root Key:         ${rootKey.slice(0, 20)}...${rootKey.slice(-20)}
`);

  return {
    plugins,
    server: {
      headers: {
        // Note: ic_root_key must be lowercase - library converts to uppercase IC_ROOT_KEY
        'Set-Cookie': `ic_env=${encodeURIComponent(
          `PUBLIC_CANISTER_ID:${BACKEND_CANISTER_NAME}=${canisterId}&ic_root_key=${rootKey}`
        )}; SameSite=Lax;`,
      },
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
  };
 });

