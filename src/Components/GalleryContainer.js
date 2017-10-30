'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gallery from './Gallery';
import GalleryFilter from './GalleryFilter';

class GalleryContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      design: [],
      quality: [],
    };

    this.onToggleFilter = this.onToggleFilter.bind(this);
  }

  onToggleFilter(filter) {
    this.setState(() => ({
      [filter.type]: this.state[filter.type].find(id => id === filter.id) >= 0
        ? this.state[filter.type].filter(id => id !== filter.id)
        : this.state[filter.type].concat([filter.id]),
    }));
  }

  render() {
    const { design, quality } = this.state;
    const {
      data: {
        data,
        designStyle,
        qualityStandard,
      },
    } = this.props;
    const filters = {
      design,
      quality,
    };

    const intersection = (a, b) => {
      const setA = new Set(a);
      const setB = new Set(b);
      return ([...setA].filter(v => setB.has(v)).length > 0);
    };

    const list = data.filter(dataItem => (
      ((design.length === 0) && (quality.length === 0)) ||
      (intersection(dataItem.metaData.designStyle, design)) ||
      (intersection(dataItem.metaData.qualityStandard, quality))
    ));

    return (
      <div>
        <GalleryFilter
          designStyle={designStyle}
          filters={filters}
          onToggleFilter={this.onToggleFilter}
          qualityStandard={qualityStandard}
        />
        <Gallery list={list} />
      </div>
    );
  }
}

GalleryContainer.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.array.isRequired,
    designStyle: PropTypes.array.isRequired,
    qualityStandard: PropTypes.array.isRequired,
  }).isRequired,
};

export default GalleryContainer;
