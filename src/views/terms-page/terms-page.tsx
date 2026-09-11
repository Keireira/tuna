'use client';

import { useTranslation } from 'react-i18next';
import InfoPage, { ContactText } from '@/components/info-page/info-page';
import { TERMS_LAST_MODIFIED_AT, formatLastModified } from '@/lib/document-dates';

export default function TermsPage({ locale }: { locale: string }) {
	const { t } = useTranslation('landing', { lng: locale });
	const sections = (
		[
			'use',
			'subscriptions',
			'content',
			'icloud',
			'third_party',
			'termination',
			'disclaimer',
			'changes',
			'contact'
		] as const
	).map((key) => ({
		id: key,
		title: t(`terms.${key}_title`),
		content: (
			<p>
				<ContactText>{t(`terms.${key}_body`)}</ContactText>
			</p>
		)
	}));
	return (
		<InfoPage
			locale={locale}
			page="terms"
			title={t('terms.title')}
			intro={t('terms.intro')}
			updated={formatLastModified(TERMS_LAST_MODIFIED_AT, locale)}
			sections={sections}
		/>
	);
}
