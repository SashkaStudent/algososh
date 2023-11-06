import React, { useEffect, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useFormAndValidation } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./stack";
import styles from "./stack-page.module.css";

interface IStringStatePair {
  string: string;
  state: ElementStates;
}

enum Job {
  none,
  add,
  remove
}

export const StackPage: React.FC = () => {

  const { values, handleChange, setValues } = useFormAndValidation();
  const [currentJob, setCurrentJob] = useState<Job>(Job.none);
  const [circles, setCircles] = useState<IStringStatePair[]>([])

  useEffect(()=> setValues({string:""}),[])

  const setCirclesWithDelay = async (array: IStringStatePair[], ms:number = SHORT_DELAY_IN_MS) => {

    return new Promise(resolve => {
      setTimeout(() => {
        setCircles([...array]);
        resolve(true);
      }, ms);

    });

  }

  const stack = new Stack<string>();

  const handleAdd = async ()=>{
    setCurrentJob(Job.add)
    stack.push(values['string']);
    setValues({string:""})
    circles.push({
      string: stack.peak()!,
      state: ElementStates.Changing,
    });
    await setCirclesWithDelay([...circles],0);
    circles[circles.length-1].state = ElementStates.Default;
    await setCirclesWithDelay([...circles]);
    setCurrentJob(Job.none)

  }

  const handleRemove = async ()=>{
    setCurrentJob(Job.remove)

    circles[circles.length-1].state = ElementStates.Changing;
    setCircles([...circles]);
    stack.pop();
    circles.pop();
    await setCirclesWithDelay([...circles]);
    setCurrentJob(Job.none)

  }
  
  const handleClear = ()=>{
    stack.clear();
    setCircles([]);
    setCurrentJob(Job.none)

  }


  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={(e)=>{e.preventDefault(); values['string'].length > 0 && handleAdd()}}>
          <Input isLimitText maxLength={4} name='string' onChange={handleChange} value={values['string']??''} placeholder="Введите текст" />
          <Button disabled={values['string'] === '' || currentJob != Job.none && currentJob != Job.add} onClick={handleAdd} isLoader={currentJob == Job.add} type="button" text="Добавить" />
          <Button disabled={circles.length==0 || currentJob != Job.none && currentJob != Job.remove} onClick={handleRemove} isLoader={currentJob == Job.remove} type="button" text="Удалить" />
          <Button disabled={circles.length==0 || currentJob != Job.none} onClick={handleClear} type="button" text="Очистить" />
        </form>

        <div className={styles.circles}>
          {circles.map((item, index) => (
              
                <Circle
                    key={index}
                    state={item.state}
                    letter={item.string || ''}
                    index={index}
                    head={circles.length - 1 === index ? 'top' : ''}
                />
             
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
