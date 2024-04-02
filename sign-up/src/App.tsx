import { Button, Ellipsis, Form, FormProps, Selector } from "antd-mobile";
import PickerWithTriggerElement from "./components/picker-with-trigger-element";
import Input from "./components/input";
import { ReactNode, useEffect, useState } from "react";
import Frame1 from "./assets/Frame 1.png";
import Frame1_2x from "./assets/Frame 1@2x.png";
import Frame10 from "./assets/Frame 10.png";
import Frame10_2x from "./assets/Frame 10@2x.png";
import Frame10_1 from "./assets/Frame 10(1).png";
import Frame10_1_2x from "./assets/Frame 10@2x(1).png";
import Frame11 from "./assets/Frame 11.png";
import Frame11_2x from "./assets/Frame 11@2x.png";
import Frame39 from "./assets/Frame 39.png";
import Frame39_2x from "./assets/Frame 39@2x.png";
import Frame40 from "./assets/Frame 40.png";
import Frame40_2x from "./assets/Frame 40@2x.png";
import Frame41 from "./assets/Frame 41.png";
import Frame41_2x from "./assets/Frame 41@2x.png";
import Group10 from "./assets/Group 10.png";
import Group10_2x from "./assets/Group 10@2x.png";
import Group11 from "./assets/Group 11.png";
import Group11_2x from "./assets/Group 11@2x.png";
import Group14 from "./assets/Group 14.png";
import Group14_2x from "./assets/Group 14@2x.png";
import ImgWithoutEvent from "./components/img-without-event";
import {
  QuestionListData,
  appointment,
  getConfigByCode,
  getQuestionList,
} from "./api";
import { success } from "./utils/toast";
import React from "react";

const ImageClassName =
  "w-full select-none touch-none event-none relative before:content-[''] before:inline-block before:absolute before:size-full before:left-0 before:top-0";

