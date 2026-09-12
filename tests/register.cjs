const Module = require('node:module');
const { AsyncLocalStorage } = require('node:async_hooks');
const { createHash } = require('node:crypto');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { imageSize } = require('next/dist/compiled/image-size');

// Next installs this Node primitive before loading App Router modules.
globalThis.AsyncLocalStorage ??= AsyncLocalStorage;

// Use the project's tsconfig paths and JSX transform without a Next build.
require('tsx/cjs');

// Match Next's static image metadata for server-rendering tests without a build.
for (const extension of ['.png', '.jpg', '.jpeg']) {
	Module._extensions[extension] = (module, filename) => {
		const bytes = readFileSync(filename);
		const { width, height } = imageSize(bytes);
		const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 8);
		const name = path.parse(filename).name;
		module.exports = { src: `/_next/static/media/${name}.${hash}${extension.toLowerCase()}`, width, height };
	};
}

const originalLoad = Module._load;
Module._load = (request, parent, isMain) => {
	// This import is a bundler boundary marker, not application behavior.
	if (request === 'server-only') return {};
	return originalLoad.call(Module, request, parent, isMain);
};
