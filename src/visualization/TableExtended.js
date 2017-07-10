
        /** 
         * Make an html table with links and images.
         * 
         * @class sgvizler.visualization.TableExtended
         * @extends sgvizler.charts.Chart
         * @constructor
         * @param {Object} container The container element where the
         * chart will be drawn.
         * @since 0.5.1
         **/

        /** 
         * Available options:
         *  - 'headings'   :  "true" / "false"  (default: "true")
         *  - 'borders'    : any type of table from Bootstrap
         *  - 'im_width'   : width of images in the table
         *  - 'im_height'  : height of images in the table
         *
         * @method draw
         * @public
         * @param {google.visualization.DataTable} data
         * @param {Object} [chartOptions]
         * @since 0.5.1
         **/
        C.TableExtended = charts.add(modSC, "TableExtended",
            function (data, chartOpt) {
                var c, noColumns = data.getNumberOfColumns(),
                    r, noRows = data.getNumberOfRows(),
                    opt = $.extend({ headings: true, 
                                     borders: 'table table-bordered', 
                                     col : 'border:solid 5px black;max-width:150px;height:auto;',
                                     default : 'col2_img_max-width:250px;col3_img_max-width:300px;col3_img_max-height:300px'},
                                   chartOpt),
                    table,
                    rows = [],
                    cells = [],
                    i = 0,
                    colOptions = [];
console.log(C);
console.log(typeof(C));
console.log(S);
console.log("****");
console.log("inside");

                C.util.loadBOOTSTRAP();
                    /**
                    * Example with default parameters and a 4 column Table :
                    * colOptions = [[], [[col2, img, max-width:250px]], [[col3, img, max-width:300px], [col3, img, max-height:300px]], []]
                    **/
                    for (i = 0; i < noColumns ; i += 1) {
                        colOptions.push([]);
                    }

                    if (opt.default != undefined ) {
                        var options = opt.default.split(";");
                        var ilen = options.length;

                        for (i = 0; i < ilen; i += 1) {
                            var donnees = options[i].match(/^col([1-9]+)\_/);
                            var assignement = options[i].split("_");
                            colOptions[parseInt(donnees[1]-1)].push(assignement);                            
                        }
                    } 


                if (opt.headings) {
                    for (c = 0; c < noColumns; c += 1) {
                        cells.push(['th', null, data.getColumnLabel(c)]);
                    }
                    rows.push(['tr', null, cells]);
                }
                // The false value returned by linkify2String in linkify allow
                // to check if the data (row r, col c) is an image
                for (r = 0; r < noRows; r += 1) {
                    cells = [];
                    for (c = 0; c < noColumns; c += 1) {
                        if ((colOptions[c].length>0) && (colOptions[c][0][1])) { //&& inutile ?
                            var optcol = '';
                            for ( i = 0; i < colOptions[c].length; i += 1) {
                                optcol = optcol + colOptions[c][i][2] + ';';
                            }
                            cells.push(['td', null, [C.util.linkify2String(data.getValue(r, c), optcol, colOptions[c][0][1])]]);
                        }
                        else{ 
                        cells.push(['td', null, [C.util.linkify2String(data.getValue(r, c), opt.col, null )]]);
                        }
                    }
                    rows.push(['tr', null, cells]);
                }

                table = util.createHTMLElement('table', {'class': opt.borders}, rows);
                $(this.container).empty().html(table);

                this.fireListener('ready');
            }
            );
