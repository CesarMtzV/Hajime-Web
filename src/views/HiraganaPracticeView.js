const HiraganaPracticeView = () => {
    //const hiragana = ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'さ', 'し', 'す', 'せ', 'そ', 'た', 'ち', 'つ', 'て', 'と', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を']
    //const hiraganaSound = ['A', 'I', 'U', 'E', 'O', 'Ka', 'Ki', 'Ku', 'Ke', 'Ko', 'Sa', 'Shi', 'Su', 'Se', 'So', 'Ta', 'Chi', 'Tsu', 'Te', 'To', 'Na', 'Ni', 'Nu', 'Ne', 'No', 'Ha', 'Hi', 'Fu', 'He', 'Ho', 'Ma', 'Mi', 'Mu', 'Me', 'Mo', 'Ya', 'Yu', 'Yo', 'Ra', 'Ri', 'Ru', 'Re', 'Ro', 'Wa', 'Wo']
    const hira  = { 
        'あ' : 'A',
        'い' : 'I',
        'う' : 'U',
        'え' : 'E',
        'お' : 'O',
        'か' : 'Ka',
        'き' : 'Ki',
        'く' : 'Ku',
        'け' : 'Ke',
        'こ' : 'Ko'
    }

    

    return (
        <>
            <div className="main-content">
                <div className="container-fluid px-0 px-sm-3">
                    <div className="row">
                        <div className="col-md-7 ps-5 h-100">
                            <div className="card align-items-center mt-3 pb-3 text-white h-100" style={{backgroundColor: "#B98CB3" }}>
                                <div className="d-flex align-items-center w-100 pt-2">
                                    <h2 className="card-title px-4">Practice Mode</h2>
                                    <h4 className="card-subtitle ms-auto px-4 fw-light">Score: 6</h4>
                                </div>
                                <div className="d-flex align-items-center justify-content-center h-100 w-100">
                                    <div className="cardHiragana" style={{ backgroundColor: "#D7BED4"}}>
                                        <h1 style={{fontSize: "7rem"}}>り</h1>
                                    </div>
                                    <div className="d-flex flex-column justify-content-between ms-5 hiraganaPractice h-100">
                                        <button className="btnHiraganaPractice mb-3" href="#">
                                            <span>ri</span>
                                        </button>
                                        <button className="btnHiraganaPractice mb-3" href="#">
                                            <span>ta</span>
                                        </button>
                                        <button className="btnHiraganaPractice mb-3" href="#">
                                            <span>he</span>
                                        </button>
                                        <button className="btnHiraganaPractice mb-3" href="#">
                                            <span>te</span>
                                        </button>
                                    </div>
                                </div>
                                <button type="btn" className="btn ms-auto me-3" style={{width: "100px", backgroundColor: "#a871a0"}}>More</button>
                            </div>
                        </div>
                        <div className="col-md-5 h-100">
                            <div className="hiraganaContainer mt-3 me-5 scroll border rounded">
                                {Object.keys(hira).map((key, index) => {
                                    return (
                                        <div className="hiraganaCard" key={key}>
                                            <p className="mainCharacter">{key}</p>
                                            <p style={{fontSize: "25px"}}>{hira[key]}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HiraganaPracticeView