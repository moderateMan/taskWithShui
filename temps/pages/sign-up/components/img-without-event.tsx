import cls from "classnames";

export default function ImgWithoutEvent(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
) {
  const {
    className,
    src,
    alt,
    width,
    height,
    title,
    loading,
    sizes,
    srcSet,
    decoding,
    useMap,
    crossOrigin,
    ...rest
  } = props;
  return (
    <div
      className={cls(
        className,
        "select-none relative before:content-[''] before:z-[999] before:absolute before:size-full before:left-0 before:top-0"
      )}
      {...rest}
    >
      <img
        className="w-full"
        src={src}
        alt={alt}
        width={width}
        height={height}
        title={title}
        loading={loading}
        sizes={sizes}
        srcSet={srcSet}
        decoding={decoding}
        useMap={useMap}
        crossOrigin={crossOrigin}
      />
    </div>
  );
}
