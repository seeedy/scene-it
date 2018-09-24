import React from 'react';
// import axios from './axios';
import { connect } from 'react-redux';
import { getScenes } from '../actions';


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state={};

        this.getScenes = this.getScenes.bind(this);
        this.sceneModal = this.sceneModal.bind(this);
    }


    // getScenes() {
    //
    //     console.log('making axios req to server', this.search.value);
    //
    //     axios.get('/search/' + this.search.value)
    //         .then(response => {
    //             console.log('data on frontend', response);
    //             this.setState({
    //                 results: response.data
    //             });
    //         });
    // }

    getScenes() {
        console.log('getting scenes for', this.search.value);

        this.props.dispatch(getScenes(this.search.value));

    }

    sceneModal(e) {
        console.log('click on ', e.target.src);
        this.setState({
            scene: e.target.src
        });
        document.getElementById("scene-modal").classList.add("shown");
    }


    render() {

        const { scenes } = this.props;

        return (
            <div id="search-wrapper">

                <div id="scene-modal">
                    <div id="preview">
                        <img className="img-preview" src={this.state.scene} />
                    </div>
                </div>

                <div id="search-bar">
                    <input
                        id="search-input"
                        type="text"
                        onSubmit={this.getScenes}
                        ref={search => (this.search = search)}
                        placeholder="Search movie scene"
                    />

                    <button
                        id="search-btn"
                        onClick={this.getScenes}
                    >
                        submit
                    </button>


                </div>

                <div id="search-results">
                    {scenes && scenes.map(item => (
                        <div key={item.link}>
                            <img
                                className="result-img"
                                src={item.link}
                                onClick={this.sceneModal}
                            />
                        </div>
                    ))}

                </div>
            </div>
        );

    }
}


const mapStateToProps = state => {
    return {
        scenes: state.scenes
    };
};


export default connect(mapStateToProps)(Search);
