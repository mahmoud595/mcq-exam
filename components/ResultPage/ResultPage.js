import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTotalScore } from "../../store/actions/questionsActions";
export const ResultPage = () => {
  const dispatch = useDispatch();
  const { totalScore, totalQuestions } = useSelector(({ questions }) => {
    const { questions: totalQuestions, totalScore } = questions;
    return {
      totalQuestions,
      totalScore,
    };
  });
  useEffect(() => {
    dispatch(getTotalScore());
  }, []);
  return (
    <h1>
      {" "}
      Your Result is {totalScore} / {totalQuestions.length * 10}
    </h1>
  );
};