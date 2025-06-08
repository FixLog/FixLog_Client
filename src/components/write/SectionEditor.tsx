import MDEditor from "@uiw/react-md-editor";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface SectionEditorProps {
  sectionKey: string;
}

export default function SectionEditor({ sectionKey }: SectionEditorProps) {
  const queryClient = useQueryClient();
  const cacheKey = ["draft", sectionKey];
  const cached = queryClient.getQueryData<string>(cacheKey);

  useEffect(() => {
    if (cached === undefined) {
      console.log(`Initializing section "${sectionKey}"`);
      queryClient.setQueryData(cacheKey, "");
    }
  }, [cached, sectionKey]);

  return (
    <div data-color-mode="light">
      <MDEditor
        value={cached ?? ""}
        onChange={(val) => {
          console.log("onChange:", sectionKey, val);
          queryClient.setQueryData(cacheKey, val ?? "");
        }}
        height={200}
      />
    </div>
  );
}
