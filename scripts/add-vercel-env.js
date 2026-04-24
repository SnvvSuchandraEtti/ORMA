const { execSync } = require('child_process');

const envVars = {
  NEXT_PUBLIC_SUPABASE_URL: "https://loltimoiqkwgeftrslpb.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "sb_publishable_04k8_7E9k-7Kgp-cWVCu8Q_04F5CTfm",
  NEXT_PUBLIC_APP_NAME: "ORMA",
  NEXT_PUBLIC_APP_URL: "https://orma-jfjmfble9-snvvsuchandraettis-projects.vercel.app"
};

const scope = "snvvsuchandraettis-projects";

// Vercel doesn't allow overriding existing env vars without `rm` first unless we use a specific approach.
// But it will error out if they already exist, so we will just ignore errors.
Object.entries(envVars).forEach(([key, value]) => {
  for (const env of ['production', 'preview', 'development']) {
    try {
      console.log(`Setting ${key} for ${env}...`);
      // Use 'echo <value> | vercel env add <key> <env>'
      // But in Node.js we can pass it via stdin to avoid newline issues.
      execSync(`vercel env rm ${key} ${env} -y --scope ${scope}`, { stdio: 'ignore' });
    } catch (e) {
      // Ignore error if it doesn't exist
    }
    try {
      execSync(`vercel env add ${key} ${env} --scope ${scope}`, { input: value });
      console.log(`Successfully set ${key} for ${env}`);
    } catch (e) {
      console.error(`Failed to set ${key} for ${env}`);
    }
  }
});
