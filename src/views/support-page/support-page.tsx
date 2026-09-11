'use client';

import { useTranslation } from 'react-i18next';
import InfoPage, { ContactText, type InfoSectionT } from '@/components/info-page/info-page';
import { SUPPORT_LAST_MODIFIED_AT, formatLastModified } from '@/lib/document-dates';

export default function SupportPage({ locale }: { locale: string }) {
	const { t } = useTranslation('support', { lng: locale });
	const sections: InfoSectionT[] = [
		{
			id: 'report',
			title: t('page.include_title'),
			content: (
				<>
					<p>{t('page.include_intro')}</p>
					<ul>
						{(['device', 'steps', 'screenshots', 'purchase'] as const).map((key) => (
							<li key={key}>{t(`page.include_${key}`)}</li>
						))}
					</ul>
				</>
			)
		},
		{ id: 'restore', title: t('page.restore_title'), content: <p>{t('page.restore_body')}</p> },
		{
			id: 'purchases',
			title: t('page.beta_title'),
			content: (
				<>
					<p>{t('page.beta_body')}</p>
					<p>
						<a href="https://reportaproblem.apple.com/" target="_blank" rel="noopener noreferrer">
							{t('page.refund_label')}
						</a>
					</p>
				</>
			)
		},
		...(['export', 'data', 'security'] as const).map((key) => ({
			id: key,
			title: t(`page.${key}_title`),
			content: (
				<p>
					<ContactText>{t(`page.${key}_body`)}</ContactText>
				</p>
			)
		}))
	];
	return (
		<InfoPage
			locale={locale}
			page="support"
			title={t('page.title')}
			intro={t('page.intro')}
			updated={formatLastModified(SUPPORT_LAST_MODIFIED_AT, locale)}
			sections={sections}
			action={
				<a className="info-contact" href="mailto:mail@uha.app" aria-label={`${t('page.contact_label')}: mail@uha.app`}>
					mail@uha.app <span aria-hidden="true">↗</span>
				</a>
			}
		/>
	);
}
