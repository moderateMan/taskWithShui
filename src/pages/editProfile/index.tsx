import { Avatar, Form } from "antd-mobile";
import styles from "./index.module.scss";
import Input from "../../common/components/input";
import Area from "../../common/components/area";

export default function EditProfile() {
  return (
    <div className={styles["edit-profile"]}>
      <div className={styles["header"]}>
        <Avatar
          src="https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
          className={styles["avatar"]}
        />
      </div>
      <Form
        layout="horizontal"
        className={styles["form"]}
        initialValues={{ name: "张启明", phone: "188****3248" }}
      >
        <Form.Item label="微信名" name="name">
          <Input readOnly placeholder="请输入微信名" />
        </Form.Item>
        <Form.Item label="电话" name="phone">
          <Input readOnly placeholder="请输入电话" />
        </Form.Item>
        <Form.Item label="省市区" name="area">
          <Area placeholder="请选择省市区" />
        </Form.Item>
        <Form.Item label="医院" name="hospital">
          <Input placeholder="请输入医院名称" />
        </Form.Item>
        <Form.Item label="科室" name="dept">
          <Input placeholder="请输入科室名称" />
        </Form.Item>
        <Form.Item label="邮箱" name="email">
          <Input placeholder="请输入邮箱" />
        </Form.Item>
      </Form>
    </div>
  );
}
