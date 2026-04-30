'use client';

import { useEffect } from 'react';

type TWebMcpTool = {
	name: string;
	description: string;
	inputSchema: Record<string, unknown>;
	execute: () => unknown;
};

type TModelContext = {
	registerTool: (tool: TWebMcpTool, options?: { signal?: AbortSignal }) => void;
};

declare global {
	interface Navigator {
		modelContext?: TModelContext;
	}
}

const appInfo = {
	name: 'Uha',
	platform: 'iOS',
	website: 'https://uha.app',
	appStore: 'https://apps.apple.com/app/uha-subscription-tracker/id6740211581',
	testFlight: 'https://testflight.apple.com/join/uVYrDkbA',
	description:
		'Subscription tracker with renewal reminders, spending forecasts, multi-currency totals, and iCloud sync.',
	pricing: {
		free: 'Up to 5 subscriptions, 3 currencies, 2-year future timeline',
		unlimited:
			'One-time purchase for unlimited subscriptions, all currencies, iCloud sync, backup restoration, and a 10-year timeline'
	}
};

export const WebMcpTools = () => {
	useEffect(() => {
		if (!navigator.modelContext?.registerTool) return;

		const controller = new AbortController();

		navigator.modelContext.registerTool(
			{
				name: 'get_uha_app_info',
				description: 'Return public product, pricing, and install information for Uha.',
				inputSchema: {
					type: 'object',
					properties: {},
					additionalProperties: false
				},
				execute: () => appInfo
			},
			{ signal: controller.signal }
		);

		return () => controller.abort();
	}, []);

	return null;
};
