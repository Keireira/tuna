import Link from 'next/link';

const NotFound = () => {
	return (
		<html lang="en">
			<body
				style={{
					margin: 0,
					fontFamily: 'system-ui, sans-serif',
					background: '#EDE8E1',
					color: '#1A1612',
					minHeight: '100vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					textAlign: 'center',
					padding: '24px'
				}}
			>
				<h1 style={{ fontSize: '4rem', margin: 0 }}>404</h1>
				<p style={{ fontSize: '1.125rem', margin: '16px 0 24px' }}>This page slipped away.</p>
				<Link
					href="/en"
					style={{
						padding: '10px 20px',
						borderRadius: '10px',
						background: '#6033C0',
						color: '#fff',
						textDecoration: 'none',
						fontWeight: 600
					}}
				>
					Back to Root
				</Link>
			</body>
		</html>
	);
};

export default NotFound;
