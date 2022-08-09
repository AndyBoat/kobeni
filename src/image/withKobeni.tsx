import React, { useEffect, useState } from "react";
import { supportsWebp } from "../utils";

const detectAndUpdateUrl = (src?: string) => {
  if (!src) {
    return src;
  }
  if (src.split("/").pop()?.split("?")[0].toLowerCase().endsWith(".webp")) {
    src.replace(".webp", ".png");
  }
  return src;
};

export default function withKobeniImage<
  T extends React.ImgHTMLAttributes<HTMLImageElement>
>(ImageLikeComponent: React.FC<T>) {
  return (props: T) => {
    const [decoratedSrc, setDecoratedSrc] = useState(props.src);
    const updateSrc = (src?: string) => {
      const updatedUrl = detectAndUpdateUrl(src);
      setDecoratedSrc(updatedUrl);
    };

    useEffect(() => {
      supportsWebp().then((isSupport) => !isSupport && updateSrc(props.src));
    }, []);

    return <ImageLikeComponent {...props} src={decoratedSrc} />;
  };
}
