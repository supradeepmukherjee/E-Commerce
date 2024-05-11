import ps from '../../images/playstore.png'
import as from '../../images/appstore.png'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="leftFooter">
        <h2>
          Download our App
        </h2>
        <img src={ps} alt="Play Store" />
        <img src={as} alt="App Store" />
      </div>
      <div className="midFooter">
        <h1>
          Ecommerce
        </h1>
        <p>
          Customer is our first priority
        </p>
        <p>
          Copyright &copy; Supradeep Mukherjee 2023
        </p>
      </div>
      <div className="rightFooter">
        <h4>
          Follow Us
        </h4>
        <a href="https://github.com/supradeepmukherjee" target={'_'}>
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/supradeep-mukherjee" target={'_'}>
          LinkedIn
        </a>
      </div>
    </footer>
  )
}

export default Footer