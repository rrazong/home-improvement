'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const IMAGE_RATIO = 210 / 800;

class Gallery extends Component {
  constructor(props) {
    super(props);

    const { designStyle: designStyles, qualityStandard: qualityStandards } = props.data;

    this.state = {
      designStyles,
      filter: {
        designStyle: {},
        qualityStandard: {},
      },
      qualityStandards,
    };
  }

  render() {
    const { data } = this.props.data;

    console.log(data);

    const gridWidth = (1 + Math.ceil(data.length / 3)) * 320;

    return (
      <div className="gallery">
        <ul
          className="gallery-grid"
          style={{ minWidth: gridWidth }}
        >
          {
            data.map((item) => {
              const {
                _id: id,
                height,
                imageKey,
                width,
              } = item;
              const imageUrl = `/${imageKey}`;

              return (
                <li
                  className="gallery-gridItem"
                  key={id}
                >
                  <div>
                    <img
                      alt={`Gallery item ${id}`}
                      height={height * IMAGE_RATIO}
                      className="gallery-gridItem-image"
                      width={width * IMAGE_RATIO}
                      src={imageUrl}
                    />
                  </div>
                </li>
              );
            })
          }
        </ul>
        <div className="gallery-bumper gallery-bumper--left">
          <button
            className="gallery-nav gallery-nav--left"
          />
        </div>
        <div className="gallery-bumper gallery-bumper--right">
          <button
            className="gallery-nav gallery-nav--right"
          />
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      imageKey: PropTypes.string.isRequired,
    })).isRequired,
    designStyle: PropTypes.array.isRequired,
    qualityStandard: PropTypes.array.isRequired,
  }).isRequired,
};

export default Gallery;
