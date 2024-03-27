import { Button, Ellipsis, Form, FormProps, Selector } from "antd-mobile";
import PickerWithTriggerElement from "./components/picker-with-trigger-element";
import cls from "classnames";
import Input from "./components/input";
import { useState } from "react";

function App() {
  const [form] = Form.useForm();
  const [errors, setErrors] = useState<Record<string, string>>({});

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
        console.log("Received values of form: ", values);
      })
      .catch(() => {
        validateFields();
      });
  };
  return (
    <div className="size-full">
      <div className="w-full h-[calc(100%-72px)] overflow-y-auto text-[0]">
        <img
          src="./assets/Frame 1.png"
          srcSet="./assets/Frame 1@2x.png 2x, ./assets/Frame 1.png 1x"
          className="w-full"
        />
        <div className="w-full bg-[#F5E8E6] pt-[24px] pb-[40px]">
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
              {errors["aaa"] && (
                <span className="text-[--adm-color-primary] text-sm font-normal">
                  {errors["aaa"]}
                </span>
              )}
            </h4>
            <Form.Item
              name="aaa"
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
                    label: "选项一",
                    value: "1",
                  },
                  {
                    label: "选项二",
                    value: "2",
                  },
                  {
                    label: "选项三",
                    value: "3",
                  },
                ]}
                showCheckMark={false}
              />
            </Form.Item>
            <Form.Item
              name="bbb"
              rules={[{ required: true, message: "请选择" }]}
            >
              <PickerWithTriggerElement
                columns={[
                  [
                    { label: "周一", value: "Mon" },
                    { label: "周二", value: "Tues" },
                    { label: "周三", value: "Wed" },
                    { label: "周四", value: "Thur" },
                    { label: "周五", value: "Fri" },
                  ],
                ]}
              >
                <Input
                  placeholder="请选择所在区(必填)"
                  readOnly
                  suffix={
                    <img
                      role="banner"
                      src="./assets/Frame 10.png"
                      srcSet="./assets/Frame 10@2x.png 2x, ./assets/Frame 10.png 1x"
                      className="size-5"
                    />
                  }
                  error={errors["bbb"]}
                />
              </PickerWithTriggerElement>
            </Form.Item>
            <Form.Item name="ccc" rules={[{ required: true }]}>
              <Input placeholder="请输入您的称呼(必填)" error={errors["ccc"]} />
            </Form.Item>
            <Form.Item name="ddd" rules={[{ required: true }]}>
              <Input
                placeholder="请输入您的手机号(必填)"
                error={errors["ddd"]}
              />
            </Form.Item>
            <Form.Item name="bbb">
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
        <img
          src="./assets/Frame 11.png"
          srcSet="./assets/Frame 11@2x.png 2x, ./assets/Frame 11.png 1x"
          className="w-full"
        />
        <img
          src="./assets/Frame 39.png"
          srcSet="./assets/Frame 39@2x.png 2x, ./assets/Frame 39.png 1x"
          className="w-full"
        />
        <img
          src="./assets/Frame 40.png"
          srcSet="./assets/Frame 40@2x.png 2x, ./assets/Frame 40.png 1x"
          className="w-full"
        />
        <img
          src="./assets/Frame 41.png"
          srcSet="./assets/Frame 41@2x.png 2x, ./assets/Frame 41.png 1x"
          className="w-full"
        />
        <div className="w-full bg-[#F5E8E6] py-[40px] px-[16px]">
          <div className="bg-white rounded-[20px] px-[24px] pb-[20px] text-base overflow-hidden">
            <h3 className="text-xl text-center mt-[24px] mb-[12px] flex justify-center items-center">
              <img
                role="banner"
                src="./assets/Group 10.png"
                srcSet="./assets/Group 10@2x.png 2x, ./assets/Group 10.png 1x"
                className="w-1/5"
              />
              <span className="mx-[20px]">热门回答</span>
              <img
                role="banner"
                src="./assets/Group 11.png"
                srcSet="./assets/Group 11@2x.png 2x, ./assets/Group 11.png 1x"
                className="w-1/5"
              />
            </h3>
            {Array.from({ length: 3 }).map(() => (
              <div className="border-0 border-b border-solid border-b-[#F0F0F0] py-[12px] flex">
                <img
                  role="banner"
                  src="./assets/Group 14.png"
                  srcSet="./assets/Group 14@2x.png 2x, ./assets/Group 14.png 1x"
                  className="size-4 mr-2 mt-1"
                />
                <div>
                  <h4 className="text-base mb-2">全屋定制那种板材更环保?</h4>
                  <Ellipsis
                    direction="end"
                    rows={2}
                    content={
                      "您在家装做定制家具时肯定会遇到比如说同一款品牌的板材价格会有较大的差异，各种板材的报价也相当混乱。同款板材有的报价要1200多，有的8-900，价格差距如此之大。一是板材的基材不一样，你用的什么松，澳松还是欧松，还是新西兰松，还是国产松，价格相差很大的。比如颗粒板用的啥基材木头都大有讲究，一个牌子的有用榉木的桉木的杨木的，价格差别很大的，但是他都是叫这个牌子，由于很多装修的业主不知情，容易造成价格翻车。 二是很多板材用了杂木不是单一木种，很多板材掺杂了杂木，使得价格相对较低，但板材的稳定性，握钉力就会较差，同样在使用过程中售后问题就会较多，质量无法保障。 三是板材生产销售有好几种模式，有贴牌和授权的，有原厂直营的，可能贴牌的最便宜，但是这种板材的质量是不能够保证，不是大厂出的，制造设备和工艺都无法保证，售后问题会很多。还有很多宣称的板材有防伪标的，都是贴皮贴上去的。一味地追求低价也会造成翻车。 收起"
                    }
                    expandText="展开"
                    collapseText="收起"
                    className="text-sm text-[#666666]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full px-4 py-3">
        <img
          role="button"
          src="./assets/Frame 10(1).png"
          srcSet="./assets/Frame 10(1)@2x.png 2x, ./assets/Frame 10(1).png 1x"
          className="w-full"
        />
      </div>
    </div>
  );
}

export default App;
