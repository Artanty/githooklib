#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const HOOKS = {
  'pre-commit': 'pre-commit_version-bump',
  'post-commit': 'post-commit_tag-push'
};

function findGitDir(currentDir) {
  // Check current directory
  let gitDir = path.join(currentDir, '.git');
  if (fs.existsSync(gitDir)) {
    return gitDir;
  }

  // Check parent directory
  gitDir = path.join(currentDir, '../.git');
  if (fs.existsSync(gitDir)) {
    return gitDir;
  }

  return null;
}

function installHooks() {
  try {
    const gitDir = findGitDir(process.cwd());
    
    if (!gitDir) {
      throw new Error('Could not find .git directory in current or parent folder');
    }

    const hooksDir = path.join(gitDir, 'hooks');
    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir);
    }

    Object.entries(HOOKS).forEach(([hookName, command]) => {
      const hookPath = path.join(hooksDir, hookName);
      const hookContent = `#!/bin/sh
${command}
`;
      fs.writeFileSync(hookPath, hookContent);
      fs.chmodSync(hookPath, '755');
      console.log(`✅ ${hookName} hook installed successfully in ${gitDir}/hooks`);
    });

  } catch (error) {
    console.error('❌ Error installing hooks:', error.message);
    process.exit(1);
  }
}

installHooks();