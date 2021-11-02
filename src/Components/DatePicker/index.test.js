import React from 'react';

import {shallow, mount} from 'enzyme';

import DatePickers from './index';

describe('DatePickers Component', () => {
    it('should to be MM/yyyy when type isn`t date', () => {
        const mockFunc = jest.fn();

        const wrapper = shallow(
            <DatePickers
                id={2}
                label={'Date Test'}
                name={'tesname'}
                type="date"
                date=""
                value={new Date()}
                disabled={false}
                setDateValue={mockFunc}
            />
        )
        expect(wrapper.props().children.props.children.props.format).toEqual('dd/MM/yyyy')
        wrapper.setProps({type: 'year'})
        expect(wrapper.props().children.props.children.props.format).toEqual('MM/yyyy')
    })
})
