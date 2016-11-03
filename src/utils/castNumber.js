
export default function( value ) {
    if ( typeof value === 'number' ) {
        return value;
    }  
    
    value = String( value )
        .replace( /[$,]+/g, '' );
    
    return parseFloat( value ) || 0;
};