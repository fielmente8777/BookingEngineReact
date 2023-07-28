import React from 'react'

import { ThreeCircles } from  'react-loader-spinner'
function Spinner(props) {
  return (
    <>
        <div className={props.display} style={{marginLeft:"35%",marginTop:"20%"}} >
            <ThreeCircles
                height="300"
                width="300"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
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