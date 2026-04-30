import styled from 'styled-components';
import Root, {
	HeroSection,
	Title,
	Subtitle,
	Content,
	Section,
	SectionTitle,
	Paragraph
} from '../privacy-page/privacy-page.styles';

export { HeroSection, Title, Subtitle, Content, Section, SectionTitle, Paragraph };

export const CodeBlock = styled.pre`
	overflow-x: auto;
	border-radius: 8px;
	border: 1px solid ${({ theme }) => theme.cardBorder};
	background: ${({ theme }) => theme.card};
	color: ${({ theme }) => theme.text};
	padding: 16px;
	font-size: 0.875rem;
	line-height: 1.6;
`;

export default Root;
