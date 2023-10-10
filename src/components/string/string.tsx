import React, { useState } from "react";
import styles from './string.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { useFormAndValidation } from "../../hooks/useForm";
import { DELAY_IN_MS } from "../../constants/delays";

interface ICharStatePair {
    char: string;
    state?: ElementStates;
}

export const StringComponent: React.FC = () => {

    const {values, handleChange} = useFormAndValidation();
    const [loader, setLoader] = useState(false);
    const [circles, setCircles] = useState<ICharStatePair[]>([])

    async function begin(e:React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const arr: ICharStatePair[] = values["string"].split('').map(item => {
        return {
            char: item,
            state: ElementStates.Default
        }
      })
      
      setCircles(arr);
      setLoader(true);


      for (let i = 0; i < arr.length / 2; i++) {
        const start = i;
        const end = arr.length - 1 - start;

       await select(arr, start, end)
       .then(res => modify(res, start, end));
      }

      setLoader(false);
      

    }

    async function select(array:ICharStatePair[], start: number, end:number) {
      return new Promise<ICharStatePair[]>((resolve) => {

        array[start].state = ElementStates.Changing;
        array[end].state = ElementStates.Changing;
        setCircles([...array]); 

        setTimeout(() => 
        {
          resolve(array)
        }, DELAY_IN_MS);
      });
    }

    async function modify(array:ICharStatePair[], start: number, end:number) {
      
      let swapped = array[start].char;
      array[start] = {
          char: array[end].char,
          state: ElementStates.Modified,
      };
      array[end] = {
          char: swapped,
          state: ElementStates.Modified,
      }
      setCircles([...array]);
    }

  return (
    <SolutionLayout title="Строка">
        <div className={styles.wrapper}>

            <form className={styles.form} onSubmit={begin}>
                <Input name="string" value={values["string"]??""} maxLength={11} isLimitText={true} onChange={handleChange}/>
                <Button type="submit" text="Развернуть" isLoader={loader} disabled = { values["string"]?.length < 2 }/>
            </form>

            <div className={styles.circles}>
                {circles.map((item, i) => 
                  <Circle key={i} letter={item.char} state={item.state}/>
                )}
            </div>

        </div>
    </SolutionLayout>
  );
};