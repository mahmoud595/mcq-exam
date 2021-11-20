import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { styled } from "@mui/material/styles";
import {
  Grid,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { randomArrayShuffle } from "../../utils/helperFunctions";
import { getAnswer, createExam } from "../../store/actions/questionsActions";

const Exam = styled(Grid)(({ theme }) => ({
  background: "#fff",
  borderRadius: "10px",
  padding: "5.5em",
  display: "flex",
  marginTop: 30,
  boxShadow: " rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;",
  flexDirection: "column",
  width: "50%",
  "@media (max-width:960px)": {
    width: "90%",
    padding: "3.3em",
  },
  "& .questionHeader": {
    textAlign: "center",
  },
  "& .question": {
    fontSize: "1.6em",
    fontWeight: 600,
    color: theme.palette.primary.main,
    margin: "30px 0",
  },
  "& .btn": {
    borderRadius: 20,
    marginTop: 20,
    color: "#fff",
    fontSize: "1.2em",
    width: "9em",
    margin: "30px auto 0",
    "& :disabled": {
      background: "#D0D0D0",
    },
  },
  "& .formControl": {
    "& .MuiFormControlLabel-label ": {
      fontSize: "1.6em",
    },
  },
  "& .radioGroup": {
    width: "fit-content",
  },
}));

export const ExamPage = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [end, setEnd] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const questions = useSelector(({ questions }) => questions.questions);
  const dispatch = useDispatch();
  const router = useRouter();
  const clickHandler = () => {
    dispatch(getAnswer(selectedAnswer, questions[questionNumber].id));

    if (!end && selectedAnswer) {
      setQuestionNumber(questionNumber + 1);
    } else if (end) {
      router.push("/result");
    }
    setSelectedAnswer("");
  };
  useEffect(() => {
    dispatch(createExam());
  }, []);
  useEffect(() => {
    if (questionNumber === questions.length - 1) {
      setEnd(true);
    }
  }, [questionNumber]);
  useEffect(() => {
    questions.length &&
      setAnswers(randomArrayShuffle(questions[questionNumber]?.answers));
  }, [questions, questionNumber]);

  const answerHandler = (answerId) => {
    setSelectedAnswer(answerId);
  };
  return (
    <Exam item>
      <Typography className="question">
        {questionNumber + 1}) {questions[questionNumber]?.question}
      </Typography>
      <RadioGroup value={selectedAnswer} className="radioGroup">
        {answers.map((answer) => (
          <FormControlLabel
            key={answer.id}
            value={answer.id}
            control={<Radio onChange={() => answerHandler(answer.id)} />}
            label={answer.text}
            className="formControl"
          />
        ))}
      </RadioGroup>
      <Button
        className="btn"
        onClick={clickHandler}
        disabled={selectedAnswer ? false : true}
        sx={{
          background: end ? "#008000 " : "#0052cc ",
          "&:hover": {
            background: end ? "#008000 " : "#0052cc ",
          },
        }}
      >
        {end ? "Results" : "Next"}
      </Button>
    </Exam>
  );
};
