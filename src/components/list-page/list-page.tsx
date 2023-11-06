import React, { useEffect, useState } from "react";
import { useFormAndValidation } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list-page.module.css';
import { LinkedList } from "./list";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

type TItemStatePair<T> = {
  item: T;
  state: ElementStates;
};

type TCircle = TItemStatePair<string> & {
  head?: boolean;
  tail?: boolean;
  isAdded?: boolean;
  isRemoved?: boolean;
  newCircle?: {
    item: string;
  } | null;
};

enum Job {
  none,
  addHead,
  addTail,
  removeHead,
  removeTail,
  addByIndex,
  removeByIndex
}

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useFormAndValidation();
  const [linked, setLinked] = useState<LinkedList<string>>(new LinkedList<string>(['0', '1', '2', '3']));
  const [currentJob, setCurrentJob] = useState<Job>(Job.none);
  const [circles, setCircles] = useState<TCircle[]>([3, 2, 1, 0].map((item, index, array) =>
  ({
    item: item.toString(),
    state: ElementStates.Default,
    head: index == 0,
    tail: index == array.length - 1,
    isAdded: false,
    isRemoved: false,
    newCircle: null,
  })));
  useEffect(() => {
    setValues({ string: '', number: '' });
  }, []);
  const setCirclesWithDelay = async (array: TCircle[], ms: number = SHORT_DELAY_IN_MS) => {

    return new Promise(resolve => {
      setTimeout(() => {
        setCircles([...array]);
        resolve(true);
      }, ms);
    });
  }
  const handleAddHead = async () => {
    setValues({ string: '', number: '' });

    setCurrentJob(Job.addHead);
    circles.length == 0 &&
      (circles[0] = { item: "", state: ElementStates.Default, head: false, isAdded: true, newCircle: { item: values['string'] } });

    circles[0] = { ...circles[0], head: false, isAdded: true, newCircle: { item: values['string'] } };
    await setCirclesWithDelay([...circles], 0)


    linked.prepend(values['string']);
    circles.length = 0;
    for (let i = 0; i < linked.getSize(); i++) {
      const circle: TCircle = {
        item: linked.getSize() > 0 ? linked.getNodeByIndex(i)!.toString() : "",
        state: ElementStates.Default,
        head: i == 0,
        tail: i == linked.getSize() - 1,
        isAdded: false,
        isRemoved: false,
      };

      circles.push(circle);
    }

    circles[0].state = ElementStates.Modified;
    await setCirclesWithDelay([...circles], DELAY_IN_MS);

    circles[0].state = ElementStates.Default;
    await setCirclesWithDelay([...circles], DELAY_IN_MS);
    setCurrentJob(Job.none);

  };


  const handleAddTail = async () => {
    setValues({ string: '', number: '' });

    setCurrentJob(Job.addTail);
    circles[circles.length - 1] = { ...circles[circles.length - 1], head: false, isAdded: true, newCircle: { item: values['string'] } };
    await setCirclesWithDelay([...circles], 0)

    linked.append(values['string']);
    circles.length = 0;

    for (let i = 0; i < linked.getSize(); i++) {
      const circle: TCircle = {
        item: linked.getSize() > 0 ? linked.getNodeByIndex(i)!.toString() : "",
        state: ElementStates.Default,
        head: i == 0,
        tail: i == linked.getSize() - 1,
        isAdded: false,
        isRemoved: false,
      };

      circles.push(circle);
    }

    circles[circles.length - 1].state = ElementStates.Modified;
    await setCirclesWithDelay([...circles], DELAY_IN_MS);

    circles[circles.length - 1].state = ElementStates.Default;
    await setCirclesWithDelay([...circles], DELAY_IN_MS);

    setCurrentJob(Job.none);
  };

  const handleRemoveHead = async () => {
    setValues({ string: '', number: '' });
    setCurrentJob(Job.removeHead);
    circles[0] = { ...circles[0], item: "", head: false, tail: false, isRemoved: true, newCircle: { item: circles[0].item } };
    await setCirclesWithDelay([...circles], 0)

    linked.deleteHead();
    circles.length = 0;
    for (let i = 0; i < linked.getSize(); i++) {
      const circle: TCircle = {
        item: linked.getNodeByIndex(i)!.toString(),
        state: ElementStates.Default,
        head: i == 0,
        tail: i == linked.getSize() - 1,
        isAdded: false,
        isRemoved: false,
      };

      circles.push(circle);
    }

    await setCirclesWithDelay([...circles], DELAY_IN_MS);

    setCurrentJob(Job.none);
  };
  const handleRemoveTail = async () => {
    setValues({ string: '', number: '' });
    setCurrentJob(Job.removeTail);
    circles[circles.length - 1] =
    {
      ...circles[circles.length - 1],
      item: "",
      head: false,
      tail: false,
      isRemoved: true,
      newCircle: { item: circles[circles.length - 1].item }
    };
    await setCirclesWithDelay([...circles], 0)

    linked.deleteTail();
    circles.length = 0;
    for (let i = 0; i < linked.getSize(); i++) {
      const circle: TCircle = {
        item: linked.getNodeByIndex(i)!.toString(),
        state: ElementStates.Default,
        head: i == 0,
        tail: i == linked.getSize() - 1,
        isAdded: false,
        isRemoved: false,
      };

      circles.push(circle);
    }

    await setCirclesWithDelay([...circles], DELAY_IN_MS);
    setCurrentJob(Job.none);

  };


  const handleAddByIndex = async () => {
    setCurrentJob(Job.addByIndex);
    setValues({ string: '', number: '' });

    const index = parseInt(values['number']);
    for (let i = 0; i <= index; i++) {
      circles.length == 0 &&
        (circles[0] = { item: "", state: ElementStates.Default, head: false, isAdded: true, newCircle: { item: values['string'] } });

      i > 0 && (circles[i - 1] = { ...circles[i - 1], isAdded: false, newCircle: { item: "" } });

      circles[i] = {
        ...circles[i],
        state: i != index ? ElementStates.Changing : ElementStates.Default,
        isAdded: true,
        newCircle: { item: values['string'] ?? "" }
      };
      await setCirclesWithDelay([...circles])
    }

    linked.insertAt(values['string'], index);
    circles.length = 0;

    for (let i = 0; i < linked.getSize(); i++) {
      const circle: TCircle = {
        item: linked.getNodeByIndex(i)!.toString(),
        state: ElementStates.Default,
        head: i == 0,
        tail: i == linked.getSize() - 1,
        isAdded: false,
        isRemoved: false,
      };

      circles.push(circle);
    }

    circles[index] = {
      ...circles[index],
      state: ElementStates.Modified,
      isAdded: false,
      newCircle: { item: "" }
    };

    await setCirclesWithDelay([...circles]);

    circles[index].state = ElementStates.Default;
    await setCirclesWithDelay([...circles]);
    setCurrentJob(Job.none);

  };

  const handleRemoveByIndex = async () => {
    setValues({ string: '', number: '' });
    setCurrentJob(Job.removeByIndex);
    const index = parseInt(values['number']);
    for (let i = 0; i <= index; i++) {
      circles[i] = {
        ...circles[i],
        state: ElementStates.Changing,
        newCircle: { item: circles[index]?.item ?? "" }
      };
      await setCirclesWithDelay([...circles])
    }

    circles[index] = {
      ...circles[index],
      head: false,
      tail: false,
      state: ElementStates.Default,
      item: "",
      newCircle: { item: circles[index]?.item ?? "" },
      isRemoved: true,
    };
    await setCirclesWithDelay([...circles])

    linked.deleteByIndex(index);
    circles.length = 0;

    for (let i = 0; i < linked.getSize(); i++) {
      const circle: TCircle = {
        item: linked.getNodeByIndex(i)!.toString(),
        state: ElementStates.Default,
        head: i == 0,
        tail: i == linked.getSize() - 1,
        isAdded: false,
        isRemoved: false,
      };

      circles.push(circle);
    }

    await setCirclesWithDelay([...circles]);
    setCurrentJob(Job.none);

  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.wrapper}>
        <Input
          placeholder="Введите значение"
          onChange={handleChange}
          maxLength={4}
          isLimitText
          name='string'
          value={values['string'] ?? ''}
          disabled={circles.length > 5}
        />
        <Button
          extraClass={styles.btn}
          text={"Добавить в head"}
          onClick={handleAddHead}
          disabled={currentJob != Job.none && currentJob != Job.addHead || values['string']?.length == 0
          }
          isLoader={currentJob == Job.addHead}
        />
        <Button
          extraClass={styles.btn}
          text={"Добавить в tail"}
          onClick={handleAddTail}
          disabled={currentJob != Job.none && currentJob != Job.addTail || values['string']?.length == 0}
          isLoader={currentJob == Job.addTail}
        />
        <Button
          extraClass={styles.btn}
          text={"Удалить из head"}
          onClick={handleRemoveHead}
          disabled={currentJob != Job.none && currentJob != Job.removeHead || linked.getSize() == 0
          }
          isLoader={currentJob == Job.removeHead}
        />
        <Button
          extraClass={styles.btn}
          text={"Удалить из tail"}
          onClick={handleRemoveTail}
          disabled={currentJob != Job.none && currentJob != Job.removeTail || linked.getSize() == 0
          }
          isLoader={currentJob == Job.removeTail}
        />
      </div>
      <div className={styles.wrapper}>
        <Input
          placeholder="Введите индекс"
          type={"number"}
          max={circles.length - 1}
          min={0}
          name='number'
          value={values['number'] ?? ''}
          onChange={handleChange}
        />
        <Button
          extraClass={styles.btnIndex}
          text={"Добавить по индексу"}
          onClick={handleAddByIndex}
          disabled={currentJob != Job.none && currentJob != Job.addByIndex || values['string']?.length == 0 || values['number'] == ""
            || parseInt(values['number']) > linked.getSize() || parseInt(values['number']) < 0
          }
          isLoader={currentJob == Job.addByIndex}
        />
        <Button
          extraClass={styles.btnIndex}
          text={"Удалить по индексу"}
          onClick={handleRemoveByIndex}
          disabled={currentJob != Job.none && currentJob != Job.removeByIndex || linked.getSize() == 0 || values['number'] == ""
            || parseInt(values['number']) > linked.getSize() || parseInt(values['number']) < 0
          }
          isLoader={currentJob == Job.removeByIndex}
        />
      </div>
      <div className={styles.wrapperCircle}>
        {circles.map((item, index) => (
          <div className={styles.circle} key={index}>
            <Circle
              key={index}
              index={index}
              letter={"" + item.item}
              head={item.head ? "head" : ""}
              tail={item.tail ? "tail" : ""}
              state={item.state}
            />
            {index < circles.length - 1 && (
              <ArrowIcon
                fill={
                  item.state === ElementStates.Changing ? "#d252e1" : "#0032ff"
                }
              />
            )}

            {item.isAdded && item.newCircle?.item !== undefined && (
              <Circle
                isSmall={true}
                state={ElementStates.Changing}
                letter={"" + item.newCircle.item}
                extraClass={styles.circleAdd}
              />
            )}

            {item.isRemoved && item.newCircle?.item !== null && (
              <Circle
                isSmall={true}
                state={ElementStates.Changing}
                letter={"" + item.newCircle?.item}
                extraClass={styles.circleRemove}
              />
            )}
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
