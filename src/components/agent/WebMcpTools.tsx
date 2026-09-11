'use client';

import { useEffect } from 'react';

import { UHA_PRODUCT as APP_INFO } from '@/content/product';

type TToolDefinition = {
	name: string;
	description: string;
	inputSchema: Record<string, unknown>;
	execute: () => Promise<typeof APP_INFO>;
};

type TModelContext = {
	registerTool: (tool: TToolDefinition, options: { signal: AbortSignal }) => void;
};

declare global {
	interface Navigator {
		modelContext?: TModelContext;
	}

	interface Window {
		__uhaWebMcpRegistered?: boolean;
		__uhaWebMcpAbortController?: AbortController;
	}
}

const WebMcpTools = () => {
	useEffect(() => {
		const registerWebMcpTools = () => {
			const modelContext = navigator.modelContext;
			if (!modelContext || typeof modelContext.registerTool !== 'function') return false;
			if (window.__uhaWebMcpRegistered) return true;

			const controller = new AbortController();
			modelContext.registerTool(
				{
					name: 'get_uha_app_info',
					description: 'Return public product, beta, pricing, and install information for Uha.',
					inputSchema: {
						type: 'object',
						properties: {},
						additionalProperties: false
					},
					execute: async () => APP_INFO
				},
				{ signal: controller.signal }
			);

			window.__uhaWebMcpRegistered = true;
			window.__uhaWebMcpAbortController = controller;
			return true;
		};

		if (registerWebMcpTools()) return;

		let attempts = 0;
		const retry = window.setInterval(() => {
			attempts += 1;
			if (registerWebMcpTools() || attempts >= 20) {
				window.clearInterval(retry);
			}
		}, 50);

		return () => {
			window.clearInterval(retry);
		};
	}, []);

	return null;
};

export default WebMcpTools;
