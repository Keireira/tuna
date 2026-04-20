import { PrivacyPage } from '@views';
import { getTranslation } from '@lib/i18n/server';
import { buildAlternates, isValidLocale } from '@lib/i18n';

import type { Metadata } from 'next';

type TProps = {
	params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
	const { locale } = await params;
	if (!isValidLocale(locale)) return {};

	const { t } = await getTranslation(locale, 'privacy');

	return {
		title: t('meta.title'),
		description: t('meta.description'),
		alternates: buildAlternates(locale, '/privacy')
	};
};

export default PrivacyPage;
