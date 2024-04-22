import { FormEventHandler, useCallback, useState } from 'react';
import { SelectQuestion } from '~/db/schemas';

export function useRunner(questions: SelectQuestion[]) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [checked, setChecked] = useState<number[]>([]);
  const [result, setResult] = useState<boolean | null>(null);
  //
  const question = questions[current];
  //
  const softReset = useCallback(() => {
    setShowResult(false);
    setChecked([]);
    setResult(null);
  }, []);
  //
  const hardReset = useCallback(() => {
    setCurrent(0);
    setScore(0);
    softReset();
  }, [softReset]);
  //
  const onConfirm: FormEventHandler = (e) => {
    e.preventDefault();
    if (showResult) {
      setCurrent((v) => v + 1);
      softReset();
    } else {
      const rightAnswerIndexes = question.answers
        .filter(({ isRight }) => isRight)
        .map((_, i) => i);
      const userIsRight =
        JSON.stringify(checked) === JSON.stringify(rightAnswerIndexes);
      if (userIsRight) setScore((s) => s + 1);
      setResult(userIsRight);
      setShowResult(true);
    }
  };
  //
  const onToggle = (answerIndex: number) => {
    const copy = [...checked];
    const index = copy.indexOf(answerIndex);
    if (index >= 0) {
      copy.splice(index, 1);
      setChecked(copy);
    } else {
      copy.push(answerIndex);
      setChecked(copy);
    }
  };
  //
  return {
    question,
    score,
    checked,
    result,
    hardReset,
    onToggle,
    onConfirm,
  };
}
