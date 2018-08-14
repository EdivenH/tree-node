import React from 'react';

const  LoadingContainer = () => {

    return (
        <div className="timeline-item">
                    <div className="timeline-item-container">
                    <div className="background-masker animated-body-left"></div>
                    <div className="background-masker animated-body-right"></div>
                    </div>
            <style jsx='true'>
                {`
                    .timeline-item {
                        background: #fff;
                        width: 100%;
                        min-height: 510px;
                        padding: 10px;
                        
                    }
                    @keyframes placeHolderShimmer {
                        0% {
                            background-position: 0 0
                        }
                        100% {
                            background-position: 100% 0
                        }
                    }
            
                    .background-masker {
                        // animation-duration: 1s;
                        // animation-fill-mode: forwards;
                        // animation-iteration-count: infinite;
                        // animation-name: placeHolderShimmer;
                        // animation-timing-function: linear;
                        background: #f6f7f8;
                        // background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
                        background-size: 1100px 510px;
                        position: relative;
                    }
                    .timeline-item-container{
                        width: 1100px;
                        height: 510px;
                        display: flex;
                    }
                    .animated-body-left{
                        width: 260px;
                        height: 510px;
                    }
                    .animated-body-right{
                        width: 819px;
                        height: 510px;
                        margin: 0 16px
                    }
                `}
            </style>
        </div>
    )
}

export default LoadingContainer