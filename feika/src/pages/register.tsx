import { Checkbox, Form } from "antd-mobile";
import CardHeader from "../components/card-header";
import { ChevronRight, Square, SquareCheckBig } from "lucide-react";
import { ReactNode } from "react";
import Input from "../components/input";
import PickerWithTriggerElement from "../components/picker-with-trigger-element";
import { updateUserInfo } from "../api";
import { success } from "../utils/toast";
import { useNavigate } from "react-router";
import ImgWithoutEvent from "../components/img-without-event";

import PhoneIcon from "../assets/phone.svg";
import GenderIcon from "../assets/gender.svg";
import NameIcon from "../assets/name.svg";
import AgeIcon from "../assets/age.svg";
import BackgroundImg from "../assets/background-1.svg";
import { useRegisterCacheStore } from "../store/register";
import { useUserStore } from "../store/user";

const createIconLabel = (icon: string, label: ReactNode) => (
  <span className="flex items-center text-[#737493]">
    <ImgWithoutEvent src={icon} alt="icon" className="mr-2 w-5 h-5" />
    {label}
  </span>
);

const columns = [
  // { label: "未知", value: 0 },
  { label: "男", value: 1 },
  { label: "女", value: 2 },
  // { label: "保密", value: 3 },
];

export default function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const { registerCache, setRegisterCache } = useRegisterCacheStore();

  return (
    <>
      <CardHeader bg={BackgroundImg} />
      <div className="px-3">
        <div className="rounded-lg border border-solid border-[#ECE9EB] p-4">
          <Form
            layout="horizontal"
            style={{
              "--border-top": "none",
              "--prefix-width": "5rem",
            }}
            form={form}
            requiredMarkStyle="none"
            initialValues={{
              name: userInfo?.name,
              gender: userInfo?.gender !== undefined ? [userInfo.gender] : [],
              age: userInfo?.age,
              mobile: userInfo?.mobile,
              ...registerCache,
            }}
          >
            <Form.Item
              label={createIconLabel(NameIcon, "姓名")}
              className="[--padding-left:4px]"
              name="name"
              rules={[{ required: true, message: "请输入姓名" }]}
            >
              <Input placeholder="请输入姓名" />
            </Form.Item>
            <Form.Item
              label={createIconLabel(GenderIcon, "性别")}
              className="[--padding-left:4px]"
              name="gender"
              rules={[{ required: true, message: "请选择性别" }]}
            >
              <PickerWithTriggerElement columns={[columns]}>
                {(value) => (
                  <Input
                    value={
                      columns.find((item) => item.value === value?.[0])?.label
                    }
                    placeholder="请选择性别"
                    readOnly
                    suffix={
                      <ChevronRight
                        width={18}
                        height={18}
                        color="rgb(115,116,147)"
                      />
                    }
                  />
                )}
              </PickerWithTriggerElement>
            </Form.Item>
            <Form.Item
              label={createIconLabel(AgeIcon, "年龄")}
              className="[--padding-left:4px]"
              name="age"
              rules={[
                { required: true, message: "请输入年龄" },
                {
                  type: "integer",
                  min: 0,
                  max: 120,
                  transform: (value) => Number.parseInt(value),
                  message: "请输入正确的年龄",
                },
              ]}
              normalize={(v) => Number.parseInt(v?.trim())}
            >
              <Input type="number" placeholder="请输入年龄" />
            </Form.Item>
            <Form.Item
              label={createIconLabel(PhoneIcon, "电话")}
              className="[--padding-left:4px]"
              name="mobile"
              rules={[
                { required: true, message: "请输入电话" },
                { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的电话" },
              ]}
            >
              <Input type="tel" placeholder="请输入电话" />
            </Form.Item>
          </Form>
          <div className="my-[1.375rem] leading-[normal] text-[#939292]">
            <Checkbox
              checked={registerCache?.agreement}
              onChange={(val) =>
                setRegisterCache({ ...registerCache, agreement: val })
              }
              icon={(checked) =>
                checked ? (
                  <SquareCheckBig width={18} height={18} />
                ) : (
                  <Square width={18} height={18} />
                )
              }
            >
              我已阅读并同意
              <a
                href="javascript;void(0)"
                className="mx-2"
                onClick={(e) => {
                  e.preventDefault();
                  setRegisterCache({
                    ...registerCache,
                    ...form.getFieldsValue(),
                  });
                  navigate("/declare");
                }}
              >
                会员注册信息使用声明
              </a>
            </Checkbox>
          </div>
          <button
            className="w-full font-bold bg-[#FFC726] rounded py-2 align-center text-base shadow-lg shadow-[rgba(229,177,26,0.32)] disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!registerCache?.agreement}
            onClick={() => {
              form.validateFields().then((values) => {
                const { gender, ...rest } = values;
                updateUserInfo({ ...rest, gender: gender?.[0] }).then(() => {
                  success("注册成功");
                  navigate("/questionnaire");
                  setRegisterCache(undefined);
                });
              });
            }}
          >
            下一步
          </button>
        </div>
      </div>
    </>
  );
}
