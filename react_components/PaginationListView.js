'use strict';

import React, { Component } from 'react';
import createFragment from 'react-addons-create-fragment';
import PageView from './PageView';


export default class PaginationListView extends Component {
  renderPageView(index) {
    const {
      pageUrlTemplate,
      pageClassName,
      pageLinkClassName,
      activeClassName,
      onPageSelected,
      selected,
    } = this.props;
    const page = index + 1;
    const url = pageUrlTemplate.replace(':pageNum', page);

    return (
      <PageView
        onClick={onPageSelected.bind(null, index)}
        selected={selected === index}
        pageClassName={pageClassName}
        pageLinkClassName={pageLinkClassName}
        activeClassName={activeClassName}
        page={page}
        href={url} />
    );
  }
  render() {
    const items = {};

    if (this.props.pageNum <= this.props.pageRangeDisplayed) {

      for (let index = 0; index < this.props.pageNum; index++) {

        items['key' + index] = this.renderPageView(index);

      }

    } else {

      let leftSide  = (this.props.pageRangeDisplayed / 2);
      let rightSide = (this.props.pageRangeDisplayed - leftSide);

      if (this.props.selected > this.props.pageNum - this.props.pageRangeDisplayed / 2) {
        rightSide = this.props.pageNum - this.props.selected;
        leftSide  = this.props.pageRangeDisplayed - rightSide;
      }
      else if (this.props.selected < this.props.pageRangeDisplayed / 2) {
        leftSide  = this.props.selected;
        rightSide = this.props.pageRangeDisplayed - leftSide;
      }

      for (let index = 0; index < this.props.pageNum; index++) {

        const page = index + 1;

        if (page <= this.props.marginPagesDisplayed) {
          items['key' + index] = this.renderPageView(index);
          continue;
        }

        if (page > this.props.pageNum - this.props.marginPagesDisplayed) {
          items['key' + index] = this.renderPageView(index);
          continue;
        }

        if ((index >= this.props.selected - leftSide) && (index <= this.props.selected + rightSide)) {
          items['key' + index] = this.renderPageView(index);
          continue;
        }

        let keys            = Object.keys(items);
        let breakLabelKey   = keys[keys.length - 1];
        let breakLabelValue = items[breakLabelKey];

        if (breakLabelValue !== this.props.breakLabel) {
          items['key' + index] = this.props.breakLabel;
        }
      }
    }

    return (
      <ul className={this.props.subContainerClassName}>
        {createFragment(items)}
      </ul>
    );
  }
};
