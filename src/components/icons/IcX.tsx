import * as React from 'react';

interface IcXProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

const IcX = (props: IcXProps) => (
  <svg width={24} height={24} viewBox="0 0 512 512" fill={props.color} {...props}>
    <path d="M476.2 32H360.6L256 181.3 151.4 32H35.8l164.4 224L35.8 480h115.6L256 330.7 360.6 480h115.6L311.8 256 476.2 32z" />
  </svg>
);

export default IcX;
