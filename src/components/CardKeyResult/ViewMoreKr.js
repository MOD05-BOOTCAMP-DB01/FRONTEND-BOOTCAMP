import React from 'react'

import './viewMoreKr.css'

export default function ViewMoreKr({kr}) {
  return (
    <div className="viewMoreKr">
      <div className="viewMoreKr-comment">
        <h3>{kr.comment}</h3>
      </div>
    </div>
  )
}
