import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useFormAndValidation } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./queue";
import styles from "./queue-page.module.css"

interface ICircle {
  head: boolean;
  tail: boolean;
  string: string;
  state: ElementStates;
}

export const QueuePage: React.FC = () => {
  const queueSize = 7;
  const { values, handleChange, setValues } = useFormAndValidation();
  const [circles, setCircles] = useState<ICircle[]>([]);
  const [queue] = useState<Queue<string>>(new Queue<string>(queueSize));

  
  const setCirclesWithDelay = async (array: ICircle[], ms: number = SHORT_DELAY_IN_MS) => {

    return new Promise(resolve => {
      setTimeout(() => {
        setCircles([...array]);
        resolve(true);
      }, ms);
    });

  }

  const makeEmptyCircles = (): ICircle[] => {
    const initCircles: ICircle[] = [];
    for (let i = 0; i < queueSize; i++)
      initCircles.push({ head: false, tail: false, string: '', state: ElementStates.Default });
    return initCircles;
  }

  useEffect(() => {
    setValues({ string: '' });
    setCircles(makeEmptyCircles());
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    values['string'].length && handleEnqueue();
  }

  const handleEnqueue = async () => {
    const tailIndex = !queue.isEmpty() ? queue.getTail().index : 0;

    if (tailIndex + 1 != queueSize) {

      queue.enqueue(values['string']);
      setValues({string:""})

      circles[queue.getHead().index] = {
        head: true,
        tail: false,
        state: ElementStates.Default,
        string: queue.getHead().value || '',
      };

      queue.getTail().index > 0 && (circles[queue.getTail().index - 1].tail = false);

      circles[queue.getTail().index] = {
        ...circles[queue.getTail().index],
        tail: true,
        string: queue.getTail().value || '',
        state: ElementStates.Changing,
      };

      setCircles([...circles]);
      circles[queue.getTail().index] = {
        ...circles[queue.getTail().index],
        state: ElementStates.Default,
      };
      await setCirclesWithDelay([...circles]);

    }

  };

  const handleDequeue = async () => {

    if (queue.getHead().index === queue.getTail().index) {
      circles[queue.getHead().index].state = ElementStates.Changing;
      await setCirclesWithDelay([...circles],0);
      await setCirclesWithDelay([...circles]);
      handleClear();
      return;
    }
    queue.dequeue();

    circles[queue.getHead().index - 1].state = ElementStates.Changing;
    await setCirclesWithDelay([...circles],0);

    circles[queue.getHead().index - 1].state = ElementStates.Default;

    queue.getHead().index > 0 && (circles[queue.getHead().index - 1] = 
    { head: false, 
      tail: false, 
      string: '', 
      state: ElementStates.Default 
    });

    circles[queue.getHead().index].string = queue.getHead().value || '';
    circles[queue.getHead().index].head = true;

    await setCirclesWithDelay([...circles]);
  };

  const handleClear = () => {
    queue.clear();
    setCircles(makeEmptyCircles());
  };


  return (
    <SolutionLayout title="Очередь">
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input isLimitText maxLength={4} onChange={handleChange} name="string" value={values['string'] ?? ''} placeholder="Введите текст" />
          <Button disabled={values['string'] === ''} onClick={handleEnqueue} isLoader={false} type="button" text="Добавить" />
          <Button disabled={queue.isEmpty()} onClick={handleDequeue} isLoader={false} type="button" text="Удалить" />
          <Button disabled={queue.isEmpty()} onClick={handleClear} isLoader={false} type="button" text="Очистить" />
        </form>
        <ul className={styles.circles}>
          {circles.map((item, index) => (
            <li key={index}>
              <Circle
                state={item.state ?? ElementStates.Default}
                letter={item ? item.string : ''}
                index={index}
                tail={item.tail ? 'tail' : ''}
                head={item.head ? 'head' : ''}
              />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
