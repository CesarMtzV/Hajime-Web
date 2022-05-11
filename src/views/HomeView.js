

const HomeView = () => {
  return (
    <div className='main-content'>
      <div className='row'>
        <div className="container px-5" style={{backgroundColor: "#b98cb3"}}>
          <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-decoration-none">
              <h1 className='text-white fs-1'>Hajime</h1>
            </a>
            
            <ul className="nav nav-pills col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <li className='nav-item'><a href="#" className="nav-link px-4 fs-5 active" style={{color: "#000"}}>Home</a></li>
              <li className='nav-item'><a href="#" className="nav-link px-4 fs-5" style={{color: "#fff"}}>Hiragana</a></li>
              <li className='nav-item'><a href="#" className="nav-link px-4 fs-5" style={{color: "#fff"}}>Katakana</a></li>
              <li className='nav-item'><a href="#" className="nav-link px-4 fs-5" style={{color: "#fff"}}>Kanji</a></li>
            </ul>
          </header>
        </div>
      </div>
      <div className='row pt-3 px-5' style={{height: "80vh"}}>
        <div className='col-md-4'>
          <div className='card d-flex flex-column align-items-center text-white h-100 p-3' style={{backgroundColor: "#b98cb3"}}>
            <h2>Kanji Generator</h2>
            <div className='kanji-info py-4'>
              <div className='row'>
                <div className='col-md-6'>
                  <h1>妙</h1>
                </div>
                <div className='col-md-6'>
                  <h4>Number of strokes:</h4>
                  <p>6</p>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <h4>Kun reading:</h4>
                  <p>な</p>
                  <p>なに</p>
                </div>
                <div className='col-md-6'>
                  <h4>On reading:</h4>
                  <p>ソナ</p>
                  <p>シフノ</p>  
                </div>
              </div>
            </div>
            <div className='meaning-div'>
              <h3>Meaning:</h3>
              <ul>
                <li>Name</li>
                <li>Noted</li>
                <li>Particular</li>
              </ul>
            </div>
            <button type="button" className="btn" style={{width: "100px", backgroundColor: "#a871a0"}}>Generate</button>
          </div>
        </div>
        <div className='col-md-8'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card text-white p-3' style={{backgroundColor: "#b98cb3"}}>
                <h2>Achievements</h2>
                <div className='row achievements-card'>
                  <div className='col-md-3 d-flex flex-column align-items-center'>
                    <div class="progress yellow"> <span class="progress-left"> <span class="progress-bar"></span> </span> <span class="progress-right"> <span class="progress-bar"></span> </span>
                      <div class="progress-value">37.5%</div>
                    </div>
                    <p>Random</p>
                  </div>
                  <div className='col-md-3  d-flex flex-column align-items-center'>
                    <div class="progress blue"> <span class="progress-left"> <span class="progress-bar"></span> </span> <span class="progress-right"> <span class="progress-bar"></span> </span>
                      <div class="progress-value">90%</div>
                    </div>
                    <p>New Record!</p>
                  </div>
                  <div className='col-md-3  d-flex flex-column align-items-center'>
                    <div class="progress green"> <span class="progress-left"> <span class="progress-bar"></span> </span> <span class="progress-right"> <span class="progress-bar"></span> </span>
                      <div class="progress-value">50%</div>
                    </div>
                    <p>Artist</p>
                  </div>
                  <div className='col-md-3  d-flex flex-column align-items-center'>
                    <div class="progress green"> <span class="progress-left"> <span class="progress-bar"></span> </span> <span class="progress-right"> <span class="progress-bar"></span> </span>
                      <div class="progress-value">50%</div>
                    </div>
                    <p>ヘルプ</p>
                  </div>
                </div>
                <button type="button" className="btn ms-auto" style={{width: "100px", backgroundColor: "#a871a0"}}>More</button>
              </div>
            </div>
          </div>
          <div className='row pt-4'>
            <div className='col-md-4'>
              <div className='card d-flex flex-column align-items-center text-white p-2' style={{backgroundColor: "#b98cb3"}}>
                <h2 style={{color: "#000", fontSize: "10rem"}}>さ</h2>
                <h2>Hiragana</h2>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card d-flex flex-column align-items-center text-white p-2' style={{backgroundColor: "#b98cb3"}}>
                <h2 style={{color: "#000", fontSize: "10rem"}}>オ</h2>
                <h2>Katakana</h2>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card d-flex flex-column align-items-center text-white p-2' style={{backgroundColor: "#b98cb3"}}>
                <h2 style={{color: "#000", fontSize: "10rem"}}>件</h2>
                <h2>Kanji</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeView;
 