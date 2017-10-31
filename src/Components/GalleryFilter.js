'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const GalleryFilter = (props) => {
  const {
    filters: {
      design: selectedDesigns,
      quality: selectedQualities,
    },
    onToggleFilter,
  } = props;

  return (
    <div>
      <ul className="dropdown menu" data-dropdown-menu>
        <li>
          <a>Design</a>
          <ul className="menu">
            {
              props.designStyle.map(design => (
                <FilterItem
                  className={classnames({
                    'filterItem--selected': selectedDesigns.find(id => id === design.id) >= 0,
                  })}
                  key={design.id}
                  filter={design}
                  type="design"
                  onToggleFilter={onToggleFilter}
                />
              ))
            }
          </ul>
        </li>
        <li>
          <a>Quality</a>
          <ul className="menu">
            {
              props.qualityStandard.map(quality => (
                <FilterItem
                  className={classnames({
                    'filterItem--selected': selectedQualities.find(id => id === quality.id) >= 0,
                  })}
                  key={quality.id}
                  filter={quality}
                  type="quality"
                  onToggleFilter={onToggleFilter}
                />
              ))
            }
          </ul>
        </li>
      </ul>
    </div>
  );
};

class FilterItem extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.onToggleFilter(Object.assign(
      this.props.filter,
      { type: this.props.type },
    ));
  }

  render() {
    const { className, filter } = this.props;
    return (
      <li>
        <a
          className={className}
          onClick={this.onClick}
          onKeyUp={this.onClick}
          role="button"
          tabIndex={0}
        >
          {filter.label}
        </a>
      </li>
    );
  }
}

FilterItem.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
  onToggleFilter: PropTypes.func.isRequired,
};

FilterItem.defaultProps = {
  className: '',
};

GalleryFilter.propTypes = {
  designStyle: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  filters: PropTypes.shape({
    design: PropTypes.array.isRequired,
    quality: PropTypes.array.isRequired,
  }).isRequired,
  onToggleFilter: PropTypes.func.isRequired,
  qualityStandard: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

export default GalleryFilter;
