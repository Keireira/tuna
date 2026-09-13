const STAMP_SOURCES = {
	swim: '/assets/illustrations/fish-stamp.svg',
	urchin: '/assets/illustrations/sea-urchin-stamp.svg',
	seahorse: '/assets/illustrations/seahorse-stamp.svg'
};

type PropsT = { variant: keyof typeof STAMP_SOURCES };

const FishStamp = ({ variant }: PropsT) => (
	<img
		className="fish-stamp"
		src={STAMP_SOURCES[variant]}
		alt=""
		aria-hidden="true"
		width={120}
		height={100}
		decoding="async"
	/>
);

export default FishStamp;
