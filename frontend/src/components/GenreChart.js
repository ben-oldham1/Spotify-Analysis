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
import React from "react";
import axios from "axios";
import { Treemap } from 'react-vis';

class GenreChart extends React.Component {
  state = {
    hoveredNode: false,
    topGenres: [],
    topGenresData: {}
  };

  async getTopGenres() {
    const { token, settingsData, setIsLoading, setApiError } = this.props;

    setIsLoading(true);

    try {
      const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          limit: "8",
          offset: "0",
          time_range: settingsData["data_period"]
        },
        timeout: 5000
      });

      this.setState({ topGenres: data['items'], topGenresData: this.buGetData(data['items']) });
      setIsLoading(false);
    } catch (error) {
      setApiError(true);
      setIsLoading(false);
    }
  }

  buGetData(topGenreJson) {
    let genreCounts = {};

    for (let i = 0; i < topGenreJson.length; i++) {
      for (let j = 0; j < topGenreJson[i].genres.length; j++) {
        if (!(topGenreJson[i].genres[j] in genreCounts)) {
          genreCounts[topGenreJson[i].genres[j]] = 1;
        } else {
          genreCounts[topGenreJson[i].genres[j]] += 1;
        }
      }
    }

    let genreNames = Object.keys(genreCounts);

    let chartData = {
      "children": []
    };

    function getColour(size) {
      if (size === 1) {
        return "#AAC5B4";
      } else if (size === 2) {
        return "#92B59F";
      } else if (size === 3) {
        return "#79A489";
      } else {
        return "#639274";
      }
    }

    for (let i = 0; i < genreNames.length; i++) {
      chartData["children"].push({
        'name': genreNames[i].toUpperCase(),
        'size': genreCounts[genreNames[i]],
        'colour': getColour(genreCounts[genreNames[i]])
      });
    }

    return chartData;
  }

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      this.getTopGenres();
    }
  }

  componentDidUpdate(prevProps) {
    const { settingsData } = this.props;
    if (settingsData !== prevProps.settingsData) {
      this.getTopGenres();
    }
  }

  render() {
    const { topGenresData } = this.state;
    const treeProps = {
      animation: {
        damping: 9,
        stiffness: 300
      },
      className: 'mx-auto',
      data: topGenresData,
      height: 600,
      width: 1100,
      hideRootNode: true,
      mode: 'resquarify',
      colorType: 'literal',
      getLabel: x => x.name,
      colorRange: ['#e0e0e0'],
      getColor: x => x.colour,
      renderMode: 'DOM',
      padding: 10,
      margin: 0
    };
    return (
      <>
        {topGenresData && (
          <div className="dynamic-treemap-example">
            <div className="bu-nested-tree">
              <Treemap {...treeProps} />
            </div>
          </div>
        )}
      </>
    );    
  }
}

export default GenreChart;