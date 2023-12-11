import styles from "./index.module.scss";
import SearchBar from "../../common/components/searchBar";
import ScientificList from "../../common/components/scientificList";
import ScientificType from "./components/scientificType";
import { getPresetColors, generate, getRgbStr } from "@arco-design/color";
const colors = getPresetColors()
const data = [
  {
    mainColor: colors.blue.light[6],
    subColor: colors.blue.light[0],
    title: "人工智能翻译",
    desc: "快速经济的AI翻译，搭配人工校对",
    remark: "学生、初级研究人员、仅用于内部或非正式国际讨论的待翻稿件。",
    price: "0.50",
  },
  {
    mainColor: colors.red.light[6],
    subColor: colors.red.light[0],
    title: "SCI论文翻译",
    desc: "快速经济的AI翻译，搭配人工校对",
    remark: "学生、初级研究人员、仅用于内部或非正式国际讨论的待翻稿件。",
    price: "0.80",
  },
  {
    mainColor: colors.gold.light[6],
    subColor: colors.gold.light[0],
    title: "人工智能翻译",
    desc: "快速经济的AI翻译，搭配人工校对",
    remark: "学生、初级研究人员、仅用于内部或非正式国际讨论的待翻稿件。",
    price: "1.00",
  },
  {
    mainColor: colors.green.light[6],
    subColor: colors.green.light[0],
    title: "人工智能翻译",
    desc: "快速经济的AI翻译，搭配人工校对",
    remark: "学生、初级研究人员、仅用于内部或非正式国际讨论的待翻稿件。",
    price: "1.00",
  },
];

export default function WorkScientific() {
  return (
    <div className={styles["work-scientific"]}>
      {data.map((i, idx) => (
        <ScientificType {...i} key={idx} />
      ))}
    </div>
  );
}
