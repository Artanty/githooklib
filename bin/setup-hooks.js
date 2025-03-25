#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const HOOKS = {
  'pre-commit': 'version-bump-hook',
  'post-commit': 'tag-deploy-hook'
};

function findGitDir(startDir) {
  let currentDir = path.resolve(startDir);
  const root = path.parse(currentDir).root;

  while (currentDir !== root) {
    const gitDir = path.join(currentDir, '.git');
    if (fs.existsSync(gitDir)) {
      return gitDir;
    }
    currentDir = path.dirname(currentDir);
  }
  return null;
}

function installHooks() {
  try {
    const gitDir = findGitDir(process.cwd());
    
    if (!gitDir) {
      console.warn('⚠️  No .git directory found - skipping hook installation');
      return;
    }

    const hooksDir = path.join(gitDir, 'hooks');
    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true });
    }

    Object.entries(HOOKS).forEach(([hookName, command]) => {
      const hookPath = path.join(hooksDir, hookName);
      const hookContent = `#!/bin/sh
${command}
`;
      fs.writeFileSync(hookPath, hookContent);
      fs.chmodSync(hookPath, '755');
      console.log(`✅ Installed ${hookName} hook in ${hooksDir}`);
    });

  } catch (error) {
    console.error('❌ Hook installation failed:', error.message);
    process.exit(1);
  }
}

installHooks();