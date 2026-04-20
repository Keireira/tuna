import { LandingPage } from '@views';
import { buildAlternates, isValidLocale } from '@lib/i18n';
import type { Metadata } from 'next';

type TProps = {
	params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: TProps): Promise<Metadata> => {
	const { locale } = await params;
	if (!isValidLocale(locale)) return {};

	return {
		alternates: buildAlternates(locale)
	};
};

export default LandingPage;
