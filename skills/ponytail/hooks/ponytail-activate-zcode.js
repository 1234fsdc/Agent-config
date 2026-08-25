#!/usr/bin/env node
// ponytail — ZCode SessionStart activation hook
// ZCode-compatible version of ponytail-activate.js
// Key differences from Claude Code version:
// 1. No stdin reading - ZCode doesn't pipe input to hooks
// 2. Output is strict JSON with hookSpecificOutput schema
// 3. No statusline nudge (ZCode doesn't use Claude Code statusline)
// 4. No platform detection (Copilot/Codex/Qoder) - ZCode is the target

const { getDefaultMode } = require('./ponytail-config');
const { getPonytailInstructions } = require('./ponytail-instructions');

const mode = getDefaultMode();

// "off" mode — skip activation entirely
if (mode === 'off') {
  process.exit(0);
}

// Generate the ponytail ruleset
const instructions = getPonytailInstructions(mode);

// Output ZCode-compatible JSON
// additionalContext is injected into the conversation by ZCode
const output = {
  hookSpecificOutput: {
    hookEventName: 'SessionStart',
    additionalContext: instructions
  }
};

process.stdout.write(JSON.stringify(output));
process.exit(0);
