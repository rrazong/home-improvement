'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const RAW_IMAGE_HEIGHT = 800; // px
const RAW_IMAGE_WIDTH = 1200; // px
const SCALED_IMAGE_HEIGHT = 210;
const IMAGE_RATIO = SCALED_IMAGE_HEIGHT / RAW_IMAGE_HEIGHT;
const AVERAGE_IMAGE_WIDTH = RAW_IMAGE_WIDTH * IMAGE_RATIO;
const NUM_ROWS_IN_GALLERY = 3;
const NUM_IMAGES_PER_ROW = 4;
const GALLERY_PAGE_WIDTH = NUM_IMAGES_PER_ROW * AVERAGE_IMAGE_WIDTH;

class Gallery extends Component {
  constructor(props) {
    super(props);

    const { list } = props;

    this.state = {
      minWidth: (1 + Math.ceil(list.length / NUM_ROWS_IN_GALLERY)) * AVERAGE_IMAGE_WIDTH,
      scrollX: 0,
    };
    this.maxScrollPosition = -this.state.minWidth + GALLERY_PAGE_WIDTH;
  }

  onClick(direction = 'right') {
    const { scrollX } = this.state;
    return () => {
      this.setState({
        scrollX: direction === 'right'
          ? Math.max(this.maxScrollPosition, scrollX - GALLERY_PAGE_WIDTH)
          : Math.max(0, scrollX + GALLERY_PAGE_WIDTH),
      });
    };
  }

  render() {
    const { minWidth, scrollX } = this.state;
    const { list } = this.props;
    const onClickLeft = this.onClick('left');
    const onClickRight = this.onClick('right');

    console.log(list);

    return (
      <div className="gallery">
        <ul
          className="gallery-grid"
          style={{
            minWidth,
            transform: `translateX(${scrollX}px)`,
          }}
        >
          {
            list.map((item) => {
              const {
                _id: id,
                height,
                imageKey,
                width,
              } = item;
              const imageUrl = `/${imageKey}`;

              return (
                <li key={id}>
                  <div className="gallery-gridItem">
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
            disabled={scrollX === 0}
            onClick={onClickLeft}
          />
        </div>
        <div className="gallery-bumper gallery-bumper--right">
          <button
            className="gallery-nav gallery-nav--right"
            disabled={scrollX <= this.maxScrollPosition}
            onClick={onClickRight}
          />
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageKey: PropTypes.string.isRequired,
  })).isRequired,
};

export default Gallery;
