import { useEffect, useRef, useState } from "react";

type IntersectionObserverOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

type UseIntersectionObserverProps = {
  options: IntersectionObserverOptions;
  dependencies?: React.DependencyList;
};

export const useIntersectionObserver = ({
  options,
  dependencies = [],
}: UseIntersectionObserverProps): [React.MutableRefObject<null>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [targetRef, options, ...dependencies]);

  return [targetRef, isIntersecting];
};
