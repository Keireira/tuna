'use client';

import { useEffect } from 'react';
import { useScrollAnimation } from '@hooks';
import { useTranslation } from 'react-i18next';

import Root, {
	HeroSection,
	Title,
	Subtitle,
	Content,
	Section,
	SectionTitle,
	Paragraph,
	BulletList
} from './privacy-page.styles';
import { Container } from '@layout';
import { fadeInUp, staggerContainer } from '@styles/animations';
import { PRIVACY_LAST_MODIFIED_AT, formatLastModified } from '@/lib/document-dates';

type TProps = {
	locale?: string;
};

const PrivacyPage = ({ locale }: TProps) => {
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
					<Title>{t('privacy_policy.title')}</Title>
					<Subtitle>{formatLastModified(PRIVACY_LAST_MODIFIED_AT, dateLocale)}</Subtitle>
				</HeroSection>

				<Content ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
					<Section variants={fadeInUp}>
						<Paragraph>{t('privacy_policy.intro')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('privacy_policy.collect_title')}</SectionTitle>
						<Paragraph>{t('privacy_policy.collect_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('privacy_policy.local_title')}</SectionTitle>
						<Paragraph>{t('privacy_policy.local_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('privacy_policy.third_party_title')}</SectionTitle>
						<Paragraph>{t('privacy_policy.third_party_intro')}</Paragraph>
						<BulletList>
							<li>
								<strong>RevenueCat</strong> — {t('privacy_policy.third_party_revenuecat')}
							</li>
							<li>
								<strong>{t('privacy_policy.third_party_service_catalog_label')}</strong> —{' '}
								{t('privacy_policy.third_party_logodev')}
							</li>
							<li>
								<strong>Cloudflare</strong> — {t('privacy_policy.third_party_cloudflare')}
							</li>
						</BulletList>
						<Paragraph>{t('privacy_policy.third_party_outro')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('privacy_policy.icloud_title')}</SectionTitle>
						<Paragraph>{t('privacy_policy.icloud_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('privacy_policy.analytics_title')}</SectionTitle>
						<Paragraph>{t('privacy_policy.analytics_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('privacy_policy.children_title')}</SectionTitle>
						<Paragraph>{t('privacy_policy.children_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('privacy_policy.changes_title')}</SectionTitle>
						<Paragraph>{t('privacy_policy.changes_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('privacy_policy.contact_title')}</SectionTitle>
						<Paragraph>{t('privacy_policy.contact_body')}</Paragraph>
					</Section>
				</Content>
			</Container>
		</Root>
	);
};

export default PrivacyPage;
