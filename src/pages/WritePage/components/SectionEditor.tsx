import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface SectionEditorProps {
  sectionKey: string;
}

export default function SectionEditor({ sectionKey }: SectionEditorProps) {
  const queryClient = useQueryClient();
  const cacheKey = ["draft", sectionKey];

  const cached = queryClient.getQueryData<string>(cacheKey) ?? "";
  const [value, setValue] = useState(cached);

  useEffect(() => {
    if (cached === "") {
      console.log(`Initializing section "${sectionKey}"`);
      queryClient.setQueryData(cacheKey, "");
    }
  }, []);

  const handleChange = (val: string | undefined) => {
    setValue(val ?? "");
    queryClient.setQueryData(cacheKey, val ?? "");
  };

  return (
    <div data-color-mode="light">
      <MDEditor value={value} onChange={handleChange} height={500} />
    </div>
  );
}
