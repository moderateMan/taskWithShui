import { Button, Form, Rate, TextArea } from "antd-mobile";
import styles from "./index.module.scss";
import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { LoaderDataType } from "../../router";
import dayjs from "dayjs";
import { comment } from "../../common/apis";

export default function Review() {
  const params = useParams<{ id: string }>();
  const { detail } = useLoaderData() as LoaderDataType;
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const submit = async () => {
    const values = form.getFieldsValue();
    const { success } = await comment({
      orderId: params.id,
      ...values,
    });
    if (success) {
      navigate(-1);
    }
  };

  return (
    <Form
      form={form}
      className={styles["review"]}
      onValuesChange={(_, values) => {
        setDisabled(!Object.values(values).every(Boolean));
      }}
    >
      <div className={styles["block"]}>
        <div className={styles["header"]}>
          <img src={detail.course.cover} className={styles["cover-img"]} />
          <div className={styles["content"]}>
            <h3 className={styles["title"]}>{detail.course.title}</h3>
            <span className={styles["time"]}>
              {dayjs(detail.course.createTime).format("YYYY-MM-DD hh:mm:ss")}
            </span>
          </div>
        </div>
        <Form.Item name="content">
          <TextArea
            className={styles["textarea"]}
            placeholder="请您填写对视频的评价吧"
            rows={5}
          />
        </Form.Item>
      </div>
      <hr className={styles["hr"]} />
      <div className={styles["block"]}>
        <Form.Item label="请您给视频打个分吧" name="rate">
          <Rate />
        </Form.Item>
        <Button
          className={styles["submit"]}
          disabled={disabled}
          onClick={submit}
        >
          提交
        </Button>
      </div>
    </Form>
  );
}
