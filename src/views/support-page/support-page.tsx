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
	BulletList,
	TextLink
} from './support-page.styles';
import { Container } from '@layout';
import { fadeInUp, staggerContainer } from '@styles/animations';
import { SUPPORT_LAST_MODIFIED_AT, formatLastModified } from '@/lib/document-dates';

type TProps = {
	locale?: string;
};

const SupportPage = ({ locale }: TProps) => {
	const { t, i18n } = useTranslation('support');
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
					<Subtitle>{formatLastModified(SUPPORT_LAST_MODIFIED_AT, dateLocale)}</Subtitle>
				</HeroSection>

				<Content ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
					<Section variants={fadeInUp}>
						<Paragraph>{t('page.intro')}</Paragraph>
						<Paragraph>
							<TextLink href="mailto:mail@uha.app">mail@uha.app</TextLink>
						</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('page.include_title')}</SectionTitle>
						<Paragraph>{t('page.include_intro')}</Paragraph>
						<BulletList>
							<li>{t('page.include_device')}</li>
							<li>{t('page.include_steps')}</li>
							<li>{t('page.include_screenshots')}</li>
							<li>{t('page.include_purchase')}</li>
						</BulletList>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('page.beta_title')}</SectionTitle>
						<Paragraph>{t('page.beta_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('page.data_title')}</SectionTitle>
						<Paragraph>{t('page.data_body')}</Paragraph>
					</Section>

					<Section variants={fadeInUp}>
						<SectionTitle>{t('page.security_title')}</SectionTitle>
						<Paragraph>{t('page.security_body')}</Paragraph>
					</Section>
				</Content>
			</Container>
		</Root>
	);
};

export default SupportPage;
