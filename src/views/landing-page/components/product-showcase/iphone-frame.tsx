import type { PropsWithChildren } from 'react';
import { IPHONE_16_PRO_BUTTONS } from '@/content/iphone-16-pro';
import IPhoneFrameRoot from './iphone-frame.styles';

const IPhoneFrame = ({ children }: PropsWithChildren) => (
	<IPhoneFrameRoot className="iphone-frame" data-device="iphone-16-pro">
		<span className="iphone-shell iphone-hardware" aria-hidden="true" />
		{IPHONE_16_PRO_BUTTONS.map((button) => (
			<span
				key={button.name}
				className="iphone-side-button iphone-hardware"
				aria-hidden="true"
				data-side={button.side}
				style={{ top: `${button.top * 100}%`, height: `${button.height * 100}%` }}
			/>
		))}
		<div className="iphone-display">
			{children}
			<span className="iphone-island iphone-hardware" aria-hidden="true" />
		</div>
	</IPhoneFrameRoot>
);
export default IPhoneFrame;
