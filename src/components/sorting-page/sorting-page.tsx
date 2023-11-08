import React, { useEffect, useState } from "react";
import styles from './sorting-page.module.css';
import { useFormAndValidation } from "../../hooks/useForm";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Column } from "../ui/column/column";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

enum SortType {
  select = "select",
  bubble = "bubble"

}

interface INumberStatePair {
  value: number;
  state: ElementStates;
}



export const SortingPage: React.FC = () => {
  const { values, handleChange, setValues } = useFormAndValidation();
  const [columns, setColumns] = useState<INumberStatePair[]>([]);
  const [currentJob, setCurrentJob] = useState<"none" | Direction>("none");

  useEffect(() => {
    setValues({ sortType: SortType.select });
    makeNewArray();
  }, []);


  async function begin(sortDirection: Direction) {
    setCurrentJob(sortDirection);

    switch (values['sortType']) {
      case SortType.select:
        selectionSort(columns, sortDirection);
        break;
      case SortType.bubble:
        bubbleSort(columns, sortDirection);
        break;
      default:
        console.error("Некорректный тип сортировки");
        break;
    }
  }

  const setColumnsWithDelay = async (array: INumberStatePair[], ms: number = SHORT_DELAY_IN_MS) => {

    return new Promise(resolve => {
      setTimeout(() => {
        setColumns([...array]);
        resolve(true);
      }, ms);

    });

  }

  const makeNewArray = () => {
    const size: number = Math.round(Math.random() * 14) + 3;
    const nums: number[] = Array.from({ length: size }, () => Math.round(Math.random() * 100));
    const newColumns: INumberStatePair[] = [];
    nums.forEach(val => newColumns.push({ value: val, state: ElementStates.Default }));
    setColumns(newColumns);
  }

  const bubbleSort = async (array: INumberStatePair[], direction: Direction) => {
    const n = array.length;
    let i, j: number;
    let temp: INumberStatePair;
    let swapped: boolean;
    for (i = 0; i < n; i++) {
      swapped = false;
      for (j = 0; j < n - i - 1; j++) {

        array[j].state = ElementStates.Changing;
        array[j + 1].state = ElementStates.Changing;
        await setColumnsWithDelay(array);

        if (direction === Direction.Ascending ?
          array[j].value > array[j + 1].value :
          array[j].value < array[j + 1].value) {

          temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          swapped = true;
        }

        array[j].state = ElementStates.Default;
        array[j + 1].state = ElementStates.Default;

      }

      array[n - i - 1].state = ElementStates.Modified;

      if (swapped == false) {
        array.forEach(item => item.state = ElementStates.Modified);
        break;
      }
    }

    setColumns([...array]);
    setCurrentJob("none");


  }

  const selectionSort = async (array: INumberStatePair[], direction: Direction) => {
    const n: number = array.length;
    let i, j, minIndex: number;
    for (i = 0; i < n - 1; i++) {
      minIndex = i;
      array[i].state = ElementStates.Changing;


      for (j = i + 1; j < n; j++) {
        array[j].state = ElementStates.Changing;
        await setColumnsWithDelay(array);
        if (direction === Direction.Ascending ?
          array[j].value < array[minIndex].value :
          array[j].value > array[minIndex].value)
          minIndex = j;
        array[j].state = ElementStates.Default;

      }


      array[i].state = ElementStates.Default;

      let temp = array[minIndex];
      array[minIndex] = array[i];
      array[i] = temp;
      array[i].state = ElementStates.Modified;

    }
    array[n - 1].state = ElementStates.Modified;

    setColumns([...array]);
    setCurrentJob("none");

  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div data-testid="sorting-page" className={styles.wrapper}>
        <form className={styles.form}>
          <div className={styles.radioWrapper}>
            <RadioInput
              defaultChecked
              label="Выбор"
              value={SortType.select}
              name={"sortType"}
              onChange={handleChange}
            />
            <RadioInput
              label="Пузырёк"
              value={SortType.bubble}
              name={"sortType"}
              onChange={handleChange}
            />
          </div>
          <div className={styles.sorting}>
            <Button data-testid="asc-button"
              text="По возрастанию"
              sorting={Direction.Descending}
              onClick={() => begin(Direction.Ascending)}
              isLoader={currentJob == Direction.Ascending}
              disabled={currentJob != "none" && currentJob != Direction.Ascending}
              extraClass={styles.button}
            />
            <Button data-testid="desc-button"
              text="По убыванию"
              sorting={Direction.Ascending}
              onClick={() => begin(Direction.Descending)}
              isLoader={currentJob == Direction.Descending}
              disabled={currentJob != "none" && currentJob != Direction.Descending}
              extraClass={styles.button}
            />
          </div>

          <Button
            data-testid="make-new-array-button"
            text="Новый массив"
            onClick={makeNewArray}
            extraClass={styles.button}
            disabled={currentJob != "none"}
          />
        </form>
        <div data-testid="columns" className={styles.columns}>
          {columns.map((element, i) => {
            return (
              <div data-testid="column" key={i}>
                <Column
                  index={element.value}
                  state={element.state}
                  extraClass={styles.column}
                />
              </div>
            );
          })}
        </div>
      </div>

    </SolutionLayout>
  );
};
