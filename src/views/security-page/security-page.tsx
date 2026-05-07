'use client';

import { useEffect } from 'react';
import { useScrollAnimation } from '@hooks';
import { useTranslation } from 'react-i18next';

import { Container } from '@layout';
import { fadeInUp, staggerContainer } from '@styles/animations';
import { SECURITY_LAST_MODIFIED_AT, formatLastModified } from '@/lib/document-dates';
import Root, { HeroSection, Title, Subtitle, Content, Section, SectionTitle, Paragraph } from './security-page.styles';

type TProps = {
	locale?: string;
};

const SecurityPage = ({ locale }: TProps) => {
	const { t, i18n } = useTranslation('security');
	const { ref, isInView } = useScrollAnimation();
	const dateLocale = locale ?? i18n.language;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Root>
			<Container>
				<HeroSection>
					<Title>{t('page.title')}</Title>
					<Subtitle>{formatLastModified(SECURITY_LAST_MODIFIED_AT, dateLocale)}</Subtitle>
				</HeroSection>

				<Content ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
					<Section variants={fadeInUp}>
						<SectionTitle>{t('page.reporting_title')}</SectionTitle>
						<Paragraph>{t('page.reporting_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('page.scope_title')}</SectionTitle>
						<Paragraph>{t('page.scope_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('page.policy_title')}</SectionTitle>
						<Paragraph>{t('page.policy_body')}</Paragraph>
					</Section>
				</Content>
			</Container>
		</Root>
	);
};

export default SecurityPage;
