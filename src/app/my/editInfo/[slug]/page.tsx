import React from "react";

function EditPage({ params }: { params: { slug: string } }) {
  const nowPath = params.slug;
  console.log(nowPath);
  return <div>EditPage</div>;
}

export default EditPage;
