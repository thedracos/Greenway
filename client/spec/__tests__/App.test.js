import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from '../../src/components/App.jsx';

describe('<App />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const component = shallow(<App />);
      expect(toJson(component)).toMatchSnapshot();
    })
  })
})