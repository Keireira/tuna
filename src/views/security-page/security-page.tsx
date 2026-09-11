'use client';

import { useTranslation } from 'react-i18next';
import InfoPage, { ContactText } from '@/components/info-page/info-page';
import { SECURITY_LAST_MODIFIED_AT, formatLastModified } from '@/lib/document-dates';

export default function SecurityPage({ locale }: { locale: string }) {
	const { t } = useTranslation('security', { lng: locale });
	const sections = (['reporting', 'scope', 'policy'] as const).map((key) => ({
		id: key,
		title: t(`page.${key}_title`),
		content: (
			<p>
				<ContactText>{t(`page.${key}_body`)}</ContactText>
			</p>
		)
	}));
	return (
		<InfoPage
			locale={locale}
			page="security"
			title={t('page.title')}
			intro={t('page.intro')}
			updated={formatLastModified(SECURITY_LAST_MODIFIED_AT, locale)}
			sections={sections}
		/>
	);
}
