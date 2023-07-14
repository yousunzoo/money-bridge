import { Skeleton } from "antd";

function PBCardSkeletonItem() {
  return (
    <div className="card h-[200px] bg-white px-[20px] py-6">
      <div className="mb-[18px] flex w-full gap-3">
        <Skeleton.Avatar active size={60} />
        <div className="flex w-full flex-col gap-4">
          <Skeleton.Input active block={true} size="small" />
          <Skeleton.Input active block={true} size="small" />
        </div>
      </div>
      <Skeleton.Input block={true} />
      <div className="mt-4 flex w-full justify-between gap-4">
        <Skeleton.Input active block={true} size="small" />
        <Skeleton.Input active block={true} size="small" />
      </div>
    </div>
  );
}

export default PBCardSkeletonItem;
