import styles from "../styles/Layout.module.css"
import { AiOutlineArrowRight } from "react-icons/ai"
import { FaGear } from "react-icons/fa6"
import { BsTicketPerforated } from "react-icons/bs"
import { HiOutlineQuestionMarkCircle } from "react-icons/hi"
import { FiUsers } from "react-icons/fi"
import { SiHomeassistantcommunitystore } from "react-icons/si"
import { GiMedicalPack } from "react-icons/gi"
import { TbReportAnalytics } from "react-icons/tb"
import { IoMdNotificationsOutline } from "react-icons/io"
import { NavLink } from 'react-router-dom';
import { ReactNode, useState } from "react"

interface Props {
  children: ReactNode;
}

function Layout({children}: Props) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const imgLink = "https://media.licdn.com/dms/image/D4D35AQE2BLyvEefE0Q/profile-framedphoto-shrink_200_200/0/1681487428836?e=1691402400&v=beta&t=s2ftmNfb8F8tXifnwuJYrHmLxE6xMM9-6US3sKzBxLA"
	const imgLogoLink = "https://www.cannabis360.us/wp-content/uploads/2022/09/Cannabis360_White_Logo_Tagline-1200x576.png"

    return (
      <>
				<header className={`${styles.header} ${isMenuOpen ? styles.open : ''}`}>
					<span className={styles.logoContainer}>
					<img src={imgLogoLink} className={`${styles.imgLogo} ${isMenuOpen ? styles.open : ''}`} alt="" />
					<label htmlFor="check" style={{width: "20px", fontSize: "2rem"}}>
							<AiOutlineArrowRight className={`${styles.arrow} ${isMenuOpen ? styles.open : ''}`} />
							<input style={{display: "none"}} type="checkbox" id="check" onChange={() => setIsMenuOpen(!isMenuOpen)}/>
					</label>
					</span>
					<div className={styles.linkContainer} >
						<NavLink to="/" className={styles.link}>
							<BsTicketPerforated className={`${styles.icon} ${isMenuOpen ? styles.open : ''}`}/>
							<p className={`${styles.text} ${isMenuOpen ? styles.open : ''}`}>Pedidos</p>
						</NavLink>
						<NavLink to="/" className={styles.link}>
							<FiUsers className={`${styles.icon} ${isMenuOpen ? styles.open : ''}`}/>
							<p className={`${styles.text} ${isMenuOpen ? styles.open : ''}`}>Pacientes</p>
						</NavLink>
						<NavLink to="/" className={styles.link}>
							<SiHomeassistantcommunitystore className={`${styles.icon} ${isMenuOpen ? styles.open : ''}`}/>
							<p className={`${styles.text} ${isMenuOpen ? styles.open : ''}`}>Produtos</p>
						</NavLink>
						<NavLink to="/" className={styles.link}>
							<GiMedicalPack className={`${styles.icon} ${isMenuOpen ? styles.open : ''}`}/>
							<p className={`${styles.text} ${isMenuOpen ? styles.open : ''}`}>Médicos</p>
						</NavLink>
						<NavLink to="/" className={styles.link}>
							<TbReportAnalytics className={`${styles.icon} ${isMenuOpen ? styles.open : ''}`}/>
							<p className={`${styles.text} ${isMenuOpen ? styles.open : ''}`}>Relatórios</p>
						</NavLink>
					</div>
					<div className={styles.infos}>
						<NavLink to="/">
							<IoMdNotificationsOutline className={`${styles.icon} ${isMenuOpen ? styles.open : ''}`}/>
						</NavLink>
						<NavLink to="/">
							<HiOutlineQuestionMarkCircle className={`${styles.icon} ${isMenuOpen ? styles.open : ''}`}/>
						</NavLink>
						<NavLink to="/">
							<FaGear className={`${styles.icon} ${isMenuOpen ? styles.open : ''}`}/>
						</NavLink>
					</div>
					<span className={styles.userInfos}>
						<img src={imgLink} alt="imagem" />
						<p>Gabriel Matos Boubee</p>
					</span>
				</header>
				<main className={`${styles.children} ${isMenuOpen ? styles.open : ''}`}>
					{children}
				</main>
      </>
    );
}

export default Layout;