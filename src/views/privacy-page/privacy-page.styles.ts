import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeroSection = styled.section`
	padding: 60px 0 40px;
	text-align: center;
`;

export const Title = styled.h1`
	font-size: clamp(2rem, 4vw, 3rem);
	font-weight: 700;
	letter-spacing: -0.02em;
	margin-bottom: 12px;
`;

export const Subtitle = styled.p`
	font-size: clamp(1rem, 2vw, 1.2rem);
	color: ${({ theme }) => theme.textSecondary};
	max-width: 560px;
	margin: 0 auto;
`;

export const Content = styled(motion.div)`
	max-width: 720px;
	margin: 0 auto;
	padding-bottom: 100px;
`;

export const Section = styled(motion.section)`
	margin-bottom: 40px;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const SectionTitle = styled.h2`
	font-size: 1.5rem;
	font-weight: 700;
	letter-spacing: -0.01em;
	margin-bottom: 12px;
`;

export const Paragraph = styled.p`
	font-size: 0.9375rem;
	line-height: 1.7;
	color: ${({ theme }) => theme.textSecondary};
	margin-bottom: 12px;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const BulletList = styled.ul`
	padding-left: 20px;
	margin-bottom: 12px;

	li {
		font-size: 0.9375rem;
		line-height: 1.7;
		color: ${({ theme }) => theme.textSecondary};
		margin-bottom: 6px;
		padding-left: 4px;
	}
`;

export default styled.div`
	padding-top: 80px;
	min-height: 100vh;
`;
