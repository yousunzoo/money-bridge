import Image from "next/image";
import React from "react";

function PostCard({ props }: any) {
  return (
    <>
      {props ? (
        props.map((item: any) => (
          <div id={item.id} key={item.id}>
            <div>
              <div>
                <div>
                  {item.tag1}
                  {item.tag2}
                  태그
                </div>
                <div>{item.title}제목</div>
              </div>
              <button>북마크</button>
            </div>
            <div>
              <div>
                <div>
                  {item.pbName}/{item.career}이름/경력
                </div>
                <div>{item.msg}한줄 소개</div>
              </div>
              <div>
                <Image src={item.companyLogo} alt="증권사로고" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>작성한 콘텐츠가 없습니다</div>
      )}
    </>
  );
}

export default PostCard;
