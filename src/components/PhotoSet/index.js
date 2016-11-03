
import React, { Component, PropTypes } from 'react';
import Gallery from 'react-photo-gallery';
import { API } from '../../services/flikr';
import castNumber from '../../utils/castNumber';
import Digital  from 'react-activity/lib/Digital';

import 'react-activity/dist/react-activity.css';
import './styles.css';


const {
    string
} = PropTypes;

class PhotoSet extends Component {

    static propTypes = {
        photoset : string
    };

    constructor( props, context ) {
        super( props, context );

        this.state = {
            photoSetId  : null,
            photoSet    : null,
            fetching    : false
        };
    }

    componentWillMount() {
        this.fetchPhotosIfNeeded(
            this.props,
            this.state
        );
    }

    componentWillReceiveProps( nextProps, nextState ) {
        this.fetchPhotosIfNeeded(
            nextProps,
            nextState
        );
    }

    fetchPhotosIfNeeded( props, state ) {
        const {
            params = {}
        } = props;

        const {
            photoSet,
            fetching
        } = state;

        const photoSetId = params.photoset;

        if ( photoSetId && !photoSet && !fetching ) {
            this.setState({
                photoSetId
            });

            API.getPhotos( photoSetId )
                .then( ({ error, data }) => {
                    if ( error ) {
                        return console.error( error.message );
                    }

                    this.setState({
                        photoSet : data.photoset,
                        fetching : false
                    });
                });
        }
    }

    getPhotoSet() {
        const {
            photoSet
        } = this.state;

        if ( !photoSet ) {
            return [];
        }

        const photos = photoSet.photo.map( photo => {
            const {
                id,
                url_m,
                height_m,
                width_m
            } = photo;

            const src = url_m;
            const width = castNumber( width_m );
            const height = castNumber( height_m );
            const aspectRatio = width / height;
            const lightboxImage = { src };

            return {
                id,
                src,
                width,
                height,
                aspectRatio,
                lightboxImage
            };
        });

        return {
            title : photoSet.title,
            total : photoSet.total,
            photos
        };
    }

    render() {
        const {
            fetching,
            photoSet
        } = this.state;

        if ( fetching || !photoSet ) {
            return (
                <Digital
                    color="#727981"
                    size={32}
                    speed={1}
                />
            );
        }

        const data = this.getPhotoSet();

        return (
            <div className="photo-set">
                <div className="photo-set-banner">
                    <span className="banner__title">{data.title}</span>
                    <span className="banner__image-count">({data.total} Images)</span>
                </div>
                <div className="photo-set-content">
                    <Gallery
                        photos={data.photos}
                    />
                </div>
            </div>
        );
    }

}

export default PhotoSet;