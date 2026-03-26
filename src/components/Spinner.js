import React from 'react'

import { ThreeCircles } from  'react-loader-spinner'
function Spinner(props) {
  return (
    <>
        <div className={props.display} style={{marginLeft:"45%",marginTop:"20%"}} >
            <ThreeCircles
                height="125"
                width="125"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperclassName=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor="orange"
                innerCircleColor="blue"
                middleCircleColor="red"
            />
        </div>
    </>
  )
}

export default Spinner