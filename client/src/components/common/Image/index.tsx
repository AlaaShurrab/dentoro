interface Props {
  src: string;
  alt: string;
  [otherProps: string]: any;
}

const Image = ({ src, alt, ...otherProps }: Props): JSX.Element => (
  <img src={src} alt={alt} {...otherProps} />
);

export default Image;
