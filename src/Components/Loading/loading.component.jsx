import React, {Component} from 'react';
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import ReactLoading from 'react-loading';
import 'bootstrap/dist/css/bootstrap.css';
import { Grid } from '@material-ui/core';
import * as networkAnimation from "../../Data/network-animation.json"

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: networkAnimation.default,
    rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
    }
}

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: undefined
        }
    }

    render () {
        return (
            <Grid container justify="center">
                <FadeIn>
                <div className="d-flex justify-content-center align-items-center">
                    <Lottie options={defaultOptions} height={440} width={440} />                      
                </div>
                </FadeIn>
            </Grid>
        )
    }
}