'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfoPage, { type InfoSectionT } from '@/components/info-page/info-page';
import { MCP_ENDPOINT } from '@/lib/agent-discovery';

const tools = [
	['get_info', 'tool_info'],
	['get_pricing', 'tool_pricing'],
	['get_app_links', 'tool_links'],
	['get_supported_currencies', 'tool_currencies']
] as const;

export default function McpPage({ locale }: { locale: string }) {
	const { t } = useTranslation('mcp', { lng: locale });
	const [copyStatus, setCopyStatus] = useState<'done' | 'failed' | null>(null);
	const copyEndpoint = async () => {
		try {
			await navigator.clipboard.writeText(MCP_ENDPOINT);
			setCopyStatus('done');
		} catch {
			setCopyStatus('failed');
		}
	};
	const sections: InfoSectionT[] = [
		{
			id: 'endpoint',
			title: t('page.endpoint_label'),
			content: (
				<>
					<div className="endpoint-block">
						<code>{MCP_ENDPOINT}</code>
						<button type="button" className="copy-endpoint" onClick={copyEndpoint}>
							{t('page.copy_label')}
						</button>
						<p className="copy-status" role="status">
							{copyStatus && t(`page.copy_${copyStatus}`)}
						</p>
					</div>
					<p className="protocol-note">
						{t('page.transport_label')}: {t('page.transport_value')}
					</p>
				</>
			)
		},
		{
			id: 'connect',
			title: t('page.config_label'),
			content: (
				<>
					<p>{t('page.config_body')}</p>
					<p>{t('page.compatibility_note')}</p>
					<p>
						<a
							href="https://modelcontextprotocol.io/specification/2025-11-25/basic/transports"
							target="_blank"
							rel="noopener noreferrer"
						>
							{t('page.protocol_label')}
						</a>
					</p>
				</>
			)
		},
		{ id: 'scope', title: t('page.scope_title'), content: <p>{t('page.scope_body')}</p> },
		{
			id: 'tools',
			title: t('page.tools_title'),
			content: (
				<dl className="tool-list">
					{tools.map(([name, key]) => (
						<div key={name}>
							<dt>
								<code>{name}</code>
							</dt>
							<dd>{t(`page.${key}`)}</dd>
						</div>
					))}
				</dl>
			)
		}
	];
	return <InfoPage locale={locale} page="mcp" title={t('page.title')} intro={t('page.subtitle')} sections={sections} />;
}
