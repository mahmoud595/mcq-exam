import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { styled } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";

import { getTotalScore } from "../../store/actions/questionsActions";

const Result = styled(Grid)(({ theme }) => ({
  padding: 50,
  background: "#fff",
  borderRadius: 20,
  boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;",
}));
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
    <Result>
      <Typography variant="h3">
        {" "}
        Your Score is{" "}
        <span style={{ color: "#0052cc" }}>
          {" "}
          {((totalScore / (totalQuestions.length * 10)) * 100).toFixed(
            0
          )} %{" "}
        </span>
      </Typography>
    </Result>
  );
};
