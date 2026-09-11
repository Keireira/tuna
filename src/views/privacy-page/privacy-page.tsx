'use client';

import { useTranslation } from 'react-i18next';
import InfoPage, { ContactText, type InfoSectionT } from '@/components/info-page/info-page';
import { PRIVACY_LAST_MODIFIED_AT, formatLastModified } from '@/lib/document-dates';

export default function PrivacyPage({ locale }: { locale: string }) {
	const { t } = useTranslation('landing', { lng: locale });
	const sections: InfoSectionT[] = (
		['collect', 'local', 'third_party', 'icloud', 'analytics', 'children', 'changes', 'contact'] as const
	).map((key) => ({
		id: key,
		title: t(`privacy_policy.${key}_title`),
		content:
			key === 'third_party' ? (
				<>
					<p>{t('privacy_policy.third_party_intro')}</p>
					<ul>
						<li>
							<strong>
								<a href="https://www.revenuecat.com/privacy/" target="_blank" rel="noopener noreferrer">
									RevenueCat
								</a>
							</strong>{' '}
							— {t('privacy_policy.third_party_revenuecat')}
						</li>
						<li>
							<strong>{t('privacy_policy.third_party_service_catalog_label')}</strong> —{' '}
							{t('privacy_policy.third_party_logodev')}
						</li>
						<li>
							<strong>
								<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">
									Cloudflare
								</a>
							</strong>{' '}
							— {t('privacy_policy.third_party_cloudflare')}
						</li>
					</ul>
					<p>{t('privacy_policy.third_party_outro')}</p>
				</>
			) : (
				<p>
					<ContactText>{t(`privacy_policy.${key}_body`)}</ContactText>
				</p>
			)
	}));
	return (
		<InfoPage
			locale={locale}
			page="privacy"
			title={t('privacy_policy.title')}
			intro={t('privacy_policy.intro')}
			updated={formatLastModified(PRIVACY_LAST_MODIFIED_AT, locale)}
			sections={sections}
		/>
	);
}
