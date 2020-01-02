<template>
    <div>
        <svg></svg>
    </div>
</template>

<script>
    import * as d3 from "d3";

    export default {
        props: ["mapping"],
        methods: {
            jsonToDendogramJson: function(json) {
                let vals = Object.values(json);
                let uniq = [...new Set(vals)];
                let childs = {};

                uniq.forEach(function (item) {
                    childs[item] = [];
                });

                Object.keys(json).forEach(function(key) {
                    childs[json[key]].push({
                        name: key,
                        parent: json[key]
                    });
                });

                let final_childs = [];

                uniq.forEach(function (x) {
                    final_childs.push({
                        name: x,
                        parent: 'data',
                        children: childs[x]
                    });
                });

                return {
                    name: 'data',
                    parent: null,
                    children: final_childs
                };
            }
        },
        mounted() {
            window.console.log(this.mapping);

            const treeData = this.jsonToDendogramJson(this.mapping);

            var margin = {top: 20, right: 120, bottom: 20, left: 120},
                width = 960 - margin.right - margin.left,
                height = 500 - margin.top - margin.bottom;

            var i = 0;

            var tree = d3.layout.tree()
                .size([height, width]);

            var diagonal = d3.svg.diagonal()
                .projection(function(d) { return [d.y, d.x]; });

            var svg = d3.select("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            let root = treeData;

            update(root);

            function update() {

                // Compute the new tree layout.
                var nodes = tree.nodes(root).reverse(),
                    links = tree.links(nodes);

                // Normalize for fixed-depth.
                nodes.forEach(function (d) {
                    d.y = d.depth * 180;
                });

                // Declare the nodes…
                var node = svg.selectAll("g.node")
                    .data(nodes, function (d) {
                        return d.id || (d.id = ++i);
                    });

                // Enter the nodes.
                var nodeEnter = node.enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function (d) {
                        return "translate(" + d.y + "," + d.x + ")";
                    });

                nodeEnter.append("circle")
                    .attr("r", function () {
                        return 7;
                    })
                    .style("stroke", function () {
                        return 2;
                    })

                nodeEnter.append("text")
                    .attr("x", function (d) {
                        return d.children || d._children ?
                            -13 : 13
                    })
                    .attr("dy", ".35em")
                    .attr("text-anchor", function (d) {
                        return d.children || d._children ? "end" : "start";
                    })
                    .text(function (d) {
                        return d.name;
                    })

                // Declare the links…
                var link = svg.selectAll("path.link")
                    .data(links, function (d) {
                        return d.target.id;
                    });

                // Enter the links.
                link.enter().insert("path", "g")
                    .attr("class", "link")
                    .attr("d", diagonal);
            }

            // set the dimensions and margins of the graph
            // var width = 460;
            // var height = 460;
            //
            // // append the svg object to the body of the page
            // var svg = d3.select("svg")
            //     .attr("width", width)
            //     .attr("height", height)
            //     .append("g")
            //     .attr("transform", "translate(40,0)");  // bit of margin on the left = 40
            //
            // // Create the cluster layout:
            // var cluster = d3.tree()
            //     .size([height, width - 100]);  // 100 is the margin I will have on the right side
            //
            // // Give the data to this cluster layout:
            // var root = d3.hierarchy(data, function(d) {
            //     return d.children;
            // });
            // cluster(root);
            //
            // // Add the links between nodes:
            // svg.selectAll('path')
            //     .data( root.descendants().slice(1) )
            //     .enter()
            //     .append('path')
            //     .attr("d", function(d) {
            //         return "M" + d.y + "," + d.x
            //             + "C" + (d.parent.y + 50) + "," + d.x
            //             + " " + (d.parent.y + 150) + "," + d.parent.x // 50 and 150 are coordinates of inflexion, play with it to change links shape
            //             + " " + d.parent.y + "," + d.parent.x;
            //     })
            //     .style("fill", 'none')
            //     .attr("stroke", '#ccc');
            //
            // // Add a circle for each node.
            // svg.selectAll("g")
            //     .data(root.descendants())
            //     .enter()
            //     .append("g")
            //     .attr("transform", function(d) {
            //         return "translate(" + d.y + "," + d.x + ")"
            //     })
            //     .append("circle")
            //     .attr("r", 7)
            //     .style("fill", "#69b3a2")
            //     .attr("stroke", "black")
            //     .style("stroke-width", 2)
            //
            // // add text to each node
            // svg.selectAll("g.node")
            //     .data(root.descendants())
            //     .enter()
            //     .append("text")
            //     .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
            //     .attr("dy", ".35em")
            //     .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
            //     .text(function(d) { return d.name; })
        }
    };
</script>

<style>

    .node {
        cursor: pointer;
    }

    .node circle {
        fill: #fff;
        stroke: steelblue;
        stroke-width: 3px;
    }

    .node text {
        font: 12px sans-serif;
    }

    .link {
        fill: none;
        stroke: #ccc;
        stroke-width: 2px;
    }

</style>
