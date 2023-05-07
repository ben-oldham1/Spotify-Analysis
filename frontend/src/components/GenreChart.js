// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';

import { Treemap } from 'react-vis';

function buGetData(props) {

  let topGenreJson = props.topGenreJson;

  // Create an empty object to store the genre counts
  let genreCounts = {};

  // Loop through each artist in the topGenreJson variable
  for (let i = 0; i < topGenreJson.length; i++) {
    // Loop through each genre in the artist's genres array
    for (let j = 0; j < topGenreJson[i].genres.length; j++) {
      // If the genre is not in the genreCounts object, add it with a count of 1
      if (!(topGenreJson[i].genres[j] in genreCounts)) {
        genreCounts[topGenreJson[i].genres[j]] = 1;
      }
      // If the genre is already in the genreCounts object, increment its count
      else {
        genreCounts[topGenreJson[i].genres[j]] += 1;
      }
    }
  }


  // Output the chartData array in the specified format
  console.log('genreCounts');
  console.log(genreCounts);

  let genreNames = Object.keys(genreCounts);

  let chartData = {
    "children": []
  };

  for (let i = 0; i < genreNames.length; i++) {
    chartData["children"].push({
      'name': genreNames[i].toUpperCase(),
      'size': genreCounts[genreNames[i]],
      'severity': 0
    });
  }

  return chartData;
}

class GenreChart extends React.Component {
  state = {
    hoveredNode: false,
    buTreemapData: buGetData(this.props)
  };
  buIncidentSeverityColors = [
    '#78a388'
  ]

  render() {
    const treeProps = {
      animation: {
        damping: 9,
        stiffness: 300
      },
      className: 'mx-auto',
      data: this.state.buTreemapData,
      height: 600,
      width: 1100,
      hideRootNode: true,
      mode: 'resquarify',
      colorType: 'literal',
      getLabel: x => x.name,
      colorRange: ['#e0e0e0'],
      // getSize: x => x.apCount,
      getColor: x => this.buIncidentSeverityColors[x.severity],
      renderMode: 'DOM',
      padding: 10,
      margin: 0
    };
    return (
      <div className="dynamic-treemap-example">
        <div className="bu-nested-tree">
          <Treemap {...treeProps} />
        </div>
      </div>
    );
  }
}

export default GenreChart;
