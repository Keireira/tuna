import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeroContent = styled(motion.div)`
	text-align: center;
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 24px;
`;

export const AppIcon = styled(motion.img)`
	width: 120px;
	height: 120px;
	clip-path: url(#squircle);
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

	@media (max-width: 768px) {
		width: 96px;
		height: 96px;
	}
`;

export const Headline = styled(motion.h1)`
	font-size: clamp(2.5rem, 6vw, 4.2rem);
	font-weight: 800;
	line-height: 1.1;
	letter-spacing: -0.03em;
	white-space: pre-line;
	max-width: 700px;
`;

export const Subtitle = styled(motion.p)`
	font-size: clamp(1rem, 2.5vw, 1.25rem);
	color: ${({ theme }) => theme.textSecondary};
	max-width: 520px;
	line-height: 1.6;
`;

export const ButtonGroup = styled(motion.div)`
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	justify-content: center;
`;

export default styled.section`
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
	background: ${({ theme }) => theme.heroBg};
	padding-top: 80px;
`;
