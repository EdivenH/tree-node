import React, { Component } from 'react';

const  LoadingContainer = (props) => {
    let count = props.itemCount
    let items = new Array()
    const ele = 
        <div className="timeline-item-container">
            <div className="background-masker animated-body-line"></div>
            <div className="background-masker animated-body-text"></div>
            <div className="background-masker animated-body-line"></div>
            <div className="background-masker animated-body-cycle"></div>
        </div>
    while (count) {
        items = [...items, ele]
        count--
    }
    return (
        <div className="timeline-item">
            {items}
                    {/* <div>
                    <div className="background-masker animated-body-line"></div>
                    <div className="background-masker animated-body-text"></div>
                    <div className="background-masker animated-body-line"></div>
                    <div className="background-masker animated-body-cycle"></div>
                    </div> */}
            <style jsx='true'>
                {`
                    .timeline-item {
                        background: #fff;
                        width: 100%;
                        min-height: 200px;
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
                        animation-duration: 1s;
                        animation-fill-mode: forwards;
                        animation-iteration-count: infinite;
                        animation-name: placeHolderShimmer;
                        animation-timing-function: linear;
                        background: #f6f7f8;
                        background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
                        background-size: 800px 104px;
                        position: relative;
                        float: left;
                    }
                    .timeline-item-container{
                        width: 100%;
                        height: 42px;
                    }
                    .animated-body-line{
                        width: 32px;
                        height: 2px;
                        margin-top: 16px;
                    }
                    .animated-body-text{
                        width: 180px;
                        height: 32px;
                    }
                    .animated-body-cycle{
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        margin-top: 8px;
                    }
                `}
            </style>
        </div>
    )
}

export default LoadingContainer