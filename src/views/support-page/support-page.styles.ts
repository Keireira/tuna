import styled from 'styled-components';
import Root, {
	HeroSection,
	Title,
	Subtitle,
	Content,
	Section,
	SectionTitle,
	Paragraph,
	BulletList
} from '../privacy-page/privacy-page.styles';

export { HeroSection, Title, Subtitle, Content, Section, SectionTitle, Paragraph, BulletList };

export const TextLink = styled.a`
	color: ${({ theme }) => theme.accent};
	font-weight: 600;
	text-decoration: none;

	&:hover {
		color: ${({ theme }) => theme.accentHover};
	}
`;

export default Root;
