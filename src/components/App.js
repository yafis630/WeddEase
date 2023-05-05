// import 'bulma/css/bulma.css';
//import Home from './Home';

function App() {
  return (
    <>
      <div>
        <nav className="navbar is-fixed-top is-primary">
          <div className="navbar-brand">
            <a className="navbar-item" href="#">WeddEase</a>
            <button className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarMenu">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" href="#">Home</a>
              <a className="navbar-item" href="#">About</a>
              <a className="navbar-item" href="#">Contact</a>
            </div>
          </div>
        </nav>

      </div>
      <div>
        <Home />
      </div>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            Developed by Yafis, Moumina and Jasia &copy; 2023
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
