import css from '../Header/Header.module.css';
import Navigation from "../Navigation/Navigation";

const Header = () => {
    return (
        <header className={css.container}>
            <Navigation/>
        </header>
    
    )
}

export default Header;
