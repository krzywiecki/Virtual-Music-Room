import React from 'react';
import Draggable from 'react-draggable'
import AudioSpectrum from 'react-audio-spectrum'
// import Piano from '../assets/piano quartet principal clip 07 03 2012.wav'
import violin from '../assets/Violin-pizzicatto.wav'
import longDrum from '../assets/LongDrum.wav'
import bass from '../assets/pick-bass.wav'
import piano from '../assets/piano-quartet.wav'


class AudioRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            drag: false,
            isPlaying: false,
        };

        this.a1 = React.createRef();
        this.a2 = React.createRef();
        this.a3 = React.createRef();
        this.a4 = React.createRef();
    }

    componentDidMount() {
        this.a1.current.addEventListener('play', () => {
            this.setState({ isPlaying: true });
        });
        this.a1.current.addEventListener('pause', () => {
            this.setState({ isPlaying: false });
        });
    }

    playAll = () => {
        this.a1.current.play();
        this.a2.current.play();
        this.a3.current.play();
        this.a4.current.play();
    };

    handleDrag = (event, data) => {
        const x = (data.x + 100) * 0.5;
        const y = (data.y + 100) * 0.5;

        const getVol = (px, py) => {
            const distance = Math.sqrt(Math.pow(x - px, 2) + Math.pow(y - py, 2));

            return Math.max(100 - distance, 0) / 100;
        };

        let vol1 = getVol(0, 0);
        let vol2 = getVol(100, 0);
        let vol3 = getVol(100, 100);
        let vol4 = getVol(0, 100);

        this.setState({ vol1, vol2, vol3, vol4, drag: true });

        this.a1.current.volume = vol1;
        this.a2.current.volume = vol2;
        this.a3.current.volume = vol3;
        this.a4.current.volume = vol4;
    };

    handleStop = () => {
        if (!this.state.drag) {
            this.a1.current.pause();
            this.a2.current.pause();
            this.a3.current.pause();
            this.a4.current.pause();
        }

        this.setState({
            drag: false,
        });
    }

    render() {
        const { vol1, vol2, vol3, vol4, isPlaying } = this.state;

        return (
            <div className="audioRoom-control" >
                <Draggable
                    bounds={{ top: -100, left: -100, right: 100, bottom: 100 }}
                    onDrag={this.handleDrag}
                    onStart={this.playAll}
                    onStop={this.handleStop}
                >
                    <div className="audioRoom-control__knob">
                        {isPlaying ? 'pause' : 'play'}
                    </div>
                </Draggable>


                <audio ref={this.a1} preload="true" loop id="a1">
                    <source src={violin} type="audio/wav" />
                </audio>

                <audio ref={this.a2} preload="true" loop id="a2">
                    {/**  <source src="audios/Long Drum beat police clip 07 03 2012.wav" type="audio/wav" /> */}
                    <source src={longDrum} type="audio/wav" />
                </audio>

                <audio ref={this.a3} preload="true" loop id="a3">
                    {/**  <source src="audios/Pick bass clip 07 03 2012.wav" type="audio/wav" /> */}
                    <source src={bass} type="audio/wav" />
                </audio>

                <audio ref={this.a4} preload="true" loop id="a4">
                    {/**  <source src="audios/piano quartet principal clip 07 03 2012.wav" type="audio/wav" /> */}
                    <source src={piano} type="audio/wav" />
                </audio>


                {/** spectrum */}

                <AudioSpectrum
                    id="audio-canvas"
                    className="audioRoom-control__spectrum"
                    height={200}
                    width={250}
                    audioId={'a1'}
                    capColor={'red'}
                    capHeight={2}
                    meterWidth={2}
                    meterCount={512}
                    meterColor={[
                        { stop: 0, color: 'blue' },
                        { stop: 0.5, color: 'blue' },
                        { stop: 1, color: 'red' }
                    ]}
                    gap={4}
                />

                <AudioSpectrum
                    id="audio-canvas2"
                    className="audioRoom-control__spectrum"
                    height={200}
                    width={250}
                    audioId={'a2'}
                    capColor={'red'}
                    capHeight={2}
                    meterWidth={2}
                    meterCount={512}
                    meterColor={[
                        { stop: 0, color: '#7523b9' },
                        { stop: 0.5, color: '#7523b9' },
                        { stop: 1, color: 'red' }
                    ]}
                    gap={4}
                />

                <AudioSpectrum
                    id="audio-canvas3"
                    className="audioRoom-control__spectrum"
                    height={200}
                    width={250}
                    audioId={'a3'}
                    capColor={'red'}
                    capHeight={2}
                    meterWidth={2}
                    meterCount={512}
                    meterColor={[
                        { stop: 0, color: '#28b923' },
                        { stop: 0.5, color: '#28b923' },
                        { stop: 1, color: 'red' }
                    ]}
                    gap={4}
                />


                <AudioSpectrum
                    id="audio-canvas4"
                    className="audioRoom-control__spectrum"
                    height={200}
                    width={250}
                    audioId={'a4'}
                    capColor={'red'}
                    capHeight={2}
                    meterWidth={2}
                    meterCount={512}
                    meterColor={[
                        { stop: 0, color: '#b92393' },
                        { stop: 0.5, color: '#b92393' },
                        { stop: 1, color: 'red' }
                    ]}
                    gap={4}
                />
                <div style={{ transform: `scale(${vol1 + 0.5}, ${vol1 + 0.5})` }} className="audioRoom-control__avatar audioRoom-control__avatar--1" />
                <div style={{ transform: `scale(${vol2 + 0.5}, ${vol2 + 0.5})` }} className="audioRoom-control__avatar audioRoom-control__avatar--2" />
                <div style={{ transform: `scale(${vol3 + 0.5}, ${vol3 + 0.5})` }} className="audioRoom-control__avatar audioRoom-control__avatar--3" />
                <div style={{ transform: `scale(${vol4 + 0.5}, ${vol4 + 0.5})` }} className="audioRoom-control__avatar audioRoom-control__avatar--4" />
            </div>
        );
    }
}

export default AudioRoom;