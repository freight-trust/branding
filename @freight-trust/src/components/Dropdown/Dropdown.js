/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useSelect } from 'downshift';
import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import ListBox, { PropTypes as ListBoxPropTypes } from '../ListBox';
import { Checkmark16, WarningFilled16 } from '@carbon/icons-react';

const { prefix } = settings;

const defaultItemToString = (item) => {
  if (typeof item === 'string') {
    return item;
  }

  return item ? item.label : '';
};

function Dropdown({
  className: containerClassName,
  disabled,
  direction,
  items,
  label,
  ariaLabel,
  itemToString,
  itemToElement,
  type,
  size,
  onChange,
  id,
  titleText,
  helperText,
  translateWithId,
  light,
  invalid,
  invalidText,
  initialSelectedItem,
  selectedItem: controlledSelectedItem,
  downshiftProps,
}) {
  const selectProps = {
    ...downshiftProps,
    items,
    itemToString,
    initialSelectedItem,
    onSelectedItemChange,
  };

  // only set selectedItem if the prop is defined. Setting if it is undefined
  // will overwrite default selected items from useSelect
  if (controlledSelectedItem !== undefined) {
    selectProps.selectedItem = controlledSelectedItem;
  }

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
  } = useSelect(selectProps);
  const inline = type === 'inline';

  const className = cx(`${prefix}--dropdown`, containerClassName, {
    [`${prefix}--dropdown--invalid`]: invalid,
    [`${prefix}--dropdown--open`]: isOpen,
    [`${prefix}--dropdown--inline`]: inline,
    [`${prefix}--dropdown--disabled`]: disabled,
    [`${prefix}--dropdown--light`]: light,
    [`${prefix}--dropdown--${size}`]: size,
    [`${prefix}--list-box--up`]: direction === 'top',
  });

  const titleClasses = cx(`${prefix}--label`, {
    [`${prefix}--label--disabled`]: disabled,
  });

  const helperClasses = cx(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });

  const wrapperClasses = cx(
    `${prefix}--dropdown__wrapper`,
    `${prefix}--list-box__wrapper`,
    {
      [`${prefix}--dropdown__wrapper--inline`]: inline,
      [`${prefix}--list-box__wrapper--inline`]: inline,
      [`${prefix}--dropdown__wrapper--inline--invalid`]: inline && invalid,
      [`${prefix}--list-box__wrapper--inline--invalid`]: inline && invalid,
    }
  );

  // needs to be Capitalized for react to render it correctly
  const ItemToElement = itemToElement;

  const helper = helperText ? (
    <div className={helperClasses}>{helperText}</div>
  ) : null;

  function onSelectedItemChange({ selectedItem }) {
    if (onChange) {
      onChange({ selectedItem });
    }
  }

  return (
    <div className={wrapperClasses}>
      {titleText && (
        <label className={titleClasses} {...getLabelProps()}>
          {titleText}
        </label>
      )}
      <ListBox
        aria-label={ariaLabel}
        size={size}
        className={className}
        invalid={invalid}
        invalidText={invalidText}
        light={light}
        isOpen={isOpen}
        id={id}>
        {invalid && (
          <WarningFilled16 className={`${prefix}--list-box__invalid-icon`} />
        )}
        <button
          className={`${prefix}--list-box__field`}
          disabled={disabled}
          aria-disabled={disabled}
          {...getToggleButtonProps()}>
          <span className={`${prefix}--list-box__label`}>
            {selectedItem ? itemToString(selectedItem) : label}
          </span>
          <ListBox.MenuIcon isOpen={isOpen} translateWithId={translateWithId} />
        </button>
        <ListBox.Menu {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => {
              const itemProps = getItemProps({ item, index });
              return (
                <ListBox.MenuItem
                  key={itemProps.id}
                  isActive={selectedItem === item}
                  isHighlighted={
                    highlightedIndex === index || selectedItem === item
                  }
                  title={itemToElement ? item.text : itemToString(item)}
                  {...itemProps}>
                  {itemToElement ? (
                    <ItemToElement key={itemProps.id} {...item} />
                  ) : (
                    itemToString(item)
                  )}
                  {selectedItem === item && (
                    <Checkmark16
                      className={`${prefix}--list-box__menu-item__selected-icon`}
                    />
                  )}
                </ListBox.MenuItem>
              );
            })}
        </ListBox.Menu>
      </ListBox>
      {!inline && !invalid && helper}
    </div>
  );
}

Dropdown.propTypes = {
  /**
   * Disable the control
   */
  disabled: PropTypes.bool,

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: PropTypes.array.isRequired,

  /**
   * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
   * from their collection that are pre-selected
   */
  initialSelectedItem: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),

  /**
   * Specify a custom `id`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether you want the inline version of this control
   */
  inline: PropTypes.bool,

  /**
   * Specify if the currently selected value is invalid.
   */
  invalid: PropTypes.bool,

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText: PropTypes.string,

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list.
   */
  itemToString: PropTypes.func,

  /**
   * Function to render items as custom components instead of strings.
   * Defaults to null and is overriden by a getter
   */
  itemToElement: PropTypes.func,

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component what kind of internal state changes are occuring.
   */
  onChange: PropTypes.func,

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: PropTypes.node.isRequired,

  /**
   * Callback function for translating ListBoxMenuIcon SVG title
   */
  translateWithId: PropTypes.func,

  /**
   * 'aria-label' of the ListBox component.
   */
  ariaLabel: PropTypes.string,

  /**
   * The dropdown type, `default` or `inline`
   */
  type: ListBoxPropTypes.ListBoxType,

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `lg` or `xl` as an option.
   */
  size: ListBoxPropTypes.ListBoxSize,

  /**
   * In the case you want to control the dropdown selection entirely.
   */
  selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

  /**
   * `true` to use the light version.
   */
  light: PropTypes.bool,

  /**
   * Provide the title text that will be read by a screen reader when
   * visiting this control
   */
  titleText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Provide helper text that is used alongside the control label for
   * additional help
   */
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Specify the direction of the dropdown. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Additional props passed to Downshift
   */
  downshiftProps: PropTypes.object,
};

Dropdown.defaultProps = {
  disabled: false,
  type: 'default',
  itemToString: defaultItemToString,
  itemToElement: null,
  light: false,
  titleText: '',
  helperText: '',
  direction: 'bottom',
};

export default Dropdown;
