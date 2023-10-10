import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { useFormAndValidation } from "../../hooks/useForm";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css';

export const FibonacciPage: React.FC = () => {

  const {values, handleChange} = useFormAndValidation();
  const [loader, setLoader] = useState(false);
  const [circles, setCircles] = useState<number[]>([]);

  const fib = (n: number, memo: Map<number, number> = new Map<number, number>()): number => {
    if (n in memo) {
      return memo.get(n)!;
    }
    if (n <= 2) {
      return 1;
    }
    memo.set(n,fib(n - 1, memo) + fib(n - 2, memo));
    
    return memo.get(n)!;
}; 

const getFibonacciNumbers = (n: number): number[] => {
  const numbers: number[] = [1,1];
  for (let i = 2; i < n; i++) {
    //if(i<=2) numbers[i-1] = 1;
    //else
         numbers[i] = numbers[i - 1] + numbers[i - 2];
  }
  return numbers;
};

const begin = async (e:React.FormEvent<HTMLFormElement>) =>{

  e.preventDefault();
  setLoader(true);
  circles.length = 0;
  setCircles([]);
  const nums: Map<number, number> = new Map<number,number>();
  nums.set(1,1);
  nums.set(2,1);

  fib(parseInt(values["number"]), nums);
  
  console.log(getFibonacciNumbers(parseInt(values["number"])));
  const getWithDelay = async (i:number) => new Promise<{val: number, key: number}>((resolve)=>{
    setTimeout(()=>{
      resolve({val:nums.get(i)!, key:i!});
    }, SHORT_DELAY_IN_MS);
  })

  for(let i = 1; i <= nums.size; i++){

    await getWithDelay(i).then(res=>{
      circles.push(res.val);  
      setCircles([...circles]);
    });
  }
  setLoader(false);

};

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <div className = { styles.wrapper }>
        <form className = { styles.form } onSubmit = {begin}>
          <Input
              min={ 1 }
              max = { 19 }
              type = "number"
              isLimitText = { true }
              name="number"
              value = { values['number']??""}
              onInput = { handleChange }
          />
       <Button
              text = "Рассчитать"
              type = "submit"
              isLoader = { loader }
              disabled = { false }
        />
        </form>
        <div className = { styles.circles }>
          {circles.map((val, i) => {
            return (
                <Circle
                    letter = { val.toString() }
                    key = { i }
                    index = { i }
                />);
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
