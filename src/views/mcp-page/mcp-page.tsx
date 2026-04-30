'use client';

import { useEffect } from 'react';
import { useScrollAnimation } from '@hooks';
import { useTranslation } from 'react-i18next';

import { Container } from '@layout';
import { fadeInUp, staggerContainer } from '@styles/animations';
import Root, {
	HeroSection,
	Title,
	Subtitle,
	Content,
	Section,
	SectionTitle,
	Paragraph,
	CodeBlock
} from './mcp-page.styles';

const MCP_ENDPOINT = 'https://uha.app/api/mcp';
const EXAMPLE_CONFIG = JSON.stringify(
	{
		mcpServers: {
			uha: {
				url: MCP_ENDPOINT,
				transport: 'streamable-http'
			}
		}
	},
	null,
	2
);

const McpPage = () => {
	const { t } = useTranslation('mcp');
	const { ref, isInView } = useScrollAnimation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Root>
			<Container>
				<HeroSection>
					<Title>{t('page.title')}</Title>
					<Subtitle>{t('page.subtitle')}</Subtitle>
				</HeroSection>

				<Content ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
					<Section variants={fadeInUp}>
						<SectionTitle>{t('page.endpoint_label')}</SectionTitle>
						<Paragraph>{MCP_ENDPOINT}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('page.transport_label')}</SectionTitle>
						<Paragraph>{t('page.transport_value')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('page.config_label')}</SectionTitle>
						<CodeBlock>{EXAMPLE_CONFIG}</CodeBlock>
					</Section>
				</Content>
			</Container>
		</Root>
	);
};

export default McpPage;
