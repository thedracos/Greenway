import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

//Uncomment when using Redux and Passing state from store
//import configureStore from 'redux-mock-store'; //Smart components

import EditExpense from '../../src/components/EditExpense.jsx';

describe('<EditExpense />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const component = shallow(<EditExpense />);
      expect(toJson(component)).toMatchSnapshot();
    })
  })
})