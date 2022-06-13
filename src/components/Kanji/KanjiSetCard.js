import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./kanji.css"

export const KanjiSetCard = ({title, numberOfKanji}) => {

  const navigate = useNavigate()

  return (
    <div className="col-12 col-sm-6 col-lg-3 p-2">
        <div 
            className='p-3 rounded raise'
            style={{backgroundColor: "#b98cb3", color:"white", cursor: "pointer"}}
            onClick={ () => { 
              const url_title = title.split(' ').join('_')
              navigate(`/kanji/${url_title}`) 
            }}
        >
            <h3 className='fw-bold'>{title}</h3>
            <p>{numberOfKanji} kanji</p>
        </div>
    </div>
  )
}
