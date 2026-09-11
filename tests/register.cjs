const Module = require('node:module');
const { AsyncLocalStorage } = require('node:async_hooks');

// Next installs this Node primitive before loading App Router modules.
globalThis.AsyncLocalStorage ??= AsyncLocalStorage;

// Use the project's tsconfig paths and JSX transform without a Next build.
require('tsx/cjs');

const originalLoad = Module._load;
Module._load = (request, parent, isMain) => {
	// This import is a bundler boundary marker, not application behavior.
	if (request === 'server-only') return {};
	return originalLoad.call(Module, request, parent, isMain);
};
