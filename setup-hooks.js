#!/usr/bin/env node
const path = require('path');
const { execSync } = require('child_process');

// Path to hooks in YOUR library
const HOOKS_PATH = path.join(__dirname, './hooks');

function configureGitHooks() {
  try {
    // Set Git to use hooks directly from node_modules
    execSync(`git config core.hooksPath ${HOOKS_PATH}`, { stdio: 'pipe' });
    console.log('✅ Git hooks configured at:', HOOKS_PATH);
  } catch (error) {
    console.error('❌ Failed to configure hooks:', error.message);
    process.exit(1);
  }
}

// Only configure if in a Git repo
try {
  execSync('git rev-parse --is-inside-work-tree', { stdio: 'pipe' });
  configureGitHooks();
} catch {
  console.log('⚠️  Not a Git repo - skipping hook setup');
}