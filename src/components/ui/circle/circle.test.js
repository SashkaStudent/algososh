import { render } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";


describe("Тестирование react-компонента Circle", () => {
  it("Элемент без буквы", () => {
    const circleWithoutLetter = render(<Circle />);
    expect(circleWithoutLetter).toMatchSnapshot();
  });


  it("Элемент с буквами", () => {
    const circleWithLetters = render(<Circle letter="test" />);
    expect(circleWithLetters).toMatchSnapshot();
  });


  it("Элемент с head", () => {
    const circleHead = render(<Circle head="head" />);
    expect(circleHead).toMatchSnapshot();
  });

  it("Элемент с react-элементом в head", () => {
    const circleElementHead = render(<Circle head={<Circle />} />);
    expect(circleElementHead).toMatchSnapshot();
  });

  it("Элемент с tail", () => {
    const circleTail = render(<Circle tail="tail" />);
    expect(circleTail).toMatchSnapshot();
  });

  it("Элемент с react-элементом в tail", () => {
    const circleElementTail = render(<Circle tail={<Circle />} />);
    expect(circleElementTail).toMatchSnapshot();
  });

  it("Элемент с index", () => {
    const circleIndex = render(<Circle index={0} />);
    expect(circleIndex).toMatchSnapshot();
  });

  it("Элемент с свойством isSmall", () => {
    const circleIsSmall = render(<Circle isSmall={true} />);
    expect(circleIsSmall).toMatchSnapshot();
  });

  it("Элемент в состоянии default", () => {
    const circleDefault = render(<Circle state={ElementStates.Default} />);
    expect(circleDefault).toMatchSnapshot();
  });

  it("Элемент в состоянии changing", () => {
    const circleChanging = render(<Circle state={ElementStates.Changing} />);
    expect(circleChanging).toMatchSnapshot();
  });

  it("Элемент в состоянии modified", () => {
    const circleModified = render(<Circle state={ElementStates.Modified} />);
    expect(circleModified).toMatchSnapshot();
  });
});