import React from 'react'
import './Logger.css'

export const Logger = props => <div className="logger"><div>COLength:{props.COLength}\\  </div><div>answer:{props.onAnswer}\\  </div><div>parenths:{props.openParenths}\\  </div> <div>inputType:{props.inputType}\\  </div></div>
