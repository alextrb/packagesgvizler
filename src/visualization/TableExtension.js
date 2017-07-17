
        /** 
         * Make an html table with links and images.
         * 
         * @class sgvizler.visualization.TableExtension
         * @extends sgvizler.charts.Chart
         * @constructor
         * @param {Object} container The container element where the
         * chart will be drawn.
         * @since 0.5.1 
         **/

        /**
         * Example of new culumns style : "colStyle=col2_img_max-width:250px;col2_img_border-radius:50%;
         * col2_img_display:block;col2_img_margin:auto;col3_img_max-width:300px;
         * col3_img_max-height:300px;col2_img_opacity:0.5" (with a 3 columns table minimum)
        **/

        /** 
         * Available options:
         *  - 'headings'   :  "true" / "false"  (default: "true")
         *  - 'borders'    : any type of table from Bootstrap
         *  - 'default'    : changes the style of all images of the table
         *  - 'colStyle'   : create new style for a 1 or more columns
         *
         * @method draw
         * @public
         * @param {google.visualization.DataTable} data
         * @param {Object} [chartOptions]
         * @since 0.5.1
         **/
        C.TableExtension = charts.add(modSC, "TableExtension",
            function (data, chartOpt) {
                var c, noColumns = data.getNumberOfColumns(),
                    r, noRows = data.getNumberOfRows(),
                    opt = $.extend({ headings: true, 
                                     borders: 'table table-bordered', 
                                     default : 'border:solid 3px black;max-width:150px;height:auto;',
                                     colStyle : undefined},
                                     chartOpt),
                    table,
                    rows = [],
                    cells = [],
                    i,
                    colOptions = [];

                C.util.loadBOOTSTRAP();

                for (i = 0; i < noColumns ; i += 1) {
                    colOptions.push([]);
                }

                if (opt.colStyle != undefined ) {
                    var options = opt.colStyle.split(";");
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

                for (r = 0; r < noRows; r += 1) {
                    cells = [];
                    for (c = 0; c < noColumns; c += 1) {
                        if ((colOptions[c].length>0)) {
                            var optcol = '';
                            for ( i = 0; i < colOptions[c].length; i += 1) {
                                optcol = optcol + colOptions[c][i][2] + ';';
                            }
                            cells.push(['td', null, [C.util.imagify2String(data.getValue(r, c), optcol, colOptions[c][0][1])]]);
                        }
                        else{ 
                        cells.push(['td', null, [C.util.imagify2String(data.getValue(r, c), opt.default, null )]]);
                        }
                    }
                    rows.push(['tr', null, cells]);
                }
                table = util.createHTMLElement('table', {'class': opt.borders}, rows);
                $(this.container).empty().html(table);

                this.fireListener('ready');
            }
            );
