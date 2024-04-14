import CardHeader from "../components/card-header";
import QuestionForm, { QuestionFormRef } from "../components/question-form";
import { useEffect, useRef, useState } from "react";
import { QuestListResponseData, getQuestionList, questionSubmit } from "../api";
import { useNavigate } from "react-router";

export default function Questionnaire() {
  const formRef = useRef<QuestionFormRef>(null);
  const [data, setData] = useState<QuestListResponseData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getQuestionList().then((res) => {
      setData(res.list);
    });
  }, []);
  return (
    <>
      <CardHeader title="专属服务登记" />
      <div className="rounded-lg border border-solid border-[#ECE9EB] p-4">
        <QuestionForm data={data} ref={formRef} />
        <button
          className="w-full font-bold bg-[#FFC726] rounded py-2 align-center text-base shadow-lg shadow-[rgba(229,177,26,0.32)] disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={() => {
            formRef.current?.validate().then((values) => {
              questionSubmit({ answerList: values }).then(() => {
                navigate("/home");
              });
            });
          }}
        >
          提交
        </button>
      </div>
    </>
  );
}
