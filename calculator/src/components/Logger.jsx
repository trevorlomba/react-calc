import React from 'react'
import './Logger.css'

export const Logger = props => <div className="logger"><div class = "label">parenths:</div><div>{props.openParenths}  </div> <div class = "label">\\previousValType:</div><div>{props.previousValType}  </div><div class = "label">\\operand:</div><div>{props.operand}  </div></div>
