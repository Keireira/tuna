export type ProductMediaT = {
	id: string;
	purpose: string;
	altKey: string;
	features: string[];
	kind: 'image' | 'video';
	status: 'missing' | 'reference' | 'approved';
	src: string | null;
	poster: string | null;
	width: number;
	height: number;
	priority: 'required' | 'optional';
	capture: string;
	placeholderSrc?: string;
	focalPoint?: string;
};

// Approved sources below were supplied by the user for these exact views.
// Other slots remain missing until their corresponding media is supplied.
const slot = (
	id: string,
	purpose: string,
	features: string[],
	options: Partial<ProductMediaT> = {}
): ProductMediaT => ({
	id,
	purpose,
	altKey: `showcase.media.${id}`,
	features,
	kind: 'image',
	status: 'missing',
	src: null,
	poster: null,
	width: 1177,
	height: 2560,
	priority: 'required',
	capture: `Capture ${purpose} in English with the shared demonstration data. Supply a full-resolution original.`,
	...options
});

export const productMedia = {
	'views-feed': slot('views-feed', 'Upcoming payment list', ['VIEW-01', 'VIEW-02', 'VIEW-06'], {
		status: 'approved',
		src: '/assets/showcases/list.PNG',
		width: 1206,
		height: 2622,
		capture: 'User-supplied full-resolution payment list.'
	}),
	'views-glance': slot('views-glance', 'Upcoming subscription overview', ['VIEW-03'], {
		status: 'approved',
		src: '/assets/showcases/glance.PNG',
		width: 1206,
		height: 2622,
		capture: 'User-supplied full-resolution upcoming subscription overview.'
	}),
	'views-month': slot('views-month', 'September monthly calendar', ['VIEW-04', 'VIEW-06'], {
		status: 'approved',
		src: '/assets/showcases/calendar-month.PNG',
		width: 1206,
		height: 2622,
		capture: 'User-supplied September 2026 calendar with September 9 selected.'
	}),
	'views-year': slot('views-year', '2026 yearly calendar', ['VIEW-05'], {
		status: 'approved',
		src: '/assets/showcases/calendar-year.PNG',
		width: 1206,
		height: 2622,
		capture: 'User-supplied full-resolution 2026 yearly calendar.'
	}),
	'search-results': slot('search-results', 'Service search results', ['SRC-01', 'SRC-02', 'SRC-03', 'SRC-04'], {
		status: 'approved',
		src: '/assets/showcases/search-results.PNG',
		width: 1206,
		height: 2622,
		focalPoint: 'center 8%',
		capture: 'User-supplied full-resolution Find a Service screen with Lightroom search results.'
	}),
	'search-flow': slot(
		'search-flow',
		'Search, choose a service, then edit your subscription terms',
		['SRC-04', 'SRC-07'],
		{ kind: 'video', priority: 'optional' }
	),
	'analytics-spending': slot(
		'analytics-spending',
		'2026 spending by category',
		['ANA-01', 'ANA-02', 'ANA-03', 'ANA-04'],
		{
			status: 'approved',
			src: '/assets/showcases/analytics-spending.PNG',
			width: 1206,
			height: 2622,
			focalPoint: 'center 26%',
			capture: 'User-supplied 2026 spending chart and category breakdown.'
		}
	),
	'analytics-compare': slot(
		'analytics-compare',
		'2026 versus 2025 spending comparison',
		['ANA-06', 'ANA-07', 'ANA-08'],
		{
			status: 'approved',
			src: '/assets/showcases/analytics-compare.PNG',
			width: 1206,
			height: 2622,
			focalPoint: 'center 68%',
			capture: 'User-supplied 2026 versus 2025 comparison and category contributions.'
		}
	),
	'analytics-breakdown': slot(
		'analytics-breakdown',
		'Utilities & Bills category and its subscriptions',
		['ANA-05', 'ANA-08'],
		{
			status: 'approved',
			src: '/assets/showcases/analytics-breakdown.PNG',
			width: 1206,
			height: 2622,
			focalPoint: 'center 26%',
			capture: 'User-supplied Utilities & Bills spending detail.'
		}
	),
	'filters-applied': slot('filters-applied', 'Category filters with five categories selected', ['VIEW-08', 'VIEW-09'], {
		status: 'approved',
		src: '/assets/showcases/filters-applied.PNG',
		width: 1206,
		height: 2622,
		focalPoint: 'center top',
		capture: 'User-supplied filter sheet with five selected categories, search, and clear and confirm controls.'
	}),
	'filters-flow': slot(
		'filters-flow',
		'Entertainment filter across List, Month, and Spending',
		['VIEW-08', 'VIEW-09'],
		{ kind: 'video', priority: 'optional' }
	),
	'timeline-events': slot('timeline-events', 'Subscription timeline events', ['LIFE-04', 'LIFE-06'], {
		status: 'approved',
		src: '/assets/showcases/timeline.PNG',
		width: 1206,
		height: 2622,
		focalPoint: 'center bottom',
		capture: 'User-supplied subscription timeline with the event picker open.'
	}),
	'timeline-flow': slot(
		'timeline-flow',
		'Design Desk price change and recalculated September',
		['LIFE-04', 'LIFE-06'],
		{ kind: 'video', priority: 'optional' }
	),
	'detail-year': slot('detail-year', 'Year label edge feedback', [], {
		kind: 'video',
		status: 'approved',
		src: '/assets/showcases/detail-year-web-b4ff4154d9.mp4',
		poster: '/assets/showcases/detail-year-poster-b4ff4154d9.jpg',
		width: 960,
		height: 2088,
		capture: 'H.264 web copy of user-supplied detail-year.MP4; original framing and 60 fps preserved.'
	}),
	'detail-scroll': slot('detail-scroll', 'Period selection with haptic feedback', [], {
		kind: 'video',
		status: 'approved',
		src: '/assets/showcases/detail-scroll-web-ee7f1b7fe1.mp4',
		poster: '/assets/showcases/detail-scroll-poster-ee7f1b7fe1.jpg',
		width: 960,
		height: 2088,
		capture: 'H.264 web copy of user-supplied detail-scroll.MP4; original framing and 60 fps preserved.'
	}),
	'appearance-light': slot('appearance-light', 'Appearance settings with Light selected', ['UX-01'], {
		priority: 'optional',
		status: 'approved',
		src: '/assets/showcases/appearance-light.PNG',
		width: 1206,
		height: 2622,
		capture: 'User-supplied appearance settings in Light.'
	}),
	'appearance-dark': slot('appearance-dark', 'Appearance settings with Dark selected', ['UX-01'], {
		priority: 'optional',
		status: 'approved',
		src: '/assets/showcases/appearance-dark.PNG',
		width: 1206,
		height: 2622,
		capture: 'User-supplied appearance settings in Dark.'
	}),
	'appearance-deep': slot('appearance-deep', 'Appearance settings with OLED selected', ['UX-01'], {
		priority: 'optional',
		status: 'approved',
		src: '/assets/showcases/appearance-deep.PNG',
		width: 1206,
		height: 2622,
		capture: 'User-supplied appearance settings in OLED.'
	})
} satisfies Record<string, ProductMediaT>;

export type ProductMediaIdT = keyof typeof productMedia;
export const resolveMediaSource = (media: ProductMediaT, allowPlaceholders: boolean): string | null => {
	if (media.status === 'approved') return media.src;
	if (allowPlaceholders && media.status === 'missing') return media.placeholderSrc ?? null;
	return null;
};
