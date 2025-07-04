import * as React from "react"

interface IcTiktokProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
}

const IcTiktok = (props: IcTiktokProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 256 256"
    fill={props.color}
    {...props}
  >
    <path d="M168 106a95.9 95.9 0 0 0 56 18V84a56 56 0 0 1-56-56h-40v128a28 28 0 1 1-40-25.3V89.1a68 68 0 1 0 80 66.9Z" />
  </svg>
);
export default IcTiktok;

