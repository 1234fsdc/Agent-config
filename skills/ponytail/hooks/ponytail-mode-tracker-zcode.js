#!/usr/bin/env node
// ponytail — ZCode UserPromptSubmit hook
// ZCode-compatible version of ponytail-mode-tracker.js
// Key differences from Claude Code version:
// 1. No stdin reading - ZCode doesn't pipe prompt JSON to hooks
// 2. No /ponytail command detection (mode switching is handled by the skill)
// 3. Output is strict JSON with hookSpecificOutput schema
// 4. If ponytail is active, re-emit ruleset to keep it in context

const { getDefaultMode } = require('./ponytail-config');
const { readMode } = require('./ponytail-runtime');
const { getPonytailInstructions } = require('./ponytail-instructions');

// Check if ponytail is active
const currentMode = readMode() || getDefaultMode();

if (currentMode && currentMode !== 'off') {
  // Re-emit the ruleset to keep it in context
  const instructions = getPonytailInstructions(currentMode);
  const output = {
    hookSpecificOutput: {
      hookEventName: 'UserPromptSubmit',
      additionalContext: instructions
    }
  };
  process.stdout.write(JSON.stringify(output));
}

process.exit(0);
