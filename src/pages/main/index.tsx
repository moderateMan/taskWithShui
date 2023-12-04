import { Button } from "antd-mobile";
import { useFlat } from "../../service";
import { useEffect, useState } from "react";

export default () => {
  const { testAct, appInfo } = useFlat("mainStore");
  return (
    <div>
      main
      {appInfo}
      <Button
        onClick={async () => {
          testAct();
        }}>
        test
      </Button>
    </div>
  );
};
