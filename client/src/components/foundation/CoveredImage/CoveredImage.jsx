import classNames from 'classnames';
import sizeOf from 'image-size';
import React from 'react';

import { useFetch } from '../../../hooks/use_fetch';
import { fetchBinary } from '../../../utils/fetchers';


import { LazyLoadImage } from 'react-lazy-load-image-component';
/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = React.memo(({ alt, src ,srcset }) => {
  console.log("src:"+srcset);
  const { data, isLoading } = useFetch(src, fetchBinary);

  const imageSize = React.useMemo(() => {
    return data !== null ? sizeOf(Buffer.from(data)) : null;
  }, [data]);

  // const blobUrl = React.useMemo(() => {
  //   return data !== null ? URL.createObjectURL(new Blob([data])) : null;
  // }, [data]);

  const [containerSize, setContainerSize] = React.useState({ height: 0, width: 0 });
  /** @type {React.RefCallback<HTMLDivElement>} */
  const callbackRef = React.useCallback((el) => {
    console.log("height:"+(el?.clientHeight ?? 0));
    console.log("width:"+(el?.clientWidth ?? 0));

    setContainerSize({
      height: el?.clientHeight ?? 0,
      width: el?.clientWidth ?? 0,
    });
  }, []);

  if (isLoading || data === null){
    //  || blobUrl === null) {
    return null;
  }

  const containerRatio = containerSize.height / containerSize.width;
  const imageRatio = imageSize?.height / imageSize?.width;

  return (
    <div ref={callbackRef} className="relative w-full h-full overflow-hidden">

      {/* <LazyLoadImage
            className={classNames('absolute left-1/2 top-1/2 max-w-none transform -translate-x-1/2 -translate-y-1/2', {
              'w-auto h-full': containerRatio > imageRatio,
              'w-full h-auto': containerRatio <= imageRatio,
            })}
            alt={alt}
            src={blobUrl} // use normal <img> attributes as props
            /> */}

      <img
        alt={alt}
        className={classNames('absolute left-1/2 top-1/2 max-w-none transform -translate-x-1/2 -translate-y-1/2', {
          'w-auto h-full': containerRatio > imageRatio,
          'w-full h-auto': containerRatio <= imageRatio,
        })}
        srcset={srcset}
      />
    </div>
  );
});

export { CoveredImage };
