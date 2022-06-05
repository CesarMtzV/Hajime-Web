import React from 'react'
import "../style.css"

export const KanjiSetCard = ({title, numberOfKanji}) => {
  return (
    <div className="col-12 col-sm-6 col-lg-3 p-2">
        <div 
            className='p-3 rounded raise'
            style={{backgroundColor: "#b98cb3", color:"white", cursor: "pointer"}}
            onClick={ () => {console.log("Hello there")}}
        >
            <h3 className='fw-bold'>{title}</h3>
            <p>{numberOfKanji} kanji</p>
        </div>
    </div>
  )
}
