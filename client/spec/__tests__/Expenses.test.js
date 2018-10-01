import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

//Uncomment when using Redux and Passing state from store
//import configureStore from 'redux-mock-store'; //Smart components

import Expenses from '../../src/components/Expenses.jsx';

describe('<Expenses />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const component = shallow(<Expenses />);
      expect(toJson(component)).toMatchSnapshot();
    })
  })
})