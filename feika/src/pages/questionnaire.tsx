import CardHeader from "../components/card-header";
import QuestionForm, { QuestionFormRef } from "../components/question-form";
import { useEffect, useRef, useState } from "react";
import { QuestListResponseData, getQuestionList, questionSubmit } from "../api";
import { useNavigate } from "react-router";
import Spin from "../components/spin";
import { ErrorBlock } from "antd-mobile";

import BackgroundImg from "../assets/background-2.svg";

export default function Questionnaire() {
  const formRef = useRef<QuestionFormRef>(null);
  const [data, setData] = useState<QuestListResponseData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getQuestionList()
      .then((res) => {
        setData(res.list);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      <CardHeader bg={BackgroundImg} />
      {data.length === 0 && !loading ? (
        <ErrorBlock status="empty" className="my-6" />
      ) : (
        <div className="rounded-lg border border-solid border-[#ECE9EB] p-4">
          <Spin
            spinning={loading}
            className="w-full flex justify-center items-center my-6"
          >
            <QuestionForm data={data} ref={formRef} />
          </Spin>
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
      )}
    </>
  );
}
