
import request from '../utils/request';

const FLIKR_API_KEY = '86ea7e00eec7a415e5406eb865eb7ba4';
const FLIKR_API_URL = 'https://api.flickr.com/services/rest';

export const getUrl = function( params = {} ) {
    const paramSets = Object.keys( params )
        .map( param => `${param}=${params[ param ]}` );

    if ( paramSets.length ) {
        paramSets.push( 'api_key=' + FLIKR_API_KEY );
        paramSets.push( 'format=json' );
        paramSets.push( 'nojsoncallback=1' );
    }

    return FLIKR_API_URL + ( paramSets.length ? '?' + paramSets.join( '&' ) : '' );
};

const getPhotos = function( photoSetId ) {
    const url = getUrl({
        method      : 'flickr.photosets.getPhotos',
        photoset_id : photoSetId,
        extras      : 'url_s,url_m,url_o'
    });

    return request( url );
};

export const API = {
    getPhotos
};