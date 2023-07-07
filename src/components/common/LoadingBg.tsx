import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 80, color: "#3A7391" }} spin />;

function LoadingBg() {
  return (
    <div className="fixed left-0 top-0 h-full w-full bg-white bg-opacity-80">
      <Spin className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" indicator={antIcon} />
    </div>
  );
}

export default LoadingBg;
