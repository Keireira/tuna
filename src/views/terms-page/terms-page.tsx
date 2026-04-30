'use client';

import { useEffect } from 'react';
import { useScrollAnimation } from '@hooks';
import { useTranslation } from 'react-i18next';

import { Container } from '@layout';
import { fadeInUp, staggerContainer } from '@styles/animations';
import { TERMS_LAST_MODIFIED_AT, formatLastModified } from '@/lib/document-dates';
import Root, { HeroSection, Title, Subtitle, Content, Section, SectionTitle, Paragraph } from './terms-page.styles';

type TProps = {
	locale?: string;
};

const TermsPage = ({ locale }: TProps) => {
	const { t, i18n } = useTranslation('landing');
	const { ref, isInView } = useScrollAnimation();
	const dateLocale = locale ?? i18n.language;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Root>
			<Container>
				<HeroSection>
					<Title>{t('terms.title')}</Title>
					<Subtitle>{formatLastModified(TERMS_LAST_MODIFIED_AT, dateLocale)}</Subtitle>
				</HeroSection>

				<Content ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
					<Section variants={fadeInUp}>
						<Paragraph>{t('terms.intro')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('terms.use_title')}</SectionTitle>
						<Paragraph>{t('terms.use_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('terms.subscriptions_title')}</SectionTitle>
						<Paragraph>{t('terms.subscriptions_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('terms.content_title')}</SectionTitle>
						<Paragraph>{t('terms.content_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('terms.icloud_title')}</SectionTitle>
						<Paragraph>{t('terms.icloud_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('terms.third_party_title')}</SectionTitle>
						<Paragraph>{t('terms.third_party_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('terms.termination_title')}</SectionTitle>
						<Paragraph>{t('terms.termination_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('terms.disclaimer_title')}</SectionTitle>
						<Paragraph>{t('terms.disclaimer_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('terms.changes_title')}</SectionTitle>
						<Paragraph>{t('terms.changes_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('terms.contact_title')}</SectionTitle>
						<Paragraph>{t('terms.contact_body')}</Paragraph>
					</Section>
				</Content>
			</Container>
		</Root>
	);
};

export default TermsPage;
