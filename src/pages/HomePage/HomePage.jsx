import css from "./HomePage.module.css"
import car from "../../image/bmw-reviews-and-rating-motor-trend-1.png"

const HomePage = () => { 
    return (
        <main className={css.container}>
            <h1>Easy Drive</h1>
            <p className={css.description}>Welcome to our company website. We will be glad to help you to chose a car to rent according to your needs. Our company has been providing car rental services for an extended period and ensures an exceptional level of service to our customers. Drive safely with us.</p>
            <img src={car} alt="car"/>
        </main>
    )
}

export default HomePage;