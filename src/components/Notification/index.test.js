import React from "react"
import renderer from "react-test-renderer"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { Notification } from "./index"
import Context from "./context"
import Header from "./Header"
import Body from "./Body"
import Action from "./Action"
import { Wrapper } from "./Styled"

Enzyme.configure({ adapter: new Adapter() })

describe("<Notification/>", () => {

    let wrapper;

    const data = {
        title: "System updates",
        subtitle: "This is related to your OS",
        message: "Your operating system is missing some files, please reboot your PC and upgrade your system."
    }

    const style = {
        rounded: true,
        animation: "left2right",
        duration: 1
    }

    const action = {
        name: "Reboot",
        event: () => alert("Reboot")
    }

    const props = {
        autohide: true,
        type: "info",
        data: data,
        style: style,
        action: action
    }

    beforeEach(() => {
        jest.useFakeTimers();
        wrapper = mount(<Notification {...props} />);
    });

    it('should hide the Notification after 5 seconds', () => {
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
    });

    it('allows us to set props', () => {
        expect(wrapper.props().type).toBe('info');
        wrapper.setProps({ type: 'warning' });
        expect(wrapper.props().type).toBe('warning');

        expect(wrapper.props().data).toBe(data);
        expect(wrapper.props().style).toBe(style);
        expect(wrapper.props().action).toBe(action);
    });

    it('renders children when passed in', () => {
        const { type } = props;
        const { title, subtitle, message } = data;
        const { animation, rounded, duration } = style;
        const { name, event } = action;

        expect(wrapper.contains(
            <Wrapper
                type={type}
                animation={animation}
                rounded={rounded}
                duration={duration}>
                <Header title={title} subtitle={subtitle} />
                <Body message={message} />
                <Action name={name} onClick={event} />
            </Wrapper>)).toBeTruthy();
    });

    //  Undirect test for withProvider.js
    it("should return a Notification with a context provider", () => {
        expect(wrapper.find(<Context.Provider value={{ type: "info" }} >
            <Notification {...props} />
        </Context.Provider>)).toBeTruthy();
    });

    test("has a valid snapshot", () => {
        const component = renderer.create(<Notification {...props} />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});