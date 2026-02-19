import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navItems = [
	{ to: '/', label: 'Home' },
	{ to: '/about', label: 'Tentang Kami' },
	{ to: '/programs', label: 'Program' },
	{ to: '/news', label: 'Berita' },
	{ to: '/store', label: 'Store' },
	{ to: '/reports', label: 'Laporan Tahunan' },
	{ to: '/testimonials', label: 'Testimoni' },
];

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768) {
				setIsOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<nav className="navbar">
			<div className="navbar-container">
				<Link to="/" className="logo" style={{ textDecoration: 'none' }}>
					<span>SANKARA</span>
				</Link>

				<ul className="nav-menu">
					{navItems.map((item) => (
						<li key={item.to}>
							<NavLink to={item.to} className="nav-link">
								{item.label}
							</NavLink>
						</li>
					))}
				</ul>

				<div className="nav-buttons">
					<Link to="/login" className="btn btn-outline-white" style={{ padding: '8px 24px' }}>
						Masuk
					</Link>
					<Link to="/register" className="btn btn-primary" style={{ padding: '8px 24px' }}>
						Daftar
					</Link>
				</div>

				<button
					type="button"
					aria-label="Toggle mobile navigation"
					className={`hamburger ${isOpen ? 'active' : ''}`}
					onClick={() => setIsOpen((prev) => !prev)}
				>
					<span className="bar"></span>
					<span className="bar"></span>
					<span className="bar"></span>
				</button>

				<div className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`}>
					{navItems.map((item) => (
						<NavLink
							key={`mobile-${item.to}`}
							to={item.to}
							className="nav-link"
							style={{ fontSize: '1.2rem' }}
							onClick={() => setIsOpen(false)}
						>
							{item.label}
						</NavLink>
					))}
					<div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '80%', marginTop: '20px' }}>
						<Link to="/login" className="btn btn-outline-white btn-full" onClick={() => setIsOpen(false)}>
							Masuk
						</Link>
						<Link to="/register" className="btn btn-primary btn-full" onClick={() => setIsOpen(false)}>
							Daftar
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;