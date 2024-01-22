import { Button, Form, Rate, TextArea } from "antd-mobile";
import styles from "./index.module.scss";
import { useState } from "react";
import Icon from "../../common/components/icons";
// import { useParams } from "react-router";

export default function Review() {
  // const params = useParams();
  const [disabled, setDisabled] = useState(true);

  return (
    <Form
      className={styles["review"]}
      onValuesChange={(_, values) => {
        setDisabled(!Object.values(values).every(Boolean));
      }}
    >
      <div className={styles["block"]}>
        <div className={styles["header"]}>
          <img
            src="https://img.zcool.cn/community/0104c15cd45b49a80121416816f1ec.jpg@1280w_1l_2o_100sh.jpg"
            className={styles["cover-img"]}
          />
          <div className={styles["content"]}>
            <h3 className={styles["title"]}>
              Java新手零基础课程全套系列，名师打造的课程
            </h3>
            <span className={styles["time"]}>2022.09.28 20:00</span>
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
        <Button className={styles["submit"]} disabled={disabled}>
          提交
        </Button>
      </div>
    </Form>
  );
}
