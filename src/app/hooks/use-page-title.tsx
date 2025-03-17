import { useEffect } from "react";

const usePageTitle = (title?: string) => {
  useEffect(() => {
    const pageTitle = `${title} | Blogg`;
    if (title && document.title !== pageTitle) {
      document.title = pageTitle;
    }

    return () => {
      document.title = `Blogg`;
    };
  }, [title]);
};

export { usePageTitle };
