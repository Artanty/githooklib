const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class TagManager {
  constructor(config = {}, logManager) {
    this.envFile = config.envFile || path.join(process.cwd(), 'build/.env');
    this.logManager = logManager;
  }

  getTagVersion() {
    try {
      this.logManager.debug('Reading TAG_VERSION from .env');
      const envContent = fs.readFileSync(this.envFile, 'utf8');
      const match = envContent.match(/TAG_VERSION=([^\n]+)/);
      if (!match) throw new Error('TAG_VERSION not found in .env');
      this.logManager.debug(`Found TAG_VERSION: ${match[1]}`);
      return match[1];
    } catch (error) {
      this.logManager.error(`getTagVersion error: ${error.message}`);
      throw error;
    }
  }

  createAndPushTag() {
    try {
      this.logManager.debug('Starting tag creation process');
      
      const version = this.getTagVersion();
      const tagName = `v${version}`;
      this.logManager.debug(`Tag to be created: ${tagName}`);

      // Verify tag doesn't exist
      if (execSync(`git tag -l "${tagName}"`, { encoding: 'utf8' }).trim() === tagName) {
        throw new Error(`Tag ${tagName} already exists`);
      }

      // Create annotated tag
      execSync(`git tag -a ${tagName} -m "${tagName}"`, { stdio: 'inherit' });
      
      // Push tag to remote
      const pushOutput = execSync(`git push origin ${tagName}`, { encoding: 'utf8' });
      this.logManager.debug(`Git push output: ${pushOutput.trim()}`);

      this.logManager.history(`Created and pushed tag: ${tagName}`);
      return tagName;
    } catch (error) {
      this.logManager.error(`Tag creation failed: ${error.message}`);
      throw error;
    }
  }

  static isDeploymentCommit() {
    const commitMsg = execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).trim();
    return commitMsg.includes('-d');
  }

  static verifyMainBranch() {
    const branch = execSync('git symbolic-ref --short HEAD', { encoding: 'utf8' }).trim();
    if (!['main', 'master'].includes(branch)) {
      throw new Error(`Deployment tags only allowed on main/master (current: ${branch})`);
    }
    return branch;
  }
}

module.exports = TagManager;