function App() {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [questionList, setQuestionList] = useState<QuestionListData["list"]>(
    []
  );

  const [banner, setBanner] = useState<ReactNode>();
  const [content, setContent] = useState<ReactNode>();

  const validateFields = (fields?: string[]) => {
    form.validateFields().catch((error) => {
      const errorFields = error.errorFields as {
        errors: string[];
        name: string[];
      }[];
      const needValidateFields = fields || Object.keys(form.getFieldsValue());
      const defaultErrors = needValidateFields.reduce((pre, cur) => {
        pre[cur] = "";
        return pre;
      }, {} as Record<string, string>);
      const errors = errorFields.reduce((pre, cur) => {
        const key = cur.name.join(".");
        if (needValidateFields.includes(key)) {
          pre[key] = cur.errors.join(";");
        }
        return pre;
      }, defaultErrors);
      setErrors((e) => ({ ...e, ...errors }));
    });
  };

  const onChange: FormProps["onValuesChange"] = (changedValue) => {
    validateFields(Object.keys(changedValue));
  };

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const { area, region, ...others } = values;
        return appointment({ area: area?.[0], region: region?.[0], ...others });
      })
      .then(() => {
        success("预约成功！");
      })
      .catch(() => {
        validateFields();
      });
  };

  useEffect(() => {
    getConfigByCode("BANNER").then((res) => {
      if (res.type === "IMAGE" && res.imgUrl) {
        setBanner(<ImgWithoutEvent src={res.imgUrl} alt="banner" />);
      } else if (res.type === "RICHTEXT" && res.contentHtml) {
        setBanner(
          <div
            className="w-full bg-[#F5E8E6]"
            dangerouslySetInnerHTML={{ __html: res.contentHtml }}
          />
        );
      }
    });
    getConfigByCode("CONTENT").then((res) => {
      if (res.type === "IMAGE" && res.imgUrl) {
        setContent(<ImgWithoutEvent src={res.imgUrl} alt="content" />);
      } else if (res.type === "RICHTEXT" && res.contentHtml) {
        setContent(
          <div
            className="w-full bg-[#F5E8E6]"
            dangerouslySetInnerHTML={{ __html: res.contentHtml }}
          />
        );
      }
    });
    getQuestionList().then((res) => {
      setQuestionList(res.list);
    });
  }, []);
  return (
    <div className="size-full">
      <div className="w-full h-[calc(100%-20vw)] overflow-y-auto overflow-x-hidden text-[0] scroll-smooth">
        {banner || (
          <ImgWithoutEvent
            srcSet={`${Frame1_2x} 2x, ${Frame1} 1x`}
            className={ImageClassName}
          />
        )}
        <div className="w-full bg-[#F5E8E6] pt-[24px] pb-[40px]" id="form">
          <h3 className="text-xl text-center ">仅限上海装修业主</h3>
          <Form
            form={form}
            hasFeedback={false}
            style={{
              "--border-bottom": "none",
              "--border-inner": "none",
              "--border-top": "none",
            }}
            onValuesChange={onChange}
          >
            <h4 className="pl-4">
              面积
              <span className="text-[var(--adm-color-primary)] font-[900]">
                *
              </span>
              {errors["area"] && (
                <span className="text-[--adm-color-primary] text-sm font-normal">
                  {errors["area"]}
                </span>
              )}
            </h4>
            <Form.Item
              name="area"
              rules={[{ required: true, message: "请选择" }]}
            >
              <Selector
                style={{
                  "--border-radius": "8px",
                  "--border": "1px solid #EBC3BC",
                  "--checked-color": "transparent",
                  "--checked-border": "1px solid var(--adm-color-primary)",
                  "--padding": "12px 16px",
                  "--text-color": "#333333",
                }}
                columns={2}
                options={[
                  {
                    label: "40-60平",
                    value: "40-60平",
                  },
                  {
                    label: "60-100平",
                    value: "60-100平",
                  },
                  {
                    label: "100-150平",
                    value: "100-150平",
                  },
                  {
                    label: "150平以上",
                    value: "150平以上",
                  },
                ]}
                showCheckMark={false}
              />
            </Form.Item>
            <Form.Item
              name="region"
              rules={[{ required: true, message: "请选择" }]}
            >
              <PickerWithTriggerElement
                columns={[
                  [
                    { label: "黄浦区", value: "黄浦区" },
                    { label: "徐汇区", value: "徐汇区" },
                    { label: "长宁区", value: "长宁区" },
                    { label: "静安区", value: "静安区" },
                    { label: "普陀区", value: "普陀区" },
                    { label: "虹口区", value: "虹口区" },
                    { label: "杨浦区", value: "杨浦区" },
                    { label: "宝山区", value: "宝山区" },
                    { label: "闵行区", value: "闵行区" },
                    { label: "嘉定区", value: "嘉定区" },
                    { label: "浦东新区", value: "浦东新区" },
                    { label: "金山区", value: "金山区" },
                    { label: "青浦区", value: "青浦区" },
                    { label: "奉贤区", value: "奉贤区" },
                    { label: "崇明区", value: "崇明区" },
                    { label: "松江区", value: "松江区" },
                  ],
                ]}
              >
                {(value) => (
                  <Input
                    value={value?.[0]?.toString()}
                    placeholder="请选择所在区(必填)"
                    readOnly
                    suffix={
                      <ImgWithoutEvent
                        role="banner"
                        srcSet={`${Frame10_2x} 2x, ${Frame10} 1x`}
                        className="size-5"
                      />
                    }
                    error={errors["region"]}
                  />
                )}
              </PickerWithTriggerElement>
            </Form.Item>
            <Form.Item name="name" rules={[{ required: true }]}>
              <Input
                placeholder="请输入您的称呼(必填)"
                error={errors["name"]}
              />
            </Form.Item>
            <Form.Item
              name="mobile"
              rules={[
                { required: true },
                { pattern: /^1[3-9]\d{9}$/, message: "格式错误" },
              ]}
            >
              <Input
                placeholder="请输入您的手机号(必填)"
                error={errors["mobile"]}
              />
            </Form.Item>
            <Form.Item name="recommendName">
              <Input placeholder="推荐人(非必填)" />
            </Form.Item>
          </Form>
          <div className="px-[16px] mt-[16px]">
            <Button
              className="rounded-[24px] bg-[#EB172B] text-white py-[12px]"
              block
              onClick={onSubmit}
            >
              立即免费报名
            </Button>
          </div>
        </div>
        {content || (
          <>
            <ImgWithoutEvent
              srcSet={`${Frame11_2x} 2x, ${Frame11} 1x`}
              className={ImageClassName}
            />
            <ImgWithoutEvent
              srcSet={`${Frame39_2x} 2x, ${Frame39} 1x`}
              className={ImageClassName}
            />
            <ImgWithoutEvent
              srcSet={`${Frame40_2x} 2x, ${Frame40} 1x`}
              className={ImageClassName}
            />
            <ImgWithoutEvent
              srcSet={`${Frame41_2x} 2x, ${Frame41} 1x`}
              className={ImageClassName}
            />
          </>
        )}
        {questionList.length > 0 && (
          <div className="w-full bg-[#F5E8E6] py-[40px] px-[16px]">
            <div className="bg-white rounded-[20px] px-[24px] pb-[20px] text-base overflow-hidden">
              <h3 className="text-xl text-center mt-[24px] mb-[12px] flex justify-center items-center">
                <ImgWithoutEvent
                  role="banner"
                  srcSet={`${Group10_2x} 2x, ${Group10} 1x`}
                  className="w-1/5"
                />
                <span className="mx-[20px]">热门回答</span>
                <ImgWithoutEvent
                  role="banner"
                  srcSet={`${Group11_2x} 2x, ${Group11} 1x`}
                  className="w-1/5"
                />
              </h3>
              {questionList.map((question) => (
                <div
                  className="border-0 border-b border-solid border-b-[#F0F0F0] py-[12px] flex"
                  key={question.id}
                >
                  <ImgWithoutEvent
                    role="banner"
                    srcSet={`${Group14_2x} 2x, ${Group14} 1x`}
                    className="size-4 mr-2 mt-1"
                  />
                  <div>
                    <h4 className="text-base mb-2">{question.question}?</h4>
                    <Ellipsis
                      direction="end"
                      rows={2}
                      content={question.answer}
                      expandText="展开"
                      collapseText="收起"
                      className="text-sm text-[#666666]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-full px-[5vw] py-[3.8vw] text-">
        <ImgWithoutEvent
          role="button"
          srcSet={`${Frame10_1_2x} 2x, ${Frame10_1} 1x`}
          className={ImageClassName}
          onClick={() => {
            location.hash = "";
            location.hash = "#form";
          }}
        />
      </div>
    </div>
  );
}

export default App;
