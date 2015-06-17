define([
        'text!templates/batlefieldViewTemplate.html',
        'models/obstacles',
        'D3'
    ],function(batlefielTemplate, obstaclesOnMap, D3){

        var batlefieldView = Backbone.View.extend({

            el:'#forMap',
            template:_.template(batlefielTemplate),

            initialize: function(){
                this.render();
                console.log('batlefieldView initialize')
            },
            render: function(){
                var self = this;
                this.$el.html(this.template());

                this.mapObstacles = new obstaclesOnMap();
                this.mapObstacles .fetch({

                    success: function(model){
                        var _d = self.mapObstacles.toJSON();
                        var d = _d.array;
                        console.log('Obstacles loaded: ', d);
                        console.log('Obstacles loaded: ', d.length);

                        // Нарешті, добрався до D3 ... не годно бути!... всім пристібнути паски безбеки!!! :)

                        for (var i = d.length-1; i>=0; i--) {

                            function setColor(type) {
                                /* Тип перешкод, type
                                 * 1 - Ліс
                                 * 2 - Болото
                                 * 3 - Гора
                                 * 4 - Озеро
                                 */

                                if (type == 1) return 'LightGreen';
                                if (type == 2) return 'Tan';
                                if (type == 3) return 'DimGray';
                                if (type == 4) return 'SkyBlue';

                            }

                            if (d[i].fіgura == 1) {
                                // addTriangleToSvg(setColor(d[i].type), d[i].x1, 600 - d[i].y1, d[i].x2, 600 - d[i].y2, d[i].x3, 600 - d[i].y3);
                                D3.select("#mySvg")
                                    .append("polygon")
                                    .attr("points", d[i].x1 + ','+ (600 - d[i].y1) + ','+ d[i].x2 + ','+ (600 - d[i].y2) + ',' +  d[i].x3 + ','+ (600 - d[i].y3))
                                    .style("fill", setColor(d[i].type));
                            }
                            if (d[i].fіgura == 2) {
                                //addRectangleToSvg(setColor(d[i].type), d[i].x1, 600 - d[i].y1, d[i].x2, 600 - d[i].y2, d[i].x3, 600 - d[i].y3, d[i].x4, 600 - d[i].y4);
                                D3.select("#mySvg")
                                    .append("polygon")
                                    .attr("points", d[i].x1 + ','+ (600 - d[i].y1) + ','+ d[i].x2 + ','+ (600 - d[i].y2) + ',' +  d[i].x3 + ','+ (600 - d[i].y3) + ','+ d[i].x4 + ','+ (600 - d[i].y4))
                                    .style("fill", setColor(d[i].type));
                            }

                            if (d[i].fіgura == 3) {
                                //addElipseToSvg(setColor(d[i].type), d[i].cx, 600 - d[i].cy, d[i].rx, d[i].ry);
                                D3.select("#mySvg")
                                    .append("ellipse")
                                    .attr("cx",  d[i].cx)
                                    .attr("cy", 600 - d[i].cy)
                                    .attr("rx",  d[i].rx)
                                    .attr("ry", d[i].ry)
                                    .style("fill", setColor(d[i].type));
                                //console.log(d[i]);
                            }
                        }
                        //D3.select("#mySvg")
                        //    .append("rect")
                        //    .attr("x", 0)
                        //    .attr("y",  0)
                        //    .attr("width", 100)
                        //    .attr("height",  20)
                        //    .style("fill", setColor(d[i].type));

                    },
                    error: function(err, xhr, model){
                        alert(xhr);
                    }
                });
                return this;
            }
        });
        return batlefieldView;
    }
);