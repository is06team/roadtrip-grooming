import { useCallback } from "react";
import { saveAs } from "file-saver";
import slug from "slug";
import { UserStory } from "../model/types";

export const useExportFile = () => {
  const getJsonExport = useCallback((story: UserStory): string => {
    return JSON.stringify(story, null, 4);
  }, []);

  const downloadJsonExport = useCallback(
    (story: UserStory) => {
      const blob = new Blob([getJsonExport(story)], {
        type: "application/json",
      });
      saveAs(blob, `UserStory-${slug(story.title)}.json`);
    },
    [getJsonExport]
  );

  return { getJsonExport, downloadJsonExport };
};
