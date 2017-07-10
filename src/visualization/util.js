
        /**
         * Utility functions for chart functions.
         *
         * .visualization
         * @class sgvizler.visualization.util
         * @static
         */

        C.util = (function () {
            var

                /**
                 * Converts a url into a prefixified link or a picture.
                 * @method linkify
                 * @private
                 * @param {String} url The url to linkify.
                 * @param {boolean} arraySyntax Flag if results should
                 * be rendered in array syntax (true), or as an HTML
                 * string (false).
                 * @param {String} width The width of the image
                 * @param {String} height The height of the image
                 * @return {String}
                 */
                linkify = function (url, arraySyntax, style, dataType) {
                    if (typeof(style) == 'undefined'){
                        style = '';
                    }
                    
                    if (typeof(dataType) == 'undefined'){
                        dataType = null;
                    }

                    var prefixed = namespace.prefixify(url),
                        base = namespace.getBaseURL(),
                        href = url, // the hyperlink.
                        link,       // what to click.
                        result;   

                    // Is it linkable, or something else?
                    if (prefixed !== url) {
                        link = prefixed;
                    } else if (S.util.isURL(url)) {
                        link = url;
                    }

                    // If it is linkable, then HTML encode it as one.
                    if (link) {
                       
                            // Append base URL to front, if specified.
                            if (base) {
                                href = base + url;
                            }
                            // Returns a result according to the format used by
                            // sgvizler.util.createHTMLElement.
                            if (arraySyntax) {
                                result = ['a', { href: href }, link];
                            } else { // straight html
                                result = '<a href=' + href + '>' + link + '</a>';
                            }
                        
                    } else { // If it is not a link, then just pass it through.
                        result = url;
                    } 
                    // Check if the link refers to a picture
                    if (/(jpeg|jpg|gif|png|JPG|PNG|JPEG|svg)$/.test(url)){
                        //Return a result in straight html
                        if (( arraySyntax == false) || ( dataType == 'img' )) {
                             result = '<img src=' + url + ' alt= "text" style= "' + style +'"> ';
                             
                        }
                    }
                    return result;
                },
                cssloaded = false;

            return {
                /**
                 * Converts a url into a `<a href=""> or a <img src="">` element with the
                 * link prefixified.
                 * @method linkify2String
                 * @protected
                 * @param {String} url The url to linkify.
                 * @param {String} style The rank of the style
                 * @param {String} dataType The dataType that the link refers to
                 * @return {String}
                 */
                linkify2String: function (url, style, dataType) {  
                    if (typeof(style) == 'undefined'){
                        style = '';
                    }
                    if (typeof(dataType) == 'undefined'){
                        dataType = null;
                    }
                    
                    return linkify(url, false, style, dataType);
                    
                },
                /**
                 * Converts a url into an array on the format
                 * described in `sgvizler.util.createHTMLElement`.
                 * @method linkify2HTMLElemntArray
                 * @protected
                 * @param {String} url The url to linkify.
                 * @return {Array}
                 */
                linkify2HTMLElementArray: function (url) {
                    return linkify(url, true);
                },

                /**
                 * Loads the css file `sgvizler.charts.css`.
                 * @method loadCSS
                 * @protected
                 * @injects
                 */
                loadCSS: function () {
                    if (!cssloaded) {
                        $('head').append('<link rel="stylesheet" href="' + S.core.CHARTSCSS + '" type="text/css" />');
                        cssloaded = true;
                    }
                },

                /**
                * Loads the Bootstrap necessary for TableExtended
                * @method loadBOOTSTRAP
                * @protected
                * @injects
                */
                loadBOOTSTRAP: function() {
                    $('head').append('<link rel = "stylesheet" href= "/home/alex/Documents/bootstrap-3.3.7/dist/css/bootstrap.min.css" /> ');
                    $('head').append('<link rel = "stylesheet" href= "/home/alex/Documents/bootstrap-3.3.7/dist/css/bootstrap-theme.min.css" /> ');
                }
            };
        }());
