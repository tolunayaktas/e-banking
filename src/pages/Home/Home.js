import React from 'react'
import "./Home.scss";
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.png";
import { Navbar } from '../../components/navbar/navbar';
import Circle from '../../assets/icons/Circle';
export const Home = () => {
  return (
    <div className="container">
      <div className="container__inner">
      <Navbar/>
      <main className="home">
        <section className="home__content">
          <Circle className="home__icon home__icon--left"/>
          <p className="home__title">
          Güvenli Para Transferi İçin  <br/> En Kolay Yol
          </p>
          <p className="home__text">İlham verici bir mobil bankacılık deneyimi. <br/>Para transferiniz artık çok daha güvenli ve kolay.</p>
          <Circle className="home__icon home__icon--right"/>
        </section>
        <section className="home__images">
          <img src={card1}/>
          <img className="home__images--left"  src={card2}/>
        </section>
      </main>
      </div>
    </div>
  )
}
