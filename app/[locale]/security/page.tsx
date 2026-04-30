import { SecurityPage } from '@views';
import { getTranslation } from '@lib/i18n/server';
import { buildAlternates, isValidLocale } from '@lib/i18n';

import type { Metadata } from 'next';

type TProps = {
	params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
	const { locale } = await params;
	if (!isValidLocale(locale)) return {};

	const { t } = await getTranslation(locale, 'security');

	return {
		title: t('meta.title'),
		description: t('meta.description'),
		alternates: buildAlternates(locale, '/security')
	};
};

const Page = async ({ params }: TProps) => {
	const { locale } = await params;
	return <SecurityPage locale={locale} />;
};

export default Page;
