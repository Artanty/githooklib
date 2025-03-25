#!/usr/bin/env node
const TagManager = require('../lib/tag-utils');
const LogManager = require('../lib/log-manager');

const config = {
  logDir: process.env.VBH_LOG_DIR || path.join(process.cwd(), 'build/logs'),
  envFile: process.env.VBH_ENV_FILE || path.join(process.cwd(), 'build/.env'),
  maxEntries: process.env.VBH_MAX_ENTRIES || 500
};

try {
  const logManager = new LogManager(config);
  const tagManager = new TagManager(config, logManager);

  logManager.debug('Starting post-commit hook');

  if (TagManager.isDeploymentCommit()) {
    logManager.debug('Deployment flag (-d) found');
    TagManager.verifyMainBranch();
    
    const tagName = tagManager.createAndPushTag();
    console.log(`✅ Successfully deployed tag: ${tagName}`);
    
    try {
      execSync('git push origin HEAD', { stdio: 'inherit' });
    } catch (pushError) {
      logManager.debug('Commit was already pushed or push failed');
    }
  }
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}