import React from 'react';
import AddContact from './AddContact';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<AddContact />).toJSON();
  expect(tree).toMatchSnapshot();
});

// renders 1 input field for email

// state changes when text in input changes

// autocapitalize is off

// placeholder = email

// font 16 & heigh 40

// renders button called Add Contact

// callback is made on click

// handleAdd calls addNewContact and resets email to blank

// renders error types
