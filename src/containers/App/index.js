
// Test Album: 72157674101307031;

import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

class App extends Component {

    constructor( props, state ) {
        super( props, state );

        this.onPhotoSetChange = this.onPhotoSetChange.bind( this );
        this.onOpenPhotoSet   = this.onOpenPhotoSet.bind( this );

        this.state = {
            photoset : ''
        };
    }

    onPhotoSetChange( event ) {
        this.setState({
            photoset : event.target.value
        });
    }

    onOpenPhotoSet() {
        const {
            router
        } = this.props;

        const {
            photoset
        } = this.state;

        router.push( `/photoset/${photoset}` );
    }

    render() {
        const {
            children
        } = this.props;

        const hasContent = !!React.Children.count( children );

        if ( hasContent ) {
            return (
                <div className="app">
                    {children}
                </div>
            );
        }

        const {
            photoset
        } = this.state;

        return (
            <div className="app">
                <div className="search-controls">
                    <div className="input-group">
                        <input placeholder="Photo Set ID" type="text" className="form-control" onChange={this.onPhotoSetChange} value={photoset}/>
                        <span className="input-group-btn">
                            <button type="button" className="btn btn-primary" onClick={this.onOpenPhotoSet}>Go</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
