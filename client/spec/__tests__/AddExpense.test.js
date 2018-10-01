import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

//Uncomment when using Redux and Passing state from store
//import configureStore from 'redux-mock-store'; //Smart components

import AddExpense from '../../src/components/AddExpense.jsx';

describe('<AddExpense />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const component = shallow(<AddExpense />);
      expect(toJson(component)).toMatchSnapshot();
    })
  })
})