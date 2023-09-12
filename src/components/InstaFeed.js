import React from 'react'
import Feed from "@hamaad/react-instagram-feed";


const InstaFeed = () => {
    return (

        <Feed
            userName=""
            limit={8}
            clientAccessToken="123|456"
            maxWidth={320}
            maxContainerHeight={510}
            hideCaption={false}
            protocol=""
            injectScript={true}
        />
    )
}

export default InstaFeed