import React from 'react'
import {BiCommentDots} from 'react-icons/bi'
import {MdOutlineLibraryAdd} from 'react-icons/md'
//CSS
import './cardObjective.css'

export default function CardObjective() {
  return (
    <div className="cardObjective">
      <div className="area-objective">
        <div className="objective">
          <h3></h3>
          <h3>Objetivo 1</h3>
          <h3>Responsavel</h3>
        </div>

      </div>
      <div className="area-kr">
        <div className="kr-title">
          <div className="kr-title-header">
            <h3></h3>
            <h3>Titulo KR</h3>
            <MdOutlineLibraryAdd/>
          </div>
          <div className="kr-title-items">
            <h3>Titulo KR</h3>
          </div>
        </div>
        <div className="kr-dono">
          <h3>Dono KR</h3>
          <h3>Dono KR</h3>
        </div>
        <div className="kr-comment">
          <h3>Comentário</h3>
          <div className="kr-comment-items">
            {/* <h3>Comentário da shdklhalk
              shfkhakshfkhaskhfkha
            </h3> */}
            <BiCommentDots className="icon-comment"/>
          </div>
        </div>
      </div>
      <div className="area-checkins">
        <h3>CK1</h3>

      </div>
    </div>
  )
}
