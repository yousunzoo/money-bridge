import React, { useState } from "react";

function Edit({ contentData }: any) {
  const { name, intro, speciality1, speciality2, career, award } = contentData;
  const [introValue, setIntroValue] = useState(intro);
  const [value, setValue] = useState(introValue.length);

  const introChange = (event: any) => {
    setValue(event.target.value.length);
    const text = event.target.value;
    if (value <= 150) {
      setIntroValue(text);
    }
  };
  return <div>Edit</div>;
}

export default Edit