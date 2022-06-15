import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./kanji.css"

export const KanjiSetCard = ({title, numberOfKanji}) => {

  const navigate = useNavigate()

  return (
    <div className="col-12 col-sm-6 col-lg-3 p-2 kanjiSetContainer">
        <div 
          class="card w-100"
          onClick={ () => { 
            const url_title = title.split(' ').join('_')
            navigate(`/kanji/${url_title}`) 
          }}
        >
          <div class="content">
            <div class="contentBx">
              <h3>{title}<br/><span>{numberOfKanji} kanji</span></h3>
            </div>
          </div>
			</div>
    </div>
  )
}
