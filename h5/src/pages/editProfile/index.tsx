import { Avatar, Button, Form } from "antd-mobile";
import styles from "./index.module.scss";
import Input from "../../common/components/input";
import Area, {
  getCodesByNameOption,
  getNameByCode,
} from "../../common/components/area";
import { useFlat } from "../../service";
import { useMemo } from "react";
import useWxShare from "../../common/hooks/useWxShare";
import { success } from "../../common/utils/toast";

export default function EditProfile() {
  const { userInfo } = useFlat("authStore");
  const { updateUserInfo } = useFlat("editProfileStore");
  const [form] = Form.useForm();
  useWxShare({ title: "做科研", link: window.location.origin });

  const initialValues = useMemo(() => {
    const { province, city, district } = userInfo || {};
    const areaList = [province, city, district];
    const area = areaList.every(Boolean)
      ? getCodesByNameOption({
          province: province!,
          city: city!,
          district: district!,
        })
      : undefined;
    return {
      ...userInfo,
      nickname: userInfo?.nickname || userInfo?.wechatOpenId,
      area,
    };
  }, [userInfo]);

  return (
    <div className={styles["edit-profile"]}>
      <div className={styles["header"]}>
        <Avatar src={userInfo?.avatar || ""} className={styles["avatar"]} />
      </div>
      <Form
        layout="horizontal"
        className={styles["form"]}
        initialValues={initialValues}
        form={form}
      >
        <Form.Item label="微信名" name="nickname">
          <Input readOnly placeholder="请输入微信名" />
        </Form.Item>
        <Form.Item label="电话" name="mobile">
          <Input placeholder="请输入电话" />
        </Form.Item>
        <Form.Item label="省市区" name="area">
          <Area placeholder="请选择省市区" />
        </Form.Item>
        <Form.Item label="医院" name="hospital">
          <Input placeholder="请输入医院名称" />
        </Form.Item>
        <Form.Item label="科室" name="department">
          <Input placeholder="请输入科室名称" />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { type: "email", warningOnly: true, message: "请输入正确的邮箱" },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            style={{
              width: "200px",
            }}
            onClick={() => {
              form.validateFields().then((values) => {
                const { area, nickname, ...resetValue } = values;
                const formValue = {
                  province: getNameByCode(area?.[0]),
                  city: getNameByCode(area?.[1]),
                  district: getNameByCode(area?.[2]),
                  ...resetValue,
                };
                updateUserInfo(formValue).then(() => {
                  success("保存成功");
                });
              });
            }}
            color="primary"
          >
            保存
          </Button>
        </div>
      </Form>
    </div>
  );
}
