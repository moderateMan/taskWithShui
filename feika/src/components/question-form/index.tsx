import { Form } from "antd-mobile";
import { QuestListResponseData } from "../../api";
import Input from "./components/input";
import TextArea from "./components/textarea";
import Upload from "./components/upload";
import RadioGroup from "./components/radio-group";
import CheckboxGroup from "./components/checkbox-group";
import { forwardRef, useImperativeHandle } from "react";

export type QuestionFormItemProps = QuestListResponseData & { index: number };

const renderControl = (
  type: QuestListResponseData["type"],
  multiple?: boolean,
  optionList?: QuestListResponseData["optionList"]
) => {
  const options =
    optionList?.map((item) => ({
      label: item.answer!,
      value: item.answer!,
      extra: item.extraType && item.extraType !== "NONE" && (
        <Form.Item
          name={[item.questionId!, item.id!]}
          rules={[{ required: true, message: "必填项" }]}
          noStyle
        >
          {renderControl(item.extraType)}
        </Form.Item>
      ),
    })) || [];
  const Group = multiple ? CheckboxGroup : RadioGroup;
  const config = {
    SELECT: <Group options={options} />,
    INPUT: <Input placeholder="请输入" />,
    TEXTAREA: <TextArea placeholder="请输入" rows={3} />,
    UPLOAD: <Upload />,
  };
  return type && config[type];
};

const renderLabel = (
  index: number,
  required: boolean,
  label?: string,
  multiple?: boolean
) => {
  const idx = index.toString().padStart(2, "0");
  const tag = multiple === undefined ? null : multiple ? "多选" : "单选";
  return (
    <div className="text-sm text-[#181818] flex items-start">
      <span className="mr-2 font-bold">{idx}</span>
      <span>{label}</span>
      {required && <span className="text-[rgb(255,69,69)]">*</span>}
      {tag && (
        <span className="inline-block rounded bg-[#F7F7F7] py-1 px-2 text-xs text-[#737493] ml-2 break-keep">
          {tag}
        </span>
      )}
    </div>
  );
};

function QuestionFormItem(props: QuestionFormItemProps) {
  const { index, id, type, question, mandatory, multiple, optionList } = props;
  return (
    <Form.Item
      label={renderLabel(
        index,
        mandatory === 1,
        question,
        type === "SELECT" ? multiple === 1 : undefined
      )}
      name={[id!, "default"]}
      rules={[{ required: mandatory === 1, message: "必填项" }]}
      className="[--padding-left:0]"
    >
      {renderControl(type, multiple === 1, optionList)}
    </Form.Item>
  );
}

export interface QuestionFormProps {
  data: QuestListResponseData[];
}

export interface QuestionFormRef {
  validate: () => Promise<{ questionId: string; answer: string }[]>;
}

type QuestronFormValue = Record<
  string,
  Record<string, string> & { default: string | string[] }
>;

export default forwardRef<QuestionFormRef, QuestionFormProps>(
  function QuestionForm({ data }: QuestionFormProps, ref) {
    const [form] = Form.useForm<QuestronFormValue>();
    useImperativeHandle(ref, () => ({
      validate: () =>
        form.validateFields().then((values) => {
          return Object.entries(values).map(([questionId, value]) => {
            const { default: defaultValue, ...extra } = value || {};
            const selectValue = Array.isArray(defaultValue)
              ? defaultValue
              : [defaultValue];
            const options = (
              data.find((q) => q.id?.toString() === questionId)?.optionList ||
              []
            ).filter((i) => extra[i.id!] !== undefined);
            const answer = selectValue
              .map((v) => {
                const extraId = options.find((i) => i.answer === v)?.id;
                return [v, extra[extraId!]].filter(Boolean).join(",");
              })
              .join(";");
            return {
              questionId,
              answer,
            };
          });
        }),
    }));
    return (
      <Form
        style={{
          "--prefix-width": "5rem",
          "--border-top": "none",
        }}
        form={form}
        requiredMarkStyle="none"
      >
        {data.map((item, idx) => (
          <QuestionFormItem {...item} index={idx + 1} key={item.id} />
        ))}
      </Form>
    );
  }
);
